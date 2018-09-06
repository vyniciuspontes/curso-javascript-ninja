(function(win, doc) {
  'use strict'
  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */

  function DOM(elements){
    this.element = document.querySelectorAll(elements);
  }

  function isSomething(type, item){
    return Object.prototype.toString.call(item) === '[object ' + type + ']';
  }

  DOM.isArray = function isArray(item) {
    return isSomething('Array', item);
  }

  DOM.isFunction = function isFunction(item) {
    return isSomething('Function', item);
  }

  DOM.isNumber = function isNumber(item) {
    return isSomething('Number', item);
  }

  DOM.isString = function isString(item) {
    return isSomething('String', item);
  }

  DOM.isNull = function isNull(item) {
    return isSomething('Null', item) || isSomething('Undefined', item);
  }

  DOM.prototype.forEach = function forEach() {
    Array.prototype.forEach.apply(this.element, arguments);
  }

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.element, arguments);
  }

  DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.element, arguments);
  }

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.element, arguments);
  }

  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  }

  DOM.prototype.every = function every() {
    return Array.prototype.every.apply(this.element, arguments);
  }

  DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.element, arguments);
  }

  DOM.prototype.get = function get() { return this.element; };

  DOM.prototype.on = function on(event, callback) {
    Array.prototype.forEach.call(this.element,
      function(item) {
        item.addEventListener(event, callback, false);
      });
  };

  DOM.prototype.off = function off(event, callback) {
    Array.prototype.forEach.call(this.element,
      function(item) {
        item.removeEventListener(event, callback);
      });
  };

  var $cep = new DOM('[data-js="cep"]');
  var $sendButton = new DOM('[data-js="send-button"]');
  var $status = new DOM('[data-js="status"]');
  var $dataRow = new DOM('[data-js="data-row"]');
  var ajax = new XMLHttpRequest();

  function getAPIUrl(cep){

    var cepRegex = /(\d{5})-(\d{3})/g;

    if(cepRegex.test(cep))
      return 'http://apps.widenet.com.br/busca-cep/api/cep.json?code=' + cep;

    return false;
  }

  function isAjaxRequestOk(ajaxStatus, requestStatus) {

    return ajaxStatus === 4 && requestStatus === 200;
  }

  function createElementWithData(tag, text){

    var element = doc.createElement(tag);
    element.innerText = text;

    return element;
  }

  function clearHTMLNode(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function fullfillRow(dataRow, dataObject) {
    var fragment = doc.createDocumentFragment();

    clearHTMLNode(dataRow);

    var state = createElementWithData('td', dataObject.state);
    var city = createElementWithData('td', dataObject.city);
    var district = createElementWithData('td', dataObject.district);
    var address = createElementWithData('td', dataObject.address);

    fragment.appendChild(state);
    fragment.appendChild(city);
    fragment.appendChild(district);
    fragment.appendChild(address);

    dataRow.appendChild(fragment);
  }

  function updateStatus(readyState, status) {
    var stateMessage;

    switch(readyState){

      case 0: stateMessage = 'request not initialized';
        break;
      case 1: stateMessage = 'server connection established';
        break;
      case 2: stateMessage = 'request received';
        break;
      case 3: stateMessage = 'processing request';
        break;
      case 4: stateMessage = 'request finished and response is ready ';
        break;
    };

    clearHTMLNode(status);
    var statusText = doc.createTextNode(stateMessage);
    status.appendChild(statusText);
  }

  function handleSendButton(event) {
    event.preventDefault();
    var url = getAPIUrl($cep.get()[0].value);
    if(url){
      ajax.open('get', url);
      ajax.send();
    }else{
      win.alert('Formato de CEP incorreto');
    }
  }

  function handleStateChange(){
    updateStatus(ajax.readyState, $status.get()[0]);
    if(isAjaxRequestOk(ajax.readyState, ajax.status)) {
      var responseObject = JSON.parse(ajax.responseText);

      if(responseObject.status !== 1){
        win.alert('CEP invalido');
        return;
      }

      fullfillRow($dataRow.get()[0], responseObject);
    }
  }

  function initializeEvents() {
    ajax.addEventListener('readystatechange',handleStateChange, false);
    $sendButton.on('click',handleSendButton);
  }

  initializeEvents();

})(window, document);
