document.addEventListener('DOMContentLoaded', (event) => {
    carregarTelaEdicao();
});

function cancelar() {
  window.location.href = 'fornecedores.html';
}

function edit(permitirAlteracoes) {
  const fornecedorEditado = {
      id: parseInt(document.getElementById('id').value),
      nomeFornecedores: document.getElementById('nomeFornecedores').value,
      dataEntrega: document.getElementById('dataEntrega').value,
      cidadeFornecedores: document.getElementById('cidadeFornecedores').value,
      dtCriacao: document.getElementById('dtCriacao').value,
      dtAtualiza: document.getElementById('dtAtualiza').value
  };

  let fornecedoresJSON = localStorage.getItem('fornecedores');
  let fornecedoresObj = JSON.parse(fornecedoresJSON);

  if (Array.isArray(fornecedoresObj.fornecedores) && permitirAlteracoes) {
    fornecedoresObj.fornecedores = fornecedoresObj.fornecedores.map(fornecedor => 
      fornecedor.id === fornecedorEditado.id ? fornecedorEditado : fornecedor
    );
    localStorage.setItem('fornecedores', JSON.stringify(fornecedoresObj));
  }

  window.location.href = 'fornecedores.html';
}

function carregarTelaEdicao() {
    const fornecedor = JSON.parse(localStorage.getItem('fornecedoresSelecionado'));

    if (fornecedor) {
        document.getElementById('id').value = fornecedor.id;
        document.getElementById('nomeFornecedores').value = fornecedor.nomeFornecedores;
        document.getElementById('dataEntrega').value = fornecedor.dataEntrega;
        document.getElementById('cidadeFornecedores').value = fornecedor.cidadeFornecedores;
        document.getElementById('dtCriacao').value = fornecedor.dtCriacao || '';
        document.getElementById('dtAtualiza').value = fornecedor.dtAtualiza || '';
    }
}
