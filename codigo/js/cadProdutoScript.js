const addFornecedorSelect = document.getElementById('addFornecedor');
const fornecedorForm = document.getElementById('fornecedorForm');
const addButton = document.getElementById('add');
const closeIcon = document.getElementById('closeIcon');

function gerarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener('DOMContentLoaded', function () {
  addFornecedorSelect.addEventListener('change', function () {
    if (this.value === 'sim') {
        fornecedorForm.classList.remove('hidden');
    } else {
        fornecedorForm.classList.add('hidden');
    }
  });
});

function cadastrarProduto() {
  const codBarras = document.getElementById('codBarras').value;
  const nomeProduto = document.getElementById('nomeProduto').value;
  const quantidade = document.getElementById('quantidade').value;
  const descricaoProduto = document.getElementById('descricaoProduto').value;
  const precoUnitario = document.getElementById('precoUnitario').value;

  let fornecedores = null;
  if (addFornecedorSelect.value === 'sim') {
      const nomeFornecedor = document.getElementById('nomeFornecedor').value;
      const dataEntrega = document.getElementById('dataEntrega').value;
      const cidadeFornecedor = document.getElementById('cidadeFornecedor').value;

      fornecedores = {
        nomeFornecedor: nomeFornecedor,
        dataEntrega: dataEntrega,
        cidadeFornecedor: cidadeFornecedor
      };
  }

  // Criar um objeto para armazenar os dados
  const produto = {
    id: gerarNumeroAleatorio(100, 10000),
    nome: nomeProduto,
    quantidade: parseInt(quantidade),
    descricao: descricaoProduto,
    codBarras: parseInt(codBarras),
    preco: parseFloat(precoUnitario),
    fornecedores: fornecedores
  };

  let produtosJSON = localStorage.getItem('produtos');

  let array = [];
  if (produtosJSON) {
    array = JSON.parse(produtosJSON)
    array.produtos.push(produto)
  }


  document.getElementById('produtoForm').reset();
  fornecedorForm.classList.add('hidden');
  addFornecedorSelect.value = 'nao';

  
  window.location.href = 'index.html'
  carregarPaginaPrincipal(array.produtos);
};


closeIcon.addEventListener('click', function () {
  window.location.href = 'index.html';
});

function cancelarCadastroProduto() {
  window.location.href = 'index.html';
}
