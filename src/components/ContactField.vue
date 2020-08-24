<template>
  <div>
    <div v-if="isEditMode">
      <input v-model="newKey"/>
      <input v-model="newValue"/>
    </div>
    <p v-else>
      {{ field.key }}:{{ field.value }}
    </p>
    <button v-if="!isEditMode" @click="startEdit">
      Edit Field
    </button>
    <button v-if="isEditMode" @click="confirmEdition">
      Confirm
    </button>
    <button v-if="isEditMode" @click="cancelEdition">
      Cancel
    </button>
    <button @click="$emit('deleteField', field)">
      Delete
    </button>
  </div>
</template>
<script>
export default {
  name: 'ContactField',
  props: ['field'],
  data() {
    return {
      isEditMode: false,
      newKey: '',
      newValue: ''
    }
  },
  methods: {
    startEdit() {
      this.isEditMode = true;
      this.newKey = this.field.key;
      this.newValue = this.field.value;
    },
    confirmEdition() {
      this.$emit('editField', {key: this.newKey, value: this.newValue, id: this.field.id});
      this.isEditMode = false;
    },
    cancelEdition() {
      if (confirm('Are you sure you want to cancel?')) {
        this.isEditMode = false;
      }
    }
  }
}
</script>