<script setup>
import { ref } from "vue";
import * as THREE from "three";
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { onMounted } from "vue";
import { gsap } from "gsap";
let screenDom = ref(null);
const isRegister = ref(false);
  const formRef = ref();
  const formModel = ref({
    password: '',
    username: '',

    nickName: '',
    userName: '',
  });
    const formRules = ref({
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, validator: null, message: '请输入密码', trigger: 'blur' }],
    nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
    userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  });

  const ok = async () => {
    if (!formRef.value) return;
    await formRef.value.validate((valid) => {
      if (valid) {
        console.log('submit!', formModel.value);
        // loginFn();
        isRegister.value ? registerFn() : loginFn();
      }
    });
  };
  //注册
  const registerFn = async ()=>{
    console.log('注册');
  }
  //登录
  const loginFn = async ()=>{
    console.log('登录');
  }
onMounted(() => {
  // 创建场景
  let scene = new THREE.Scene();
  // 创建相机
  let camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100000
  );

  camera.position.set(0, 0, 10);
  // 创建渲染器
  let renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
//背景色
	renderer.setClearColor('#CC9999',0.5);

  // 将画布添加到页面中
  screenDom.value.appendChild(renderer.domElement);

//环境光
  const color = 0xffffff
  const intensity = 1
  const light = new THREE.AmbientLight(color, intensity)
  scene.add(light)

  // 创建星空的背景
  // let url = "./assets/25s.jpg";
  // let envTexture = new THREE.TextureLoader().load(url);
  // envTexture.mapping = THREE.EquirectangularReflectionMapping;
  // scene.background = envTexture;
  // scene.environment = envTexture;

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  render();

  //解压缩的加载器
  let dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./draco/gltf/");
  dracoLoader.setDecoderConfig({ type: "js" });
  let loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  //模型加载
  loader.load("./isometric-smart-city.glb", (gltf) => {
    gltf.scene.scale.set(0.2, 0.2, 0.2);
    gltf.scene.position.set(-3.5,-3.5, 0);
    gltf.scene.rotation.y = Math.PI/2; 
    // gltf.scene.rotation.z = Math.PI/4; 
    scene.add(gltf.scene);

    window.addEventListener("mousemove", (e) => {
      let x = (e.clientX / window.innerWidth) * 2 - 1;
      let y = (e.clientY / window.innerHeight) * 2 - 1;

      let timeline = gsap.timeline();
      timeline.to(gltf.scene.rotation, {
        duration: 0.5,
        x: y,
        y: x,
        duration: 1,
      });
    });
  });

  //监听画面变化，更新渲染
  window.addEventListener('resize',()=>{
    console.log("画面变化了");
    //更新摄像头
    camera.aspect=window.innerWidth/window.innerHeight
    //更新摄像机投影矩阵
    camera.updateProjectionMatrix()
    //更新渲染器
    renderer.setSize(window.innerWidth,window.innerHeight)
    //设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})
});
</script>

<template>
  <div class="loginWrap">
    <div class="canvas-container" ref="screenDom"></div>
    <div class="rightWrap">
      <div class="rightContent">
        <div class="title">智慧社区平台</div>
        <el-form
          class="bob-form"
          label-position="top"
          ref="formRef"
          :model="formModel"
          :rules="formRules"
        >
          <template v-if="!isRegister">
            <el-form-item label="账号" prop="username">
              <el-input v-model.trim="formModel.username" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                show-password
                v-model.trim="formModel.password"
                placeholder="请输入密码"
              />
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="昵称" prop="nickName">
              <el-input v-model.trim="formModel.nickName" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
              <el-input
                v-model.trim="formModel.userName"
                placeholder="账号为用户名，密码默认123456"
              />
            </el-form-item>
          </template>
        </el-form>
        <button @click="ok" class="ok" >
          {{isRegister ? '注册':'登录'}}
        </button>
        <div class="register-login-tip">
          {{!isRegister ? '没有账号？':'已有账号,'}}
          <el-button type="danger" link @click="isRegister=!isRegister">
            {{!isRegister ? '去注册' :'去登陆'}}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .loginWrap{
    // background: #f5f5f5;
    display: flex;
    height: 100vh;
    .canvas-container {
      width: 70%;
    }
    .rightWrap {
      width: 25%;
      height: 50%;
      margin: auto 0;
      background: #ffffff;
      box-shadow: 0px -4px 16px #a9a9a9a8;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .rightContent {
        .register-login-tip {
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 400;
          font-size: 14px;
          line-height: 14px;
          color: #999999;
          padding-top: 10px;
        }
        .title {
          font-family: 'PingFang SC';
          font-style: normal;
          font-weight: 500;
          font-size: 24px;
          line-height: 24px;
          color: #000000;
          padding-bottom: 48px;
        }

        .ok {
          background: #EF7579;
          color:white;
          border-radius: 4px;
          width: 320px;
          height: 40px;
          margin-top: 20px;
          border: 0px;
        }
          .ok:hover {
          background: #ed6b6f;
          color:white;
          border-radius: 4px;
          width: 320px;
          height: 40px;
          margin-top: 20px;
          border: 0px;
        }
        .bob-form {
          min-width: 320px;
        }
        .loginWrap .rightWrap .rightContent .ok[data-v-e17ea971]{
          background: CC9999;
        }
      }
    }
  }
</style>
