import { ref } from "vue";

export const useEvents = () => {
  const events = useState("events", () => []);
  const loading = ref(false);
  const error = ref(null);

  // Use $fetch instead of useFetch for post-mount data fetching
  const fetchEvents = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch("/api/events");
      events.value = data || [];
      return data;
    } catch (err) {
      error.value = err.message || "Failed to fetch events";
      events.value = [];
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const addEvent = async (event) => {
    loading.value = true;
    error.value = null;
    try {
      const { data, error: fetchError } = await useFetch("/api/events", {
        method: "POST",
        body: event,
      });

      if (fetchError.value) throw fetchError.value;
      if (data.value) {
        events.value = [data.value, ...events.value];
      }
      return data.value;
    } catch (err) {
      error.value = err.message || "Failed to add event";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const editEvent = async (updatedEvent) => {
    loading.value = true;
    error.value = null;
    try {
      const { data, error: fetchError } = await useFetch(
        `/api/events/${updatedEvent._id}`,
        {
          method: "PUT",
          body: updatedEvent,
        }
      );

      if (fetchError.value) throw fetchError.value;

      if (data.value) {
        const index = events.value.findIndex((e) => e._id === updatedEvent._id);
        if (index !== -1) {
          events.value = [
            ...events.value.slice(0, index),
            data.value,
            ...events.value.slice(index + 1),
          ];
        }
      }
      return data.value;
    } catch (err) {
      error.value = err.message || "Failed to update event";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteEvent = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const { error: fetchError } = await useFetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      if (fetchError.value) throw fetchError.value;
      events.value = events.value.filter((event) => event._id !== id);
    } catch (err) {
      error.value = err.message || "Failed to delete event";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Ensure events are fetched on initial load
  onMounted(fetchEvents);

  return {
    events,
    loading,
    error,
    fetchEvents,
    addEvent,
    editEvent,
    deleteEvent,
  };
};
