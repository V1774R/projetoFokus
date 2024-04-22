//ELEMENTOS
const pagina = document.querySelector('html');
const img = document.querySelector('.app__image');
const texto = document.querySelector('.app__title');
const btnMusica = document.querySelector('#alternar-musica');
const botoes = document.querySelectorAll('.app__card-button');
const timer = document.querySelector('#timer');
const btnPausePlay = document.querySelector('#start-pause');
const imgPausePlay = document.querySelector('#start-pause img');
const txtPausePlay = document.querySelector('#start-pause span');
const btnCancelar = document.querySelector('#cancelar');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const beep = new Audio('sons/beep.mp3');
const play = new Audio('sons/play.wav');
const pause = new Audio('sons/pause.mp3');
var tocandoMusica = false;
var botaoAtivo = null;
var tempo = 25*60;
var minutos = Math.floor(tempo / 60);
var calcSegs = tempo % 60;
var segundos = calcSegs < 10 ? '0'+calcSegs : calcSegs;
var contagem = null;
var contando = false;
var atividade = 'foco';
var botoesHabilitados = true;


musica.loop = true;

// Mudando tema do projeto 
function mudarTema(x){
    botoes.forEach(element=>{
        element.classList.remove('active');
    })
    botaoAtivo = document.querySelector(`[data-contexto="${x}"]`);
    //botaoAtivo.setAttribute()
    img.setAttribute('src', `/imagens/${x}.png`); //Mudar imagem e texto
    pagina.setAttribute('data-contexto', `${x}`)//mudar cor do fundo
    //Mudar texto
    if(x === 'foco'){
        texto.innerHTML = 'Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>';
        tempo = 25*60;
    }else if(x === 'short'){
        texto.innerHTML = 'Que tal dar uma respirada? <br><strong class="app__title-strong">Faça uma pausa curta!</strong>';
        tempo = 5*60;
    }else if(x === 'long'){
        texto.innerHTML = 'Hora de voltar a superficie! <br><strong class="app__title-strong">Faça uma pausa longa.</strong>';
        tempo = 15*60;
    }else{
        alert('Erro inesperado. Recarregue a página e tente novamente.')
    }
    //timer.textContent = tempo;
    atividade = x;
    minutos = Math.floor(tempo / 60);
    calcSegs = tempo % 60;
    segundos = calcSegs < 10 ? '0'+calcSegs : calcSegs;
    timer.textContent = `${minutos}:${segundos}`;
}

    function mudarBotao(){
        if(contando === false){
            //começar
            txtPausePlay.textContent = "Começar";
            imgPausePlay.setAttribute('src', `/imagens/play_arrow.png`);
        }else{
            //pausar
            txtPausePlay.textContent = "Pausar";
            imgPausePlay.setAttribute('src', `/imagens/pause.png`);
        }
    }
//Eventos dos botões
    botoes.forEach((element)=>{
        element.addEventListener('click', ()=>{
            botaoAtivo = document.querySelector(`[data-contexto=${element.attributes[0].value}]`); 
            mudarTema(element.attributes[0].value);
            element.classList.add('active');
        })
    });

    btnMusica.addEventListener('click', ()=>{
        if(tocandoMusica === false){            
            musica.play();
            tocandoMusica = true;
        }else{
            musica.pause();
            tocandoMusica = false;
        }
    })

    btnPausePlay.addEventListener('click', ()=>{
        iniciar(tempo);
        mudarBotao();
    })

//TEMPORIZADOR
    timer.textContent = `${minutos}:${segundos}`;
    function iniciar(t){
        if(contando === false){
            //mudarBotao();
            contando = true;
            contagem = setInterval(()=>{
                if(t >= 0){
                    minutos = Math.floor(t / 60);
                    calcSegs = tempo % 60;
                    segundos = calcSegs < 10 ? '0'+calcSegs : calcSegs;
                    t -= 1;
                    tempo = t;
                    timer.textContent = `${minutos}:${segundos}`;
                }else{
                    clearInterval(contagem);
                    console.log('fim.')
                    contando = false;
                    zerar();
                }
            }, 1000)
        }else{
            //mudarBotao();
            console.log('A contagem já está em andamento.');
            pausar();
        }
    }

    function pausar(){
        clearInterval(contagem);
        contando = false;
    }

    function zerar(){
        if(tocandoMusica === true){
            btnMusica.click();
        }
        beep.volume = 0.08;
        beep.play();
        setTimeout(()=>{
            mudarTema(atividade)
        }, 6000);
    }