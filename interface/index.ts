export * from './dashboard';
export * from './navigation';
export * from './auth.entity';
export * from './user-profile.entity';

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}
