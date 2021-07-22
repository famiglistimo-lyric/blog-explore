import request from '@/utils/request';
import {TechnicalSupport, TechnicalSupportItem} from "@/pages/support/technical-support/data";

// 技术支持列表分页
export async function pageTechnicalSupport(params?: TechnicalSupportItem) {
  return request(`/api/technical-support/pageTechnicalSupport`, {
    params
  });
}

// 删除技术支持
export async function deleteTechnicalSupport(id: number) {
  return request(`/api/technical-support/deleteTechnicalSupport?id=${id}`);
}

// 保存技术支持
export async function saveTechnicalSupport(technicalSupport: TechnicalSupport) {
  return request(`/api/technical-support/saveTechnicalSupport`,{
    method: 'POST',
    data: technicalSupport,
  });
}

// 根据技术支持id拿到技术支持详情
export async function getTechnicalSupport(id: number) {
  return request(`/api/technical-support/getTechnicalSupport?id=${id}`);
}
