import {Idea} from '../../api/entity';

export type ChatType = 'text' | 'image';
export type ProfileType = 'student' | 'teacher' | 'mentor' | 'supporter';
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
};
export interface PaginatedResponse<Entity> {
  data: Entity[];
  pages: Pagination;
}
export type CommonQueryString = {
  limit: number;
  offset: number;
};
