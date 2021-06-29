export interface ArticleCategoryItem {
  id?: Key;
  name?: string;
  articleCounts?: number;
  page: number;
  pageSize: number | undefined;
}

export interface Category {
  id?: key;
  name?: string;
}
