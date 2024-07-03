document.addEventListener('DOMContentLoaded', (event) => {
  let fornecedorData = localStorage.getItem('fornecedoresSelecionado');
  if (fornecedorData) {
      let fornecedor = JSON.parse(fornecedorData);
      document.getElementById('nomeFornecedores').innerText = fornecedor.nomeFornecedores;
      document.getElementById('email').innerText = fornecedor.email;
      document.getElementById('telefone').innerText = fornecedor.telefone;
      document.getElementById('endereco').innerText = fornecedor.endereco;
      document.getElementById('dataEntrega').innerText = fornecedor.dataEntrega;
      document.getElementById('cidadeFornecedores').innerText = fornecedor.cidadeFornecedores;

      // Preenchendo os campos de edição
      document.getElementById('editNome').value = fornecedor.nomeFornecedores;
      document.getElementById('editEmail').value = fornecedor.email;
      document.getElementById('editTelefone').value = fornecedor.telefone;
      document.getElementById('editEndereco').value = fornecedor.endereco;
      document.getElementById('editDataEntrega').value = fornecedor.dataEntrega;
      document.getElementById('editCidade').value = fornecedor.cidadeFornecedores;
  }
});

function editarFornecedor() {
  document.getElementById('form-edicao').style.display = 'block';
  document.getElementById('btnEditar').style.display = 'none';
}

function cancelarEdicao() {
  document.getElementById('form-edicao').style.display = 'none';
  document.getElementById('btnEditar').style.display = 'inline-block';
}

function salvarEdicao() {
  let fornecedorEditado = {
      nomeFornecedores: document.getElementById('editNome').value,
      email: document.getElementById('editEmail').value,
      telefone: document.getElementById('editTelefone').value,
      endereco: document.getElementById('editEndereco').value,
      dataEntrega: document.getElementById('editDataEntrega').value,
      cidadeFornecedores: document.getElementById('editCidade').value
  };

  let fornecedoresData = localStorage.getItem('fornecedores');
  let fornecedoresObj = JSON.parse(fornecedoresData);

  fornecedoresObj = fornecedoresObj.map(fornecedor => 
      fornecedor.id === JSON.parse(localStorage.getItem('fornecedoresSelecionado')).id ? fornecedorEditado : fornecedor
  );

  localStorage.setItem('fornecedores', JSON.stringify(fornecedoresObj));
  localStorage.setItem('fornecedoresSelecionado', JSON.stringify(fornecedorEditado));

  // Atualizando a visualização
  document.getElementById('nomeFornecedores').innerText = fornecedorEditado.nomeFornecedores;
  document.getElementById('email').innerText = fornecedorEditado.email;
  document.getElementById('telefone').innerText = fornecedorEditado.telefone;
  document.getElementById('endereco').innerText = fornecedorEditado.endereco;
  document.getElementById('dataEntrega').innerText = fornecedorEditado.dataEntrega;
  document.getElementById('cidadeFornecedores').innerText = fornecedorEditado.cidadeFornecedores;

  cancelarEdicao();
}

function voltar() {
  window.location.href = 'fornecedores.html';
}