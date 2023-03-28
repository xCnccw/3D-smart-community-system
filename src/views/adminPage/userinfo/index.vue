<template>
    <el-form :model="form">
        <el-form-item label="账号">
            <el-input v-model="form.id" />
        </el-form-item>
        <el-form-item label="用户名">
            <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.type" />
        </el-form-item>
    </el-form>
</template>

<script setup>
import { onMounted, reactive, ref, watchEffect, watch } from 'vue';
import * as userApi from '@/apis/user'

var res = ref()
const params = {}
const form = reactive({
    id: '',
    username: '',
    type: '',
})
</script>

<style lang="scss"></style>