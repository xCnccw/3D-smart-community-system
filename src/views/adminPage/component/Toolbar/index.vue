<template>
    <div class="toolbar">
        <div class="renovate">
            <a href="#" @click="renovate()"><el-cion :size="20">
                    <RefreshRight />
                </el-cion></a>
        </div>
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path" :to="{ path: item.path }" class="item">
                {{ item.name }}
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="menuColor">
            <el-popover placement="top-start" width="30px" trigger="hover" content="风格切换">
                <template #reference>
                    <el-switch v-model="menuColor" @change="handleMenuColor()"
                        style="--el-switch-on-color: #545c64; --el-switch-off-color: #005B18" />
                </template>
            </el-popover>
        </div>
        <div class="setting">
            <el-dropdown trigger="click">
                <img class="avatar-image" src="@/assets/avatar-image.jpg" alt="your-avatar">
                <template #dropdown>
                    <el-dropdown-menu v-for="item in dropdownmenu">
                        <el-dropdown-item @click="router.replace(item.path)">{{ item.name }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { RefreshRight, Setting } from '@element-plus/icons-vue';

const menuColor = ref(true)
const store = useStore()
const router = useRouter();
const breadList = ref([])
const dropdownmenu = reactive([
    {
        name: '修改密码',
        path: '/pwdchange'
    },
    {
        name: '退出登录',
        path: '/'
    }
])

const emit = defineEmits()

const showmenu = () => {
    console.log(dropdownmenu.value);
}
const handleMenuColor = () => {
    store.commit('adminstyle')
}

watchEffect(
    () => {
        breadList.value = router.currentRoute.value.matched
    },
)

const renovate = () => {
    location.reload()
}
</script>

<style lang="scss">
.toolbar {
    display: flex;
    height: 56px;
    align-items: center;
    background-color: #fff;
    // margin-bottom: 10px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
    padding-left: 2vw;

    a {
        color: #545c64;
    }

    .renovate {
        width: 20px;
        height: 20px;
    }

    .menuColor {
        margin-left: 60vw;
    }

    .setting {
        // position: relative;
        // right: 1vw;
        margin-left: 5vw;

        .avatar-image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

    .setting :hover {
        cursor: pointer;
    }

    .breadcrumb {
        margin-left: 1vw;

        .el-breadcrumb__inner {
            color: #8e9397;
            font-weight: 400;
            pointer-events: none;
        }

        .el-breadcrumb__item:last-child .el-breadcrumb__inner {
            font-weight: 700;
            color: #545c64;
        }
    }



}
</style>