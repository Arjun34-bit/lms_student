<script>
  import "../styles/global.css";
  import { courseTitle } from "../store/courseStore.js"
  import { fade } from "svelte/transition"
  import ExitPopUp from "./ExitPopUp.svelte";
      let isOpen = false;
      let isOpenModal = false
  
    const toggleMenu = () => {
      isOpen = !isOpen;
    };

    const handleCancel = () => {
      isOpenModal = false
    }

    const handleExit = () => {
      window.location.href = "/courses/my-courses"
    }
  </script>
  
  <nav class="bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-md">
    <div class="max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center gap-3">
        <div class="flex items-center">
            <button class="text-sm px-2 py-1 font-semibold bg-white rounded-lg text-black-800:text-white cursor-pointer" on:click={() => isOpenModal = true}>
                <i class="pi pi-arrow-left"></i><span class="ml-2">Back</span>
            </button>
          </div>
        <div class="flex items-center">
          <span class="text-xl font-bold text-gray-800 dark:text-white" transition:fade={{duration:1000}}>
            {$courseTitle}
          </span>
        </div>
  
  
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
  
    {#if isOpen}
      <div class="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900">
        <a href="/courses" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600">Courses</a>
        <a href="/programs" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600">Programs</a>
        <a href="/my-learning" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600">My Learning</a>
        <a href="/profile" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600">Profile</a>
      </div>
    {/if}

    {#if isOpenModal}
    <div class="absolute flex justify-center items-center z-1">
      <ExitPopUp onConfirm={handleExit} onCancel={handleCancel} />    
    </div>
    {/if}

    
      
  </nav>
  