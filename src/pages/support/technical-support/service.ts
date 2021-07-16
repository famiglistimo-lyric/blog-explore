import request from '@/utils/request';
import {TechnicalSupportItem} from "@/pages/support/technical-support/data";

// 技术支持列表分页
export async function pageTechnicalSupport(params?: TechnicalSupportItem) {
  return request(`/api/technical-support/pageTechnicalSupport`, {
    params
  });
}

// 删除文章分类
export async function deleteTechnicalSupport(id: number) {
  return request(`/api/technical-support/deleteTechnicalSupport?id=${id}`);
}
