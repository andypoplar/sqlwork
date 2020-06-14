<template>
  <div class="register">
    <div class="header">My Sun</div>
    <div class="container">
      <div class="register-text">注册账号</div>
      <div class="content">
        <div class="content-form">
          <div class="username">
            <el-input v-model.trim="userForm.name" placeholder="姓名" @input="checkUsername" />
          </div>

          <div class="username">
            <el-input v-model.trim="userForm.sex" placeholder="性别" />
          </div>

          <div class="username">
            <el-input v-model.trim="userForm.age" placeholder="年龄" />
          </div>

          <div class="username">
            <el-input v-model.trim="userForm.introduce" placeholder="个性签名" />
          </div>

          <div class="email">
            <el-input v-model.trim="userForm.phone" placeholder="手机号" />
          </div>

          <div class="password">
            <el-input
              v-model.trim="userForm.password"
              placeholder="密码"
              type="password"
              @input="checkPassword"
            />
          </div>
          <span v-if="passValue" class="notice">密码请设置在6位以上</span>
          <div class="code">
            <el-button type="primary" class="registerbtn" @click="register">注册</el-button>
          </div>
          <div class="loginbtn">
            <el-button type="info" size="small" @click="login">注册成功，马上登录</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">Copyright © 2020 Lifed. All Rights Reserved. My Sun 版权所有</div>
  </div>
</template>

<script>
import { validPassword } from '@/utils/validate'
import { notice } from '@/utils/notice'
import { register } from '@/api/user'
export default {
  name: 'Register',
  data() {
    return {
      userForm: {
        name: '',
        password: '',
        sex: '',
        age: '',
        introduce: '',
        phone: ''
      },
      userValue: false,
      passValue: false
    }
  },
  computed: {
    userInfo() {
      return (
        !this.userValue &&
        !this.passValue &&
        this.userForm.phone &&
        this.userForm.sex
      )
    }
  },
  methods: {
    checkUsername() {
      if (this.userForm.name.trim().length >= 2) {
        this.userValue = false
      } else {
        this.userValue = true
      }
    },

    checkPassword() {
      if (!validPassword(this.userForm.password)) {
        this.passValue = true
        if (this.userForm.password === '') {
          this.passValue = false
        }
      } else {
        this.passValue = false
      }
    },

    register() {
      if (this.userInfo) {
        register(this.userForm).then(response => {
          if (response.success) {
            notice(this, '成功', '注册成功', 'success')
            this.clearData()
          }
        })
      } else {
        notice(this, '失败', '请按要求填写信息', 'warning')
      }
    },

    clearData() {
      for (const item in this.userForm) {
        this.userForm[item] = ''
      }
    },

    login() {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.register .header {
  height: 70px;
  line-height: 70px;
  border-bottom: 1px solid lightgray;
  font-size: 25px;
  font-weight: 600;
  padding: 0 20px;
}

.register .container {
  width: 100%;
  background: #f5f6f7;
  padding: 30px 0;
}

.register .container .register-text {
  padding: 10px 0 30px;
  text-align: center;
  font-size: 28px;
}

.register .container .content {
  min-width: 200px;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  padding: 40px 20px;
}

.register .content .content-form {
  width: 410px;
  margin: 0 auto;
}

.register .container .content .el-input__inner {
  width: 400px;
  height: 42px;
}

.register .container .content .notice {
  color: red;
  font-size: 12px;
  margin-left: 10px;
}

.register .content div {
  margin: 5px;
}

.register .registerbtn {
  padding: 10px 0 0 5px;
}

.register .footer {
  padding: 50px 0;
  text-align: center;
  background: #f4f4f5;
  font-size: 14px;
  color: gray;
}

.register .emailcode,
.register .code {
  display: flex;
  width: 405px;
}

.register .emailcode .el-input{
  width: 200px;
  margin-right: 18px;
}

.register .emailcode .el-input__inner,
.register .code .el-input__inner {
  width: 205px !important;
}

.register .registerbtn {
  padding: 0px 77px;
  height: 42px;
  width: 100%;
  margin: 5px 0 0 5px;
}

.loginbtn {
  width: 405px;
}

.loginbtn .el-button {
  width: 400px;
  margin-left: 5px;
  margin-top: 5px;
  height: 42px;
  font-size: 14px;
}
</style>
