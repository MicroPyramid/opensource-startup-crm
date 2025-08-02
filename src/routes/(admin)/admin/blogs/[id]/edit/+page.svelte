<script>
  import { dndzone } from "svelte-dnd-action";
  /** @type {{ data: import('./$types').PageData }} */
  let { data } = $props();
  /** @type {any} */
  let blog = $state(/** @type {any} */ (data)?.blog || {});
  /** @type {any[]} */
  let contentBlocks = $state(blog?.contentBlocks || [])

  // Drag and drop handler for reordering content blocks
  async function handleReorder(/** @type {any} */ { detail }) {
    // detail.items is the new order of contentBlocks
    // Reorder contentBlocks array to match the new order from dndzone
    contentBlocks = detail.items.map((/** @type {any} */ item, /** @type {any} */ idx) => ({
      ...item,
      displayOrder: idx + 1
    }));

    // Send new order to server
    const order = contentBlocks.map(({ id, displayOrder }) => ({ id, displayOrder }));
    const formData = new FormData();
    formData.append("order", JSON.stringify(order));
    await fetch("?/reorder-blocks", { method: "POST", body: formData });
    // Optionally, you can reload the page or refetch data here if needed
    // location.reload();
  }

  let message = $state("");

  // For editing/adding content blocks
  /** @type {any} */
  let editingBlockId = $state(null);
  let newBlock = $state({
    type: "MARKDOWN",
    content: "",
    displayOrder: contentBlocks.length + 1,
    draft: false,
  });

  function startEditBlock(/** @type {any} */ block) {
    editingBlockId = block.id;
    /** @type {any} */ (block)._editContent = block.content;
    /** @type {any} */ (block)._editType = block.type;
    /** @type {any} */ (block)._editDraft = block.draft;
  }

  function cancelEditBlock(/** @type {any} */ block) {
    editingBlockId = null;
    delete block._editContent;
    delete block._editType;
    delete block._editDraft;
  }


  /**
	 * @param {string} title
	 */
  function make_slug(title) {
		return title
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^\w-]+/g, '');
	}
  let editable_title = $state(blog?.title || '');
  let slug = $state(blog?.slug || '');


  // Initialize previous_editable_title_for_slug_generation to undefined
  // so we can detect the first run of the reactive block.
  /** @type {any} */
  let previous_editable_title_for_slug_generation = $state(undefined);

  $effect(() => {
    // This block runs when editable_title changes (including its initial assignment).
    if (previous_editable_title_for_slug_generation === undefined && editable_title !== undefined) {
      // First run: editable_title has been initialized.
      // `slug` already holds the desired initial value (from form data or course.slug).
      // We set previous_editable_title_for_slug_generation to the current editable_title
      // to establish a baseline, without changing the slug.
      previous_editable_title_for_slug_generation = editable_title;
    } else if (editable_title !== previous_editable_title_for_slug_generation) {
      // Subsequent runs: editable_title has changed from its previous value.
      // Update slug based on the new editable_title.
      slug = make_slug(editable_title);
      previous_editable_title_for_slug_generation = editable_title;
    }
  });
</script>

