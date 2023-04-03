<template>
    <el-drawer v-model="isShow" :before-close="handleClose" :title="title" class="drawer">
        <el-form :model="form">
            <el-form-item label="编号" label-width="3vw">
                <el-input v-model="form.id" placeholder="系统自动分配" readonly></el-input>
            </el-form-item>
            <el-form-item label="车名" label-width="3vw">
                <el-input v-model="form.name" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="车牌号" label-width="3vw">
                <el-input v-model="form.license" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="状态" label-width="3vw">
                <el-input v-model="form.objectlistId" maxlength="1" minlength="1" show-word-limit="1"
                    placeholder="请输入..."></el-input>
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
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps({
    isShow: Boolean,
    Editform: Object,
})
const { isShow } = toRefs(props)
const { Editform } = toRefs(props)
const emit = defineEmits(['handleClose'])

const title = ref('增加车辆')
const form = reactive({
    id: '',
    name: '',
    license: '',
    objectlistId: '',
})

const isShownow = ref(false)
const handleClose = (() => {
    emit("handleClose", isShownow)
})
const Decide = () => {
    if (Editform.value.id == '' || Editform.value.id == undefined) {
        title.value = '增加车辆'
        form.id = ''
        form.name = ''
        form.license = ''
        form.objectlistId = ''
    }
    else {
        title.value = '修改信息'
        form.id = Editform.value.id
        form.name = Editform.value.name
        form.license = Editform.value.license
        form.objectlistId = Editform.value.objectlistId
    }
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