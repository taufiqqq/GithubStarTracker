import { useEffect, useRef } from 'react';
import { useRepos } from './hooks/hooks';
import { RepoCard } from './components/RepoCard';
import { Loading } from './components/Loading';
import { ErrorMessage } from './components/ErrorMessage';
import './App.css';

function App() {
  const { repos, loading, loadingMore, error, hasMore, loadMore, retry } = useRepos();
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = observerRef.current;
    if (!currentRef || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        threshold: 0,
        rootMargin: '100px'
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [repos.length]); // Only recreate when repos change (after successful loads)

  return (
    <div className="app">
      <header className="header">
        <h1>Trending Repos</h1>
        <p>Most-starred GitHub repositories created in the last 10 days</p>
      </header>

      <main className="main">        
        {loading && repos.length === 0 ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} onRetry={retry} />
        ) : repos.length === 0 ? (
          <ErrorMessage message="No trending repositories found" />
        ) : (
          <>
            {repos.map(repo => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
            
            {hasMore && (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                {loadingMore && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #f3f3f3',
                      borderTop: '2px solid #1976d2',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    <span style={{ color: '#666' }}>Loading...</span>
                  </div>
                )}
              </div>
            )}
            
            {/* Invisible trigger for intersection observer */}
            {hasMore && (
              <div
                ref={observerRef}
                style={{
                  height: '1px',
                  width: '100%',
                  background: 'transparent',
                }}
              />
            )}
            
            {!hasMore && repos.length > 0 && (
              <div style={{ 
                textAlign: 'center', 
                padding: '20px', 
                color: '#666' 
              }}>
                That's all for now!
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
