import { BASE_URL } from '../config';

export function login(params) {
  return request('/login', {
    method: 'post',
    data: params,
    baseURL: BASE_URL
  });
}

export function logout() {
  return Promise.resolve();
}
