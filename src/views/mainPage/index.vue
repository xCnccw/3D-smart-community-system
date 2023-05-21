<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="180px">
        <!-- <el-row class="tac"> -->
        <el-menu active-text-color="#ffd04b" background-color="#001428" class="left-menu" text-color="#fff"
          default-active="1" :default-openeds="['2','8']">
          <div class="username">
            <el-icon :size="25" style="position:relative;top:5px;margin: 0 5px 0 10px">
              <Avatar />
            </el-icon>
            <span>{{ userInfo.username }}</span>
          </div>
          <el-menu-item index="1" @click="initViewpoint">
            <el-icon>
              <Loading />
            </el-icon>
            <span>初始化视角</span>
          </el-menu-item>
          
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <Histogram />
              </el-icon>
              <span>查看总体数据</span>
            </template>
            <el-menu-item index="2-1" @click="initEchartRay">
              <el-icon>
                <PartlyCloudy />
              </el-icon>
              <span>空气质量</span>
            </el-menu-item>
            <el-menu-item index="2-2" @click="initEchartHouse">
              <el-icon>
                <HomeFilled />
              </el-icon>
              <span>入住户数</span>
            </el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="8">
            <template #title>
              <el-icon>
                <VideoCamera />
              </el-icon>
              <span>环游社区</span>
            </template>
            <el-menu-item index="8-1" @click="initTourCity">
              <el-icon>
                <Promotion />
              </el-icon>
              <span>第一人称</span>
            </el-menu-item>
            <el-menu-item index="8-2" @click="initCar">
              <el-icon>
                <Van />
              </el-icon>
              <span>驾驶模式</span>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item index="4" @click="drawer = true">
            <el-icon>
              <ChatLineSquare />
            </el-icon>
            <span>通知中心</span>
          </el-menu-item>
          <el-menu-item v-show="userInfo.type == 1||userInfo.type == 0" index="9" @click="goAdmin">
            <el-icon>
              <Tools />
            </el-icon>
            <span>系统后台</span>
          </el-menu-item>
          <el-menu-item index="10" @click="out">
            <el-icon>
              <SwitchButton />
            </el-icon>
            <span>退出登录</span>
          </el-menu-item>
        </el-menu>
        <!-- </el-row> -->
      </el-aside>

      <el-main>
        <div id="container" ref="containerRef" class="container_box"></div>
        <el-card style="width: 300px" class="label">
          <div v-for="(info, index) in dataInfo" :key="index">
            <span>{{ info.key }}</span>
            <span style="display: inline-block; margin-left: 50px">{{
              info.value
            }}</span>
            <el-divider />
          </div>
        </el-card>
        <div id="chart1" class="chart1 chartLayout"></div>
        <div id="chart2" class="chart2 chartLayout"></div>
      </el-main>
    </el-container>
    <el-drawer
    v-model="drawer"
    title="通知中心"
    :direction="direction"
    :before-close="handleClose"
  >
  <el-table :data="notifications" style="width: 100%" dark="true">
    <el-table-column prop="title" fixed label="标题" width="100" />
    <el-table-column prop="releaseTime" label="日期" width="200" />
    <el-table-column prop="content" label="详情" width="500" />
  </el-table>
  </el-drawer>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, reactive, onBeforeUnmount } from "vue";
import {
  Document,
  Menu as IconMenu,
  Loading,
  ChatLineSquare,
  Histogram,
} from "@element-plus/icons-vue";
import * as echarts from "echarts";
import { ElNotification } from 'element-plus';
import { initEchartOption1, initEchartOption2 } from "../../utils/echarts";
import { Avatar, SwitchButton, Promotion, Tools, VideoCamera, Van,PartlyCloudy,HomeFilled } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { Main } from "./Main"
import { before } from "lodash";
import { getChartsList, getbarChartsList } from "@/apis/charts.js"
import { notificationsList } from "@/apis/notifications.js"
import { showElLoading, promiseToArr } from '@/utils/common.js';
const router = useRouter();
const drawer = ref(false)
const direction = ref('rtl')
const containerRef = ref(null)
const dataInfo = ref([])
let notifications
// 城市空气质量雷达图
const cityAQI = ref({
  title: "",
  mor_lst: [],
  noon_lst: [],
  even_lst: [],
})
// 家庭支出统计图
const consumetable = ref({
  title: "",
  date_lst: [],
  forecast_lst: [],
  real_lst: [],
})



var mainApp = null;


//获取用户信息
const userInfo = computed(() => JSON.parse(localStorage.getItem('userInfo')))
//退出登录
const out = () => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('token')
  router.push('/loginPage');
};

