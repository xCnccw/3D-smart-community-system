<template>
    <el-menu :default-active="activePath" @select="handleSelect" :active-text-color="activeTextColor"
        :background-color="backgroundColor" class="left-menu" :text-color="textColor" :collapse="isCollapse" router>
        <component v-for="title in MenuList" :key="title.index" :is="title.children ? 'el-sub-menu' : 'el-menu-item'"
            :class="title.children ? '' : 'home'"
            :style="adminstyle ? 'background-color: #ffbb00' : 'background-color:#FFE9A4'" :index="title.index">
            <template #title>
                <el-icon :size="20">
                    <component :is="title.icon"></component>
                </el-icon>
                {{ title.menutitle }}
                <!-- <button @click="">显示当前页路由</button> -->
            </template>
            <template v-if="title.children">
                <el-menu-item v-for="item in title.children" :key="item.index" :index="item.index">
                    <el-icon :size="20">
                        <!-- <component :is="title.icon"></component> -->
                    </el-icon>
                    {{ item.itemname }}
                </el-menu-item>
            </template>
        </component>
    </el-menu>
</template>

<script setup>
import { ref, onMounted, watch, watchEffect, toRefs, computed } from "vue";
import { HomeFilled, DataLine, User, OfficeBuilding } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router'
import { useStore } from "vuex";

const route = useRoute()
const router = useRouter()
const store = useStore()
const backgroundColor = ref("#545c64")
const textColor = ref("#fff")
const activeTextColor = ref("#ffd04b")
const isCollapse = ref(false)
const MenuList = ref([])
//刷新时根据route.path激活对应menu

const activePath = ref(route.path)

const adminstyle = computed(() => {
    return store.state.adminstyle
})

//监视route.path，及时更改并激活对应menu
watch(() => route.path, (newVal, oldVal) => {
    activePath.value = newVal
})

watch(() => adminstyle.value, (newVal, oldVal) => {
    if (newVal) {
        backgroundColor.value = "#545c64"
        textColor.value = "#fff"
        activeTextColor.value = "#ffd04b"
    } else {
        backgroundColor.value = "#FFFCDE"
        textColor.value = "#005B18"
        activeTextColor.value = "#6A5401"
    }
})



MenuList.value = [
    {
        menutitle: '首页',
        index: '/',
        icon: HomeFilled,
    },
    {
        menutitle: '用户管理',
        index: '/user',
        icon: User,
        children: [
            {
                itemname: "用户列表",
                index: '/userlist',
                // icon: User,
            },
        ]
    },
    {
        menutitle: '城市管理',
        index: '/city',
        icon: OfficeBuilding,
        children: [
            {
                itemname: "车辆列表",
                index: '/carlist',
                // icon: Avatar,
            },
            {
                itemname: "建筑列表",
                index: '/buildingslist',
                // icon: Avatar,
            }
        ]
    },
    {
        menutitle: '图表管理',
        index: '/chart',
        icon: DataLine,
        children: [
            {
                itemname: "雷达图表",
                index: '/pie',
                // icon: DataLine,
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

.home {
    font-size: larger;
    pointer-events: none;
    // text-align: center;
    // background-color: #ffbb00;
}
</style>
