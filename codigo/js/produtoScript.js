document.addEventListener('DOMContentLoaded', (event) => {
    carregarTelaEdicao();
});

function cancelar() {
  edit(false);
}

function edit(permitirAlteracoes) {
  const produtoEditado = {
      id: parseInt(document.getElementById('id').value),
      nome: document.getElementById('nome').value,
      quantidade: document.getElementById('qnt').value,
      preco: document.getElementById('preco').value,
      codBarras: document.getElementById('codBarras').value,
      descricao: document.getElementById('desc').value,
      dtCriacao: document.getElementById('dtCriacao').value,
      dtAtualiza: document.getElementById('dtAtualiza').value
  };

  let produtosJSON = localStorage.getItem('produtos');
  let array = [];
  if (produtosJSON) {
    array = JSON.parse(produtosJSON)
  }
  if (Array.isArray(array.produtos) && permitirAlteracoes) {
    array.produtos.forEach((produto, i) => {
      if (produto.id == produtoEditado.id) {
        array.produtos.splice(i, 1, produtoEditado)
      }
    });
  }

  window.location.href = 'menu-principal.html'
  carregarPaginaPrincipal(array.produtos);
}

function carregarTelaEdicao() {
    const produto = JSON.parse(localStorage.getItem('produtoSelecionado'));

    if (produto) {
        document.getElementById('id').value = produto.id;
        document.getElementById('nome').value = produto.nome;
        document.getElementById('qnt').value = produto.quantidade;
        document.getElementById('preco').value = produto.preco;
        document.getElementById('codBarras').value = produto.codBarras;
        document.getElementById('desc').value = produto.descricao;
        document.getElementById('dtCriacao').value = produto.dtCriacao;
        document.getElementById('dtAtualiza').value = produto.dtAtualiza;
    }
}