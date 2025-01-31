<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-8">Admin Panel</h1>

    <div v-if="error" class="bg-red-100 text-red-600 p-4 rounded mb-4">
      {{ error }}
    </div>

    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">
        {{ isEditing ? "Edit Event" : "Add New Event" }}
      </h2>
      <AdminEventForm
        :event="currentEvent"
        :isEdit="isEditing"
        :isLoading="loading"
        @submit="handleSubmit"
        @cancel="cancelEdit"
      />
    </div>

    <div>
      <h2 class="text-2xl font-semibold mb-4">Manage Events</h2>
      <div v-if="loading && !isEditing" class="flex justify-center py-8">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"
        ></div>
      </div>

      <div v-else>
        <div v-if="!events?.length" class="text-center py-8 text-gray-500">
          No events found.
        </div>

        <div
          v-else
          v-for="event in events"
          :key="event._id"
          class="border rounded-lg p-4 mb-4 shadow-sm"
        >
          <div class="flex justify-between items-start gap-8">
            <div class="max-w-[420px]">
              <h3 class="text-xl font-semibold">{{ event.name }}</h3>
              <p class="text-gray-600 mt-2">{{ event.description }}</p>
              <div class="mt-2 text-sm text-gray-500">
                <p>{{ formatDate(event.date) }} at {{ event.time }}</p>
                <p class="font-semibold text-gray-700">${{ event.price }}</p>
              </div>
            </div>
            <div class="">
              <img
                :src="event.image"
                :alt="event.name"
                class="h-64 w-[512px] object-cover rounded flex-1"
              />
            </div>
          </div>

          <div class="mt-4 space-x-2">
            <button
              @click="startEdit(event)"
              class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              :disabled="loading"
            >
              Edit
            </button>
            <button
              @click="handleDelete(event._id)"
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              :disabled="loading"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useEvents } from "~/composables/useEvents";

const {
  events,
  loading,
  error,
  addEvent,
  editEvent,
  deleteEvent,
  fetchEvents,
} = useEvents();

const newEvent = ref({
  name: "",
  description: "",
  image: "",
  date: "",
  time: "",
  price: "",
});

const currentEvent = ref({ ...newEvent.value });
const isEditing = ref(false);

const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString();
};

const startEdit = (event) => {
  currentEvent.value = { ...event };
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
  currentEvent.value = { ...newEvent.value };
};

const handleSubmit = async (eventData) => {
  try {
    if (isEditing.value) {
      await editEvent({
        ...eventData,
        _id: currentEvent.value._id, // Make sure to include the _id
      });
    } else {
      await addEvent(eventData);
    }
    cancelEdit();
    await fetchEvents(); // Refresh the list after submit
  } catch (err) {
    console.error("Error submitting event:", err);
  }
};

const handleDelete = async (id) => {
  if (confirm("Are you sure you want to delete this event?")) {
    try {
      await deleteEvent(id);
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  }
};

// Fetch events when component is mounted
onMounted(() => {
  fetchEvents();
});
</script>
