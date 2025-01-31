<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div v-if="formError" class="bg-red-100 text-red-600 p-3 rounded mb-4">
      {{ formError }}
    </div>
    <input
      v-model="formData.name"
      placeholder="Event Name"
      class="w-full p-2 border rounded"
      required
    />
    <textarea
      v-model="formData.description"
      placeholder="Description"
      class="w-full p-2 border rounded h-32"
      required
    ></textarea>
    <input
      v-model="formData.image"
      placeholder="Image URL"
      class="w-full p-2 border rounded"
      required
    />
    <input
      v-model="formData.date"
      type="date"
      class="w-full p-2 border rounded"
      required
    />
    <input
      v-model="formData.time"
      type="time"
      class="w-full p-2 border rounded"
      required
    />
    <input
      v-model="formData.price"
      placeholder="Price"
      class="w-full p-2 border rounded"
      required
    />
    <div class="flex gap-4">
      <button
        type="submit"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        :disabled="isLoading"
      >
        {{ isEdit ? "Update Event" : "Add Event" }}
      </button>
      <button
        v-if="isEdit"
        type="button"
        @click="$emit('cancel')"
        class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit", "cancel"]);
const formData = ref({ ...props.event });
const formError = ref(null);

watch(
  () => props.event,
  (newEvent) => {
    formData.value = { ...newEvent };
  },
  { deep: true }
);

const handleSubmit = () => {
  formError.value = null;
  if (!formData.value.name || !formData.value.description) {
    formError.value = "Please fill in all required fields";
    return;
  }
  emit("submit", { ...formData.value });
};
</script>
