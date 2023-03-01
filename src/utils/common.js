import { ElLoading } from 'element-plus';



//公共显示、关闭 loading
export function showElLoading(isShow = true) {
    const loading = ElLoading.service({
      lock: true,
      text: 'Loading...',
      background: 'rgba(0, 0, 0, 0.7)',
    });
    !isShow ? loading.close() : null;
    return loading;
  }