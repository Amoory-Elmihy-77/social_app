export type postsState = {
  posts: null | Post[];
};

export interface ApiResponse {
  message: string;
  paginationInfo: PaginationInfo;
  posts: Post[];
}

export interface PaginationInfo {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
  total: number;
}

export interface Post {
  _id: string;
  body: string;
  image: string;
  user: User;
  createdAt: string; // ISO date string
  comments: Comment[];
  id: string; // duplicate of _id, possibly for frontend ID tracking
}

export interface User {
  _id: string;
  name: string;
  photo: string;
}

export interface Comment {
  _id: string;
  content: string;
  commentCreator: User;
  post: string; // post ID
  createdAt: string;
}
