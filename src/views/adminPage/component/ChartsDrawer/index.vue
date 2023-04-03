<template>
    <el-drawer v-model="isShow" :before-close="handleClose" :title="title" class="drawer">
        <el-form :model="form">
            <el-form-item label="编号" label-width="3vw">
                <el-input v-model="form.id" placeholder="系统自动分配" readonly></el-input>
            </el-form-item>
            <el-form-item label="类型" label-width="3vw">
                <el-input v-model="form.name" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="标题" label-width="3vw">
                <el-input v-model="form.title" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="date" label-width="3vw">
                <el-input v-model="form.date" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="aqi" label-width="3vw">
                <el-input v-model="form.aqi" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="pm2" label-width="3vw">
                <el-input v-model="form.pm2" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="pm10" label-width="3vw">
                <el-input v-model="form.pm10" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="co" label-width="3vw">
                <el-input v-model="form.co" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="no2" label-width="3vw">
                <el-input v-model="form.no2" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="so2" label-width="3vw">
                <el-input v-model="form.so2" placeholder="请输入..."></el-input>
            </el-form-item>
        </el-form>
        <div class="btn">
            <el-button type="primary" @click="Submit()">确定</el-button>
            <el-button type="danger" class="cancel" @click="Cancel()">取消</el-button>
        </div>
    </el-drawer>
</template>

<script setup>
import { ref, onMounted, reactive, toRefs, watch } from "vue";

const props = defineProps({
    isShow: Boolean,
    Editform: Object,
})
const { isShow } = toRefs(props)
const { Editform } = toRefs(props)
const emit = defineEmits(['handleClose'])

const title = ref('修改信息')
const form = reactive({
    id: '',
    name: '',
    title: '',
    date: '',
    aqi: '',
    pm2: '',
    pm10: '',
    co: '',
    no2: '',
    so2: ''
})

const isShownow = ref(false)
const handleClose = (() => {
    emit("handleClose", isShownow)
})
const Decide = () => {
    // if (Editform.value.id == '' || Editform.value.id == undefined) {
    //     title.value = '增加车辆'
    //     form.id = ''
    //     form.name = ''
    //     form.checkinrate = ''
    //     form.floorcount = ''
    //     form.livecount = ''
    //     form.objectlistId = ''
    // }
    // else {
    title.value = '修改信息'
    form.id = Editform.value.id
    form.name = Editform.value.name
    form.title = Editform.value.title
    form.date = Editform.value.date
    form.aqi = Editform.value.aqi
    form.pm2 = Editform.value.pm2
    form.pm10 = Editform.value.pm10
    form.co = Editform.value.co
    form.no2 = Editform.value.no2
    form.so2 = Editform.value.so2
    // }
}
//监视Editform,再父组件中每次点击会传入（修改）Editform的值
watch(Editform, () => {
    Decide()
})

const Submit = () => {

    emit("Submit", form)
}

const Cancel = () => {
    handleClose()
}

</script>

<style lang="scss">
.drawer {
    font-size: 0.8vw;

    .btn {
        margin-top: 10vh;
        margin-left: 9vw;

        .cancel {
            margin-left: 3.7vw;
        }
    }
}
</style>