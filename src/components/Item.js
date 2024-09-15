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
      <button type="button" class="btn btn-danger m-1" >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
        </svg>
      </button>
    </div>
  );
};

export default Item;