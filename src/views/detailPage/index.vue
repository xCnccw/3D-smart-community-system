<template>
    <div class="BuildingDetail">
        <header class="header">
            <h3>详细信息</h3>
            <div class="backBtn" @click="$router.go(-1)">返回</div>
        </header>
        <div class="wrapper">
            <div class="container-fluid">
                <div class="row fill-h box">
                    <div class="left fill-h">
                        <div class="xpanel">
                            <div class="fill-h" id="container"></div>
                        </div>
                    </div>
                    <div class="right fill-h">
                        <!-- <div class="xpanel-wrapper xpanel-wrapper-1-3"> -->
                        <div class="xpanel">
                            <div class="fill-h right_Box">
                                <div class="left_top">
                                    <div>建筑名称：{{ infoList.name }}</div>
                                    <div style="margin: 10px 0 0 0">
                                        建筑高度：{{ infoList.height }}
                                    </div>

                                    <div style="margin: 10px 0 10px 0">
                                        建筑层数：{{ infoList.floor }}
                                    </div>
                                    <div>建筑占地面积：{{ infoList.square }}</div>
                                </div>
                                <div class="right_top" id="pieTest"></div>
                            </div>
                            <!-- </div> -->
                        </div>

                        <!-- <div class="xpanel-wrapper xpanel-wrapper-2-3">
                <div class="xpanel">
                  <div class="fill-h" id="container"></div>
                </div>
              </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted, reactive } from "vue";
