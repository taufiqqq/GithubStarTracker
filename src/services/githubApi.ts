import type { SearchResponse } from '../types/types';

const API_BASE = 'https://api.github.com';

export const fetchTrendingRepos = async (page = 1): Promise<SearchResponse> => {
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
  const dateStr = tenDaysAgo.toISOString().split('T')[0];
  
  const url = `${API_BASE}/search/repositories?q=created:>${dateStr}&sort=stars&order=desc&page=${page}&per_page=30`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Please try again later.');
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};