<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
  >
    <img
      :src="event.image"
      :alt="event.name"
      class="w-full h-48 object-cover"
    />
    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">{{ event.name }}</h3>
      <p class="text-gray-600 mb-4 line-clamp-2">{{ event.description }}</p>
      <div class="flex justify-between items-center mt-4">
        <div>
          <p class="text-gray-500">{{ formatDate(event.date) }}</p>
          <p class="text-gray-500">{{ formatTime(event.time) }}</p>
        </div>
        <p class="text-lg font-bold text-blue-600">${{ event.price }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

const formatTime = (timeString) => {
  return new Date(`2000/01/01 ${timeString}`).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
