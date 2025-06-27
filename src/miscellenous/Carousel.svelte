<script>
  let current = 0;
  const images = [
    'https://img-c.udemycdn.com/notices/web_carousel_slide/image/bedc6aeb-62a6-48d1-a8c3-187c075b1fe4.jpg',
    'https://img-c.udemycdn.com/notices/web_carousel_slide/image/7e010ca8-97a0-486c-87e1-2eb7bdcacc28.png',
  ];

  const next = () => current = (current + 1) % images.length;
  const prev = () => current = (current - 1 + images.length) % images.length;
</script>

<div class="relative w-full max-w-7xl mx-auto overflow-hidden rounded-xl shadow-lg mt-4">
  <!-- Slides -->
  <div class="flex transition-transform duration-500" style="transform: translateX(-{current * 100}%)">
    {#each images as img (img)}
      <img src={img} alt="" class="w-full flex-shrink-0 object-cover h-64 md:h-96" />
    {/each}
  </div>

  <!-- Prev / Next buttons -->
  <button
    on:click={prev}
    class="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 px-2 py-1 rounded-full shadow"
    aria-label="Previous slide"
  >
    ‹
  </button>

  <button
    on:click={next}
    class="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 px-2 py-1 rounded-full shadow"
    aria-label="Next slide"
  >
    ›
  </button>

  <!-- Dots -->
  <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
    {#each images as _, index}
      <button
        on:click={() => current = index}
        aria-label={`Go to slide ${index + 1}`}
        class="w-3 h-3 rounded-full transition-all"
        class:bg-blue-600={current === index}
        class:bg-gray-300={current !== index}
      ></button>
    {/each}
  </div>
</div>
