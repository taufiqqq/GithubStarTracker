import React from 'react';
import type { Repository } from '../types/types';
import { formatStars } from '../utils/utils';
import '../styles/RepoCard.css';

interface Props {
  repo: Repository;
}

export const RepoCard: React.FC<Props> = ({ repo }) => {
  return (
    <div className="repo-card" onClick={() => window.open(repo.html_url, '_blank')}>
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
};