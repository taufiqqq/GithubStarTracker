import { useState, useEffect, useCallback, useRef } from 'react';
import type { Repository } from '../types/types';
import { fetchTrendingRepos } from '../services/githubApi';

export const useRepos = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(1);

  // To track when loading is in progress to prevent duplicate requests
  const isLoadingRef = useRef(false);

  //Load repos for given page
  const loadRepos = useCallback(async (page: number, append = false) => {
    if (isLoadingRef.current) return;
    
    try {
      isLoadingRef.current = true;
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      
      const data = await fetchTrendingRepos(page);
      
      setRepos(prev => {
        const newRepos = append ? [...prev, ...data.items] : data.items;
        return newRepos;
      });
      setHasMore(data.items.length === 30);
      pageRef.current = page;
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      console.error('Hook Error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      isLoadingRef.current = false;
    }
  }, []);

  //Load more repos for next page
  const loadMore = useCallback(() => {
    //Only load more if not already loading and has more data
    if (!isLoadingRef.current && hasMore) {
      loadRepos(pageRef.current + 1, true);
    }
  }, [hasMore, loadRepos]);

  //Retry from start or after error
  const retry = useCallback(() => {
    pageRef.current = 1;
    setRepos([]);
    setHasMore(true);
    loadRepos(1);
  }, [loadRepos]);

  //Trigger initial load
  useEffect(() => {
    loadRepos(1);
  }, [loadRepos]);

  return { repos, loading, loadingMore, error, hasMore, loadMore, retry };
};