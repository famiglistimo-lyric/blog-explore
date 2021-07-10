import request from '@/utils/request';
import {OneArticleTag, ArticleTagItem} from "@/pages/article/article-tag/data";

// 标签列表分页
export async function pageTag(params?: ArticleTagItem) {
  return request(`/api/tag/pageTag`, {
    params
  });
}

// 保存文章标签
export async function saveTag(tag: OneArticleTag) {
  return request(`/api/tag/saveTag`, {
    method: 'POST',
    data: tag,
  });
}

// 删除文章标签
export async function deleteTag(id: number) {
  return request(`/api/tag/deleteTag?id=${id}`);
}
