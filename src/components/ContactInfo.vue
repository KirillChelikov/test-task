<template>
  <div>
    <button @click="undoLastAction" v-if="userActionsLog.length">
      Undo last action
    </button>
    <button @click="fieldAdding = true">
      Add new field
    </button>
    <div v-if="fieldAdding">
      <input v-model="keyName"/>
      <input v-model="valueName"/>
      <button @click="addNewField">
        Confirm
      </button>
    </div>
    <contact-field v-for="field in fields" :field="field" :key="field.name" @editField="editField"
                   @deleteField="deleteField"/>
  </div>
</template>
<script>
import ContactField from './ContactField.vue';

export default {
  name: 'ContactInfoPage',
  components: {ContactField},
  data() {
    return {
      keyName: '',
      valueName: '',
      fieldAdding: false,
      fields: [],
      userActionsLog: [],
    }
  },
  methods: {
    editField(fieldToUpdate) {
      this.memorizeAction();
      const idx = this.fields.findIndex(field => field.id === fieldToUpdate.id);
      this.fields.splice(idx, 1, fieldToUpdate);
    },
    deleteField(fieldToDelete) {
      if (confirm('Are you sure you want to delete this field?')) {
        this.memorizeAction();
        const idx = this.fields.findIndex(field => field.id === fieldToDelete.id);
        this.fields.splice(idx, 1);
      }
    },
    memorizeAction() {
      const copy = JSON.parse(JSON.stringify(this.fields));
      this.userActionsLog.push(copy);
    },
    undoLastAction() {
      if (this.userActionsLog.length) {
        this.fields = this.userActionsLog.pop();
      }
    },
    addNewField() {
      this.memorizeAction();
      const lastId = this.fields.length ? this.fields[this.fields.length - 1].id + 1 : 1;
      this.fields.push({key: this.keyName, value: this.valueName, id: lastId});
      this.fieldAdding = false;
      this.keyName = '';
      this.valueName = '';
    }
  },
  mounted() {
    this.fields = [{key: 'name', value: 'John', id: 1}, {key: 'email', value: 'john@g.ru', id: 2}];
  }
}
</script>