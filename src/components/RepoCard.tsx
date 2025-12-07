import type { Repository } from '../types/types';
import { formatStars } from '../utils/utils';
import '../styles/RepoCard.css';

export function RepoCard({ repo }: { repo: Repository }) {
  const handleClick = () => {
    if (confirm(`Visit ${repo.name}?`)) {
      window.open(repo.html_url, '_blank');
    }
  };

  return (
    <div className="repo-card" onClick={handleClick}>
      <h3>{repo.name}</h3>
      {repo.description && <p>{repo.description}</p>}

      <div className="repo-footer">
        <div className="owner">
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <span>{repo.owner.login}</span>
        </div>
        <div className="stars">
          <span>★</span>
          <span>{formatStars(repo.stargazers_count)}</span>
        </div>
      </div>
    </div>
  );
}