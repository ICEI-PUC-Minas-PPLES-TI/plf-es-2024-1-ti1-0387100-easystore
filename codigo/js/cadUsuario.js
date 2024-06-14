let usuariosDefault = [
  {
    id: 0,
    nome: "",
    email: "",
    cpf: 0,
    telefone: 0,
    senha: 0,
  }
];

function gerarNumeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cadastrarUsuario() {
  nomeValue = document.querySelector("#nome").value;
  emailValue = document.querySelector("#email").value;
  cpfValue = document.querySelector("#cpf").value;
  telefoneValue = document.querySelector("#telefone").value;
  senhaValue = document.querySelector("#senha").value;

  const novoUsuario = {
    id: gerarNumeroAleatorio(100, 10000),
    nome: nomeValue,
    email: emailValue,
    cpf: cpfValue,
    telefone: telefoneValue,
    senha: senhaValue,
  }
  
  if (nomeValue === "" || emailValue === "" ||
  cpfValue === "" || telefoneValue === "" ||
  senhaValue === "") {
    alert('Preencha todos os campos do formulário!')
  } else {
    let DadosLocalStorage = localStorage.getItem('usuarios');
    let obj = {};
    obj = JSON.parse(DadosLocalStorage);

    if (DadosLocalStorage == null) {
      usuariosDefault.push(novoUsuario);
      const usuariosJSON = JSON.stringify({ "usuarios": usuariosDefault });
      localStorage.setItem('usuarios', usuariosJSON);
      window.location.href = 'login.html'
      alert('Usuario cadastrado com sucesso!');
    } else {
      obj.usuarios.push(novoUsuario);
      const usuariosJSON = JSON.stringify({ "usuarios": obj.usuarios });
      localStorage.setItem('usuarios', usuariosJSON);
      window.location.href = 'login.html'
      alert('Usuario cadastrado com sucesso!');
    }
  }
}