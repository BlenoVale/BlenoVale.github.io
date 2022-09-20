let lembrete = document.querySelector('.lembrete');


function preencherLembrete() {
    for (let i in etapas) {
        lembrete.innerHTML += `<div class="titulo">${etapas[i].titulo}</div>`;
        etapas[i].candidatos.forEach(candidato => {
            lembrete.innerHTML += `<div class="Informacoes">
                                               <b>${candidato.numero}</b> - ${candidato.nome} -
                                               Partido: ${candidato.partido}
                                   </div>`
        });
    }
}

preencherLembrete();

/*
        <div class="titulo">VEREADOR</div>
        <div class="Informacoes">
            <b>12345</b> - Fulano de Tal -
            Partido: ABC
        </div>
*/