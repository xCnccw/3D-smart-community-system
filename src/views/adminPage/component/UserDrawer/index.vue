<template>
    <el-drawer v-model="isShow" :before-close="handleClose" :title="title" class="drawer">
        <el-form :model="form">
            <el-form-item label="Id" label-width="3vw">
                <el-input v-model="form.id" readonly="true" placeholder="系统自动分配"></el-input>
            </el-form-item>
            <el-form-item label="姓名" label-width="3vw">
                <el-input v-model="form.username" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="3vw">
                <el-input v-model="form.password" :type="pwdShow ? 'input' : 'password'" placeholder="请输入...">
                    <template #append>
                        <el-button :icon="View" @click="handlePwdShow" />
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="类型" label-width="3vw">
                <el-select size="small" v-model="form.type" placeholder="请选择">
                    <el-option v-for="option in TypeOptions" :key="option.type" :label="option.label"
                        :value="option.type"></el-option>
                </el-select>
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
import { View } from "@element-plus/icons-vue";

const props = defineProps({
    isShow: Boolean,
    Editform: Object,
})
const { isShow } = toRefs(props)
const { Editform } = toRefs(props)
const emit = defineEmits()

const title = ref('增加角色')
const form = reactive({
    id: '',
    username: '',
    password: '',
    type: '',
    label: '',
})

const isShownow = ref(false)
const handleClose = (() => {
    pwdShow.value = false
    emit("handleClose", isShownow)
})
const Decide = () => {
    if (Editform.value.id == '' || Editform.value.id == undefined) {
        title.value = '增加角色'
        form.id = ''
        form.username = ''
        form.password = ''
        form.type = ''
        form.label = ''
    }
    else {
        title.value = '修改信息'
        form.id = Editform.value.id
        form.username = Editform.value.username
        form.password = Editform.value.password
        form.type = Editform.value.type
    }
}
//类型下拉选项框
const TypeOptions = reactive([
    {
        type: "0",
        label: '超级管理员',
    },
    {
        type: "1",
        label: '普通管理员',
    },
    {
        type: "2",
        label: '普通角色',
    },
])

//监视Editform,再父组件中每次点击会传入（修改）Editform的值
watch(Editform, () => {
    Decide()
})

const Submit = () => {
    pwdShow.value = false
    emit("Submit", form)
}

const Cancel = () => {
    handleClose()
}

const pwdShow = ref(false)

const handlePwdShow = () => {
    pwdShow.value = !pwdShow.value
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
