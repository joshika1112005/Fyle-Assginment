import React, { useState } from 'react';
import axios from 'axios';
import RepoList from './repolist';
import './App.css';


function App() {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
        params: {
          page: page,
          per_page: perPage,
        },
      });
      setRepos(response.data);
    } catch (error) {
      console.error("Error fetching repositories", error);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>GitHub Repositories</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      
      <div>
        <label htmlFor="perPage">Repos per page:</label>
        <select
          id="perPage"
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <RepoList repos={repos} />
      )}

      <div>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default App;
