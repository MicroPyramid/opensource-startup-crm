# Security Audit Report - BottleCRM

**Audit Date:** 2025-10-21
**Audited By:** Claude Code Security Audit
**Application:** BottleCRM - Multi-tenant SaaS CRM Platform
**Technology Stack:** SvelteKit, PostgreSQL, Prisma ORM

---

## Executive Summary

This security audit identified **12 vulnerabilities** across multiple severity levels:
- **3 Critical** vulnerabilities
- **4 High** severity issues
- **3 Medium** severity issues
- **2 Low** severity issues

The most critical findings involve multi-tenant data isolation failures, lack of CSRF protection, and insecure session management that could lead to unauthorized data access and account compromise.

---

## Critical Vulnerabilities

### 1. Multi-Tenant Data Isolation Bypass (CRITICAL)

**File:** `src/routes/(app)/app/opportunities/[opportunityId]/+page.server.js`

**Issue:** The load function does NOT validate organization ownership, allowing users to access opportunities from other organizations by manipulating the URL.

**Code Location:** Lines 4-20

```javascript
export async function load({ params }) {
  const opportunity = await prisma.opportunity.findUnique({
    where: { id: params.opportunityId },  // ❌ Missing organizationId check!
    include: {
      account: true,
      owner: true
    }
  });
  if (!opportunity) {
    throw error(404, 'Opportunity not found');
  }
  return {
    opportunity,
    account: opportunity.account,
    owner: opportunity.owner
  };
}
```

**Impact:**
- **Data Breach:** Users can view opportunities, accounts, and contacts from ANY organization
- **Violates multi-tenant isolation** - core security principle of the application
- **Regulatory Compliance:** Potential GDPR/privacy violations

**Exploit Scenario:**
1. User A from Organization X discovers opportunity ID `abc-123` belongs to Organization Y
2. User A navigates to `/app/opportunities/abc-123`
3. User A can now view all details about Organization Y's opportunity, account, and owner

**Recommendation:**
```javascript
export async function load({ params, locals }) {
  if (!locals.org?.id) {
    throw error(403, 'Organization access required');
  }

  const opportunity = await prisma.opportunity.findFirst({
    where: {
      id: params.opportunityId,
      organizationId: locals.org.id  // ✅ Add organization check
    },
    include: {
      account: true,
      owner: true
    }
  });
  if (!opportunity) {
    throw error(404, 'Opportunity not found');
  }
  return {
    opportunity,
    account: opportunity.account,
    owner: opportunity.owner
  };
}
```

---

### 2. Insecure Session Management (CRITICAL)

**File:** `src/hooks.server.js`

**Issues:**
1. Session IDs stored in **plain text** in the database
2. **No session expiration** validation
3. **No session invalidation** on critical changes
4. Sessions can be **reused indefinitely** unless manually cleared

**Code Location:** Lines 6-15

```javascript
const sessionId = await event.cookies.get('session');
let user = null;
if(sessionId && sessionId!=''){
  user = await prisma.user.findFirst({
    where: {
      session_id: sessionId  // ❌ Plain text lookup, no expiry check
    }
  })
}
```

**Impact:**
- **Session Hijacking:** If database is compromised, all session IDs are exposed
- **Indefinite Sessions:** Sessions never expire, increasing attack window
- **Session Fixation:** Attackers can potentially fixate sessions

**Recommendation:**
1. Hash session IDs before storing in database (use bcrypt/argon2)
2. Add `expiresAt` timestamp to session records
3. Implement session rotation on privilege escalation
4. Add `lastActivityAt` for idle timeout
5. Consider using the existing `JwtToken` model instead

---

### 3. No CSRF Protection (CRITICAL)

**Files:** All form actions across the application

**Issue:** The application has **NO CSRF token validation** on state-changing operations.

**Impact:**
- Attackers can trick authenticated users into performing actions:
  - Creating/deleting contacts, leads, opportunities
  - Adding users to organizations
  - Modifying account data
  - Closing cases and opportunities
  - Deleting critical records

**Exploit Scenario:**
```html
<!-- Attacker's malicious website -->
<form action="https://victim-crm.com/app/accounts/account-123" method="POST">
  <input type="hidden" name="closureReason" value="Hacked!">
</form>
<script>document.forms[0].submit();</script>
```

**Recommendation:**
Implement CSRF protection using SvelteKit's built-in mechanisms:

1. Generate CSRF tokens in `hooks.server.js`
2. Validate tokens on all POST/PUT/DELETE requests
3. Use `sameSite: 'strict'` cookies (already implemented ✓)

---

## High Severity Issues

### 4. Missing Organization Filter in Case Edit (HIGH)

**File:** `src/routes/(app)/app/cases/[caseId]/edit/+page.server.js`

**Issue:** The load function fetches ALL users and accounts without filtering by organization.

**Code Location:** Lines 16-19

```javascript
const [users, accounts] = await Promise.all([
  prisma.user.findMany({ select: { id: true, name: true } }),  // ❌ No org filter
  prisma.account.findMany({ select: { id: true, name: true } })  // ❌ No org filter
]);
```

