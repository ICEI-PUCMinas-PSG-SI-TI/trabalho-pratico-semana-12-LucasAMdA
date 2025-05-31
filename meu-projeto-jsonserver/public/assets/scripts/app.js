async function carregarDados(endpoint) {
    try {
        const response = await fetch(`http://localhost:3000/${endpoint}`);
        if (!response.ok) throw new Error("Erro ao buscar dados de " + endpoint);
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }   
}

function renderizarFilmes(containerSelector, filmes) {
    const container = document.querySelector(containerSelector);

    if (!container) return;

    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.justifyContent = "space-between";

    filmes.forEach(filme => {
        const card = document.createElement('div');
        card.className = "filme rounded";
        card.style.backgroundColor = "rgb(15, 53, 71)";
        card.style.color = "rgb(196, 196, 196)";
        card.style.width = "250px";
        card.style.marginTop = "28px";
        card.style.boxShadow = "5px 5px 5px rgba(0, 0, 0, 0.4)"

        card.innerHTML = `
            <a href="detalhes.html"><img src="${filme.imagem}" class="rounded-top" alt="${filme.titulo}" width="250" height="350"></a>
            <a href="detalhes.html" class="text-decoration-none text-reset"><p class="ps-2">${filme.titulo}</p></a>
        `;

        card.addEventListener("click", () => {
            redirecionarParaDetalhes(filme);
        });

        container.appendChild(card);
    });
}

function redirecionarParaDetalhes(filme) {
    localStorage.setItem("filmeSelecionado", JSON.stringify(filme));
    window.location.href = "detalhes.html";
}

window.addEventListener("DOMContentLoaded", async () => {
    const filmesPopulares = await carregarDados("filmesPopulares");
    const filmesLancamentos = await carregarDados("filmesLancamentos");
    const filmesDisponiveis = await carregarDados("filmesDisponiveis");

    renderizarFilmes(".populares", filmesPopulares);
    renderizarFilmes(".lancamentos", filmesLancamentos);
        renderizarFilmes(".filmesDispo", filmesDisponiveis);

});

const menu = document.getElementById('menu');
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

function criarBotaoUsuario(nome) {
  const div = document.createElement('div');
  div.id = 'menu-usuario';
  div.style.marginRight = '40px';
  div.innerHTML = `
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownUsuario" data-bs-toggle="dropdown" aria-expanded="false">
        Olá, ${nome}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownUsuario">
        <li><a class="dropdown-item" href="#" id="btn-logout">Sair</a></li>
        <li><a class="dropdown-item text-danger" href="#" id="btn-deletar-conta">Deletar Conta</a></li>
      </ul>
    </div>
  `;
  return div;
}

function renderizarMenuUsuario() {
    const loginContainer = document.getElementById('loginContainer');

  if (usuarioLogado && loginContainer) {
    loginContainer.style.display = 'none';
  } else if (loginContainer) {
    loginContainer.style.display = 'flex'; 
  }

  if (usuarioLogado && menu) {
    menu.innerHTML = '';
    menu.appendChild(criarBotaoUsuario(usuarioLogado.nome));

    document.getElementById('btn-logout').addEventListener('click', () => {
      localStorage.removeItem('usuarioLogado');
      window.location.reload();
    });

    document.getElementById('btn-deletar-conta').addEventListener('click', async () => {
      if (confirm('Tem certeza que deseja excluir sua conta?')) {
        try {
          const res = await fetch(`http://localhost:3000/usuarios/${usuarioLogado.id}`, {
            method: 'DELETE'
          });
          if (res.ok) {
            localStorage.removeItem('usuarioLogado');
            window.location.reload();
          } else {
            throw new Error('Erro ao deletar conta');
          }
        } catch (error) {
          alert('Erro: ' + error.message);
        }
      }
    });
  }
}

renderizarMenuUsuario();