<div class="max-w-5xl mx-auto mt-10 p-8 bg-white rounded-lg shadow">
  <h1 class="text-2xl font-bold mb-6">Edit Blog</h1>
  <form method="POST" action="?/update-blog" class="space-y-5">
    <input type="hidden" name="title" value={editable_title} />
    <input type="hidden" name="slug" value={slug} />
    <div>
      <label for="blog-title" class="block font-medium mb-1">
        Title:
      </label>
      <input
        id="blog-title"
        bind:value={editable_title}
        required
        class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div>
      <label for="blog-seo-title" class="block font-medium mb-1">
        SEO Title:
      </label>
      <input
        id="blog-seo-title"
        name="seoTitle"
        bind:value={blog.seoTitle}
        class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div>
      <label for="blog-seo-description" class="block font-medium mb-1">
        SEO Description:
      </label>
      <textarea
        id="blog-seo-description"
        name="seoDescription"
        bind:value={blog.seoDescription}
        class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
      ></textarea>
    </div>
    <div>
      <label for="blog-excerpt" class="block font-medium mb-1">
        Excerpt:
      </label>
      <textarea
        id="blog-excerpt"
        name="excerpt"
        bind:value={blog.excerpt}
        class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
      ></textarea>
    </div>
    <div>
      <label for="blog-slug" class="block font-medium mb-1">
        Slug:
      </label>
      <input
        id="blog-slug"
        bind:value={slug}
        required
        class="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        disabled={!blog.draft}
      />
      {#if !blog.draft}
        <p class="text-xs text-gray-500 mt-1">
          Slug can only be edited in draft mode.
        </p>
      {/if}
    </div>
    <div>
      <div class="block font-medium mb-1 text-gray-700">
        Category: <span class="font-semibold">{blog.category}</span>
      </div>
    </div>
    <div>
      <label class="inline-flex items-center" for="blog-draft">
        Draft
        <input
          id="blog-draft"
          type="checkbox"
          name="draft"
          bind:checked={blog.draft}
          class="h-4 w-4 text-blue-600 border-gray-300 rounded ml-2"
        />
      </label>
    </div>
    <button
      type="submit"
      class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
    >
      Save
    </button>
  </form>

  <h2 class="text-xl font-semibold mt-10 mb-4">Content Blocks</h2>
  <ul
    class="space-y-4"
    use:dndzone={{ items: contentBlocks, flipDurationMs: 200 }}
    onconsider={handleReorder}
    onfinalize={handleReorder}
  >
    {#each contentBlocks as block (block.id)}
      <li class="border rounded p-4 bg-gray-50" data-id={block.id}>
        {#if editingBlockId === block.id}
          <form method="POST" action="?/edit-block" class="space-y-2">
            <input type="hidden" name="id" value={block.id} />
            <div>
              <label
                class="block text-sm font-medium"
                for={`edit-type-${block.id}`}>Type:</label
              >
              <select
                id={`edit-type-${block.id}`}
                name="type"
                bind:value={block._editType}
                class="mt-1 block w-full rounded border-gray-300 shadow-sm"
              >
                <option value="MARKDOWN">Markdown</option>
                <option value="CODE">Code</option>
              </select>
            </div>
            <div>
              <label
                class="block text-sm font-medium"
                for={`edit-content-${block.id}`}>Content:</label
              >
              <textarea
                id={`edit-content-${block.id}`}
                name="content"
                bind:value={block._editContent}
                class="mt-1 block w-full rounded border-gray-300 shadow-sm"
                rows="15"
              ></textarea>
            </div>
            <div>
              <label
                class="inline-flex items-center"
                for={`edit-draft-${block.id}`}
                >Draft
                <input
                  id={`edit-draft-${block.id}`}
                  type="checkbox"
                  name="draft"
                  bind:checked={block._editDraft}
                  class="h-4 w-4 text-blue-600 border-gray-300 rounded ml-2"
                />
              </label>
            </div>
            <div class="flex gap-2">
              <button
                type="submit"
                class="py-1 px-3 bg-green-600 text-white rounded hover:bg-green-700"
                >Save</button
              >
              <button
                type="button"
                onclick={() => cancelEditBlock(block)}
                class="py-1 px-3 bg-gray-300 rounded hover:bg-gray-400"
                >Cancel</button
              >
            </div>
          </form>
        {:else}
          <div class="flex justify-between items-center">
            <div>
              <span class="font-semibold">{block.type}</span>
              <span class="ml-2 text-xs text-gray-500"
                >Order: {block.displayOrder}</span
              >
              {#if block.draft}
                <span class="ml-2 text-xs text-yellow-600">Draft</span>
              {/if}
            </div>
            <div class="flex gap-2">
              <button
                type="button"
                onclick={() => startEditBlock(block)}
                class="py-1 px-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                >Edit</button
              >
              <form method="POST" action="?/delete-block" class="inline">
                <input type="hidden" name="id" value={block.id} />
                <button
                  type="submit"
                  class="py-1 px-3 bg-red-600 text-white rounded hover:bg-red-700"
                  onclick={(e) => {
                    e.preventDefault();
                    if (confirm("Delete this block?")) {
                      const target = /** @type {HTMLElement} */ (e.target);
                      const form = target.closest("form");
                      if (form) form.requestSubmit();
                    }
                  }}>Delete</button
                >
              </form>
            </div>
          </div>
          <pre
            class="mt-2 bg-white p-2 rounded text-sm overflow-x-auto">{block.content}</pre>
        {/if}
      </li>
    {/each}
  </ul>

  <h3 class="text-lg font-semibold mt-8 mb-2">Add Content Block</h3>
  <form method="POST" action="?/add-block" class="space-y-2">
    <div>
      <label class="block text-sm font-medium" for="add-type">Type:</label>
      <select
        id="add-type"
        name="type"
        bind:value={newBlock.type}
        class="mt-1 block w-full rounded border-gray-300 shadow-sm"
      >
        <option value="MARKDOWN">Markdown</option>
        <option value="CODE">Code</option>
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium" for="add-content">Content:</label
      >
      <textarea
        id="add-content"
        name="content"
        bind:value={newBlock.content}
        class="mt-1 block w-full rounded border-gray-300 shadow-sm"
        rows="15"
      ></textarea>
    </div>
    <div>
      <label class="block text-sm font-medium" for="add-displayOrder"
        >Display Order:</label
      >
      <input
        id="add-displayOrder"
        type="number"
        name="displayOrder"
        bind:value={newBlock.displayOrder}
        class="mt-1 block w-full rounded border-gray-300 shadow-sm"
        min="1"
      />
    </div>
    <div>
      <label class="inline-flex items-center" for="add-draft"
        >Draft
        <input
          id="add-draft"
          type="checkbox"
          name="draft"
          bind:checked={newBlock.draft}
          class="h-4 w-4 text-blue-600 border-gray-300 rounded ml-2"
        />
      </label>
    </div>
    <button
      type="submit"
      class="py-1 px-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >Add Block</button
    >
  </form>

  {#if message}
    <p class="mt-4 text-green-600">{message}</p>
  {/if}
</div>
