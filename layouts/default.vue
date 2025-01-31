<template>
  <div>
    <nav class="bg-gray-900 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-white text-2xl font-bold"
          >Event Organizer</NuxtLink
        >
        <div class="space-x-4">
          <NuxtLink to="/agenda" class="text-white hover:underline"
            >Agenda</NuxtLink
          >
          <NuxtLink to="/admin" class="text-white hover:underline"
            >Admin</NuxtLink
          >
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>
