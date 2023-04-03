<template>
    <el-row>
        <el-col :span="3">
            <Menu />
        </el-col>
        <el-col :span="21" class="container">
            <Toolbar />
            <!-- <el-imga src="@/assets/background.jpg"></el-imga> -->
            <!-- <img src="@/assets/background.jpg"> -->
            <router-view />
        </el-col>
    </el-row>
</template>

<script setup>
import Menu from '@/views/adminPage//component/Menu/index.vue'
import Toolbar from '@/views/adminPage/component/Toolbar/index.vue'
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

html {
    background-color: #f5f7f9;
}
</style>