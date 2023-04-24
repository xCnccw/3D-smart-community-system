<template>
    <div class="TagsContainer">
        <div class="TagsList" v-for="item in tagsList" :key="item.path">
            <el-tag v-if="item.name == '首页'" :color="item.path == route.path ? active : inactive">
                <router-link :to="item.path">{{ item.name }}</router-link>
            </el-tag>
            <el-tag v-else closable @close="handleClose(item.path)" :color="item.path == route.path ? active : inactive">
                <router-link :to="item.path">{{ item.name }}</router-link>
            </el-tag>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, watchEffect, computed } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex";

const store = useStore()
const router = useRouter()
const route = useRoute()
const breadList = ref([])
const tagsList = reactive([{ path: "/mainPage", name: "首页" }])
const tag = ref()
const active = ref("#ffd04b")
const inactive = ref("#fff")
//获取删除掉的tag
const closeTag = ref({})
const adminstyle = computed(() => {
    return store.state.adminstyle
})

const handlestyle = () => {
    if (adminstyle.value) {
        active.value = "#ffd04b"
        inactive.value = "#fff"
    } else {
        active.value = "#FFE9A4"
        inactive.value = "#fff"
    }
}

const createList = () => {
    //获取当前路由路径
    breadList.value = router.currentRoute.value.matched
    //只取最后一个值
    tag.value = breadList.value[breadList.value.length - 1]
    //过滤掉后台管理系统标签
    // tag.value = tag.value.filter(item => item.path != '/adminMain')
    if (!tagsList.includes(tag.value) && tag.value != closeTag.value && tag.value.path != '/adminMain') {
        tagsList.push(tag.value)
    }
    closeTag.value = ''
}

watchEffect(() => {
    createList()
    handlestyle()
})

const handleClose = (path) => {
    closeTag.value = tagsList.find(t => t.path == path)
    const index = tagsList.findIndex((t) => t.path == path);
    if (index !== -1) {
        //判断是最后一个
        if (index == tagsList.length - 1 && path == route.path) {
            // 如果当前页面是tagsList中的最后一个tag所对应的路由页面
            tagsList.splice(index, 1);
            router.push(tagsList[tagsList.length - 1].path);
        } else {
            // 如果当前页面不是tagsList中的最后一个tag所对应的路由页面
            tagsList.splice(index, 1);
        }
    }
};
</script>

<style lang="scss">
.TagsContainer {
    display: flex;
    align-items: center;
    background-color: #fff;
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
    border-top: solid 1px #545c64;

    .TagsList {
        margin-left: 10px;

        .el-tag {
            border-color: #fdd974;
            margin-right: 5px;

            a {
                text-decoration: none;
                color: rgb(0, 0, 0);
            }
        }
    }
}
</style>