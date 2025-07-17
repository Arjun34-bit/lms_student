<script>
    let isOpen = false;
  
    const toggleMenu = () => {
      isOpen = !isOpen;
    };
  </script>
  
  <nav class="bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-md">
    <div class="max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center gap-3">
        <div class="flex items-center">
            <a href="/courses/my-courses" class="text-sm px-2 py-1 font-semibold bg-white rounded-lg text-black-800:text-white">
                <i class="pi pi-arrow-left"></i><span class="ml-2">Back</span>
            </a>
          </div>
        <div class="flex items-center">
          <a href="/" class="text-xl font-bold text-gray-800 dark:text-white">
            Course Title
          </a>
        </div>
  
        <!-- Desktop Nav -->
  
        <!-- Hamburger Menu (mobile) -->
        <div class="md:hidden flex items-center">
          <button on:click={toggleMenu} aria-label="Toggle Menu" class="text-gray-700 dark:text-gray-300 focus:outline-none">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {#if !isOpen}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              {:else}
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M6 18L18 6M6 6l12 12" />
              {/if}
            </svg>
          </button>
        </div>
      </div>
    </div>
  
    <!-- Mobile Nav Links -->
    {#if isOpen}
      <div class="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900">
        <a href="/courses" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600">Courses</a>
        <a href="/programs" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600">Programs</a>
        <a href="/my-learning" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600">My Learning</a>
        <a href="/profile" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600">Profile</a>
      </div>
    {/if}
  </nav>
  