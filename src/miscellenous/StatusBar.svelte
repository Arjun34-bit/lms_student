<script>
    import {getItem} from "../utils/localStorageUtils"

    export let user = getItem("user")
    const avatarUrl = "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=";

    function goToHome(){
      window.location.href = "/"
    }
  </script>
  
  <nav class="bg-gray-400 text-white flex items-center justify-between px-4 py-2 shadow-md">
    <!-- Left side: PCC-Class -->
    <div class="text-lg font-semibold cursor-pointer" on:click={goToHome} role="button"
  tabindex="0" on:keydown={(e) => (e.key === '' || e.key === ' ') && goToHome()}>
      PCC-Class
    </div>
  
    <!-- Right side: User Profile -->
    <div class="flex items-center gap-2">
      <span class="hidden sm:inline">{user?.name}</span>
      <img
        src={avatarUrl}
        alt="User Avatar"
        class="w-8 h-8 rounded-full border border-white"
      />
    </div>
  </nav>
  