const botao = document.getElementById("btnBuscar");
const recordsContainer = document.getElementById("tabela-records");
const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", buscarRegistros);

async function buscarRegistros() {
    mensagem.innerHTML = `<i data-lucide="loader-2" class="info-heart-icon animate-spin"></i> <span>Carregando registros...</span>`;
    if (window.lucide) lucide.createIcons();

    recordsContainer.innerHTML = "";

    try {
        const resposta = await fetch("/api/registros");
        const dados = await resposta.json();

        mensagem.innerHTML = `<i data-lucide="heart" class="info-heart-icon"></i> <span>Clique em buscar para ver seus registros.</span>`;
        if (window.lucide) lucide.createIcons();

        if (dados.length === 0) {
            mensagem.innerHTML = `<i data-lucide="alert-circle" class="info-heart-icon"></i> <span>Nenhum registro encontrado.</span>`;
            if (window.lucide) lucide.createIcons();
            return;
        }

        dados.forEach(registro => {
            const sis = parseInt(registro.sistolica);
            const dia = parseInt(registro.diastolica);

            let statusClass = "normal";
            let statusText = "Normal";

            // Se os valores no banco forem salvos inteiros (ex: 120 e 80), dividimos por 10 para o layout 12/8
            const sisExibicao = sis > 40 ? Math.floor(sis / 10) : sis;
            const diaExibicao = dia > 40 ? Math.floor(dia / 10) : dia;

            // NOVA CONDIÇÃO: Pressão Baixa
            if (sisExibicao <= 10 && diaExibicao <= 6) {
                statusClass = "low";
                statusText = "Baixa";
            }
            // Regra de coloração baseada nos valores de exibição elevados
            else if (sisExibicao >= 14 || diaExibicao >= 9) {
                statusClass = "high";
                statusText = "Alta";
            } else if (sisExibicao >= 13 || diaExibicao >= 8.5) {
                statusClass = "attention";
                statusText = "Atenção";
            }

            // Pega a string "DD/MM/AAAA" que o seu backend gerou
            const dataFormatada = registro.data_hora;

            const blocoRegistro = `
            <div class="record-item">
                <div class="col-day">
                    <span class="label">Dia</span>
                    <span class="value font-bold">${registro.id_registro}</span>
                </div>
                <div class="col-date">
                    <span class="label">Data</span>
                    <span class="value date-val"><i data-lucide="calendar"></i> ${dataFormatada}</span>
                </div>
                <div class="col-pressure">
                    <span class="label">Pressão</span>
                    <span class="badge badge-${statusClass}">${sisExibicao}/${diaExibicao}</span>
                </div>
                <div class="col-status">
                    <span class="status-indicator status-${statusClass}"></span>
                    <span class="status-text">${statusText}</span>
                </div>
            </div>
            `;

            recordsContainer.innerHTML += blocoRegistro;
        });

        if (window.lucide) {
            lucide.createIcons();
        }

    } catch (error) {
        console.error(error);
        mensagem.innerHTML = `<i data-lucide="x-circle" class="info-heart-icon" style="color: #ff4d4d;"></i> <span style="color: #ff4d4d;">Erro ao consultar registros.</span>`;
        if (window.lucide) lucide.createIcons();
    }
}

function formatarData(data) {
    return data;
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) lucide.createIcons();
});