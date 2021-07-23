export interface TechnicalSupportItem {
  id?: Key;
  realName?: string;
  page: number;
  pageSize: number | undefined;
}

export interface TechnicalSupport {
  id?: Key;
  realName?: string;
  nickname: string;
  avatar: string;
  technicalSupportWebsite? :string;
  remarks?: string;
  profession?: string;
  contact?: string;
}
