export interface ArticleTagItem {
  id?: Key;
  name?: string;
  articleCounts?: number;
  page: number;
  pageSize: number | undefined;
}

export interface OneArticleTag {
  id?: key;
  name?: string;
}
