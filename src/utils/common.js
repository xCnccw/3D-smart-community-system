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

  //从接口请求那边转正常语法
export function promiseToArr(promise, errorExt = null) {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err) => {
      if (errorExt) {
        Object.assign(err, errorExt);
      }
      return [err, undefined];
    });
}