export function generateUnsubscribeLink(token: string, baseUrl = 'https://bottlecrm.io') {
  return `${baseUrl}/unsubscribe?token=${token}`;
}

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function generateWelcomeEmail(email: string, unsubscribeLink: string) {
  return {
    subject: 'Welcome to BottleCRM Newsletter!',
    html: `<!DOCTYPE html><html><body>Welcome ${email}! <a href="${unsubscribeLink}">Unsubscribe</a></body></html>`,
    text: `Welcome ${email}! Unsubscribe: ${unsubscribeLink}`
  };
}

export function generateNewsletterTemplate(
  content: { subject: string; headline?: string; articles?: { title: string; excerpt: string; link: string }[]; ctaText?: string; ctaLink?: string },
  unsubscribeLink: string
) {
  const subject = content.subject;
  const articles = content.articles ?? [];
  const ctaText = content.ctaText ?? 'Learn More';
  const ctaLink = content.ctaLink ?? 'https://bottlecrm.io';
  const articlesHtml = articles
    .map((article) => `<div><h3>${article.title}</h3><p>${article.excerpt}</p><a href="${article.link}">Read more</a></div>`)
    .join('');
  return {
    subject,
    html: `<!DOCTYPE html><html><body><h1>${content.headline ?? subject}</h1>${articlesHtml}<a href="${ctaLink}">${ctaText}</a><div><a href="${unsubscribeLink}">Unsubscribe</a></div></body></html>`
  };
}


