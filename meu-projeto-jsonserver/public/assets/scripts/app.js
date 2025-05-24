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

