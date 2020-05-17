import axios from 'axios'
import toLogin from "@/libs/login";

const instance = axios.create({
    // baseURL: VUE_APP_API_URL,
    timeout: 5000
  });

 function baseRequest(options) {
    const token = $store.state.app.token;
    const headers = options.headers || {};
    headers["Authorization"] = "Bearer " + token;
    options.headers = headers;
    console.log(options);
    if (options.login && !token) {
      toLogin();
      return Promise.reject({ msg: "未登录", toLogin: true });
    }
    return instance(options).then(res => {
      const data = res.data || {};
  
      if (res.status !== 200)
        return Promise.reject({ msg: "请求失败", res, data });
  
      if ([410000, 410001, 410002].indexOf(data.status) !== -1) {
        toLogin();
        return Promise.reject({ msg: res.data.msg, res, data, toLogin: true });
      } else if (data.status === 200) {
        return Promise.resolve(data, res);
      } else {
        return Promise.reject({ msg: res.data.msg, res, data });
      }
    });
  }

  /**
 * http 请求基础类
 * 参考文档 https://www.kancloud.cn/yunye/axios/234845
 *
 */
const request = ["post", "put", "patch"].reduce((request, method) => {
    console.log(method)
    /**
     *
     * @param url string 接口地址
     * @param data object get参数
     * @param options object axios 配置项
     * @returns {AxiosPromise}
     */
    request[method] = (url, data = {}, options = {}) => {
      return baseRequest(
        Object.assign({ url, data, method }, defaultOpt, options)
      );
    };
    return request;
  }, {});
  
  ["get", "delete", "head"].forEach(method => {
    /**
     *
     * @param url string 接口地址
     * @param params object get参数
     * @param options object axios 配置项
     * @returns {AxiosPromise}
     */
    request[method] = (url, params = {}, options = {}) => {
      return baseRequest(
        Object.assign({ url, params, method }, defaultOpt, options)
      );
    };
  });

  export default request;

// const http = options  => {
//     return new Promise((resolve, reject)=>{
//         const defaultOptions = {};
//         const newOptions = {
//             ...defaultOptions,
//             ...options
//           };
//           //headers默认传递json格式数据，这里也可以设置token，每次调用都会携带
//         newOptions.headers = {
//             'content-Type': 'application/json;charset=UTF-8',
//             ...newOptions.headers
//         };
//         axios({
//             method: newOptions.method,
//             url: newOptions.url,
//             data: newOptions.data,
//             headers: newOptions.headers
//         }).then(res=>{
//             if(res.status == 200){
//                 resolve(res.data);
//             }else{
//                 reject(res);
//             }
//         }).catch(err=>{
//             reject(err);
//         })

//     })
// };

// export default http