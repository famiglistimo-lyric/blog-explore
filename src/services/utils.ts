import request from '@/utils/request';

// 获得服务端的签名
export async function getPolicy() {
  return request(`/api/oss/policy`);
}