import * as THREE from "three";
import * as echarts from "echarts";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { showElLoading, promiseToArr } from '@/utils/common.js';
import { buildingDetail } from "@/apis/city.js";
export default {
    setup() {
        let scene, camera, mesh, renderer, controls
        const ball_mesh = ref(null);
        const step = ref(0);
        const SoName = getQueryParam()
        const loading = ref(true);
        const sum = ref(0);
        const testdata = [
            { value: 47, name: "20以下" },
            { value: 100, name: "20-30岁" },
            { value: 55, name: "30-40岁" },
            { value: 80, name: "40-50岁" },
            { value: 60, name: "60岁以上" },
        ];
        const infoList = reactive({
            name: "1",
            height: "1",
            floor: 0,
            square: "",
            malecount: 0,
            femalecount: 0,
        });
        const ageStructure = ref({});
        const agelst = ref([]);

        const container = ref(null);

        onMounted(() => {
            container.value = document.querySelector("#container");
            init();
            initControls();
            initLight();
            buildingDetailMed();
            // initBall();
            initModel(SoName).then(() => {
                anmiation();
            });
            resize();
        });
        //监听画面变化，更新渲染
        const resize = () => {
            window.addEventListener('resize', () => {
                console.log('画面变化了');
                //更新摄像头
                camera.aspect = window.innerWidth / window.innerHeight
                //更新摄像机投影矩阵
                camera.updateProjectionMatrix()
                //更新渲染器
                renderer.setSize(window.innerWidth, window.innerHeight)
                //设置渲染器的像素比
                renderer.setPixelRatio(window.devicePixelRatio)
            })
        }
        const init = () => {
            // 1.创建场景
            scene = new THREE.Scene();
            // 2.创建摄像机
            camera = new THREE.PerspectiveCamera(
                70,
                container.value.clientWidth / container.value.clientHeight,
                10,
                10000
            );
            // 3.创建threejs渲染器
            renderer = new THREE.WebGLRenderer();
            // 4.设置渲染器场景的大小
            renderer.setClearColor(new THREE.Color("#0f1c30"));
            renderer.setSize(
                container.value.clientWidth,
                container.value.clientHeight
            );
            // 设置渲染物体阴影
            renderer.shadowMap.enabled = true;
            // 把渲染器添加到页面当中去
            container.value.appendChild(renderer.domElement);
            // 创建控制器
            camera.position.set(100, 100, 170);
        };
        const initControls = () => {
            // 创建控制器
            controls = new OrbitControls(camera, renderer.domElement);
            // 使动画循环使用时阻尼或自转 意思是否有惯性
            controls.enableDamping = true;
            //是否可以缩放
            controls.enableZoom = true;
            //是否自动旋转
            controls.autoRotate = false;
            //设置相机距离原点的最近距离
            controls.minDistance = 50;
            //设置相机距离原点的最远距离
            controls.maxDistance = 5000;
            //是否开启右键拖拽
            controls.enablePan = true;
            // 最大角度
            controls.maxPolarAngle = Math.PI / 2.2;
        };
        const initLight = () => {
            const PointLight = new THREE.PointLight(0xffffff, 0.6);
            scene.add(PointLight);
            const ambient = new THREE.AmbientLight(0xffffff);
            scene.add(ambient);
            camera.add(PointLight);
        }
        const initModel = (name) => {
            return new Promise((resolve, reject) => {
                new MTLLoader()
                    .setPath("/static/obj/")
                    .load(`city.mtl`, (materials) => {
                        materials.preload();
                        new OBJLoader()
                            .setMaterials(materials)
                            .setPath("/static/obj/")
                            .load(`city.obj`, (obj) => {
                                if (obj) {
                                    obj.children.forEach((child) => {
                                        if (child.name === name) {
                                            child.geometry.computeBoundingBox();
                                            const centroid = new THREE.Vector3();
                                            centroid.addVectors(
                                                child.geometry.boundingBox.min,
                                                child.geometry.boundingBox.max
                                            );
                                            centroid.multiplyScalar(0.5);
                                            centroid.applyMatrix4(child.matrixWorld);
                                            child.geometry.center(centroid.x, centroid.y, centroid.z);
                                            child.scale.set(0.3, 0.3, 0.3);
                                            child.position.set(0, 20, 0);
                                            child.rotateY(-Math.PI / 2);
                                            scene.add(child);
                                        }
                                    });
                                    resolve(obj);
                                } else {
                                    reject("error");
                                }
                            });
                    });
            });
        }
        const anmiation = () => {
            requestAnimationFrame(anmiation);
            controls.update();
            renderer.render(scene, camera);
        }

        const buildingDetailMed = async () => {
            const [res] = await promiseToArr(buildingDetail());
            res.forEach((item) => {
                if (item.name === SoName) {
                    infoList.name = item.name;
                    infoList.height = item.height;
                    infoList.floor = item.floor;
                    infoList.square = item.square;
                    infoList.malecount = item.malecount;
                    infoList.femalecount = item.femalecount;
                    // ageStructure.value = item.Funnelcharts;
                }
            });
            // ageStructure.value.forEach((element) => {
            //     const { value, name } = element;
            //     agelst.push({ value, name });
            // });
            initEchart();
        };
        function initEchart() {
            const chartDom = document.querySelector("#pieTest");
            const pagechart = echarts.init(chartDom);
            const option = {
                tooltip: {
                    trigger: "item",
                },
                legend: {
                    top: "5%",
                    left: "center",
                    textStyle: {
                        color: "#fff",
                    },
                },
                series: [
                    {
                        type: "pie",
                        radius: ["40%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: "center",
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: "20",
                                fontWeight: "bold",
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: [
                            { value: infoList.malecount, name: "男性人数" },
                            { value: infoList.femalecount, name: "女性人数" },
                        ],
                    },
                ],
            };
            pagechart.setOption(option);
        }


        // 获取指定参数的值
        function getQueryParam() {
            const search = window.location.search.substring(1); // 去掉问号
            return search; // 如果没有找到名为name的参数，则返回null
        }

        return {
            infoList
        }
    }
}



</script>

<style lang="scss">
@charset "utf-8";

/********** Global **********/
/*
 *常用背景色： #0f1c30 #0b0f34 (6,64,102) (29,45,57) (7,33,58) (8,13,28) (15,43,36)
 */
* {
    margin: 0;
    padding: 0;
    background-color: #0b0d1c;
}

.BuildingDetail {
    width: 100%;
    height: 100%;
    // min-height:635px;
    font-family: "microsoft yahei", arial, sans-serif;
    background-color: #0b0d1c;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    overflow-x: hidden;
    overflow-y: auto;
}

.BuildingDetail.bg05 {
    background-image: url("../../../public/static/images/bg05.png");
}

.BuildingDetail.bg06 {
    background-image: url("../../../public/static/images/bg06.png");
}

.BuildingDetail.bg07 {
    background-image: url("../../../public/static/images/bg07.png");
}

.BuildingDetail.bg08 {
    background-image: url("../../../public/static/images/bg08.png");
}

.header {
    margin: 0 auto;
    width: 100%;
    height: 72px;
    max-width: 1920px;
    background: url("../../../public/static/images/header.png") center no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    line-height: 72px;
}

.header h3 {
    margin: 0;
    padding: 0;
    line-height: 44px;
    text-align: center;
    font-size: 24px;
    color: #5dc2fe;
    background-color: rgba(0, 0, 0, 0);
}

.backBtn {
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: #646ed1 1px solid;
    color: #5dc2fe;
    position: absolute;
    right: 40px;
    top: 5px;
    cursor: pointer;
}

.backBtn:hover {
    background-color: rgb(63, 117, 81);
}

.wrapper {
    position: absolute;
    top: 87px;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 545px;
}

.container-fluid {
    height: 100%;
    min-height: 100%;
}

.row {
    margin-left: -7px;
    margin-right: -8px;
}

.row>div {
    padding-left: 7px;
    padding-right: 8px;
}

.xpanel-wrapper {
    padding-bottom: 15px;
    box-sizing: border-box;
}

.xpanel-wrapper-1 {
    height: 100%;
}

.xpanel-wrapper-2 {
    height: 50%;
}

.xpanel-wrapper-1-3 {
    height: 33.33333%;
}

.xpanel-wrapper-2-3 {
    height: 66.66666%;
}

.xpanel {
    padding: 15px;
    height: 100%;
    min-height: 170px;
    background: url("../../../public/static/images/panel.png") center no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
}

/* tool */
.fill-h {
    height: 100%;
    min-height: 100%;
}

.no-margin {
    margin: 0 !important;
}

.no-padding {
    padding: 0 !important;
}

.no-bg {
    background: none !important;
}

.no-border {
    border: 0 !important;
}

/* scrollbar */
::-webkit-scrollbar {
    width: 0;
    height: 0;
}

::-webkit-scrollbar-track {
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.3);
}

.box {
    display: flex;
    justify-content: center;
}

.left {
    flex: 7
}

.right {
    flex: 5
}

.right_Box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #5dc2fe;
    font-size: 20px;

}

.left_top {
    margin-left: 30px;
}

.right_top {
    width: 230px;
    height: 230px;
    margin-top: 10px;
    margin-right: 30px;
}

.age_distribution {
    width: 100%;
    height: 100%;
}

.age_total {
    color: #5dc2fe;
    width: 250px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    font-size: 28px;
    position: relative;
    bottom: 120px;
    right: 20px;
}

/* 将详情页的接口写好 */
</style>