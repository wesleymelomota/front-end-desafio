import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from '../components/Item';
import ItemForm from '../components/ItemForm';
import api from '../services/api';
import { Link } from 'react-router-dom';

const ListDetails = () => {
  const { id } = useParams();
  const [list, setList] = useState({});
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});

  useEffect(() => {
    api.get(`/listas/${id}`)
      .then(response => setList(response.data))
      .catch(error => console.error('Erro ao buscar lista:', error));

    api.get(`/listas/${id}/itens`)
      .then(response => setItems(response.data))
      .catch(error => console.error('Erro ao buscar itens:', error));
  }, [id]);

  const addItem = (itemDto) => {
    api.post(`/item/${list.id}`, itemDto)
      .then(response => setItems([...items, response.data]))
      .catch(error => console.error('Erro ao adicionar item:', error));
  };

  const toggleItem = (itemId) => {
    const item = items.find(i => i.id === itemId);
    setItem(item);
    api.put(`/itens/${itemId}`, { ...item, isDestacado: !item.isDestacado })
      .then(response => setItems(items.map(i => (i.id === itemId ? response.data : i))))
      .catch(error => console.error('Erro ao destacar item:', error));
  };

  const deleteItem = (itemId) => {
    api.delete(`/item/${itemId}`)
      .then(() => setItems(items.filter(i => i.id !== itemId)))
      .catch(error => console.error('Erro ao excluir item:', error));
  };

  return (
    <div>
      <h2 className='text-center'>{list.nome}</h2>
      <ItemForm onSave={addItem} item={item}/>
        {items.map(item => (
          <span className='d-flex m-2'>
            <Item key={item.id} item={item} onToggle={toggleItem} onDelete={deleteItem} />
          </span>
        ))}
      
    </div>
  );
};

export default ListDetails;
