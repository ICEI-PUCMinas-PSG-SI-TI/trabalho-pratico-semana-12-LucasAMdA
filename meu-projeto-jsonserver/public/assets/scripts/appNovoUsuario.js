const API_URL = 'http://localhost:3000/usuarios';

document.getElementById('form-usuario').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const novoUsuario = {
    nome: form.nome.value,
    email: form.email.value,
    login: form.login.value,
    senha: form.senha.value
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoUsuario)
    });

    if (!res.ok) throw new Error('Erro ao cadastrar usuário');

    const usuarioCriado = await res.json();
    localStorage.setItem('usuarioLogado', JSON.stringify(usuarioCriado));
    window.location.href = 'index.html';
  } catch (error) {
    alert('Erro ao cadastrar: ' + error.message);
  }
});

document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const login = form.login.value;
  const senha = form.senha.value;

  try {
    const res = await fetch(`${API_URL}?login=${login}&senha=${senha}`);
    const usuarios = await res.json();

    if (usuarios.length === 0) {
      alert('Login ou senha inválidos');
      return;
    }

    const usuario = usuarios[0];
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    window.location.href = 'index.html';
  } catch (error) {
    alert('Erro ao logar: ' + error.message);
  }
});
