<template>
    <el-drawer v-model="isShow" :before-close="handleClose" :title="title" class="drawer">
        <el-form :model="form">
            <el-form-item label="账号" label-width="3vw" :rules="[
                {
                    required: true,
                }
            ]">
                <el-input v-model="form.id" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="姓名" label-width="3vw">
                <el-input v-model="form.name" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="角色" label-width="3vw">
                <el-input v-model="form.role" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="状态" label-width="3vw">
                <el-input v-model="form.state" maxlength="1" minlength="1" show-word-limit="1"
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

const props = defineProps({
    isShow: Boolean,
    Editform: Object,
})
const { isShow } = toRefs(props)
const { Editform } = toRefs(props)
// console.log(Editform.value);
const emit = defineEmits(['handleClose'])

const title = ref('增加角色')
const form = reactive({
    id: '',
    name: '',
    role: '',
    state: '',
})

const isShownow = ref(false)
const handleClose = (() => {
    emit("handleClose", isShownow)
})
const Decide = () => {
    if (Editform.value.id == '' || Editform.value.id == undefined) {
        title.value = '增加角色'
        form.id = ''
        form.name = ''
        form.role = ''
        form.state = ''
        // form = {}
    }
    else {
        title.value = '修改信息'
        form.id = Editform.value.id
        form.name = Editform.value.name
        form.role = Editform.value.role
        form.state = Editform.value.state
    }
}
//监视Editform,再父组件中每次点击会传入（修改）Editform的值
watch(Editform, () => {
    Decide()
})
const Submit = () => {

}

</script>

<style lang="scss">
.drawer {
    font-size: 0.8vw;

    .btn {
        margin-top: 10vh;
        margin-left: 9vw;

        // background-color: aqua;
        .cancel {
            margin-left: 3.7vw;
        }
    }
}
</style>