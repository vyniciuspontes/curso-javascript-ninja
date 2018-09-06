(function(win, doc){
  'use strict'

  var $visor = doc.querySelector('[data-input="input"]');
  var $buttonCE = doc.querySelector('[data-id="button-ce"]');
  var $buttonEqual = doc.querySelector('[data-id="button-equal"]');
  var valueButtons = doc.querySelectorAll('[data-input="valueButton"]');

  function initialize() {
    initializeEvents();
  }

  function initializeEvents() {
    Array.prototype.forEach.call(valueButtons, function (item) {
      on(item, 'click', handleValueButtons);
    });

    on($buttonEqual, 'click', handleEqualButton);
    on($buttonCE, 'click', handleCEButton);
  }

  function handleValueButtons(){
    $visor.value = removeLastItemIfItIsAnOperator($visor.value, this.value);
    $visor.value += this.value;
  }

  function handleEqualButton() {
    var result = eval($visor.value);
    $visor.value = result;
  }

  function handleCEButton() {
    $visor.value = '';
  }

  function on(element, eventName, callback) {
    element.addEventListener(eventName, callback, false);
  }

  function isLastItemAnOperation(expression){
    var operators = ['/', '*', '+', '-'];
    var lastItem = expression.split('').pop();

    return operators.some(function(operator) {
      return operator === lastItem;
    });
  }

  function removeLastItemIfItIsAnOperator(expression, lastValue) {
    if(isLastItemAnOperation(expression) && isLastItemAnOperation(lastValue)) {

      return expression.slice(0, -1);
    }
    return expression;
  }

  initializeEvents();

})(window, document);
