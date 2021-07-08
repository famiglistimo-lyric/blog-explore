import request from 'umi-request';

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryProvince() {
  return request('/api/geographic/province');
}

export async function queryCity(province: string) {
  return request(`/api/geographic/city/${province}`);
}

export async function query() {
  return request('/api/users');
}

// 分类列表分页
export function getUser(userId: number) {
  return request(`/api/user/getUser?id=${userId}`);
}
