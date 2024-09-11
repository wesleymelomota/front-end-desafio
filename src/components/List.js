import React from 'react';
import { Link } from 'react-router-dom';

const List = ({ list, onDelete }) => {
  return (
    <div className='d-flex p-2 flex-column'>
      <h3 className="p2 text-center text-uppercase">{list.nome}</h3>
      <Link className='class="link-offset-2 link-underline link-underline-opacity-0' to={`/lists/${list.id}`}>Ver Itens</Link>
      <button className='btn btn-danger' onClick={() => onDelete(list.id)}>Excluir Lista</button>
    </div>
  );
};

export default List;