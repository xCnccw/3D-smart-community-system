<template>
    <div class="Setting">
        <div class="menuColor">
            <el-popover placement="top-start" width="30px" trigger="hover" content="风格切换">
                <template #reference>
                    <el-switch v-model="menuColor" @change="handleMenuColor()"
                        style="--el-switch-on-color: #545c64; --el-switch-off-color: #005B18" />
                </template>
            </el-popover>
        </div>
        <div class="image">
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
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore()
const router = useRouter();
const menuColor = ref(true)

const handleMenuColor = () => {
    store.commit('adminstyle')
}

const dropdownmenu = reactive([
    {
        name: '修改密码',
        path: '/pwdchange'
    },
    {
        name: '智能对话',
        path: '/openai'
    },
    {
        name: '退出登录',
        path: '/'
    },
])
</script>

<style lang="scss">
.Setting {

    .menuColor {
        position: fixed;
        z-index: 1;
        right: 170px;
        top: 13px;
    }

    .image {
        position: fixed;
        z-index: 1;
        top: 9px;
        right: 50px;

        .avatar-image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
}
</style>