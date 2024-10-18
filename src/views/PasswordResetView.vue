<template>
  <div id="passwordResetPage" class="bg-yellow">
    <div class="conatiner passwordResetPage vhContainer">
      <div class="side">
        <a href="#">
          <img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
          />
        </a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" @submit.prevent="resetPassword">
          <h2 class="formControls_txt">重設密碼</h2>
          <label class="formControls_label" for="newPassword">新密碼</label>
          <input
            class="formControls_input"
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="請輸入新密碼"
            required
            v-model="newPassword"
          />
          <label class="formControls_label" for="confirmPassword">確認新密碼</label>
          <input
            class="formControls_input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="請再次輸入新密碼"
            required
            v-model="confirmPassword"
          />
          <span>{{ errorMsg }}</span>
          <input class="formControls_btnSubmit" type="submit" value="重設密碼" />
          <router-link class="formControls_btnLink" to="/">返回登入</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const newPassword = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')

const resetPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    errorMsg.value = '密碼不一致'
    return
  }

  try {
    const token = route.query.token
    const res = await axios.post('https://todolist-api.hexschool.io/users/reset_password', {
      password: newPassword.value,
      token: token
    })
    if (res.data.status) {
      alert('密碼重設成功')
      router.push('/')
    }
  } catch (error) {
    errorMsg.value = '重設失敗，請重試'
  }
}

onMounted(() => {
  const token = route.query.token
  if (!token) {
    alert('無效的重設密碼連結')
    router.push('/')
  }
})
</script>
