const botao = document.getElementById("btnBuscar");

const tbody = document.querySelector("#tabela tbody");

const mensagem = document.getElementById("mensagem");

botao.addEventListener("click", buscarRegistros);

async function buscarRegistros(){

    mensagem.innerHTML = "Carregando...";

    tbody.innerHTML = "";

    try{

        const resposta = await fetch("/api/registros");

        const dados = await resposta.json();

        mensagem.innerHTML = "";

        if(dados.length === 0){

            mensagem.innerHTML = "Nenhum registro encontrado.";

            return;

        }

        dados.forEach(registro=>{

            const linha = `
            <tr>
                <td>${registro.dia}</td>
                <td>${formatarData(registro.data_hora)}</td>
                <td>${registro.sistolica}</td>
                <td>${registro.diastolica}</td>
            </tr>
            `;

            tbody.innerHTML += linha;

        });

    }

    catch{

        mensagem.innerHTML="Erro ao consultar registros.";

    }

}

function formatarData(data){

    return new Date(data).toLocaleString("pt-BR");

}