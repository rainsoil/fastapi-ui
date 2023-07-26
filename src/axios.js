/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios'
import store from '@/store/';
import router from '@/router/'
import {serialize} from 'utils/util'
import {getToken} from 'utils/auth'
import {ElMessage} from 'element-plus'
import website from '@/config/website';
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
axios.defaults.timeout = 10000;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
    return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = false;
// NProgress Configuration
NProgress.configure({
    showSpinner: false
});
//HTTPrequest拦截
axios.interceptors.request.use(config => {
    NProgress.start() // start progress bar
    const meta = (config.meta || {});
    const isToken = meta.isToken === false;
    let auth = getToken();
    if (getToken() && !isToken) {
        config.headers[website.Authorization] = 'Bearer ' + getToken() // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
    }
    //headers中配置serialize为true开启序列化
    if (config.method === 'post' && meta.isSerialize === true) {
        config.data = serialize(config.data);
    }
    return config
}, error => {
    return Promise.reject(error)
});
//HTTPresponse拦截
axios.interceptors.response.use(res => {
    NProgress.done();
    const urlObj = new URL(res.config.url);
    const uri = urlObj.pathname;
    const message = res.data.msg || '系统异常,请联系管理员';
    const status = Number(res.data.status) || 200;
    // 状态处理
    if (status === 401) {
        window.sessionStorage.clear();
        // window.sessionStorage.removeItem('token');
        // sessionStorage.removeItem("saas-menuAll");
        // sessionStorage.removeItem("saas-token");
        // sessionStorage.removeItem("saas-menu");
        // window.sessionStorage.removeItem('userInfo');
        // 清空缓存信息
        router.push({path: '/login'})
        location.reload();
    }
    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
        ElMessage({
            message: message,
            type: 'error'
        })
        return Promise.reject(new Error(message))
    }

    if (uri == "/login") {
        return res.data;
    }

    return res;
}, error => {
    NProgress.done();
    return Promise.reject(new Error(error));
})

export default axios;
