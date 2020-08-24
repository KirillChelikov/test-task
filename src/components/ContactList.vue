<template>
  <div>
    <button @click="contactAdding = true">
      Add contact
    </button>
    <input v-model="newFullName" v-if="contactAdding">
    <button @click="addContact" v-if="contactAdding">
      Confirm
    </button>
    <div v-for="contact in contacts" :key="contact.id">
      <span @click="goToInfo(contact.id)"> {{ contact.fullname }} </span>
      <button @click="deleteContact(contact.id)"> Delete</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContactList',
  data() {
    return {
      contacts: [],
      newFullName: '',
      contactAdding: false,
    }
  },
  methods: {
    goToInfo(id) {
      this.$router.push(`contact/${id}`);
    },
    addContact() {
      const lastId = this.contacts.length ? this.contacts[this.contacts.length - 1].id + 1 : 1;
      this.contacts.push({fullname: this.newFullName, id: lastId});
      this.contactAdding = false;
      this.newFullName = '';
    },
    deleteContact(id) {
      if (confirm('Are you sure you want to delete contact?')) {
        const idx = this.contacts.findIndex(field => field.id === id);
        this.contacts.splice(idx, 1);
      }
    }

  },
  mounted() {
    this.contacts = [{id: 1, fullname: 'John Smith'}, {id: 2, fullname: 'John 2Smith'}, {id: 3, fullname: 'John 3Smith'},];
  }
}
</script>