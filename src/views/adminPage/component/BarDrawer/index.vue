<template>
    <el-drawer v-model="isShow" :before-close="handleClose" :title="title" class="drawer">
        <el-form :model="form">
            <el-form-item label="Id" label-width="6vw">
                <el-input v-model="form.id" placeholder="系统自动分配" readonly></el-input>
            </el-form-item>
            <el-form-item label="类型" label-width="6vw">
                <el-input v-model="form.name" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="标题" label-width="6vw">
                <el-input v-model="form.title" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="date" label-width="6vw">
                <el-input v-model="form.date" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="实际入住数" label-width="6vw">
                <el-input v-model="form.realcount" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="预测入住数" label-width="6vw">
                <el-input v-model="form.forecastcount" placeholder="请输入..."></el-input>
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
    realcount: '',
    forecastcount: '',
})

const isShownow = ref(false)
const handleClose = (() => {
    emit("handleClose", isShownow)
})
const Decide = () => {
    title.value = '修改信息'
    form.id = Editform.value.id
    form.name = Editform.value.name
    form.title = Editform.value.title
    form.date = Editform.value.date
    form.realcount = Editform.value.realcount
    form.forecastcount = Editform.value.forecastcount
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
