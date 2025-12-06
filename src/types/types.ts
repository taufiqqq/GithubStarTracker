export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export interface SearchResponse {
  items: Repository[];
  total_count: number;
}