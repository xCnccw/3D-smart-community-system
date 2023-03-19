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