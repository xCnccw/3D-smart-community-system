<template>
    <el-menu active-text-color="#ffd04b" background-color="#001428" class="left-menu" text-color="#fff" router>
        <component v-for="title in MenuList" :key="title.index" :is="title.children ? 'el-sub-menu' : 'el-menu-item'"
            :index="title.index">
            <template #title>
                <el-icon :size="20">
                    <component :is="title.icon"></component>
                </el-icon>
                {{ title.menutitle }}
            </template>
            <template v-if="title.children">
                <el-menu-item v-for="item in title.children" :key="item.index" :index="item.index">
                    <el-icon :size="20">
                        <component :is="title.icon"></component>
                    </el-icon>
                    {{ item.itemname }}
                </el-menu-item>
            </template>
        </component>
    </el-menu>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { House, Avatar, HomeFilled, Files, DataLine } from '@element-plus/icons-vue';


const MenuList = ref([])

MenuList.value = [
    {
        menutitle: '首页',
        index: '/',
        icon: HomeFilled,
    },
    {
        menutitle: '用户管理',
        index: '/user',
        icon: Files,
        children: [
            {
                itemname: "用户列表",
                index: '/userlist',
                icon: Files,
            },
        ]
    },
    {
        menutitle: '城市管理',
        index: '/city',
        icon: Avatar,
        children: [
            {
                itemname: "车辆管理",
                index: '/carlist',
                icon: Avatar,
            }
        ]
    },
    {
        menutitle: '图表管理',
        index: '/chart',
        icon: DataLine,
        children: [
            {
                itemname: "饼图",
                index: '/pie',
                icon: DataLine,
            }
        ]
    }
]
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

.left-menu {
    //让Menu占满整个高度
    height: 100vh;
}
</style>