import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [erro, setError] = useState(false);

  const buscarTarefas = async () => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos'
      );
      setTarefas(response.data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    buscarTarefas();
  }, []);

  return (
    <div className="App">
      <h1>Tarefas</h1>

      {erro && <h2>Algo de errado não deu certo</h2>}

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <p>Titulo: {tarefa.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
