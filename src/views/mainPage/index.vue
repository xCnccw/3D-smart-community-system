<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="180px">
        <!-- <el-row class="tac"> -->
        <el-menu active-text-color="#ffd04b" background-color="#001428" class="left-menu" text-color="#fff"
          default-active="1" :default-openeds="['8']">
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
          <el-menu-item index="2" @click="initEchart">
            <el-icon>
              <Histogram />
            </el-icon>
            <span>查看总体数据</span>
          </el-menu-item>

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
            <el-menu-item index="8-2">
              <el-icon>
                <Van />
              </el-icon>
              <span>车辆视角</span>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item index="4">
            <el-icon>
              <setting />
            </el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
          <el-menu-item v-show="userInfo.type == 0 || userInfo.type == 1" index="9" @click="goAdmin">
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
        <div id="chart1" class="chart chartLayout"></div>
        <div id="chart2" class="chart chartLayout"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, reactive, onBeforeUnmount } from "vue";
import {
  Document,
  Menu as IconMenu,
  Loading,
  Setting,
  Histogram,
} from "@element-plus/icons-vue";
import * as echarts from "echarts";
import { initEchartOption1, initEchartOption2 } from "../../utils/echarts";
import { Avatar, SwitchButton, Promotion, Tools, VideoCamera, Van } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { Main } from "./Main"
import { before } from "lodash";
const router = useRouter();

const containerRef = ref(null)
const dataInfo = ref([])
// 城市空气质量雷达图
const cityAQI = reactive({
  title: "",
  mor_lst: [],
  noon_lst: [],
  even_lst: [],
})
// 家庭支出统计图
const consumetable = reactive({
  title: "",
  date_lst: [],
  forecast_lst: [],
  real_lst: [],
})

var mainApp = null;


//获取用户信息
const userInfo = computed(() => JSON.parse(localStorage.getItem('userInfo')))
console.log(userInfo.type, "用户信息");
//退出登录
const out = () => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('token')
  router.push('/loginPage');
};

//加载初始化视角
function initViewpoint() {
  console.log('initViewpoint', mainApp);
  mainApp.initViewpoint()
}
//加载echart表
function initEchart() {
  for (const ele of document.querySelectorAll(".chart")) {
    ele.style.display = ele.style.display === "block" ? "none" : "block";
  }
  const div1 = document.querySelector("#chart1");
  const div2 = document.querySelector("#chart2");
  const pageChart1 = echarts.init(div1);
  const pageChart2 = echarts.init(div2);
  const dataBJ = cityAQI.mor_lst;
  const dataGZ = cityAQI.noon_lst;
  const dataSH = cityAQI.even_lst;
  const lineStyle = {
    width: 1,
    opacity: 0.8,
  };
  pageChart1.setOption(
    initEchartOption1(cityAQI.title, lineStyle, dataBJ, dataGZ, dataSH)
  );
  container.appendChild(div1);
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
  pageChart2.setOption(
    initEchartOption2(
      consumetable.date_lst,
      consumetable.real_lst,
      consumetable.forecast_lst
    )
  );
  container.appendChild(div2);
}
//加载第一人称
function initTourCity() {
  mainApp.tourCity()
}
//跳转系统后台
function goAdmin() {
  router.push('/adminMain')
}



onMounted(() => {
  mainApp = new Main()
  mainApp.registLabelClickCallback((_dataInfo) => {
    // console.log('click')
    dataInfo.value = _dataInfo;

  })
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
</style>