//加载初始化视角
function initViewpoint() {
  mainApp.initViewpoint()
}
//加载空气质量echart表
function initEchartRay() {
  for (const ele of document.querySelectorAll(".chart1")) {
    ele.style.display = ele.style.display === "block" ? "none" : "block";
  }
  const div1 = document.querySelector("#chart1");

  const pageChart1 = echarts.init(div1);

  const dataBJ = cityAQI.value.mor_lst;
  const dataGZ = cityAQI.value.noon_lst;
  const dataSH = cityAQI.value.even_lst;
  const lineStyle = {
    width: 1,
    opacity: 0.8,
  };
  pageChart1.setOption(
    initEchartOption1(cityAQI.value.title, lineStyle, dataBJ, dataGZ, dataSH)
  );
  container.appendChild(div1);
}
//加载入住户数echart表
function initEchartHouse() {
  for (const ele of document.querySelectorAll(".chart2")) {
    ele.style.display = ele.style.display === "block" ? "none" : "block";
  }
  const div2 = document.querySelector("#chart2");
  const pageChart2 = echarts.init(div2);
  pageChart2.setOption(
    initEchartOption2(
      consumetable.value.date_lst,
      consumetable.value.real_lst,
      consumetable.value.forecast_lst
    )
  );
  pageChart2.on("updateAxisPointer", function (event) {
    const xAxisInfo = event.axesInfo[0];
    if (xAxisInfo) {
      const dimension = xAxisInfo.value + 1;
      pageChart2.setOption({
        series: {
          id: "pie",
          label: {
            formatter: "{b}: {@[" + dimension + "]} ({d}%)",
          },
          encode: {
            value: dimension,
            tooltip: dimension,
          },
        },
      });
    }
  });
  container.appendChild(div2);
}
//加载第一人称
function initTourCity() {
  mainApp.tourCity()
}
//加载车辆视角 
function initCar() {
  mainApp.initCar()
}
//加载巴士视角
function initBusView() {
  mainApp.initBusView()
}
//跳转系统后台
function goAdmin() {
  router.push('/adminMain')
}

//通知弹窗
const notify = async () => {
  const [res] = await promiseToArr(notificationsList());
  notifications = res;
  ElNotification({
    title: notifications[0].title,
    message: notifications[0].content,
    type: 'warning',
  })
}



// 空气质量接口
const raychartlistMed = async () => {
  const [res] = await promiseToArr(getChartsList());
  const morList = [];
  const noonList = [];
  const evenList = [];
  cityAQI.value.title = res[0].title;
  morList.push(
    res[0].aqi,
    res[0].pm2,
    res[0].pm10,
    res[0].co,
    res[0].no2,
    res[0].so2
  );
  cityAQI.value.mor_lst.push(morList);
  noonList.push(
    res[1].aqi,
    res[1].pm2,
    res[1].pm10,
    res[1].co,
    res[1].no2,
    res[1].so2
  );
  cityAQI.value.noon_lst.push(noonList);
  evenList.push(
    res[2].aqi,
    res[2].pm2,
    res[2].pm10,
    res[2].co,
    res[2].no2,
    res[2].so2
  );
  cityAQI.value.even_lst.push(evenList);
  // });
};
// 入住率接口
const barchartlistMed = async () => {
  const [res] = await promiseToArr(getbarChartsList());
  const bardata = res;
  bardata.forEach((element) => {
    consumetable.value.date_lst.push(element.date);
    consumetable.value.forecast_lst.push(element.forecastcount);
    consumetable.value.real_lst.push(element.realcount);
  });
};

onMounted(() => {
  raychartlistMed()
  barchartlistMed()
  mainApp = new Main()
  mainApp.registLabelClickCallback((_dataInfo) => {
    dataInfo.value = _dataInfo;
  })
  notify()
})
onBeforeUnmount(() => {
  mainApp.beforeDestroy()
})




</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.container_box{
  overflow-x: hidden;
}
.left-menu {
  //让Menu占满整个高度
  height: 100vh;
}

.username {
  color: rgb(206, 206, 206);
  padding: 15px;
  font-size: 22px;
  border-bottom: 1px solid rgb(255, 255, 255);
  cursor: pointer;

  span {
    padding-left: 10px;
  }
}

.label {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  display: none;

  span {
    display: inline-block;
    width: 100px;
  }
}

.chartLayout {
  width: 500px;
  height: 500px;
  position: absolute;
  bottom: 0;
  display: block;
  border-radius: 10px;
}

.videoImg {
  background: url(/static/images/close.png) no-repeat;
  float: right;
  width: 24px;
  height: 24px;
  margin: 10px 20px 10px 0;
  cursor: pointer;
}

.container_box {
  height: 100%;
}

#chart1 {
  left: 190px;
  bottom: 30px;
}

#chart2 {
  right: 10px;
  bottom: 30px;
}

// .el-menu {
//   height: 100%;
// }
.el-main {
  padding: 0;
  margin: 0;
}


.css2dLabel {
  padding: 4px 10px;
  color: #ffbbaa;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  border-radius: 5px;
  font-size: 16px;
  pointer-events: none;
}

.tag {
  /* border:solid #009999 1px; */
  background: linear-gradient(#00ffff, #00ffff) left top,
    linear-gradient(#00ffff, #00ffff) left top,
    linear-gradient(#00ffff, #00ffff) right bottom,
    linear-gradient(#00ffff, #00ffff) right bottom;
  background-repeat: no-repeat;
  background-size: 1px 6px, 6px 1px;
  background-color: rgba(255, 0, 0, 0.4);
  color: #ffffff;
  font-size: 18px;
  padding: 8px 12px;
}
//覆盖通知弹框的样式
.el-notification {
  // background-color: rgb(0, 0, 0);
  background:rgba(4, 20, 38);
  color: #fff;
}

.el-notification__title {
  color: #fff;
}
.el-notification__content{
  color: #fff;
}
</style>