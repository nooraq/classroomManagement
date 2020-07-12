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
export function getComments(params) {
  return request('/notes', {
    method: 'get',
    params,
    baseURL: BASE_URL
  });
}
export function postComment(params) {
  return request('/notes', {
    method: 'post',
    data: params,
    baseURL: BASE_URL
  });
}
export function deleteComment(params) {
  return request(`/notes/${params.id}`, {
    method: 'delete',
    baseURL: BASE_URL
  });
}
export function getCourses(params) {
  return request('/courses', {
    method: 'get',
    params,
    baseURL: BASE_URL
  });
}
export function postCourse(params) {
  return request('/courses', {
    method: 'post',
    data: params,
    baseURL: BASE_URL
  });
}
export function deleteCourse(params) {
  return request(`/courses/${params.id}`, {
    method: 'delete',
    baseURL: BASE_URL
  });
}

export function getCourseComments(params) {
  return request('/coursenotes', {
    method: 'get',
    params,
    baseURL: BASE_URL
  });
}

export function postCourseComment(params) {
  return request('/coursenotes', {
    method: 'post',
    data: params,
    baseURL: BASE_URL
  });
}

export function getData(params) {
  return request('/materials', {
    method: 'get',
    params,
    baseURL: BASE_URL
  });
}
export function postData(params) {
  return request('/materials', {
    method: 'post',
    data: params,
    baseURL: BASE_URL
  });
}

export function deleteMaterials(params) {
  return request(`/materials/${params.id}`, {
    method: 'delete',
    baseURL: BASE_URL
  });
}
export function postUser(params) {
  return request(`/users/${params.id}`, {
    method: 'post',
    baseURL: BASE_URL,
    data: params
  });
}
export function getUsers(params) {
  return request('/users', {
    method: 'get',
    baseURL: BASE_URL,
    params
  });
}
export function deleteUser(params) {
  return request(`/users/${params.id}`, {
    method: 'delete',
    baseURL: BASE_URL
  });
}
