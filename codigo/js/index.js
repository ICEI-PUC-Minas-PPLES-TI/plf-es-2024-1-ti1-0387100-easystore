const produtos = [
  {
      "id": 1,
      "nome": "Tênis Azul",
      "quantidade": 3,
      "descricao": "Tênis Azul Numero 41",
      "preco": 119.90,
      "codBarras": 789456123456
  },
  {
      "id": 2,
      "nome": "Camiseta Branca",
      "quantidade": 5,
      "descricao": "Camiseta Branca Tamanho M",
      "preco": 49.90,
      "codBarras": 789456123457
  },
  {
      "id": 3,
      "nome": "Calça Jeans",
      "quantidade": 2,
      "descricao": "Calça Jeans Azul Escuro",
      "preco": 159.90,
      "codBarras": 789456123458
  },
  {
    "id": 4,
    "nome": "Jaqueta de Couro",
    "quantidade": 1,
    "descricao": "Jaqueta de Couro Preta",
    "preco": 299.90,
    "codBarras": 789456123459
},
{
    "id": 5,
    "nome": "Óculos de Sol",
    "quantidade": 10,
    "descricao": "Óculos de Sol com Proteção UV",
    "preco": 79.90,
    "codBarras": 789456123460
},
{
    "id": 6,
    "nome": "Relógio de Pulso",
    "quantidade": 5,
    "descricao": "Relógio de Pulso Digital",
    "preco": 199.90,
    "codBarras": 789456123461
},
{
    "id": 7,
    "nome": "Mochila Escolar",
    "quantidade": 7,
    "descricao": "Mochila Escolar com Compartimentos",
    "preco": 99.90,
    "codBarras": 789456123462
},
{
    "id": 8,
    "nome": "Smartphone",
    "quantidade": 3,
    "descricao": "Smartphone com Tela de 6.5 polegadas",
    "preco": 1299.90,
    "codBarras": 789456123463
}
];

document.addEventListener('DOMContentLoaded', (event) => {
  // renderizarMenuPrincipal();
  carregarPaginaPrincipal();
});

function carregarPaginaPrincipal(produtosParaSeremCarregados) {
  let DadosLocalStorage = localStorage.getItem('produtos');
  if (DadosLocalStorage == null) {
    const produtosJSON = JSON.stringify({ "produtos": produtos });
    localStorage.setItem('produtos', produtosJSON);
  } else if (produtosParaSeremCarregados != null) {
    const produtosJSON = JSON.stringify({ "produtos": produtosParaSeremCarregados });
    localStorage.setItem('produtos', produtosJSON);
  }

  let produtosData = localStorage.getItem('produtos');
  if (produtosData) {
    let produtosObj = JSON.parse(produtosData);

    let produtosHTML = produtosObj.produtos.map(produto => {
        return `
          <tr id=${produto.id}>
            <td>${produto.descricao}</td>
            <td>${produto.quantidade}</td>
            <td>
                <button class="btn btn-danger btn-sm"><i class="bi bi-dash-circle-fill"></i></button>
                <button class="btn btn-success btn-sm"><i class="bi bi-plus-circle-fill"></i></button>
            </td>
          </tr>
        `;
    }).join('');

    document.getElementById('produtosTableBody').innerHTML = produtosHTML;
  } else {
      alert('Nenhum produto encontrado no Local Storage!');
  }

  document.querySelectorAll('tr').forEach(linha => {
    linha.addEventListener('click', function() {
      const arrayJSON = localStorage.getItem('produtos');
      if (arrayJSON) {
        let array = JSON.parse(arrayJSON);
        let idProcurado = parseInt(linha.id);
        if (Array.isArray(array.produtos)) {
          let objetoEncontrado = array.produtos.find(objeto => objeto.id === idProcurado);
          console.log('teste objetoEncontrado ->', objetoEncontrado);
          const objetoEncontradoString = JSON.stringify(objetoEncontrado)
          localStorage.setItem('produtoSelecionado', objetoEncontradoString)

          window.location.href = 'edicao-produto.html'
          carregarTelaEdicao();
        }
      }
    })
  })

  document.querySelectorAll('.btn-danger').forEach(botao => {
    botao.addEventListener('click', function () {
        let componenteQuantidade = this.closest('tr').querySelector('td:nth-child(2)');
        let quantidade = parseInt(componenteQuantidade.textContent);
        if (quantidade > 0) {
          componenteQuantidade.textContent = quantidade - 1;
        }
    });
  });

  document.querySelectorAll('.btn-success').forEach(button => {
    button.addEventListener('click', function () {
      let componenteQuantidade = this.closest('tr').querySelector('td:nth-child(2)');
      let quantidade = parseInt(componenteQuantidade.textContent);
      componenteQuantidade.textContent = quantidade + 1;
    });
  });
}

document.querySelector('#descricao').addEventListener('click', function() {
  iconeDescricao = document.querySelector('#icone-descricao');
  if (iconeDescricao.className == 'bi bi-sort-alpha-up-alt') {
    iconeDescricao.className = 'bi bi-sort-alpha-down';
  } else {
    iconeDescricao.className = 'bi bi-sort-alpha-up-alt';
  }
})

document.querySelector('#quantidade').addEventListener('click', function() {
  iconeDescricao = document.querySelector('#icone-quantidade');
  if (iconeDescricao.className == 'bi bi-sort-numeric-up-alt') {
    iconeDescricao.className = 'bi bi-sort-numeric-down';
  } else {
    iconeDescricao.className = 'bi bi-sort-numeric-up-alt';
  }
})
