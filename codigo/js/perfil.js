document.addEventListener('DOMContentLoaded', () => {
  let DadosLocalStorage = localStorage.getItem('usuarioLogado');
  let obj = {};
  obj = JSON.parse(DadosLocalStorage);

  document.querySelector("#usuarioId").value = obj.usuarioLogado.id;
  document.querySelector("#nome").value = obj.usuarioLogado.nome;
  document.querySelector("#email").value = obj.usuarioLogado.email;
  document.querySelector("#cpf").value = obj.usuarioLogado.cpf;
  document.querySelector("#telefone").value = obj.usuarioLogado.telefone;
  document.querySelector("#senha").value = obj.usuarioLogado.senha;
  document.querySelector("#confirmarSenha").value = obj.usuarioLogado.senha;
});

function permitirEdicao() {
  document.querySelector("#nome").removeAttribute('disabled');
  document.querySelector("#email").removeAttribute('disabled');
  document.querySelector("#cpf").removeAttribute('disabled');
  document.querySelector("#telefone").removeAttribute('disabled');
  document.querySelector("#senha").removeAttribute('disabled');
  document.querySelector("#boxConfirmarSenha").removeAttribute('hidden');
  document.querySelector("#salvar").removeAttribute('hidden');
}

function editarUsuario() {
  const usuarioEditado = {
    id: parseInt(document.querySelector("#usuarioId").value),
    nome: document.querySelector("#nome").value,
    email: document.querySelector("#email").value,
    cpf: document.querySelector("#cpf").value,
    telefone: document.querySelector("#telefone").value,
    senha: document.querySelector("#senha").value,
  }

  let usuariosJSON = localStorage.getItem('usuarios');
  let array = [];
  if (usuariosJSON) {
    array = JSON.parse(usuariosJSON)
  }
  if (Array.isArray(array.usuarios)) {
    array.usuarios.forEach((usuario, i) => {
      if (usuario.id == usuarioEditado.id) {
        array.usuarios.splice(i, 1, usuarioEditado)
      }
    });
    const usuariosJSON = JSON.stringify({ "usuarios": array.usuarios });
    localStorage.setItem('usuarios', usuariosJSON);

    const usuarioLogadoJSON = JSON.stringify({ "usuarioLogado": usuarioEditado });
    localStorage.setItem('usuarioLogado', usuarioLogadoJSON);
    window.location.href = 'menu-principal.html';
    alert('Usuário alterado com sucesso!');
  }
}

function voltar() {
  window.location.href = 'menu-principal.html';
}

function deslogar() {
  localStorage.setItem('usuarioLogado', "{}");
  window.location.href = 'index.html';
  alert('Logoff feito com sucesso!');
}
