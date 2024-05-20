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

let count = 0;

document.addEventListener('DOMContentLoaded', (event) => {
  renderizarMenuPrincipal();
  carregarPaginaPrincipal();
});

function carregarPaginaPrincipal(produtosParaSeremCarregados) {
  let DadosLocalStorage = localStorage.getItem('produtos');
  if (DadosLocalStorage == null) {
    const produtosJSON = JSON.stringify({ "produtos": produtos });
    localStorage.setItem('produtos', produtosJSON);
    count++;
  } else if (produtosParaSeremCarregados != null) {
    const produtosJSON = JSON.stringify({ "produtos": produtosParaSeremCarregados });
    localStorage.setItem('produtos', produtosJSON);
    count++;
  } else {
  }
  


  let produtosData = localStorage.getItem('produtos');
  if (produtosData) {
    let produtosObj = JSON.parse(produtosData);
    console.log(produtosObj);

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
          const objetoEncontradoString = JSON.stringify(objetoEncontrado)
          localStorage.setItem('produtoSelecionado', objetoEncontradoString)

          renderizarPaginaEdicao();
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

function renderizarPaginaEdicao() {
  body = document.querySelector('body');
  body.innerHTML = `
    <div class="container mt-5">
        <center>
        <img src="img/logo.png" style="height: 64px; width: 310px;" >
        </center>
        <div class="row">
            <div class="col-md-6">
              <input type="number" hidden id="id"> 
                <div class="form-group">
                    <label for="nome">Nome:</label>
                    <input type="text" class="form-control" id="nome">
                </div>
                <div class="form-group">
                    <label for="qnt">Qtd:</label>
                    <input type="number" class="form-control" id="qnt">
                </div>
                <div class="form-group">
                    <label for="preco">Preço:</label>
                    <input type="number" class="form-control" id="preco" step="0.01">
                </div>
                <div class="form-group">
                    <label for="dtCriacao">Criado Em:</label>
                    <input type="date" class="form-control" id="dtCriacao">
                </div>
                <div class="form-group">
                    <label for="dtAtualiza">Atualizado Em:</label>
                    <input type="date" class="form-control" id="dtAtualiza">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="codBarras">Código de Barras:</label>
                    <input type="text" class="form-control" id="codBarras">
                </div>
                <div class="form-group">
                    <label for="desc">Descrição:</label>
                    <textarea class="form-control" id="desc" rows="4"></textarea>
                </div>
                <div class="form-group text-right">
                    <button id="btnCancelar" class="btn btn-danger mr-2" onclick="cancelar()">Cancelar</button>
                    <button id="btnEdit" class="btn btn-primary mr-2" onclick="edit(true)">Editar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Bootstrap -->
  `
}

function renderizarMenuPrincipal() {
  body = document.querySelector('body');
  body.innerHTML = `
    <div class="container table-container">
        <div class="row">
          <div class="col-12" style="display: flex; justify-content: center; align-items: center; position: relative;">
			  <a style="color: black;" class="navbar-brand" href="index.html">
				<img src="img/logo2.png" width="40" height="40" class="d-inline-block align-top" alt="" loading="lazy">
				Easy Storage
			  </a>
			  <div style="position: absolute; right: 0;">
				<img src="img/avatar.png" width="30" height="30" class="d-inline-block align-top rounded-circle" alt="" loading="lazy">
			  </div>
			</div>
        </div>
        
    </div>

    <div class="container table-container">
        <div class="row">
          <div class="col">
            <a href="TelaCadProd.html" class="btn btn-success btn-cadastrar">
                Cadastrar
                <i class="bi bi-file-earmark-plus-fill"></i>
            </a>
          </div>
          <div style="display: flex; justify-content: flex-end;" class="col">
            <form class="form-inline">
              <input class="form-control mr-sm-2" type="search" placeholder="Pesquisar" aria-label="Pesquisar">
              <button class="btn btn-outline-info my-2 my-sm-0" type="submit">
                <i class="bi bi-search"></i>
              </button>
              <a href="relatorios.html"  class="btn btn-outline-secondary my-2 my-sm-0 ml-2" type="button">
                <i class="bi bi-funnel-fill"></i>
              </a>
            </form>
          </div>
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                  <th id="descricao" scope="col">
                    Descrição
                    <i
                      id="icone-descricao"
                      style="border-radius: 50px; cursor: pointer; border-width: 1px; border-style: solid; padding: 2px;"
                      class="bi bi-sort-alpha-down"></i>
                  </th>
                  <th id="quantidade" scope="col">
                    Quantidade
                    <i
                      id="icone-quantidade"
                      style="border-radius: 50px; cursor: pointer; border-width: 1px; border-style: solid; padding: 2px;"
                      class="bi bi-sort-numeric-down"></i>
                  </th>
                  <th scope="col">*</th>
                </tr>
            </thead>
            <tbody id="produtosTableBody">
                
            </tbody>
        </table>
    </div>
  `
}
