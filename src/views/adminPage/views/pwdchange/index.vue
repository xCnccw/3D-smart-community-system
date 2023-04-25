<template>
    <el-form :model="form" label-position="top" class="pwdform" ref="formRef" status-icon :rules="rules">
        <el-form-item label="原密码" prop="oldpwd">
            <el-input v-model="form.oldpwd" type="password" />
        </el-form-item>
        <el-form-item label="新密码" prop="newpwd">
            <el-input v-model="form.newpwd" type="password" />
        </el-form-item>
        <el-form-item label="确定新密码" prop="confirmpwd">
            <el-input v-model="form.confirmpwd" type="password" />
        </el-form-item>
    </el-form>
    <el-button class="submitbtn" type="primary" @click="submitForm(formRef)">提交</el-button>
</template>

<script setup>
import { onMounted, reactive, ref, watchEffect, watch } from 'vue';
import * as userApi from '@/apis/user';
import { showElLoading, promiseToArr } from '@/utils/common.js';
import { ElMessage } from 'element-plus'

// var res = ref()
const params = {}
const form = reactive({
    oldpwd: '',
    newpwd: '',
    confirmpwd: '',
})

const rules = {
    oldpwd: [
        {
            required: true,
            message: '请输入原密码',
            trigger: 'blur'
        }
    ],
    newpwd: [
        {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
        }
    ],
    confirmpwd: [
        {
            required: true,
            validator(rule, value) {
                if (!value) {
                    return new Error('请确认新密码')
                } else if (form.newpwd != form.confirmpwd) {
                    return new Error('两次密码不相同')
                }
                return true
            },
            trigger: ['change', 'blur']
        }
    ]
}

const formRef = ref();
const submitForm = (formRef) => {
    formRef.validate((valid) => {
        if (valid) {
            params.oldpwd = form.oldpwd
            params.newpwd = form.newpwd
            promiseToArr(userApi.updatePwd(params)).then((res) => {
                if (res[0].message) {
                    ElMessage({
                        message: '修改成功',
                        type: 'success',
                    })
                } else {
                    ElMessage({
                        message: '修改失败，原密码不正确',
                        type: 'error',
                    })
                }
            })
        } else {
            console.log('error submit!')
            return false
        }
    })
}
</script>

<style lang="scss">
.pwdform {
    margin-left: 2vw;
    margin-top: 5vh;

    .el-input__wrapper {
        max-width: 30vw;
    }
}

.submitbtn {
    margin-left: 2vw;
    margin-top: 2vh;
}
</style>