<script>
  import { onMount } from 'svelte';

  let isOpen = false;
  let showDropdown = false;
  let user = null;

  const avatarUrl = "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

  onMount(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      user = JSON.parse(stored);
    }

    document.addEventListener('click', closeDropdown);
  });

  const toggleDropdown = () => {
    showDropdown = !showDropdown;
  };

  const closeDropdown = (e) => {
    if (!e.target.closest('.profile-dropdown')) {
      showDropdown = false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem("token")
    localStorage.removeItem("meetingDetails")
    localStorage.removeItem("meetingId")
    window.location.href = '/';
  };
</script>

<nav class="bg-white border-b border-gray-200 px-4 py-3 md:px-16 md:py-6 shadow-sm">
  <div class="flex items-center justify-between">
    <!-- Logo -->
    <button type="button" class="text-xl font-bold text-blue-600 cursor-pointer" on:click={() => window.location.href="/"} on:keydown={(e) => e.key === '' && (window.location.href = "/")}>
      PerfectCoachingCenter
      </button>
    <!-- </div> -->

    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center gap-4 flex-1 justify-end">
      <input
        type="text"
        placeholder="Search..."
        class="border rounded-lg px-3 py-1 w-64 focus:outline-none focus:ring focus:ring-blue-300"
      />

      <div class="flex items-center gap-3">
        <button type="button"  on:click={() => window.location.href="/courses"} class="cursor-pointer">Courses</button>
        <span>Pricing</span>
        {#if user}
            <button class="w-fit p-2 border border-blue-300 rounded-lg font-semibold hover:bg-gray-100" on:click={() => window.location.href = '/live-classes'}>My Classroom</button>
        {:else}
            <span></span>
        {/if}
      </div>

      {#if user}
        <div class="relative profile-dropdown">
          <div role="button" tabindex="0" class="flex items-center gap-2 cursor-pointer" on:click={toggleDropdown} on:keydown={(e) => e.key === 'Enter' && toggleDropdown()}>
            <img
              src={user.avatar || avatarUrl}
              alt="Profile"
              class="w-10 h-10 rounded-full object-cover"
            />
            <span class="text-gray-700 font-medium">{user.name}</span>
          </div>

          {#if showDropdown}
            <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
              <a href="/courses/my-courses" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Courses</a>
              <a href="/profile" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Profile</a>
              <a href="/live-classes" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Live Classes</a>
              <button on:click={logout} class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Logout</button>
            </div>
          {/if}
        </div>
      {:else}
        <button
          class="text-gray-700 px-4 py-1.5 rounded-lg border border-blue-400 hover:text-blue-600 cursor-pointer"
          on:click={() => window.location.href = '/auth/login'}>
          Login
        </button>
        <button
          class="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 cursor-pointer"
          on:click={() => window.location.href = '/auth/register'}>
          Register
        </button>
      {/if}
    </div>

    <!-- Mobile Menu Button -->
    <button class="md:hidden" on:click={() => (isOpen = !isOpen)}>
      <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {#if !isOpen}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        {:else}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        {/if}
      </svg>
    </button>
  </div>

  <!-- Mobile Dropdown -->
  {#if isOpen}
    <div class="md:hidden mt-3 space-y-2">
      <input
        type="text"
        placeholder="Search..."
        class="border rounded-lg px-3 py-1 w-full focus:outline-none focus:ring focus:ring-blue-300"
      />

      {#if user}
        <div class="flex items-center gap-2 px-2">
          <img src={user.avatar || avatarUrl} alt="Profile" class="w-8 h-8 rounded-full object-cover" />
          <span class="text-gray-700 font-medium">{user.name}</span>
        </div>
        <a href="/my-courses" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">My Courses</a>
        <a href="/cart" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Cart</a>
        <a href="/live-classes" class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Live Classes</a>
        <button on:click={logout} class="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Logout</button>
      {:else}
        <button
          class="block w-full text-left text-gray-700 hover:text-blue-600 cursor-pointer"
          on:click={() => window.location.href = '/auth/login'}>
          Login
        </button>
        <button
          class="block w-full text-left bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          on:click={() => window.location.href = '/auth/register'}>
          Register
        </button>
      {/if}
    </div>
  {/if}
</nav>
