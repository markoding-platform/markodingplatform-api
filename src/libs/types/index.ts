export type ChatType = 'text' | 'image';
export type ProfileType = 'student' | 'teacher' | 'mentor' | 'supporter';
export type GenderType = 'perempuan' | 'laki-laki';
export enum SolutionType {
  WEB = 'web',
  MOBILE = 'mobile',
  GAME = 'game',
}
export enum IdeaStatus {
  PARTICIPANT = 'peserta',
  FINALIST = 'finalis',
  WINNER = 'pemenang',
}

type Filters = {
  solutionType?: string[];
};
type Pagination = {
  count: number;
  currentPage: number;
  totalPages: number;
  params: {
    sorts: Array<string | []>;
    filters: Filters;
    keyword: string | undefined;
  };
};
export interface PaginatedResponse<Entity> {
  data: Entity[];
  pages: Pagination;
}
export type CommonQueryString = {
  limit: number;
  offset: number;
  sort?: string;
  keyword?: string;
};

export type QueryString = {
  limit: number;
  offset: number;
  keyword?: string;
  sort?: string;
  solutionType?: string;
  problemAreaId?: string;
};

export type IdeaQueryString = CommonQueryString & {
  solutionType?: string;
  problemAreaId?: string;
};

export interface SearchResponse<Idea, Event, Blog> {
  ideas: Idea[];
  events: Event[];
  blogs: Blog[];
}
