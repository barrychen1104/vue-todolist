<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#todolist"
            ><span>{{ user.nickname }}的代辦</span></a
          >
        </li>
        <li><a href="" @click.prevent="signOut">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" placeholder="請輸入待辦事項" v-model="addTodoField" />
          <a href="#" @click.prevent="addTodo">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li>
              <a href="#" :class="{ active: filter === 'all' }" @click.prevent="setFilter('all')"
                >全部</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ active: filter === 'active' }"
                @click.prevent="setFilter('active')"
                >待完成</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ active: filter === 'completed' }"
                @click.prevent="setFilter('completed')"
                >已完成</a
              >
            </li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="item in filteredTodos" :key="item.id">
                <label class="todoList_label">
                  <input
                    class="todoList_input"
                    type="checkbox"
                    v-model="item.status"
                    @change="toggleStatus(item.id)"
                  />
                  <span>{{ item.content }}</span>
                </label>
                <a href="#" @click.prevent="deleteTodo(item.id)">
                  <i class="fa fa-times"></i>
                </a>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p>{{ completedCount }}個已完成項目</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const token = ref('')
const apiUrl = 'https://todolist-api.hexschool.io'
const user = ref({
  nickname: '',
  uid: ''
})
const todos = ref([])
const addTodoField = ref('')
const filter = ref('all')

const completedCount = computed(() => {
  return todos.value.filter((todo) => todo.status).length
})

const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'all':
      return todos.value
    case 'active':
      return todos.value.filter((todo) => !todo.status)
    case 'completed':
      return todos.value.filter((todo) => todo.status)
    default:
      return []
  }
})

const setFilter = (newFilter) => {
  filter.value = newFilter
}

const getTodos = async () => {
  try {
    const res = await axios.get(`${apiUrl}/todos/`, {
      headers: {
        authorization: token.value
      }
    })
    todos.value = res.data.data
  } catch (err) {
    console.log('err', err)
  }
}

const addTodo = async () => {
  try {
    await axios.post(
      `${apiUrl}/todos/`,
      {
        content: addTodoField.value
      },
      {
        headers: {
          authorization: token.value
        }
      }
    )
    addTodoField.value = ''
    await getTodos()
  } catch (err) {
    console.log('err', err)
  }
}

const signOut = async () => {
  try {
    await axios.post(`${apiUrl}/users/sign_out`, null, {
      headers: {
        authorization: token.value
      }
    })
    document.cookie = 'customTodoToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    router.push('/')
  } catch (err) {
    console.log('err', err)
  }
}

const toggleStatus = async (id) => {
  try {
    await axios.patch(`${apiUrl}/todos/${id}/toggle`, null, {
      headers: {
        authorization: token.value
      }
    })
    await getTodos()
  } catch (err) {
    console.log('err', err)
  }
}

const deleteTodo = async (id) => {
  try {
    await axios.delete(`${apiUrl}/todos/${id}`, {
      headers: {
        authorization: token.value
      }
    })
    await getTodos()
  } catch (err) {
    console.log('err', err)
  }
}

onMounted(async () => {
  token.value = document.cookie.replace(
    /(?:(?:^|.*;\s*)customTodoToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
  console.log('token', token.value)
  if (!token.value) {
    alert('沒有token')
    router.push('/')
  }
  try {
    const res = await axios.get(`${apiUrl}/users/checkout`, {
      headers: {
        authorization: token.value
      }
    })
    user.value = res.data
    await getTodos()
  } catch (err) {
    console.log('err', err)

    alert('請重新登入')
    router.push('/')
  }
})
</script>
