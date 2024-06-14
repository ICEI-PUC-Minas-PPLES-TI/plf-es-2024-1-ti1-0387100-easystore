document.addEventListener('DOMContentLoaded', (event) => {
  let fornecedorData = localStorage.getItem('fornecedoresSelecionado');
  if (fornecedorData) {
      let fornecedor = JSON.parse(fornecedorData);
      document.getElementById('nomeFornecedores').innerText = fornecedor.nomeFornecedores;
      document.getElementById('email').innerText = fornecedor.email;
      document.getElementById('telefone').innerText = fornecedor.telefone;
      document.getElementById('endereco').innerText = fornecedor.endereço;
      document.getElementById('dataEntrega').innerText = fornecedor.dataEntrega;
      document.getElementById('cidadeFornecedores').innerText = fornecedor.cidadeFornecedores;
  }
});

function voltar() {
  window.location.href = 'fornecedores.html';
}
