import request from '@/utils/request';
import {ArticleCategoryItem, Category} from "@/pages/article/article-category/data";

// 分类列表分页
export async function pageCategory(params?: ArticleCategoryItem) {
  return request(`/api/category/pageCategory`, {
    params
  });
}

// 保存文章分类
export async function saveCategory(category: Category) {
  return request(`/api/category/saveCategory`, {
    method: 'POST',
    data: category,
  });
}

// 删除文章分类
export async function deleteCategory(id: number) {
  return request(`/api/category/deleteCategory?id=${id}`);
}
