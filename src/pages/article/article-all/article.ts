import request from '@/utils/request';
import {ArticleListItem} from "@/pages/article/article-all/data";

export async function pageArticle(params?: ArticleListItem) {
  return request(`/api/article/pageArticle`, {
    params
  });
}
