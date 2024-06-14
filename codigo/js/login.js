let usuarioLogado = {
  nome: "",
  email: "",
  cpf: 0,
  telefone: 0,
  senha: 0,
};

function logar() {
  emailValue = document.querySelector("#email").value;
  senhaValue = document.querySelector("#senha").value;

  const usuarioDigitado = {
    email: emailValue,
    senha: senhaValue
  }

  if (emailValue === "" || senhaValue === "") {
    alert('Preencha todos os campos!');
  } else {
    let DadosLocalStorage = localStorage.getItem('usuarios');
    let obj = {};
    obj = JSON.parse(DadosLocalStorage);
    if (obj != null) {
      const usuarioEncontrado = obj.usuarios.find(usuario => 
        usuario.email === usuarioDigitado.email &&
        usuario.senha === usuarioDigitado.senha
      );
  
      if (usuarioEncontrado != null) {
        const usuarioJSON = JSON.stringify({ "usuarioLogado": usuarioEncontrado });
        localStorage.setItem('usuarioLogado', usuarioJSON);
        window.location.href = 'menu-principal.html';
        alert('Login Realizado com sucesso!');
      } else {
        alert('Email ou senha inválido!');
      }
    } else {
      alert('Email ou senha inválido!');
    }

  }
}