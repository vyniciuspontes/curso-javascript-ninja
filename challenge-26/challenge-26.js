(function(win, doc) {
  'use strict'
  /*
  O desafio dessa semana é criar uma mini library (biblioteca) para
  reutilizarmos nossos códigos quando fizermos manipulação de DOM!

  Requisitos:
  - O nome da lib deve ser "DOM".
  - Ela deve ser uma função construtora, que receberá uma string por parâmetro.
  Essa string será o nó do DOM a ser selecionado;
  - No construtor, você deve atribuir à `this.element` todos os elementos
  do DOM selecionados;
  - Extenda a lib para ter os métodos `on`, `off` e `get`.
  - O método `on` irá adicionar um listener de evento a todos os elementos
  selecionados.
  - O método `off` irá remover o listener de evento de todos os elementos
  selecionados.
  - O método `get` deve retornar os elementos.
  - O código abaixo deve funcionar corretamente após a lib criada.

  Dica: olhe os erros que acontecem no console, e vá resolvendo um a um.
  Só passe para o próximo problema quando tiver resolvido o anterior :)
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

  var $a = new DOM('[data-js="link"]');
  $a.on('click', function(e) {
    e.preventDefault();
    console.log('clicou', this.firstChild.nodeValue);
  });

  console.log('Elementos selecionados:', $a.get());
  console.log('$a é filho de body?', $a.get()[0].parentNode === document.body);

  console.log('ForEach');

  $a.forEach(function(item) { console.log(item); });

  var arr = $a.map(function(item) {
      return item;
    }
  );

  console.log(arr);

  console.log(DOM.isArray([123]));
  console.log(DOM.isNumber(123));
  console.log(DOM.isFunction(function () {} ));

  console.log(DOM.isString('hue'));
  console.log(DOM.isNumber(123));
  console.log(DOM.isNull(null));

})(window, document);
