import { BASE_URL } from '../config';
import request from '../util/request';

export function postBulletin(params) {
  return request('/notices', {
    method: 'post',
    data: params,
    baseURL: BASE_URL
  });
}
export function getBulletins(params) {
  return request('/notices', {
    method: 'get',
    data: params,
    baseURL: BASE_URL
  });
}
export function deleteBulletin(params) {
  return request(`/notices/${params.id}`, {
    method: 'delete',
    baseURL: BASE_URL
  });
}
