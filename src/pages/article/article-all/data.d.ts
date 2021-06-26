export interface ArticleListItem {
  id?: Key;
  title?: string;
  status?: number;
  category?: number;
  tag?: number;
  page: number;
  pageSize: number | undefined;
}

export interface Article {
  id?: Key;
  title: string;
  status: number;
  categoryId: number;
  tagList: any[];
  stamp: boolean;
  comments: boolean;
  recommend: boolean;
  appreciate: boolean;

}

export interface CategorySelectItem {
  id?: Key;
  name?: string;
}

export interface TagSelectItem {
  id?: Key;
  name?: string;
}

