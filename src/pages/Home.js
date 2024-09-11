import React, { useState, useEffect } from 'react';
import List from '../components/List';
import ListForm from '../components/ListForm';
import api from '../services/api';
import './home.css'

const Home = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    api.get('/listas')
      .then(response => setLists(response.data))
      .catch(error => console.error('Erro ao buscar listas:', error));
  }, []);

  const addList = (list) => {
    api.post('/listas', list)
      .then(response => setLists([...lists, response.data]))
      .catch(error => console.error('Erro ao criar lista:', error));
  };

  const deleteList = (id) => {
    api.delete(`/listas/${id}`)
      .then(() => setLists(lists.filter(list => list.id !== id)))
      .catch(error => console.error('Erro ao excluir lista:', error));
  };

  return (
    <div className="container">
        <span className="d-flex p-2 justify-content-center">
            <h2 className="text-primary">Minhas Listas</h2>
            <ListForm onSave={addList} />
        </span>
      <span className="p-2">
        {lists.map(list => (
            <List key={list.id} list={list} onDelete={deleteList} />
        ))}
      </span>
    </div>
  );
};

export default Home;
