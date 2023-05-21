<template>
    <div class="openAI">
        <div class="AIbox">
            <span>AI:</span>
            <el-input class="answer" :rows="17" type="textarea" v-model="AIanswer">
            </el-input>
        </div>
        <el-input class="askinput" v-model="question" placeholder="请输入">
            <template #append>
                <el-button :icon="Promotion" @click="AskOpenai" />
            </template>
        </el-input>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive, toRefs, watch } from "vue";
import { Promotion } from '@element-plus/icons-vue'
import * as aiApi from '@/apis/OpenAi_API/openai.js';

const question = ref("")

const AIanswer = ref("")

const AskOpenai = () => {
    const data = {
        model: 'text-davinci-003',
        temperature: 0.5,
        prompt: question.value,
        max_tokens: 500,
        n: 1,
        stop: null
    };
    aiApi.getAianswer(data).then((res) => {
        const pattern = /^[`~!@#$^\-&*()=|{}':;',\\[\].<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]+/g;
        AIanswer.value = res.data.choices[0].text.replace(pattern, '');
    })
}
</script>



<style lang="scss">
.openAI {
    .askinput {
        width: 800px;
        height: 40px;
        position: fixed;
        z-index: 1;
        bottom: 150px;
        left: 56.25%;
        transform: translateX(-50%);
    }
}

#icon {
    width: 20px;
    height: 20px;
}

.AIbox {
    display: flex;
    position: fixed;
    // z-index: 1;
    top: 150px;
    // left: 56.25%;
    margin-left: 50px;
    // transform: translateX(-50%);

    .answer {
        width: 1500px;
        height: 600px;
        margin-left: 15px;
    }
}
</style>
