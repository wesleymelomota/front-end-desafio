import React, { useState } from 'react';

const ListForm = ({ onSave, list = {} }) => {
  const [nome, setNome] = useState(list.nome || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ nome });
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
        <div class="col-auto">
          <label for="inputPassword2" class="visually-hidden">Adicionar Tarefa</label>
          <input required value={nome} onChange={(e) => setNome(e.target.value)} type="text" class="form-control"  placeholder="Adicionar Tarefa"/>
        </div>
      <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-3">Salvar</button>
      </div>
    </form>
  );
};

export default ListForm;