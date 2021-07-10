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

// 得到当前用户信息
export function getUser(userId: number) {
  return request(`/api/user/getUser?id=${userId}`);
}

// 保存用户信息
export function saveUser(user: any) {
  return request(`/api/user/saveUser`,{
    method: 'POST',
    data: user,
  });
}
