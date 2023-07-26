import {createApp} from 'vue'
import website from './config/website'
import axios from './axios';
import router from './router/';
import store from './store';
import i18n from './lang/';
import {language, messages} from './lang/';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import crudCommons from '@/cruds/cruds.js'


import './permission';
import error from './error';
import basicBlock from 'components/basic-block/main.vue'
import basicContainer from 'components/basic-container/main.vue'
import App from './App.vue'
import 'animate.css'
import dayjs from 'dayjs'
import 'styles/common.scss';
import echarts from "./utils/echarts/echarts";

import {
    iconfontUrl,
    iconfontVersion
} from '@/config/env';
import {loadStyle,getScreen,dictFormatterHandler} from './utils/util'
// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
    loadStyle(iconfontUrl.replace('$key', ele));
})
window.$crudCommons = crudCommons
window.axios = axios;
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.component('basicContainer', basicContainer)
app.component('basicBlock', basicBlock)
app.config.globalProperties.$dayjs = dayjs
app.config.globalProperties.website = website
app.config.globalProperties.getScreen = getScreen
app.config.globalProperties.dictFormatterHandler = dictFormatterHandler
app.config.globalProperties.$echarts = echarts
app.use(error);
app.use(i18n)
app.use(store)
app.use(router)
app.use(ElementPlus, {
    locale: messages[language]
})
app.use(Avue, {
    axios,
    locale: messages[language]
})
app.mount('#app')
