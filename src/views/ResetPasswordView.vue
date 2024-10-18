<template>
  <div id="resetPasswordPage" class="bg-yellow">
    <div class="conatiner resetPasswordPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" @submit.prevent="sendResetLink">
          <h2 class="formControls_txt">重設密碼</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="email"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
            v-model="email"
          />
          <span>{{ errorMsg }}</span>
          <input class="formControls_btnSubmit" type="submit" value="送出" />
          <router-link class="formControls_btnLink" to="/">返回登入</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const errorMsg = ref('')

const sendResetLink = async () => {
  try {
    const res = await axios.post('https://todolist-api.hexschool.io/users/forgot_password', {
      email: email.value
    })
    if (res.data.status) {
      alert('重設密碼連結已發送至您的信箱')
    }
  } catch (error) {
    errorMsg.value = '發送失敗，請確認您的 email 是否正確'
  }
}
</script>
