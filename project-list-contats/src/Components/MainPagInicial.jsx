import React, { useEffect, useState } from "react";
import "./MainPagInicial.css";
import { Contatos } from "./Contatos";

const MainPagInicial = () => {
  const [contatos, setContatos] = useState(Contatos);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [temWhats, setTemWhats] = useState(true);
  const [observacao, setObservacao] = useState("");
  const [editado, setEditado] = useState(false)
  const [contatoEditadoId, setContatoEditadoId] = useState(null);

  useEffect(() => {
    console.log(editado); 
  }, [editado]);

  const traduzirBoolean = (valor) => {
    return valor ? "Sim" : "Não";
  };

  const adicionar = (e) => {
    e.preventDefault();
    
    if(editado === false){
      const verificandoTelefone = contatos.find((user) => user.telefone === telefone);
      if (verificandoTelefone) {
        alert("Esse Telefone já está cadastrado!");
        return false;
      }
      let novoContato = {
        id: (contatos.length + 1),
        nome: nome,
        telefone: telefone,
        temWhats: temWhats,
        observacao: observacao,
      };
      setContatos([...contatos, novoContato]);
      
      setNome("");
      setTelefone("");
      setTemWhats(true);
      setObservacao("");
    }
  };

  const salvarEdicao = (e) => {
    e.preventDefault();

    if (contatoEditadoId !== null) {
      const contatoIndex = contatos.findIndex((contato) => contato.id === contatoEditadoId);

      if (contatoIndex !== -1) {
        const contatoAtualizado = {
          id: contatoEditadoId,
          nome: nome,
          telefone: telefone,
          temWhats: temWhats,
          observacao: observacao,
        };

        const novosContatos = [...contatos];
        novosContatos[contatoIndex] = contatoAtualizado;
        setContatos(novosContatos);
      }

      setNome("");
      setTelefone("");
      setTemWhats(true);
      setObservacao("");
      setEditado(false);
      setContatoEditadoId(null);
    }
  };

  const editar = (id) => {
    setEditado(true);
    setContatoEditadoId(id);
    const achandoOItem = contatos.find((user) => user.id === id);

    if (achandoOItem) {
      setNome(achandoOItem.nome);
      setTelefone(achandoOItem.telefone);
      setTemWhats(achandoOItem.temWhats);
      setObservacao(achandoOItem.observacao);
    }
  };
  

  const deletar = (id) => {
    const novaListaContatos = contatos.filter((contato) => contato.id !== id);
  
    setContatos(novaListaContatos);
  };


  return (
    <>
      <div className="container">
        <form className="formCadastro" onSubmit={editado?salvarEdicao:adicionar}>
          <h1 className="titulo">Formulário de cadastro:</h1>
          <div className="divInputs">
            <label htmlFor="nome" className="form-label">
              Nome
            </label>
            <input
              value={nome}
              type="text"
              className="input"
              id="nome"
              placeholder="Nome"
              required
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="divInputs">
            <label htmlFor="telefone" className="form-label">
              Telefone
            </label>
            <input
              value={telefone}
              type="tel"
              className="input"
              id="telefone"
              placeholder="Telefone"
              required
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
          <div className="divInputs">
            <label htmlFor="observacao" className="form-label">
              Observação
            </label>
            <input
              value={observacao}
              type="text"
              className="input"
              id="observacao"
              placeholder="Observação"
              required
              onChange={(e) => setObservacao(e.target.value)}
            />
          </div>
          <div className="divInputsCheckbox">
            <label htmlFor="temWhats" className="form-label">
              Tem Whatsapp?
            </label>
            <input
              type="checkbox"
              checked={temWhats}
              className="inputCheckbox"
              id="temWhats"
              onChange={() => setTemWhats(!temWhats)}
            />
          </div>
          <div className="erroForm"></div>
          <button type="submit" className="buttonSubmit">
            {editado?"Salvar Edicão":"Adicionar"}
          </button>
          <ul className="conteinerContatos">
            <h1 className="tituloconteinerContatos">Meus Contatos</h1>
            {contatos.map((item) => (
              <li className="liContatos">
                <div className="idContato">Numero: {item.id}</div>
                <div className="nomeContato">Nome: {item.nome}</div>
                <div className="telefoneContato">Telefone: {item.telefone}</div>
                <div className="observacaoContato">Observação: {item.observacao}</div>
                <div className="temWhatsContato">Tem WhatsApp? {traduzirBoolean(item.temWhats)}</div>
                <div className="ConteinerButtonsLi">
                  <button className="buttonsLi" onClick={() => editar(item.id)} type="button">EDITAR</button>
                  <button className="buttonsLi" onClick={() => deletar(item.id)} type="button">DELETAR</button>
                </div>
                <hr/>
              </li>
            ))}
          </ul>
        </form>
      </div>

    </>
  );
};

export default MainPagInicial;

