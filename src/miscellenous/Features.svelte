<script>
    const cards = [
      {
        title: 'Courses',
        subtitle: 'Gain Practical Experience',
        bg: 'bg-green-200',
        icon: '📚',
      },
      {
        title: 'Mentorships',
        subtitle: 'Guidance From Top Instructors',
        bg: 'bg-orange-200',
        icon: '👨‍🏫',
      },
      {
        title: 'Live Classes',
        subtitle: 'Learn By Interacting',
        bg: 'bg-blue-200',
        icon: '💼',
      },
      {
        title: 'Practice',
        subtitle: 'Refine Skills Daily',
        bg: 'bg-purple-200',
        icon: '⌨️',
      },
      {
        title: 'Assignments',
        subtitle: 'Battle For Excellence',
        bg: 'bg-yellow-200',
        icon: '🏆',
      },
      {
        title: 'More',
        subtitle: '',
        bg: 'bg-pink-200',
        icon: '➕',
      },
    ];
  </script>
  
  <div class="bg-white min-h-screen px-6 py-12">
    <!-- Heading Section -->
    <div class="max-w-6xl mx-auto mb-12">
      <h1 class="text-4xl font-bold text-gray-900">
        <span class="text-blue-700">Unlock</span> Your Career
      </h1>
      <p class="text-gray-600 mt-4 text-lg max-w-xl">
        Explore opportunities from across the globe to grow, showcase skills, gain CV points & get hired by your dream company.
      </p>
  
      <!-- Badge -->
      <div class="inline-flex items-center bg-indigo-100 px-4 py-2 rounded-full mt-6 shadow-sm">
        <span class="text-xl mr-2">💎</span>
        <span class="text-sm font-semibold text-indigo-800">Get 1000 CV points on your first assignment</span>
      </div>
    </div>
  
    <!-- Cards Grid -->
    <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
      {#each cards as card}
        <div class={`rounded-2xl p-6 flex items-center justify-between shadow-md ${card.bg}`}>
          <div>
            <h3 class="text-xl font-semibold text-gray-900">{card.title}</h3>
            {#if card.subtitle}
              <p class="text-sm text-gray-700 mt-1">{card.subtitle}</p>
            {/if}
          </div>
          <div class="text-4xl">{card.icon}</div>
        </div>
      {/each}
    </div>
  </div>
  