import React, { useState } from 'react';

const ListForm = ({ onSave, list = {} }) => {
  const [nome, setNome] = useState(list.nome || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ nome });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome da Lista"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ListForm;