<template>
    <Drawer :isShow="isShow" :Editform="Editform" @handleClose="handleisShow" />
    <div class="content">
        <div class="header">
            <a><el-button type="primary" @click="handleAdd()">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    增加车辆
                </el-button></a>
            <el-input class="search" v-model="Searchinput" placeholder="请输入姓名" clearable>
                <template #append>
                    <el-button :icon="Search" @click="Searchname()" />
                </template>
            </el-input>
        </div>
        <el-table :data="userlist" class="table" stripe="true" size="large">
            <el-table-column prop="id" label="账号" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="role" label="角色" />
            <el-table-column prop="state" label="状态" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.row)">修改</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { Search, Plus } from '@element-plus/icons-vue';
import { useLink } from 'vue-router';
import Drawer from '@/component/UserDrawer/index.vue'

const userlist = ref([])
userlist.value = [
    {
        id: 1,
        name: '坑坑',
        role: '超级管理员',
        state: '1',
    },
    {
        id: 2,
        name: '丫丫',
        role: '管理员',
        state: '1',
    },
    {
        id: 3,
        name: '圆圆',
        role: '管理员',
        state: '0',
    }
]

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