import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const ItemForm = ({ onSave, item = {} }) => {
  const [itemDto, setItem] = useState({titulo: "", descricao: "", prioridade: false, estado: ""});
  const [titulo, setTitulo] = useState(item.titulo || '');
  const [descricao, setDescricao] = useState(item.descricao || '');
  const [prioridade, setPrioridade] = useState(item.prioridade || false );
  const [estado, setEstado] = useState(item.estado || '');
  const [isChecked, setIsChecked] = useState();
  const { id } = useParams();
  const navigate = useNavigate()
  
  useEffect(() => {
   
    api.get(`/item/${id}`)
      .then(response => setItem(response.data))
      .catch(error => console.error('Erro ao buscar item:', error));
    
  }, [id]);

  const handleSubmit = (e) => {
    
    e.preventDefault();
    onSave({ titulo, descricao, prioridade, estado });
    navigate("/")
  };
  const atualizar = () => {
    api.put(`/item/${id}`, itemDto)
      .then(response => setItem(response.data))
      .catch(error => console.error('Erro ao atualizar item:', error));
    navigate("/")
  }
  
  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setIsChecked(checked);
    setPrioridade(event.target.value)
    setItem(prevItem => ({
      ...prevItem,
      prioridade: checked
    }));
  };
  
  const handleSelectChange = (event) => {
    const { value } = event.target;
    setEstado(event.target.value)
    setItem(prevItem => ({
      ...prevItem,
      estado: value
    }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  };

  return (
    <>
    {itemDto.id ?
    <form onSubmit={handleSubmit} className='container d-flex flex-column mb-3'>
      <input
      className='form-control m-2'
        type="text"
        placeholder="Título"
        name="titulo"
        value={itemDto.titulo}
        onChange={handleInputChange}
        required
      />
      
      <div class="form-check form-switch m-2">
        <input className='form-control' name="prioridade" class="form-check-input" checked={isChecked} onChange={handleCheckboxChange} type="checkbox" role="switch" id="flexSwitchCheckChecked" />
        <label class="form-check-label" for="flexSwitchCheckChecked">Destacar</label>
        </div>
      <textarea
        placeholder="Descrição m-2"
        className='form-control'
        name="descricao"
        value={itemDto.descricao}
        onChange={handleInputChange}
        required
      />
        <select value={itemDto.estado} onChange={handleSelectChange} class="form-select" aria-label="Default select example">
            <option selected >Como está essa tarefa ?</option>
            <option  value="PENDENTE">PENDENTE</option>
            <option value="CONCLUIDO">CONCLUIDO</option>
            <option value="EM_PROGRESSO">EM PROGRESSO</option>
        </select> 
        
        <button class="btn btn-success m-3" onClick={atualizar} type="button">Alterar</button> 
        <Link to={`/`}><button type="button" class="btn btn-primary">
        inicio
      </button></Link>
        
    </form> : 
    <form onSubmit={handleSubmit} className='container d-flex flex-column mb-3'>
        <input
          className='form-control p-3'
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
    
    <div class="form-check form-switch m-2">
      <input class="form-check-input" checked={isChecked} onChange={handleCheckboxChange} type="checkbox" role="switch" id="flexSwitchCheckChecked" />
      <label class="form-check-label" for="flexSwitchCheckChecked">Destacar</label>
      </div>
    <textarea
      className='form-control m-3'
      placeholder="Descrição"
      value={descricao}
      onChange={(e) => setDescricao(e.target.value)}
      required
    />
      <select value={estado} onChange={handleSelectChange} class="form-select" aria-label="Default select example">
          <option selected >Como está essa tarefa ?</option>
          <option  value="PENDENTE">PENDENTE</option>
          <option value="CONCLUIDO">CONCLUIDO</option>
          <option value="EM_PROGRESSO">EM PROGRESSO</option>
      </select>  
      <span className='d-flex'>
        <button class="btn btn-success m-2" type="submit">Salvar</button>
        <Link to={`/`}><button type="button" class="btn btn-primary m-2">Inicio</button></Link>
      </span>
    </form>}
    </>
  );
};

export default ItemForm;