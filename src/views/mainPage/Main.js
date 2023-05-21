import { computed, onMounted, ref, reactive, getCurrentInstance, onBeforeUnmount, nextTick } from "vue";
import {
    Document,
    Menu as IconMenu,
    Loading,
    Setting,
} from "@element-plus/icons-vue";
import { Avatar, SwitchButton } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import * as echarts from "echarts";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import {
    CSS2DObject,
    CSS2DRenderer,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TWEEN } from "three/examples/jsm/libs/tween.module.min";
import { initRenderer, initControls } from "@/utils/baseElement";
import { showElLoading, promiseToArr } from '@/utils/common.js';
import {
    // initPark,
    initFirestation,
    initFirecar,
    initAmbulance,
    // initUfo,
    // initFly,
    // initBank,
    initHosiptal,
    initSchool,
    initModernBuilding,
    initCinema,
    initPolice
} from "@/utils/modelList";
import Stats from "../../../public/static/js/stats";
import { Sky } from "../../../public/static/js/Sky";
import { clickPick } from "../../../public/static/js/clickPick";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
const router = useRouter();
const menuList = [
    { text: "Manage", icon: "el-icon-s-home" },
    // { text: "Show Label", icon: "el-icon-eleme" },
    { text: "Car Time", icon: "el-icon-collection-tag" },
    { text: "ECharts Page", icon: "el-icon-s-data" },
    { text: "Camera", icon: "el-icon-magic-stick" },
    { text: "Scout Mode", icon: "el-icon-eleme" },
    { text: "Drive Mode", icon: "el-icon-place" },
    { text: "Init Viewport", icon: "el-icon-loading" },
    { text: "Tour City", icon: "el-icon-video-camera-solid" },
]
const groupIndex = ref(0)
const progress = ref(0)
const css2dLabelArray = ref([])
const spriteLabelArray = ref([])
const effectController = ref({
    A: "",
})
// const username = ref("")
const canvas = ref(null)
const dynamicSprite = ref(null)
let timer = null
const curve = ref(null)
const curve2 = ref(null)
const curve3 = ref(null)
const truck = ref(null)
const car = ref(null)
const bus = ref(null)
const followTruck = ref(false)
const followBus=ref(false)
const move_rate = ref(0.0005)
const effectComposer = ref()
const outlinePass = ref()
const t = ref(0)
const loading = ref(true)
const car_staytime = ref([])

const consumetable = ref({
    title: "",
    date_lst: [],
    forecast_lst: [],
    real_lst: [],
})
const trucklist = ref({})
const carlist = ref({})
const buildinglist = ref({})
const basketballList = ref({})
const buslist = ref({})
const treelist = ref({})
const parkinglist = ref({})
const containBoxArray = ref([])
const fireArray = ref([])
// // 正常视角
// const normalView = ref(true)
const isShowScan = ref(false)
const buildingStatus = ref([])
const sky = ref(null)
const Controller = ref({})
const containerRef = ref(null)
const sun = ref(null)
const tagArray = ref([])
const click = ref(false)
const scene = ref();



