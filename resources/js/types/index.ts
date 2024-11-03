export interface AnyObject {
  [key: string]: unknown;
}

// Api response type
export interface ApiResponse<T> {
  statusCode: number;
  message?: string;
  data: T;
  meta?: unknown;
  errors?: AnyObject;
}

export interface PaginatedResponse<T> extends PaginationMeta {
  data: T;
}

export interface PaginationMeta {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page?: number;
  last_page_url?: string;
  links?: string[];
  to: number;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string;
  total?: number;
}

// Paginated express query
export interface Query extends AnyObject {
  s?: string;
  filters?: AnyObject;
  sort?: AnyObject;
  paginate?: boolean;
  include?: string | string[];
  page?: number;
  limit?: number;
  isActive?: string;
}

export type DropdownOption = {
  label: string;
  value: unknown;
};
