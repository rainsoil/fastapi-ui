import request from '@/axios';
import {baseUrl} from '@/config/env';

export const loginByUsername = (username, password, code, redomStr) => request({
    url: baseUrl + '/login',
    method: 'post',
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    meta: {
        isToken: false
    },
    params: {
        username,
        password,
        // code,
        // redomStr
    }
})

export const getUserInfo = () => request({
    url: baseUrl + '/admin/user/info',
    method: 'get',
});

export const refeshToken = () => request({
    url: baseUrl + '/user/refresh',
    method: 'post'
})

export const getMenu = () => request({
    url: baseUrl + '/menu',
    method: 'get',

});

export const getTopMenu = (type = 2) => request({
    url: baseUrl + '/menu',
    method: 'get',
    params: {
        type
    }
});

export const sendLogs = (list) => request({
    url: baseUrl + '/logout',
    method: 'post',
    data: list
})

export const logout = () => request({
    url: baseUrl + '/logout',
    meta: {
        isToken: false
    },
    method: 'get'
})
export const getDict = (type) => request({
    url: baseUrl + '/dict/type/' + type,
    method: 'get'
})
export const register = (data) => request({
    url: baseUrl + '/sys/tenant/register',
    method: 'post',
    data: data
})

export const getTree = () => request({
    url: baseUrl + '/business/sysRegion/tree',
    method: 'get'
})

