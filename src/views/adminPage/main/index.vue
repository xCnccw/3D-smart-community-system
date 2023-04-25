<template>
    <el-row>
        <el-col :span="3">
            <Menu :menuColor="menuColor" />
        </el-col>
        <el-col :span="21" class="container">
            <Setting />
            <Toolbar @handleMenuColor="handleMenuColor" />
            <Tags />
            <router-view />
        </el-col>
    </el-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Menu from '@/views/adminPage//component/Menu/index.vue'
import Toolbar from '@/views/adminPage/component/Toolbar/index.vue'
import Tags from '@/views/adminPage/component/Tags/index.vue'
import Setting from '@/views/adminPage/component/Setting/index.vue'
import { useRouter } from "vue-router";

const menuColor = ref()
const handleMenuColor = (val) => {
    menuColor.value = val
}

const router = useRouter()

onMounted(() => {
    router.push('/userlist')
})
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
