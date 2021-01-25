export type ChatType = 'text' | 'image';
export type ProfileType = 'student' | 'teacher' | 'mentor' | 'supporter';
export type GenderType = 'perempuan' | 'laki-laki';
export enum SolutionType {
  WEB = 'Web',
  MOBILE = 'Mobile',
  GAME = 'Game',
}
export enum IdeaStatus {
  PARTICIPANT = 'Peserta',
  FINALIST = 'Finalis',
  WINNER = 'Pemenang',
}
type Pagination = {
  count: number;
  currentPage: number;
  totalPages: number;
  params: {
    sorts: Array<string | undefined>;
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
