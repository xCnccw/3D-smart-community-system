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
        <div class="setting">
            <a href="#" @click="alert('选项')"><el-cion :size="20">
                    <Setting />
                </el-cion></a>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { RefreshRight, Setting } from '@element-plus/icons-vue';

const router = useRouter();
const breadList = ref([])

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
    height: 7vh;
    align-items: center;
    background-color: #fff;
    margin-bottom: 1vh;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
    padding-left: 2vw;

    a {
        color: #545c64;
    }

    .renovate {
        width: 20px;
        height: 20px;
    }

    .setting {
        width: 20px;
        height: 20px;
        color: #545c64;
        margin-left: 68vw;
    }

    .breadcrumb {
        margin-left: 1vw;

        .el-breadcrumb__inner {
            color: #8e9397;
            font-weight: 400;
        }

        .el-breadcrumb__inner:hover {
            color: #FFD04B;
            transition: 0.3s;
        }

        // color: #767C82;
        .el-breadcrumb__item:last-child .el-breadcrumb__inner {
            font-weight: 700;
            color: #545c64;
        }
    }


}
</style>