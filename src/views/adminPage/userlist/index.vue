<template>
    <Drawer :isShow="isShow" :Editform="Editform" @handleClose="handleisShow" @Submit="Submit" />
    <div class="content">
        <div class="header">
            <a><el-button type="primary" @click="handleAdd">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    添加用户
                </el-button></a>
            <el-input class="search" v-model="Searchinput" placeholder="请输入姓名" @keyup="Searching" clearable>
                <template #append>
                    <el-button :icon="Search" @click="Searchname" />
                </template>
            </el-input>
        </div>
        <el-table :data="userlist.value" class="table" stripe="true" size="large" height="680">
            <el-table-column prop="id" label="账号" />
            <el-table-column prop="username" label="姓名" />
            <el-table-column prop="type" label="类型" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.row)">修改</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watchEffect, watch } from 'vue';
import { Search, Plus, Refresh } from '@element-plus/icons-vue';
import { useLink } from 'vue-router';
import Drawer from '@/views/adminPage/component/UserDrawer/index.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import * as userApi from '@/apis/user'
import { showElLoading, promiseToArr } from '@/utils/common.js';


var res = ref()
const params = {}
// const userlist = reactive([])
const userlist = reactive([])
const Cachelist = reactive([])

const getUserList = async () => {
    [res] = await promiseToArr(userApi.getUserList(params))
    userlist.value = res
    Cachelist.value = res
}

onMounted(() => {
    getUserList()
})

watchEffect(() => {
    getUserList()
})

const Searchinput = ref('')
const Searchlist = ref([])

//搜索按钮功能
// const Searchname = () => {
//     promiseToArr(userApi.getUserList(params)).then(() => {
//         console.log(123);
//     })
//     // for (var i = 0; i < userlist.value.length; i++) {
//     //     if (userlist.value[i].username == Searchinput.value) {
//     //         Searchlist.value.push(userlist.value[i])
//     //     }
//     // }
//     // userlist.value = Searchlist.value
// }

//搜索框input的功能
const Searching = (() => {
    if (Searchinput.value != '') {
        for (var i = 0; i < Cachelist.value.length; i++) {
            if (Cachelist.value[i].username == Searchinput.value) {
                //判断是否已经存在
                if (!Searchlist.value.includes(Cachelist.value[i]))
                    Searchlist.value.push(Cachelist.value[i])
            }
        }
        userlist.value = Searchlist.value
        //清空Searchlist的值
        Searchlist.value = []
    } else {
        userlist.value = Cachelist.value
    }
})

const handleDelete = (index, row) => {
    // params.id = row.id
    // res = await promiseToArr(userApi.deleteUser(params))
    // watchtable.value = watchtable.value + 1
    ElMessageBox.confirm(
        '确定要删除吗',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        params.id = row.id
        promiseToArr(userApi.deleteUser(params)).then((res) => {
            getUserList()
        })
        ElMessage({
            type: 'success',
            message: '已删除',
        })
    })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '删除失败',
            })
        })
}

//增加/修改角色
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
    console.log(form.username, form.type, "Userlist");
    params.id = form.id
    params.username = form.username
    params.type = form.type
    if (isNew.value) {
        ElMessageBox.confirm(
            '确定要添加吗',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            promiseToArr(userApi.addUser(params)).then((res) => {
                getUserList()
            })
            ElMessage({
                type: 'success',
                message: '已添加',
            })
        })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '添加失败',
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
            promiseToArr(userApi.updateUser(params)).then((res) => {
                getUserList()
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
    console.log("userlist");
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

        .Reset {
            margin-left: 3vw;
        }
    }
}
</style>