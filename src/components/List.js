import React from 'react';
import { Link } from 'react-router-dom';

const List = ({ list, onDelete }) => {
  return (
    <div>
      <h3>{list.nome}</h3>
      <Link to={`/lists/${list.id}`}>Ver Itens</Link>
      <button onClick={() => onDelete(list.id)}>Excluir Lista</button>
    </div>
  );
};

export default List;