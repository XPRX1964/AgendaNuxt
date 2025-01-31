<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-8">Event Agenda</h1>

    <div v-if="loading" class="flex justify-center items-center min-h-[200px]">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"
      ></div>
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-8">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-if="!sortedEvents?.length"
        class="col-span-full text-center py-8 text-gray-500"
      >
        No upcoming events.
      </div>
      <EventCard
        v-else
        v-for="event in sortedEvents"
        :key="event._id"
        :event="event"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import EventCard from "~/components/EventCard.vue";

const { events, loading, error, fetchEvents } = useEvents();

onMounted(async () => {
  if (events.value.length === 0) {
    await fetchEvents();
  }
});
// Sort events by date with null check
const sortedEvents = computed(() => {
  if (!events.value) return [];
  return [...events.value].sort((a, b) => new Date(a.date) - new Date(b.date));
});
</script>
