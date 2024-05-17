import React from 'react';

function RepoList({ repos }) {
  return (
    <div>
      {repos.length === 0 ? (
        <p>No repositories found.</p>
      ) : (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
              <p>{repo.description}</p>
              <div>
                {repo.topics.map((topic) => (
                  <span key={topic} className="topic">
                    {topic}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RepoList;
