import request from "@/utils/request";

export async function getArticleDetail(id: any) {
  return request(`/api/article/getArticleDetail?id=${id}`);
}
