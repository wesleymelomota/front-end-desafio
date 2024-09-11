import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../services/api';

const ItemForm = ({ onSave, item = {} }) => {
  const [titulo, setTitulo] = useState(item.titulo || '');
  const [descricao, setDescricao] = useState(item.descricao || '');
  const [prioridade, setPrioridade] = useState(item.prioridade || false );
  const [estado, setEstado] = useState(item.estado || '');
  const [isChecked, setIsChecked] = useState();
  const [itemDto, setItem] = useState({titulo: "", descricao: "", prioridade: false, estado: ""})
  const { id } = useParams();

  useEffect(() => {
    api.get(`/item/${id}`)
      .then(response => setItem(response.data))
      .catch(error => console.error('Erro ao buscar lista:', error));

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ titulo, descricao, prioridade, estado });
  };
  const atualizar = () => {
    api.put(`/item/${id}`, {id, titulo, descricao, prioridade, estado})
      .then(response => setItem(response.data))
      .catch(error => console.error('Erro ao buscar item:', error));
  }
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setPrioridade(event.target.checked);
    
  };
  const handleSelectChange = (event) => {
    setEstado(event.target.value);
  };

  return (
    <>
    {itemDto.id ?
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={itemDto.titulo}
        onChange={(e) => setItem({titulo: e.target.value})}
        required
      />
      
      <div class="form-check form-switch">
        <input class="form-check-input" checked={isChecked} onChange={handleCheckboxChange} type="checkbox" role="switch" id="flexSwitchCheckChecked" />
        <label class="form-check-label" for="flexSwitchCheckChecked">Destacar</label>
        </div>
      <textarea
        placeholder="Descrição"
        value={itemDto.descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
      />
        <select value={itemDto.estado} onChange={handleSelectChange} class="form-select" aria-label="Default select example">
            <option selected>Estado</option>
            <option value="PENDENTE">PENDENTE</option>
            <option value="CONCLUIDO">CONCLUIDO</option>
            <option value="EM_PROGRESSO">EM PROGRESSO</option>
        </select> 
        
        <button class="btn btn-success" onClick={atualizar} type="button">Alterar</button> 
        <Link to={`/`}><button type="button" class="btn btn-primary">
        inicio
      </button></Link>
        
    </form> : 
    <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Título"
      value={titulo}
      onChange={(e) => setTitulo(e.target.value)}
      required
    />
    
    <div class="form-check form-switch">
      <input class="form-check-input" checked={isChecked} onChange={handleCheckboxChange} type="checkbox" role="switch" id="flexSwitchCheckChecked" />
      <label class="form-check-label" for="flexSwitchCheckChecked">Destacar</label>
      </div>
    <textarea
      placeholder="Descrição"
      value={descricao}
      onChange={(e) => setDescricao(e.target.value)}
      required
    />
      <select value={estado} onChange={handleSelectChange} class="form-select" aria-label="Default select example">
          <option selected>Estado</option>
          <option value="PENDENTE">PENDENTE</option>
          <option value="CONCLUIDO">CONCLUIDO</option>
          <option value="EM_PROGRESSO">EM PROGRESSO</option>
      </select>  
      <button class="btn btn-success" type="submit">Salvar</button>
    </form>}
    </>
  );
};

export default ItemForm;