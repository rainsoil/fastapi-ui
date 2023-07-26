import request from '@/axios';
import {baseUrl} from '@/config/env';

/**
 * 分页获取
 * @param urlName url
 * @param obj 参数
 */
export const list = (urlName, obj) => request({
    url: baseUrl + urlName,
    method: 'post',
    data: obj
})
/**
 * 列表查询
 * @param urlName url
 */
export const getList = (urlName) => request({
    url: baseUrl + urlName,
    method: 'get',
})
/**
 * 新增
 * @param urlName url
 * @param obj 新增参数
 */
export const add = (urlName, obj) => request({
    url: baseUrl + urlName,
    method: 'post',
    data: obj
})
/**
 * 根据id删除
 * @param urlName url
 * @param id id
 */
export const del = (urlName, id) => request({
    url: baseUrl + urlName + '/' + id,
    method: 'delete'
})
/**
 * 修改
 * @param urlName url
 * @param obj 参数
 */
export const update = (urlName, obj) => request({
    url: baseUrl + urlName,
    method: 'put',
    data: obj
})
