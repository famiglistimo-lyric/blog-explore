import request from '@/utils/request';
import {Article, ArticleListItem} from "@/pages/article/article-all/data";

// 文章列表分页
export function pageArticle(params?: ArticleListItem) {
  return request(`/api/article/pageArticle`, {
    params
  });
}

// 根据文章id拿到文章详情
export function getArticle(id: number) {
  return request(`/api/article/getArticle?id=${id}`);
}

// 获得所有文章分类
export function listCategory() {
  return request(`/api/category/listCategory`);
}

// 获得所有文章标签
export function listTag() {
  return request(`/api/tag/listTag`);
}

// 保存文章
export function saveArticle(article: Article) {
  return request(`/api/article/saveArticle`,{
    method: 'POST',
    data: article,
  });
}
