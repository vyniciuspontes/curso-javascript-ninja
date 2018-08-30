/*
O desafio de hoje será um pequeno projeto: um cronômetro!
As regras para criação do cronômetro são as seguintes:
1. Crie um arquivo index.html e adicione esse script a ele;
2. Crie um campo `input` do tipo `text`, e inicie-o com um valor 0 (zero).
Ele será o nosso cronômetro;
3. Crie 3 botões para as ações do cronômetro: Start, Stop e Reset;
4. Ao clicar em Start, o valor do campo deve ser incrementado de 1 em 1, a
cada segundo;
5. Ao clicar em Stop, o cronômetro deve parar de contar;
6. Ao clicar em Reset, o cronômetro deve zerar e parar de contar.

Utilize o atributo data-js para nomear o campo e os botões. Você pode
usar o nome que achar melhor, desde que ele seja semântico, ou seja, o nome
dado ao elemento HTML deve definir o que o elemento é ou o que ele faz.
*/

(function (win, doc) {
  'use strict'

  var hours = 0;
  var minutes = 0;
  var seconds = 0;
  var currentInterval;
  var $h1 = doc.querySelector('[data-js="timer"');
  var $startButton = doc.querySelector('[data-js="startButton"]');
  var $stopButton = doc.querySelector('[data-js="stopButton"]');
  var $resetButton = doc.querySelector('[data-js="resetButton"]');


  $startButton.addEventListener('click', function(event) {
    if(currentInterval)
      return;
    runTimer();
  }, false);
  $stopButton.addEventListener('click', stopTimer, false);
  $resetButton.addEventListener('click', resetTimer, false);

  function updateTimer() {
    if(seconds >= 60){
      seconds = 0;
      minutes++;
    }else if(minutes >= 60){
      minutes = 0;
      hours++;
    }

    $h1.innerHTML = (hours >= 10 ? hours : '0' + hours) + ':' + (minutes >= 10 ? minutes : '0' + minutes) + ':'
      + (seconds >= 10 ? seconds : '0' + seconds);
  }

  function stopTimer(){
      win.clearTimeout(currentInterval);
      currentInterval = null;
  }

  function resetTimer(){
    stopTimer();
    hours = 0;
    minutes = 0;
    seconds = 0;
    updateTimer();
  }

  function runTimer() {

    currentInterval = win.setTimeout(function () {
        seconds++;
        updateTimer();
        return runTimer();
      }, 1000);
  }


})(window, document);