export class Main {
    constructor() {
        this.labelClick = null;
        this.gui = null;
        this.isAnimating = false;
        this.animationID = 0;
        // 正常视角
        this.normalView = true
        this.velocity = new THREE.Vector3(); //
        this.direction = new THREE.Vector3(); //第一人称运动的方向
        this.prevTime = performance.now(); //上一次render的时间
        this.moveForward = false; //是否向前运行
        this.moveBackward = false; //是否向后运行
        this.moveLeft = false; //是否向左运行
        this.moveRight = false; //是否向右运行
        this.canJump = false; //是否可以跳
        this.lockcontrols = null
        // this.dataInfo=[]
        // this.dataInfo=[
        //     {key:'123',value:'123'}
        // ]
        this.init()
    }
    init() {

        // scene.value = null
        // gui.value = null
        // stats.value = null
        // camera.value = null
        // axes.value = null
        // helper.value = null
        // cubeMap.value = null
        // renderer.value = null
        // fog.value = null
        // controls.value = null
        // lockControls.value = null
        // outlinePass.value = null
        // css2dRender.value = null
        // this.effectComposer = null
        // rollTexture.value = null
        // objList.value = null

        // texture.value = null
        // mesh2.value = null
        // ambient.value = null
        // followTruck.value = null

        // prevTime.value = performance.now()
        // moveForward.value = false
        // moveBackward.value = false
        // moveLeft.value = false
        // moveRight.value = false
        // canJump.value = false
        // lockcontrols.value = null
        // isShowFire.value = false
        // clock.value = new THREE.Clock()
        // container.value = document.querySelector("#container")
        // citylistMed()
        // raychartlistMed()
        // barchartlistMed()
        // buildstatusMed()
        // init()
        // clearInterval(timer)

        // 初始化模型
        const initModelMed = (url) => {
            return new Promise((resolve, reject) => {
                new MTLLoader()
                    .setPath("/static/obj/")
                    .load(`${url}.mtl`, (materials) => {
                        materials.preload();
                        new OBJLoader()
                            .setMaterials(materials)
                            .setPath("/static/obj/")
                            .load(`${url}.obj`, (obj) => {
                                if (obj) {
                                    obj.children.forEach((child) => {
                                        if (child.name === "ground") {
                                            child.material.forEach((res) => {
                                                if (res.name === "Grass") {
                                                    (res.color.r = 0.52),
                                                        (res.color.g = 0.62),
                                                        (res.color.b = 0.52);
                                                }
                                            });
                                        }
                                    });
                                    obj.children.forEach((child) => {
                                        child.geometry.computeBoundingBox();
                                        const centroid = new THREE.Vector3();
                                        centroid.addVectors(
                                            child.geometry.boundingBox.min,
                                            child.geometry.boundingBox.max
                                        );
                                        centroid.multiplyScalar(0.5);
                                        centroid.applyMatrix4(child.matrixWorld);
                                        child.geometry.center(centroid.x, centroid.y, centroid.z);
                                        child.position.set(centroid.x, centroid.y, centroid.z);
                                    });

                                    // use `container` and `scene` directly to add the object to the scene
                                    container.appendChild(renderer.domElement);
                                    scene.add(obj);

                                    resolve(obj);
                                } else {
                                    reject("error");
                                }
                            });
                    });
            });
        };
        // 使用async方法加载模型
        async function AsyncInitModel() {
            showElLoading();
            let obj = await initModelMed("city");
            showElLoading(false);
            cloneBuilding(obj.clone());
            console.log('AsyncInitModel');
            // 初始化行驶路线
            initCurve(obj);
            initTruckCurve(obj);
            initBus(obj)
            initGui();
            initOtherModel();
            render();
            groupIndex.value = scene.children.findIndex((_) => _.type === "Group");
        }
        AsyncInitModel()
        // 创建场景
        let scene = new THREE.Scene();
        console.log(scene);
        // 创建相机
        let camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            10,
            10000
        );
        camera.position.set(1000, 1500, 3500);
        //
        const color = 0xffffff
        const intensity = 1
        // 环境光
        const light = new THREE.AmbientLight(color, intensity)
        // 点光源
        const PointLight = new THREE.PointLight(0xffffff, 0.6);
        scene.add(light)
        camera.add(PointLight);
        //初始化渲染器
        const css2dRender = new CSS2DRenderer();
        let renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            logarithmicDepthBuffer: true,
        });
        initRenderer(css2dRender, container, renderer);

        // 初始化控制器
        const controls = new OrbitControls(camera, renderer.domElement);
        initControls(controls);

        this.camera = camera;
        this.container = container;
        this.scene = scene;
        this.outlinePass = outlinePass
        this.effectController = effectController
        this.trucklist = trucklist
        this.buildinglist = buildinglist
        this.click = click
        this.controls = controls
        this.initViewpoint = initViewpoint
        this.initCar=initCar
        this.initBusView=initBusView
        this.renderer = renderer
        this.lockcontrols = new PointerLockControls(camera, document.body);
        //设置相机需要每一帧数更新OrbitControls
        function updateControls(controls) {
            controls.update();
            requestAnimationFrame(() => updateControls(controls));
        }
        updateControls(controls)


        //克隆建筑
        const cloneBuilding = (object) => {
            object.children.forEach((res) => {
                if (res.name === 'http') {
                    res.name = 'parking';
                    res.scale.set(0.8, 0.8, 0.8);
                    res.position.set(200, 100, 1400);
                    res.rotateY(-Math.PI / 2);
                    scene.add(res);
                }
                if (res.name === 'dep8') {
                    res.name = 'developmentDep';
                    res.position.set(1150, 250, 0);
                    res.rotateY(Math.PI);
                    scene.add(
                        res,
                        res.clone().translateZ(550),
                        res.clone().translateZ(1100),
                        res.clone().translateX(-500).rotateY(Math.PI).translateZ(-550),
                        res.clone().translateX(-500).rotateY(Math.PI).translateZ(0),
                        res.clone().translateX(-500).rotateY(Math.PI).translateZ(-1100)
                    );
                }
                if (res.name == 'ground') {
                    res.position.set(-400, 55, -3500);
                    res.scale.set(0.4, 0.4, 1);
                    res.rotateY(-Math.PI / 2)
                    scene.add(res);
                }
            })
        }
        // 加载其他模型
        const initOtherModel = async () => {
            // 加载银行
            // initBank(scene);

            //加载医院
            initHosiptal(scene)

            // 加载公园
            // initPark(scene);

            // 初始化救护车
            initAmbulance(scene);

            // 初始化学校
            initSchool(scene);

            // 加载建筑
            initModernBuilding(scene);

            // 加载电影院
            initCinema(scene);

            // 加载ufo
            // initUfo(scene);

            //加载警察局
            initPolice(scene)

            //加载消防局和消防车
            initFirestation(scene);
            initFirecar(scene);
        };
        // 初始化stats
        const stats = new Stats();
        stats.dom.style.position = "absolute";
        stats.dom.style.top = "0px";
        stats.dom.style.left = "180px";
        document.body.appendChild(stats.dom);
        this.stats = stats
        //初始化gui
        effectController.value = reactive({
            A: 0,
        });

        const initGui = () => {
            this.gui = new GUI();
            this.gui.domElement.classList.add();
            this.gui.domElement.style.cssText = "position:absolute;top:0;right:0px;";
            const options = {
                Helper: false,
                Fog: false,
                Verctor: false,
            };
            // this.gui.add(effectController.value, "A").name("Selected:").listen();
            this.gui.add(options, "Helper").onChange((val) => {
                if (val) {
                    const axes = new THREE.AxesHelper(5000);
                    console.log(axes);
                    scene.add(axes);
                    const helper = new THREE.GridHelper(10000, 2, 0xffffff, 0xffffff);
                    scene.add(helper);
                } else {
                    scene.remove(axes);
                    scene.remove(helper);
                }
            });
            const dropdown = { Background: "Sky" };
            const states = ["Sky", "Star", "Park"];
            this.gui.add(dropdown, "Background").options(states).onChange((val) => {
                scene.remove(sky);
                if (val == "Sky") {
                    scene.add(sky);
                } else {
                    changeSKyBox(val);
                }
            });
            this.gui.add(options, "Fog").onChange((val) => {
                if (val) {
                    scene.fog = new THREE.Fog("#FFF0F5", 100, 10000);
                } else {
                    scene.fog = "";
                }
            });
            this.gui.add(options, "Verctor").onChange(() => {
                addSpriteCanvas();
            });
        }
        // initGui(1);

        //gui改变属性
        function guiChanged(sky) {
            // 更新材质参数
            const uniforms = sky.material.uniforms;
            uniforms.rayleigh.value = Controller.rayleigh;
            uniforms.turbidity.value = Controller.turbidity;
            uniforms.mieCoefficient.value = Controller.mieCoefficient;
            uniforms.mieDirectionalG.value = Controller.mieDirectionalG;
            // 计算太阳方位
            const phi = THREE.MathUtils.degToRad(90 - Controller.elevation);
            const theta = THREE.MathUtils.degToRad(Controller.azimuth);
            sun.value.setFromSphericalCoords(1, phi, theta);
            uniforms.sunPosition.value.copy(sun.value);
        }
        //初始化背景
        function initSkyBox() {
            let sky = new Sky();
            sky.scale.setScalar(450000);
            scene.add(sky);
            sun.value = new THREE.Vector3();

            // 初始化GUI和参数
            Controller.rayleigh = 0.5;
            Controller.elevation = 2.6;
            Controller.azimuth = 180;
            Controller.turbidity = 1.8;
            Controller.mieCoefficient = 0.1;
            Controller.mieDirectionalG = 0.226;
            guiChanged(sky);
        }
        initSkyBox();

        //切换背景
        const starUrls = [
            "../../../public/static/images/skybox/dark-s_px.jpg",
            "../../../public/static/images/skybox/dark-s_nx.jpg",
            "../../../public/static/images/skybox/dark-s_py.jpg",
            "../../../public/static/images/skybox/dark-s_ny.jpg",
            "../../../public/static/images/skybox/dark-s_pz.jpg",
            "../../../public/static/images/skybox/dark-s_nz.jpg"
        ];

        const parkUrls = [
            "../../public/static/images/Park2/posx.jpg",
            "../../public/static/images/Park2/negx.jpg",
            "../../public/static/images/Park2/posy.jpg",
            "../../public/static/images/Park2/negy.jpg",
            "../../public/static/images/Park2/posz.jpg",
            "../../public/static/images/Park2/negz.jpg"
        ];
        console.log('0000', scene);
        const changeSKyBox = (type, scene) => {
            console.log('6667', type, scene);
            if (type === "Star") {
                scene.background = new THREE.CubeTextureLoader().load(starUrls);
            } else {
                scene.background = new THREE.CubeTextureLoader().load(parkUrls);
            }
        };

        //初始化视角
        function initViewpoint() {
            console.log('12312312312312131231');
            followTruck.value = false;
            followBus.value=false
            controls.position0.set(1000, 1500, 3500);
            this.normalView = true;
            controls.reset();
        }
        function initCar(){
            followTruck.value = true;
        }
        function initBusView(){
            followBus.value=true
        }
        // initViewpoint()
        // 初始化汽车路线
        const initCurve = (obj) => {
            curve.value = new THREE.CatmullRomCurve3([
                new THREE.Vector3(500, 20, -1200),
                new THREE.Vector3(500, 20, -800),
                new THREE.Vector3(500, 20, -600),
                new THREE.Vector3(500, 20, 400),
                new THREE.Vector3(-400, 20, 400),
                new THREE.Vector3(-400, 20, -600),
                new THREE.Vector3(-400, 20, -1300),
            ], true)
            const vertices = curve.value.getPoints(100);
            const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
            const lineMaterial = new THREE.LineBasicMaterial({
                transparent: true,
                opacity: 0,
            });
            const curveMesh = new THREE.Line(geometry, lineMaterial);
            scene.add(curveMesh);
            truck.value = obj.getObjectByName("truck4");
        }
        // 初始化卡车2的移动路线
        const initTruckCurve = (obj) => {
            curve2.value = new THREE.CatmullRomCurve3(
                [
                    new THREE.Vector3(-400, 20, 450),
                    new THREE.Vector3(-400, 20, -600),
                    new THREE.Vector3(-400, 20, -1300),
                    new THREE.Vector3(-1000, 20, -1200),
                    new THREE.Vector3(-1100, 20, -600),
                    new THREE.Vector3(-1100, 20, -800),
                    new THREE.Vector3(-1100, 20, 500),
                ],
                true
            );
            const vertices = curve2.value.getPoints(100);
            const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
            const lineMaterial = new THREE.LineBasicMaterial({
                transparent: true,
                opacity: 0,
            });
            const curveMesh2 = new THREE.Line(geometry, lineMaterial);
            scene.add(curveMesh2);
            car.value = obj.getObjectByName("car4");
        }
        // 初始化bus的移动路线
        const initBus = (obj) => {
            curve3.value = new THREE.CatmullRomCurve3(
                [
                    new THREE.Vector3(-530, 20, 1000),
                    new THREE.Vector3(-530, 20, 800),
                    new THREE.Vector3(-530, 20, 1800),
                ],
                true
            );
            const vertices = curve3.value.getPoints(100);
            const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
            const lineMaterial = new THREE.LineBasicMaterial({
                transparent: true,
                opacity: 0,
            });
            const curveMesh2 = new THREE.Line(geometry, lineMaterial);
            scene.add(curveMesh2);
            bus.value = obj.getObjectByName("bus");
        }
        //汽车运动
        const truckMove = (curve, truck) => {
            progress.value += move_rate.value;
            if (curve) {
                const point = curve.getPoint(progress.value);
                // 下一个要走的点的位置
                const point_next = curve.getPoint(progress.value + move_rate.value);
                if (point && point.x) {
                    truck.position.set(point.x, point.y, point.z);
                    // 向下一个要走的点方向看齐
                    truck.lookAt(point_next.x, point_next.y, point_next.z);
                    if (followTruck.value) {
                        camera.position.set(point.x, point.y + 45, point.z);
                        camera.lookAt(point_next.x, point_next.y + 45, point_next.z);
                        controls.position0.set(point.x, point.y + 45, point.z);
                        // 将控制器看齐下一个点的位置(摆正车头的位置)
                        controls.target.set(
                          point_next.x,
                          point_next.y + 45,
                          point_next.z
                        );
                      }
                }
            }
        }
        // //巴士运动
        const busMove = (curve, truck) => {
            progress.value += move_rate.value;
            if (curve) {
                const point = curve.getPoint(progress.value);
                // 下一个要走的点的位置
                const point_next = curve.getPoint(progress.value + move_rate.value);
                if (point && point.x) {
                    truck.position.set(point.x, point.y, point.z);
                    if (followBus.value) {
                        camera.position.set(point.x, point.y + 80, point.z);
                        camera.lookAt(point_next.x, point_next.y + 80, point_next.z);
                        controls.position0.set(point.x, point.y + 80, point.z);
                        // 将控制器看齐下一个点的位置(摆正车头的位置)
                        controls.target.set(
                          point_next.x,
                          point_next.y + 80,
                          point_next.z
                        );
                      }
                }
            }
            // 将canvas车速标签跟随汽车移动显示
            if (this.dynamicSprite) {
                this.dynamicSprite.position.set(
                    truck.position.x,
                    truck.position.y,
                    truck.position.z
                );
                this.dynamicSprite.translateY(100);
            }
        };

        // 初始化效果器
        const initComposerMed = () => {
            this.effectComposer = new EffectComposer(renderer);
            this.effectComposer.renderTarget1.stencilBuffer = true;
            this.effectComposer.renderTarget2.stencilBuffer = true;
            // 创建shaderPass 可以在shaderpass里面添加各种着色器达到不同的效果
            const effectCopy = new ShaderPass(CopyShader);
            // 让effectcopy渲染到屏幕上
            effectCopy.renderToScreen = true;
            // 添加renderPass通道,这个通道会渲染场景,但不会将渲染结果输出到屏幕上
            const renderPass = new RenderPass(scene, camera);
            this.effectComposer.addPass(renderPass);
            this.effectComposer.addPass(effectCopy);
            // outlinePass给对象添加轮廓线
            this.outlinePass = new OutlinePass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                scene,
                camera
            );
            this.outlinePass.edgeStrength = 5;
            this.outlinePass.visibleEdgeColor.set(0x00ffff);
            console.log('cba', this.outlinePass);
            this.effectComposer.addPass(this.outlinePass);
            // FXAAShader主要解决锯齿问题
            const effectFXAA = new ShaderPass(FXAAShader);
            effectFXAA.uniforms['resolution'].value.set(
                1 / window.innerWidth,
                1 / window.innerHeight
            );
            effectFXAA.renderToScreen = true;
            this.effectComposer.addPass(effectFXAA);
            // 获取当前组件实例对象
            // const ctx = getCurrentInstance()
            // console.log(ctx, '111');
            // console.log(controls);
            clickPick(this);

        };
        initComposerMed()




        // 初始化指针锁定控制器和监听键盘事件
        const initPointLockControl = () => {
            // this.lockcontrols = new PointerLockControls(camera, document.body);
            this.scene.add(this.lockcontrols.getObject())

            const onKeyDown = (event) => {
                switch (event.keyCode) {
                    case 38: // up
                    case 87: // w
                        this.moveForward = true;
                        break;
                    case 37: // left
                    case 65: // a
                        this.moveLeft = true;
                        break;
                    case 40: // down
                    case 83: // s
                        this.moveBackward = true;
                        break;
                    case 39: // right
                    case 68: // d
                        this.moveRight = true;
                        break;
                    case 32: // space
                        if (this.canJump === true) this.velocity.y += 350;
                        this.canJump = false;
                        break;
                }
            };
            const onKeyUp = (event) => {
                switch (event.keyCode) {
                    case 38: // up
                    case 87: // w
                        this.moveForward = false;
                        break;
                    case 37: // left
                    case 65: // a
                        this.moveLeft = false;
                        break;
                    case 40: // down
                    case 83: // s
                        this.moveBackward = false;
                        break;
                    case 39: // right
                    case 68: // d
                        this.moveRight = false;
                        break;
                }
            };
            document.addEventListener("keydown", onKeyDown, false);
            document.addEventListener("keyup", onKeyUp, false);
        }
        initPointLockControl()

        // 第一人称移动 需要在render()里面实时更新位置
        const firstPersonMove = () => {
            // 每次都获取上一次的间隔时间 因为根据性能不同每次调用循环函数的时间都是不一样的
            const time = performance.now();
            // 为了不让性能影响操作的速度 我们将他设置为一个因数 所谓性能高那么间隔时间就短
            const delta = (time - this.prevTime) / 1000;
            // 减速因子 设置一下（10）减速因子 他越快整个过程中速度就会越慢 减速的过程就会越快
            this.velocity.x -= this.velocity.x * 10.0 * delta;
            this.velocity.z -= this.velocity.z * 10.0 * delta;
            this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
            // 方向矢量 鼠标操作的时候控制方向 的变量
            // 如果正数就是往前 负数就是往后
            this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
            this.direction.x = Number(this.moveLeft) - Number(this.moveRight);
            this.direction.normalize(); // 确保了各个方向的一致运动
            // console.log('this.direction',this.direction);
            // 有一个缓冲作用 避免快速启动 更贴切现实操作 为了保证鼠标抬起后，场景不直接暂停，而是有一个简短的过渡效果
            if (this.moveForward || this.moveBackward)
                this.velocity.z -= this.direction.z * 2000.0 * delta;
            if (this.moveLeft || this.moveRight)
                this.velocity.x -= this.direction.x * 2000.0 * delta;
            // 通过getObject()获取到控制对象 translate改变位置会根据视角调整 更符合现实一点
            this.lockcontrols.getObject().translateX(this.velocity.x * delta);
            this.lockcontrols.getObject().position.y += this.velocity.y * delta; // new behavior
            this.lockcontrols.getObject().translateZ(this.velocity.z * delta);
            // 保证高于地面的距离
            if (this.lockcontrols.getObject().position.y < 100) {
                this.velocity.y = 0;
                this.lockcontrols.getObject().position.y = 100;
                this.canJump = true;
            }
            this.prevTime = time;
        }
        //环游社区
        // function tourCity() {
        //     this.normalView = false;
        //     console.log(this.camera);
        //     this.camera.position.y = 100;
        //     this.camera.lookAt(500, 100, 0);
        //     console.log(this,'818');
        //     this.lockcontrols.getObject().position.x = 0;
        //     this.lockcontrols.getObject().position.y = 100;
        //     this.lockcontrols.getObject().position.z = 580;
        //     this.lockcontrols.lock();
        // }



        renderer.setSize(window.innerWidth, window.innerHeight);
        console.log(this.lockcontrols.isLocked);
        const render = () => {
            // showElLoading();
            this.animationID = requestAnimationFrame(render);
            renderer.render(scene, camera);
            css2dRender.render(scene, camera);
            // 汽车移动方法
            truckMove(curve2.value, car.value);
            truckMove(curve.value, truck.value);
            busMove(curve3.value, bus.value);
            if (this.lockcontrols.isLocked) {
                firstPersonMove();
            }
            // console.log('666');
            stats.update();
            // 刷新动画
            TWEEN.update();
            const clock = new THREE.Clock();
            const delta = clock.getDelta();
            // console.log('delta',delta);
            // effectComposer里面是对renderer渲染器进行后期处理,则可以在他身上进行render()
            if (this.click) {
                this.effectComposer.render(delta);
            }
            // 轨道控制器和指针锁定控制器会有冲突 不能同时存在
            if (this.normalView) {
                controls.update();
            }
            // if (this.mixer !== null) {
            //     // clock.getDelta()方法获得两帧的时间间隔
            //     this.mixer.update(delta);
            // }
        }

        //监听画面变化，更新渲染
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

    tourCity() {
        this.normalView = false;
        console.log(this.camera);
        this.camera.position.y = 100;
        this.camera.lookAt(500, 100, 0);
        console.log(this, '818');
        this.lockcontrols.getObject().position.x = 0;
        this.lockcontrols.getObject().position.y = 100;
        this.lockcontrols.getObject().position.z = 580;
        this.lockcontrols.lock();
    }

    registLabelClickCallback(cb) {
        this.labelClick = cb;
    }
    changdataInfo() {
        console.log('doSomething', this.dataInfo);
    }
    beforeDestroy() {
        this.scene.clear();
        console.log(this);
        document.body.removeChild(this.stats.dom);
        this.camera = null;
        console.log('mnb', this.gui);
        document.body.removeChild(this.gui.domElement); // 从 DOM 中删除该 GUI 对象
        this.gui = null; // 将 gui 成员变量设置为 null
        console.log(this.renderer);
        cancelAnimationFrame(this.animationID);
        this.renderer.forceContextLoss();
        this.renderer.dispose();
        this.renderer.content = null;
        // const gl = this.renderer.domElement.getContext("webgl");
        // gl && gl.getExtension("WEBGL_lose_context").loseContext();
        this.controls = null;
        this.outlinePass = null;
        this.css2dRender = null;
    }


}

