import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const List = ({ list, onDelete }) => {
  const [mostrarInput, setMostrarInput] = useState(false)
  const [id, setId] = useState()
  const [nome, setNome] = useState("")
  
  const mudarEstado = ()=> {
    if(mostrarInput){
      setMostrarInput(false)
    }else{
      setMostrarInput(true)
    }
  }
  const salvar = ()=> {
    if(nome == ""){
      alert("O campo está vazio")
    }
    api.put(`/listas/${list.id}`, {id, nome})
    .then(response => response.data)
    .catch(error => console.error('Erro ao atualizar lista:', error))
    setNome("")
  }
  const atualizarNome = (e) => {
    setId(list.id)
    setNome(e.target.value)
  }
  return (
    <div className='d-flex p-2 flex-column'>
      <h3 className="p2 text-center text-uppercase">{list.nome} <button onClick={mudarEstado} type="button" class="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
        </svg></button>
      </h3>
      {mostrarInput ? 
      <span className='d-flex '>
        <input required onChange={atualizarNome} value={nome} type="text" class="form-control"  placeholder="Mudar nome Lista.."/>
        <button onClick={salvar} type="button" class="btn btn-success">Salvar</button>
      </span>
      : <></>}
      <Link className='class="link-offset-2 link-underline link-underline-opacity-0' to={`/lists/${list.id}`}>Ver Itens</Link>
      <button className='btn btn-danger' onClick={() => onDelete(list.id)}>Excluir Lista</button>
    </div>
  );
};

export default List;