import request from '@/utils/request';
import {ArticleCategoryItem} from "@/pages/article/article-category/data";

//分类列表分页
export function pageCategory(params?: ArticleCategoryItem) {
  return request(`/api/category/pageCategory`, {
    params
  });
}
