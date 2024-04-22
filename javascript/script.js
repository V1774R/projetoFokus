//Elementos
const pagina = document.querySelector('html');
const botoes = document.querySelectorAll('button');
const btnComecar = document.querySelector('#start-pause');
const img = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const timer = document.querySelector('#timer');
const fotoBtnStartPause = document.querySelector('.app__card-primary-butto-icon');
const textBtnStartPause = document.querySelector('.textoBtn');
let rodando = false;
let tempo = '';
let click = '';
timer.innerHTML = (!tempo) ? 25 : tempo;


//Programa
function mudarContexto(contexto){
    img.setAttribute('src', `/imagens/${contexto}.png`)
}

function removeActive(){
    botoes.forEach((k, v)=>{
        k.classList.remove('active')
    });
}

botoes[0].addEventListener('click', ()=>{
    pagina.setAttribute('data-contexto', 'foco');
    mudarContexto(botoes[0].attributes[0].value);
    removeActive();
    botoes[0].classList.add('active');
    titulo.innerHTML = 'Otimize sua produtividade,<br> <strong class="app__title-strong">mergulhe no que importa.</strong>';
    //timer.innerHTML = '25';
    tempo = 25;
    timer.innerHTML = tempo;
    
});
    
botoes[1].addEventListener('click', ()=>{
    pagina.setAttribute('data-contexto', 'descanso-curto');
    mudarContexto(botoes[1].attributes[0].value);
    removeActive();
    botoes[1].classList.add('active');
    titulo.innerHTML = 'Que tal dar uma respirada?<br> <strong class="app__title-strong">Faça uma pausa curta!</strong>';
    tempo = 5;
    timer.innerHTML = tempo;
    
});

botoes[2].addEventListener('click', ()=>{
    pagina.setAttribute('data-contexto', 'descanso-longo');
    mudarContexto(botoes[2].attributes[0].value);
    removeActive();
    botoes[2].classList.add('active');
    titulo.innerHTML = 'Hora de voltar à superficie.<br> <strong class="app__title-strong">Faça uma pausa longa!</strong>';
    tempo = 15;
    timer.innerHTML = '15';
    
});

btnComecar.addEventListener('click', ()=>{
    if(!tempo){
        tempo = 25;
        click = 0;
    }
    if(rodando === false){
        rodando = true;
        if(tempo == 25){
            click = 0;
            botoes[1].classList.add('btn-disable');
            botoes[2].classList.add('btn-disable');
        }else if(tempo == 5){
            click = 1;
            botoes[0].classList.add('btn-disable');
            botoes[2].classList.add('btn-disable');
        }else{
            click = 2;
            botoes[0].classList.add('btn-disable');
            botoes[1].classList.add('btn-disable');
        }
        fotoBtnStartPause.setAttribute('src', 'imagens/pause.png')
        textBtnStartPause.innerHTML = 'Pausar';
        console.log('play '+tempo);
    }else{
        rodando = false;
        fotoBtnStartPause.setAttribute('src', 'imagens/play_arrow.png')
        textBtnStartPause.innerHTML = 'Começar';
        console.log('pause em '+tempo);
    }
    
});

function resetar(){
    botoes[0].classList.remove('btn-disable');
    botoes[1].classList.remove('btn-disable');
    botoes[2].classList.remove('btn-disable');
    rodando = false;
    fotoBtnStartPause.setAttribute('src', 'imagens/play_arrow.png')
    textBtnStartPause.innerHTML = 'Começar';
    botoes[click].click();
}