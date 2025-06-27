<script>
  let menuItems = [
    { name: "Dashboard", icon: "🏠", page: "dashboard" },
    { name: "Classes", icon: "📚", page: "classes" },
    { name: "Assignments", icon: "📝", page: "assignments" },
    { name: "Settings", icon: "⚙️", page: "settings" }
  ];

  const navigate = (e, page) => {
    e.preventDefault();
    const url = new URL(window.location);
    url.searchParams.set("page", page);
    window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
</script>

<aside class="bg-gray-900 text-white w-64 min-h-screen p-4 shadow-lg">
  <nav class="flex flex-col gap-4 mt-8">
    {#each menuItems as item}
      <a 
        href={`?page=${item.page}`} 
        on:click={(e) => navigate(e, item.page)}
        class="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 transition"
      >
        <span class="text-xl">{item.icon}</span>
        <span class="text-sm">{item.name}</span>
      </a>
    {/each}
  </nav>
</aside>
