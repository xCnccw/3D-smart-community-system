<template>
    <el-drawer v-model="isShow" :before-close="handleClose" :title="title" class="drawer">
        <el-form :model="form">
            <el-form-item label="Id" label-width="6vw">
                <el-input v-model="form.id" placeholder="系统自动分配" readonly></el-input>
            </el-form-item>
            <el-form-item label="建筑名" label-width="6vw">
                <el-input v-model="form.name" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="高度" label-width="6vw">
                <el-input v-model="form.height" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="平方" label-width="6vw">
                <el-input v-model="form.square" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="楼层数" label-width="6vw">
                <el-input v-model="form.floor" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="实际入住数" label-width="6vw">
                <el-input v-model="form.malecount" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="预测入住数" label-width="6vw">
                <el-input v-model="form.femalecount" placeholder="请输入..."></el-input>
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
    height: '',
    square: '',
    floor: '',
    malecount: '',
    femalecount: '',
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
    form.height = Editform.value.height
    form.square = Editform.value.square
    form.floor = Editform.value.floor
    form.malecount = Editform.value.malecount
    form.femalecount = Editform.value.femalecount
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
