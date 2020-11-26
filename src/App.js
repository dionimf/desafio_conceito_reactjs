import React, { useState, useEffect} from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(res=>{
      setRepositories(res.data);
    })
  }, []);

  async function handleAddRepository() {
    const res = await api.post('repositories', { 
      title: 'Teste',
      url: 'https://github.com/dionimf',
      techs: ['node', 'python']
    });

    setRepositories([...repositories, res.data])
    // TODO
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(
      repo => repo.id !== id
    ));
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
