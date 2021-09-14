import request from "@/utils/request";

export async function getArticleDetail(id: any) {
  return request(`/api/article/getArticleDetail?id=${id}`);
}

export async function uploadToOss(params: any) {
  return request(`https://yi-blog.oss-cn-hangzhou.aliyuncs.com`, {
    method: 'POST',
    body: params,
  });
}
