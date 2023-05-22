<template>
    <Drawer :isShow="isShow" :Editform="Editform" @handleClose="handleisShow" @Submit="Submit" />
    <div class="content">
        <div class="header">
            <a><el-button type="primary" @click="handleAdd()">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    增加车辆
                </el-button></a>
            <el-input class="search" v-model="Searchinput" placeholder="请输入车牌号" @keyup="Searching(Searchinput)" clearable>
                <template #append>
                    <el-button :icon="Search" @click="Searchname()" />
                </template>
            </el-input>
        </div>
        <el-table :data="carslist.value" class="table" stripe="true" size="large" height="680">
            <el-table-column prop="id" label="Id" />
            <el-table-column prop="name" label="车名" />
            <el-table-column prop="license" label="车牌号" />
            <el-table-column prop="objectlistId" label="状态" />
            <!-- <el-table-column align="center" label="状态">
                <template #default="scope">
                    <el-switch v-model="scope.row.objectlistId" active-color="#13ce66" inactive-color="#DCDFE6" active-text="启用"
                        inactive-text="停用" :active-value="1" :inactive-value="0"
                        @change="(val) => handleStatus(scope.row, val)"></el-switch>
                </template>
            </el-table-column> -->
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
import Drawer from '@/views/adminPage/component/CarsDrawer/index.vue';
import * as carsApi from '@/apis/cars'
import { showElLoading, promiseToArr } from '@/utils/common.js';
import { ElMessage, ElMessageBox } from 'element-plus'
import Fuse from 'fuse.js';

var res = ref()
const params = {}
const carslist = reactive([])
const Cachelist = reactive([])

const instance = {
    fuse: null
}
const getCarsList = async () => {
    [res] = await promiseToArr(carsApi.getCarsList(params))
    carslist.value = res
    Cachelist.value = res
    console.log(res, "车辆列表");
    const options = {
        keys: ['license']
    }
    // 初始化Fuse实例
    const fuse = new Fuse(Cachelist.value, options)
    instance.fuse = fuse
}

onMounted(() => {
    getCarsList()
})

watchEffect(() => {
    getCarsList()
})

const Searchinput = ref('')
// const Searchlist = ref([])
//搜索框input的功能
const Searching = (Searchinput) => {
    if (!Searchinput == '') {
        const result = instance.fuse.search(Searchinput)
        //格式化数据
        const formattedResult = result.map(item => item.item)
        carslist.value = formattedResult
    } else {
        carslist.value = Cachelist.value
    }
}

//当Searchinput为空时，重置列表
watch(() => Searchinput.value, (newVal, oldVal) => {
    if (Searchinput.value == null || Searchinput.value == '') {
        getCarsList()
    }
})

// const Searching = (() => {
//     if (Searchinput.value != '') {
//         for (var i = 0; i < Cachelist.value.length; i++) {
//             if (Cachelist.value[i].license == Searchinput.value) {
//                 //判断是否已经存在
//                 if (!Searchlist.value.includes(Cachelist.value[i]))
//                     Searchlist.value.push(Cachelist.value[i])
//             }
//         }
//         carslist.value = Searchlist.value
//         //清空Searchlist的值
//         Searchlist.value = []
//     } else {
//         carslist.value = Cachelist.value
//     }
// })


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
        promiseToArr(carsApi.deleteCars(params)).then((res) => {
            getCarsList()
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
    console.log(form.id, form.name, form.objectlistId, form.license, "传参");
    params.id = form.id
    params.name = form.name
    params.objectlistId = form.objectlistId
    params.license = form.license
    if (isNew.value) {
        ElMessageBox.confirm(
            '确定要添加吗',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(() => {
            promiseToArr(carsApi.addCars(params)).then((res) => {
                getCarsList()
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
            promiseToArr(carsApi.updateCars(params)).then((res) => {
                getCarsList()
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
