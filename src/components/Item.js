import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ item, onToggle, onDelete }) => {
  return (
    <div style={{ textDecoration: item.isDestacado ? 'underline' : 'none' }}>
      <h4>{item.titulo}</h4>
      <p>{item.descricao}</p>
      <Link to={`/lists/alterar/${item.id}`}><button type="button" class="btn btn-success m-1" onClick={() => onToggle(item.id)}>
        
        Alterar
      </button></Link>
      
      <button type="button" class="btn btn-primary m-1" onClick={() => onDelete(item.id)}>Excluir</button>
    </div>
  );
};

export default Item;