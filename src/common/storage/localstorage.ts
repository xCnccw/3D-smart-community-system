/**
 * localStorage本地存储方法封装
 */
var localstore = {
  /**
   * 设置存储
   * @param {*} key
   * @param {*} value
   */
  set(key: string, value: object) {
    //JavaScript=>json
    localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * 获取指定Key的内容
   * @param {*} key
   * @param {不存在时返回的默认值} defaultValue
   */
  get(key: string, defaultValue: object) {
    var value = localStorage.getItem(key);
    if (value != null && value != "undefined") {
      //json=>JavaScript
      return JSON.parse(value);
    } else {
      return defaultValue;
    }
  },

  /**
   * 删除某个Key的内容
   * @param {*} key
   */
  remove(key: string) {
    localStorage.removeItem(key);
  },

  /**
   * 清除所有的localStorage存储内容
   */
  clear() {
    localStorage.clear();
  }
};

export default localstore;
