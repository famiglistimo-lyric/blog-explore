export interface ArticleListItem {
  id?: Key;
  title?: string;
  status?: number;
  category?: number;
  tag?: number;
  page: number;
  pageSize: number | undefined;
}