**Impact:**
- **Information Disclosure:** Users can see usernames and account names from other organizations
- **Data Leakage:** Violates multi-tenant isolation principle

**Recommendation:**
```javascript
const [users, accounts] = await Promise.all([
  prisma.user.findMany({
    where: {
      organizations: {
        some: { organizationId: org.id }
      }
    },
    select: { id: true, name: true }
  }),
  prisma.account.findMany({
    where: { organizationId: org.id },
    select: { id: true, name: true }
  })
]);
```

---

### 5. Missing Organization Filter in Cases List (HIGH)

**File:** `src/routes/(app)/app/cases/+page.server.js`

**Issue:** Similar to issue #4, user and account lists are not filtered by organization.

**Code Location:** Lines 19-22

**Impact:** Same as issue #4 - information disclosure across organizations.

**Recommendation:** Apply same fix as issue #4.

---

### 6. Missing Organization Filter in Tasks (HIGH)

**File:** `src/routes/(app)/app/tasks/[task_id]/+page.server.js`

**Issue:** User and account queries not filtered by organization.

**Code Location:** Lines 60-66

```javascript
const users = await prisma.user.findMany({
    select: { id: true, name: true, profilePhoto: true }
});

const accounts = await prisma.account.findMany({
    select: { id: true, name: true }
});
```

**Impact:** Information disclosure - users can see data from other organizations.

**Recommendation:** Filter both queries by `organizationId`.

---

### 7. No Rate Limiting (HIGH)

**Issue:** The application has **NO rate limiting** on any endpoints.

**Impact:**
- **Brute Force Attacks:** Attackers can attempt unlimited login attempts
- **DoS Attacks:** Resource exhaustion through repeated requests
- **Enumeration Attacks:** User/email discovery via form submissions
- **API Abuse:** Unlimited newsletter subscriptions, contact form spam

**Affected Endpoints:**
- `/login` - OAuth callback
- `/contact` - Contact form submissions
- All API routes

**Recommendation:**
Implement rate limiting using:
1. SvelteKit middleware with IP-based tracking
2. Libraries like `sveltekit-rate-limiter`
3. Different limits per endpoint type:
   - Login: 5 attempts per 15 minutes
   - Contact form: 3 submissions per hour
   - API routes: 100 requests per minute

---

## Medium Severity Issues

### 8. Inconsistent Input Validation (MEDIUM)

**Issue:** Some routes use Zod validation, others use manual validation, many have minimal or no validation.

**Examples:**
- `/app/leads/[lead_id]/+page.server.js` - Uses Zod ✓
- `/app/accounts/[accountId]/edit/+page.server.js` - Minimal validation
- `/app/contacts/[contactId]/edit/+page.server.js` - Some validation

**Impact:**
- **Data Integrity:** Invalid data in database
- **Business Logic Errors:** Unexpected application behavior
- **Potential Injection:** Insufficient sanitization

**Recommendation:**
1. Standardize on Zod for ALL form validation
2. Create reusable validation schemas
3. Validate data types, ranges, and formats consistently

---

### 9. Admin Newsletter Route Missing Authorization (MEDIUM)

**File:** `src/routes/(admin)/admin/newsletter/+page.server.js`

**Issue:** The route relies ONLY on hooks.server.js for authorization. No secondary check exists in the route itself.

**Current Protection:**
```javascript
// hooks.server.js:76-84
else if (event.url.pathname.startsWith('/admin')) {
  if (!user) {
    throw redirect(307, '/login');
  }
  if (!user.email || !user.email.endsWith('@micropyramid.com')) {
    throw redirect(307, '/app');
  }
}
```

**Issue:** While the hooks provide protection, defense-in-depth requires route-level validation.

**Impact:**
- If hooks are bypassed/misconfigured, sensitive data (newsletter subscribers with IPs) is exposed
- **PII Exposure:** Email addresses and IP addresses of all subscribers

**Recommendation:**
Add explicit authorization check in the route:
```javascript
export async function load({ locals }) {
  if (!locals.user?.email?.endsWith('@micropyramid.com')) {
    throw error(403, 'Admin access required');
  }
  // ... rest of code
}
```

---

### 10. Admin Contact Submissions Missing Organization Context (MEDIUM)

**File:** `src/routes/(admin)/admin/contacts/+page.server.js`

**Issue:** Returns ALL contact submissions without any filtering.

```javascript
export async function load() {
    const contacts = await prisma.contactSubmission.findMany();
    return { contacts };
};
```

**Impact:**
- All MicroPyramid employees can see ALL contact form submissions
- No audit trail of who viewed submissions
- Potential privacy issue if submissions contain sensitive data

**Recommendation:**
1. Add pagination to limit data exposure
2. Add audit logging for viewing contact submissions
3. Consider data retention policies

---

## Low Severity Issues

### 11. Console.log Statements in Production Code (LOW)

**Files:** Multiple files contain debug logging

**Examples:**
- `src/routes/(app)/app/users/+page.server.js:18` - `console.log('User Organization:', userOrg);`
- `src/routes/(app)/app/leads/[lead_id]/+page.server.js` - Multiple console.log statements

