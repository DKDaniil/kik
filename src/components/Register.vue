<template>
  <div>
    <h1>Регистрация</h1>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Имя пользователя" required />
      <input v-model="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Зарегистрироваться</button>
    </form>

    <button @click="getUsers">Получить всех пользователей</button>
    
    <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">
      {{ message }}
    </p>

    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.username }} ({{ user.email }})
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      users: [],
      message: '',
      isSuccess: false,
    };
  },
  methods: {
    async register() {
    try {
        const response = await axios.post('http://localhost:5002/api/register', {
            username: this.username,
            email: this.email,
            password: this.password,
        });
        console.log('Response Status:', response.status);
        console.log('User registered:', response.data);
        this.message = 'Registration successful!';
        this.isSuccess = true;
    } catch (error) {
        console.error('Registration error:', error);
        this.message = (error.response && error.response.data && error.response.data.message) || 'Ошибка регистрации';

        this.isSuccess = false;
    }
},

    async getUsers() {
      try {
        const response = await axios.get('http://localhost:5002/api/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    },
    clearForm() {
      this.username = '';
      this.email = '';
      this.password = '';
    },
  },
};
</script>

<style>
.success {
  color: green;
}
.error {
  color: red;
}
</style>
