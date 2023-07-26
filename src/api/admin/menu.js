import request from '@/axios';
import {baseUrl} from '@/config/env';

export const fetchMenuTree = () => request({
  url: baseUrl + '/menu/tree',
  method: 'get',
});

export const addObj = (obj) => request({
  url: baseUrl + '/menu',
  method: 'post',
  data: obj
});

export const putObj = (obj) => request({
  url: baseUrl + '/menu',
  method: 'put',
  data: obj
});

export const remove = (id) => {
  return request({
    url:  baseUrl +'/menu/'+id,
    method: 'delete',
   
  })
}