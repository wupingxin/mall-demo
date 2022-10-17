<template>
  <div class="login">
    <div class="form-cls">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="70px"
        >
          <h2>后台管理系统</h2>
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="密码:" prop="password">
            <el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
          </el-form-item>

          <el-form-item>
            <!-- 朴素按钮（plain）、圆角按钮（round）、圆形按钮（circle）
            type 属性指定 primary、success、info、warning、danger、text -->
            <el-button class="login-btn" type="primary" plain @click="submitForm(ruleFormRef)">登录</el-button>
            <el-button class="login-btn" @click="resetForm()">重置</el-button>
          </el-form-item>

        </el-form>

      </div>
  </div>
</template>

<script lang="ts">
import { LoginData } from "@/type/login";
import { FormInstance } from "element-plus";
import {defineComponent, reactive, ref, toRefs} from "vue";
import {login} from "@/request/api";
import {useRouter} from "vue-router";

export default defineComponent({
  setup () {

    const data = reactive(new LoginData())

    const router = useRouter()  //-->$router  useRouter方法可以得到当前router实例，返回的是router对象

    // 表单输入规则
    const rules = {
      username: [
        {
          required: true,  //是否必须字段
          message: "请输入用户名",   // 触发的提示信息
          trigger: "blur"   // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
        },
        {
          min: 3,   // 最小字符书
          max: 5,   // 最大字符数
          message: "用户名长度需要在3-5个字符之间",  // 触发的提示信息
          trigger: "blur"
        }
      ],
      password: [
        {
          required: true,  //是否必须字段
          message: "请输入密码",   // 触发的提示信息
          trigger: "blur"   // 触发时机: 当失去焦点时（光标不显示的时候），触发此提示
        },
        {
          min: 3,   // 最小字符书
          max: 6,   // 最大字符数
          message: "密码长度需要在3-5个字符之间",  // 触发的提示信息
          trigger: "blur"
        }
      ]
    }

    // 登录
    const ruleFormRef = ref<FormInstance>()

    // 重置
    const resetForm = () => {
      data.ruleForm.username = ""
      data.ruleForm.password = ""
    }
    // 登录
    const submitForm = (formEl: FormInstance | undefined) => {  //ts 类型设声明   入参formEI
      // 对表单内容进行验证 validate
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          // 验证通过，调用data
          login(data.ruleForm).then((res) => {
            console.log(res)  //输出res，确认拿到token
            // 将token保存保存到localStorage
            localStorage.setItem("token", res.data.token)
            // 跳转页面
            router.push('/')
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    return {
      ...toRefs(data),
      rules,
      resetForm,
      submitForm,
      ruleFormRef
    }
  }
 })
</script>
 
<style scoped>

  .login{
    width: 100%;
    /* 百分百占满屏幕 */
    height: 100vh;
    background-image: url("../assets/bg.jpg");
  }

  .form-cls{
    padding: 50px;
    width: 400px;
    margin: 0 auto;
    background-color: white;
    position: relative;
    top:300px;
    border-radius: 10px;
  }

  .login-btn{
    width: 48%;
  }

  h2{
    text-align: center;
    margin-bottom: 20px;
  }
</style>