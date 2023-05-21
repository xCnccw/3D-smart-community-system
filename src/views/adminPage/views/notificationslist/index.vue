<template>
    <Drawer :isShow="isShow" :Editform="Editform" @handleClose="handleisShow" @Submit="Submit" />
    <div class="content">
        <div class="header">
            <a><el-button type="primary" @click="handleAdd()">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    增加通知
                </el-button></a>
            <el-input class="search" v-model="Searchinput" placeholder="请输入车牌号" @keyup="Searching(Searchinput)" clearable>
                <template #append>
                    <el-button :icon="Search" @click="Searchname()" />
                </template>
            </el-input>
        </div>
        <el-table :data="notificationslist.value" class="table" stripe="true" size="large" height="680">
            <el-table-column prop="id" label="Id" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="content" label="内容" />
            <el-table-column prop="releaseTime" label="发布时间" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.row)">修改</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watchEffect, watch } from 'vue';
import { Search, Plus } from '@element-plus/icons-vue';
import { useLink } from 'vue-router';
import Drawer from '@/views/adminPage/component/NotificationsDrawer/index.vue';
// import * as carsApi from '@/apis/cars/info.js';
import * as ntApi from '@/apis/notifications'
import { showElLoading, promiseToArr } from '@/utils/common.js';
import { ElMessage, ElMessageBox } from 'element-plus'
import Fuse from 'fuse.js';

var res = ref()
const params = {}
const notificationslist = reactive([])
const Cachelist = reactive([])

const instance = {
    fuse: null
}
const getNotificationsList = async () => {
    [res] = await promiseToArr(ntApi.getnotificationsList(params))
    notificationslist.value = res
    Cachelist.value = res
    const options = {
        keys: ['title']
    }
    // 初始化Fuse实例
    const fuse = new Fuse(Cachelist.value, options)
    instance.fuse = fuse
}

onMounted(() => {
    getNotificationsList()
})

watchEffect(() => {
    getNotificationsList()
})

const Searchinput = ref('')
//搜索框input的功能
const Searching = (Searchinput) => {
    if (!Searchinput == '') {
        const result = instance.fuse.search(Searchinput)
        //格式化数据
        const formattedResult = result.map(item => item.item)
        notificationslist.value = formattedResult
    } else {
        notificationslist.value = Cachelist.value
    }
}

//当Searchinput为空时，重置列表
watch(() => Searchinput.value, (newVal, oldVal) => {
    if (Searchinput.value == null || Searchinput.value == '') {
        getNotificationsList()
    }
})

const handleDelete = (row) => {
    ElMessageBox.confirm(
        '确定要删除吗',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        params.id = row.id
        promiseToArr(ntApi.deletenotifications(params)).then((res) => {
            getNotificationsList()
        })
        ElMessage({
            type: 'success',
            message: '已删除',
        })
    })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消删除',
            })
        })
}

const isNew = ref()
var isShow = ref(false)
const Editform = ref({})

const handleAdd = () => {
    Editform.value = {}
    isShow.value = true
    isNew.value = true
}

const handleEdit = (row) => {
    Editform.value = row
    isShow.value = true
    isNew.value = false
}

const Submit = (form) => {
    params.id = form.id
    params.title = form.title
    params.content = form.content
    params.releaseTime = form.releaseTime
    if (isNew.value) {
        ElMessageBox.confirm(
            '确定要添加吗',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            promiseToArr(ntApi.addnotifications(params)).then((res) => {
                getNotificationsList()
            })
            ElMessage({
                type: 'success',
                message: '已添加',
            })
        })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '删除失败',
                })
            })
    } else {
        ElMessageBox.confirm(
            '确定要修改吗',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            promiseToArr(ntApi.updatenotifications(params)).then((res) => {
                getNotificationsList()
                console.log(res,"通知修改");
            })
            ElMessage({
                type: 'success',
                message: '已修改',
            })
        })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '修改失败',
                })
            })
    }
    isShow.value = false
}

const handleisShow = (isShownow) => {
    isShow.value = isShownow.value
}



</script>

<style lang="scss">
.content {
    .header {
        display: flex;
        height: 8vh;
        background-color: #fff;
        align-items: center;
        padding-left: 2vw;

        span {
            font-weight: 500;
            font-size: 15px;
        }

        .search {
            margin-left: 45vw;
            width: 20vw;
            height: 4vh;
        }
    }
}
</style>
