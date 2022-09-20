let seuVotoPara = document.querySelector('.parteCima-titulo span');
let cargo = document.querySelector('.parteCima-cargo span');
let numLegenda = document.querySelector('.parteCima-legenda');
let infosCandidato = document.querySelector('.parteCima-infosCandidato');
let fotoCandidatos = document.querySelector('.parteCima-direita');
let aviso = document.querySelector('.parteBaixo');

let audioDigito = document.querySelector('.audio-digito');
let audioFim = document.querySelector('.audio-fim');

let etapaAtual = 0;
let numero = '';
let branco = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHTML = '';
    numero = '';
    branco = false;

    for (let i = 1; i < etapa.numero; i++) {
        if (i === 1) {
            numeroHTML += '<div class="numero pisca"></div>';
        }
        numeroHTML += '<div class="numero"></div>';
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    infosCandidato.innerHTML = '';
    fotoCandidatos.innerHTML = ''
    aviso.style.display = 'none';
    numLegenda.innerHTML = numeroHTML;
}

function atualizaInterface() {
    console.log('atualizando interface');

    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        infosCandidato.innerHTML = `Nome: ${candidato.nome}<br />Partino: ${candidato.partido}`;

        let fotosHTML = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small){
                fotosHTML += `<div class="candidato-img small"><img src='assets/images/${candidato.fotos[i].url}'/>${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHTML += `<div class="candidato-img"><img src='assets/images/${candidato.fotos[i].url}'/>${candidato.fotos[i].legenda}</div>`;
            }
        }

        fotoCandidatos.innerHTML = fotosHTML;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        infosCandidato.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>'
    }

    console.log('Candidato', candidato)
}

function clicou(n) {
    audioDigito.play();
    let elnum = document.querySelector('.numero.pisca');
    if (elnum !== null) {
        elnum.innerHTML = n;
        numero = `${numero}${n}`;

        elnum.classList.remove('pisca');

        if (elnum.nextElementSibling !== null) {
            elnum.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface()
        }

    }
}

function corrigir() {
    audioDigito.play();
    comecarEtapa();
}

function votarBranco() {
    audioDigito.play();
    if (numero === '') {
        branco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numLegenda.innerHTML = '';
        infosCandidato.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>'
    } else {
        alert('Para votar em branco, não pode ter digitado nenhum número.');
    }
}

function confirmar() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;
    if (branco === true) {
        audioFim.play();
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length === etapa.numero) {
        audioFim.play();
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
}

comecarEtapa();