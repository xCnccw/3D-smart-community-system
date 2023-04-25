<template>
    <Drawer :isShow="isShow" :Editform="Editform" @handleClose="handleisShow" @Submit="Submit" />
    <div class="content">
        <div class="header">
            <el-input class="search" v-model="Searchinput" placeholder="请输入图标题" @keyup="Searching(Searchinput)" clearable>
                <template #append>
                    <el-button :icon="Search" @click="Searchname()" />
                </template>
            </el-input>
        </div>
        <el-table :data="chartslist.value" class="table" stripe="true" size="large" height="680">
            <el-table-column prop="id" label="Id" />
            <el-table-column prop="name" label="类型" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="date" label="季度" />
            <el-table-column prop="realcount" label="实际入住数" />
            <el-table-column prop="forecastcount" label="预测入住数" />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="handleEdit(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, watchEffect, watch } from 'vue';
import { Search, Plus } from '@element-plus/icons-vue';
import { useLink } from 'vue-router';
import Drawer from '@/views/adminPage/component/BarDrawer/index.vue';
import * as chartsApi from '@/apis/charts'
import { showElLoading, promiseToArr } from '@/utils/common.js';
import { ElMessage, ElMessageBox } from 'element-plus'
import Fuse from 'fuse.js';

var res = ref()
const params = {}
const chartslist = reactive([])
const Cachelist = reactive([])
const instance = {
    fuse: null
}
const getChartsList = async () => {
    [res] = await promiseToArr(chartsApi.getbarChartsList(params))
    chartslist.value = res
    Cachelist.value = res
    const options = {
        keys: ['title']
    }
    // 初始化Fuse实例
    const fuse = new Fuse(Cachelist.value, options)
    instance.fuse = fuse
}

onMounted(() => {
    getChartsList()
})

watchEffect(() => {
    getChartsList()
})

const Searchinput = ref('')
const Searchlist = ref([])
//搜索框input的功能
const Searching = (Searchinput) => {
    if (!Searchinput == '') {
        const result = instance.fuse.search(Searchinput)
        //格式化数据
        const formattedResult = result.map(item => item.item)
        chartslist.value = formattedResult
    } else {
        chartslist.value = Cachelist.value
    }
}
//当Searchinput为空时，重置列表
watch(() => Searchinput.value, (newVal, oldVal) => {
    if (Searchinput.value == null || Searchinput.value == '') {
        getChartsList()
    }
})


const isNew = ref()
var isShow = ref(false)
const Editform = ref({})


const handleEdit = (row) => {
    Editform.value = row
    isShow.value = true
    isNew.value = false
}

const Submit = (form) => {
    params.id = form.id
    params.name = form.name
    params.title = form.title
    params.date = form.date
    params.realcount = form.realcount
    params.forecastcount = form.forecastcount
    ElMessageBox.confirm(
        '确定要修改吗',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        promiseToArr(chartsApi.updatebarCharts(params)).then((res) => {
            console.log(res, "接受到的数据");
            getChartsList()
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
