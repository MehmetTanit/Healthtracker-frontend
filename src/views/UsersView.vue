<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL
const endpoint = baseUrl + '/Users';

const users = ref<any[]>([]);

onMounted(async () => {
  try {
    const response = await axios.get(endpoint);
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
});
</script>


<template>
  <div id="users">
    <h1>Users</h1>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Email</th>
        <th>Date of Birth</th>
        <th>Gender</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.dateOfBirth }}</td>
        <td>{{ user.gender }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
#users {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