**Impact:**
- **Information Disclosure:** Sensitive data in server logs
- **Performance:** Minor overhead
- **Log Pollution:** Difficult to find real errors

**Recommendation:**
1. Remove all `console.log` statements
2. Implement proper logging library (e.g., Winston, Pino)
3. Use environment-based log levels

---

### 12. Error Message Information Disclosure (LOW)

**Issue:** Some error messages expose internal details.

**Example:** `src/routes/(app)/app/tasks/[task_id]/+page.server.js:19`

```javascript
return fail(404, { message: 'Task not found or you do not have permission to view it.' });
```

**Impact:**
- Attackers can enumerate valid task IDs
- Subtle information leakage about system state

**Recommendation:**
Use generic error messages:
```javascript
return fail(404, { message: 'Task not found' });
```

---

## Additional Security Recommendations

### 1. Content Security Policy (CSP)
- Implement strict CSP headers to prevent XSS attacks
- No inline scripts detected (good ✓), but CSP adds defense-in-depth

### 2. Security Headers
Add the following headers in `hooks.server.js`:
```javascript
event.setHeaders({
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
});
```

### 3. Audit Logging Enhancement
- Current audit logging is good ✓
- Extend to cover:
  - Failed login attempts
  - Permission changes
  - Cross-organization access attempts
  - Admin route access

### 4. Database Query Hardening
- Add database query timeout limits
- Implement query result pagination for large datasets
- Consider query complexity limits

### 5. Secrets Management
- No `.env` files found in repo ✓
- Ensure environment variables are never committed
- Consider using a secrets manager for production

---

## Positive Security Findings

The following security measures are **correctly implemented**:

✅ **HttpOnly Cookies:** Session cookies are httpOnly (line login/+page.server.js:73)
✅ **Secure Cookies:** Cookies use secure flag (line login/+page.server.js:77)
✅ **SameSite Strict:** Cookies use sameSite: 'strict' (line login/+page.server.js:76)
✅ **No @html Usage:** No XSS vectors via `{@html}` tags found
✅ **OAuth Authentication:** Using Google OAuth (secure ✓)
✅ **Parameterized Queries:** Prisma ORM prevents SQL injection ✓
✅ **Audit Logging:** Comprehensive audit trail for critical operations
✅ **Role-Based Access Control:** ADMIN/USER roles properly defined
✅ **Organization Isolation:** Most routes properly filter by organizationId
✅ **Input Validation:** Some routes use Zod validation (best practice)

---

## Priority Remediation Plan

### Immediate (Week 1)
1. **Fix Critical Issue #1** - Add organization checks to opportunities route
2. **Implement CSRF Protection** - Add CSRF tokens to all forms
3. **Add Rate Limiting** - At minimum on login and contact forms

### Short-term (Week 2-3)
4. Fix all missing organization filters (Issues #4, #5, #6)
5. Implement secure session management with expiration
6. Add explicit authorization checks to admin routes

### Medium-term (Month 1-2)
7. Standardize input validation across all routes
8. Remove all console.log statements
9. Implement comprehensive security headers
10. Add enhanced audit logging

### Long-term (Month 3+)
11. Security testing automation (SAST/DAST)
12. Penetration testing
13. Security training for developers
14. Implement Web Application Firewall (WAF)

---

## Testing Recommendations

1. **Penetration Testing:** Hire security professionals to test multi-tenant isolation
2. **Automated Security Scanning:** Integrate SAST tools (Snyk, SonarQube)
3. **Security Regression Tests:** Add tests for org isolation, CSRF, session management
4. **Dependency Scanning:** Regularly update and scan npm dependencies

---

## Compliance Considerations

### GDPR Compliance
- ❌ **Data Isolation:** Issue #1 creates GDPR violation risk
- ✅ **Data Minimization:** Good field selection in queries
- ⚠️ **Audit Logs:** Enhance with data access logs
- ⚠️ **Right to Erasure:** Ensure cascading deletes work correctly

### SOC 2 Compliance
- ❌ **Access Controls:** Issues #1-7 violate least privilege principle
- ✅ **Encryption in Transit:** HTTPS enforced ✓
- ⚠️ **Encryption at Rest:** Ensure database encryption enabled
- ⚠️ **Session Management:** Issue #2 violates SOC 2 CC6.1

---

## Conclusion

While BottleCRM demonstrates several strong security practices (OAuth, parameterized queries, audit logging), the **critical multi-tenant isolation vulnerability** and **lack of CSRF protection** require immediate attention. These issues could lead to unauthorized data access and constitute serious security and compliance risks.

The development team has shown good security awareness in many areas (httpOnly cookies, RBAC, audit trails). With focused remediation of the identified issues, particularly the critical and high severity items, the application can achieve a strong security posture appropriate for a multi-tenant SaaS platform.

**Overall Risk Rating:** HIGH (due to critical issues #1-3)
**Remediation Urgency:** IMMEDIATE

---

**Report Prepared By:** Claude Code Security Audit
**Contact:** For questions about this report, please consult with your security team.
