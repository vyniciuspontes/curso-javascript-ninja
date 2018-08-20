# Desafio da semana #4

```js
/*
Declare uma variável chamada `isTruthy`, e atribua a ela uma função que recebe
um único parâmetro como argumento. Essa função deve retornar `true` se o
equivalente booleano para o valor passado no argumento for `true`, ou `false`
para o contrário.
*/
var isTruthy = function (param){ return !!param; };

// Invoque a função criada acima, passando todos os tipos de valores `falsy`.
isTruthy(false);
isTruthy(null);
isTruthy(undefined);
isTruthy(0);
isTruthy(-0);
isTruthy(NaN);

/*
Invoque a função criada acima passando como parâmetro 10 valores `truthy`.
*/
isTruthy(true);
isTruthy(1);
isTruthy(-1);
isTruthy('1');
isTruthy('null');
isTruthy(1.2);
isTruthy({});
isTruthy([]);
isTruthy({nome: 'Vynicius'});
isTruthy([1,2,3]);
isTruthy('undefined');
isTruthy(function (){});

/*
Declare uma variável chamada `carro`, atribuindo à ela um objeto com as
seguintes propriedades (os valores devem ser do tipo mostrado abaixo):
- `marca` - String
- `modelo` - String
- `placa` - String
- `ano` - Number
- `cor` - String
- `quantasPortas` - Number
- `assentos` - Number - cinco por padrão
- `quantidadePessoas` - Number - zero por padrão
*/
var carro = {
  marca: "Volkswagem",
  modelo: "Golf TSI",
  placa: "ABC123",
  ano: 2014,
  cor: "Azul Marinho",
  quantasPortas: 4,
  assentos: 5,
  quantidadePessoas: 0
};

/*
Crie um método chamado `mudarCor` que mude a cor do carro conforme a cor
passado por parâmetro.
*/
carro.mudaCor = function (novaCor){

  this.cor = novaCor;

};

/*
Crie um método chamado `obterCor`, que retorne a cor do carro.
*/
carro.obterCor = function (){ return this.cor; };

/*
Crie um método chamado `obterModelo` que retorne o modelo do carro.
*/

carro.obterModelo = function (){ return this.modelo; };

/*
Crie um método chamado `obterMarca` que retorne a marca do carro.
*/
carro.obterMarca = function (){ return this.marca; }

/*
Crie um método chamado `obterMarcaModelo`, que retorne:
"Esse carro é um [MARCA] [MODELO]"
Para retornar os valores de marca e modelo, utilize os métodos criados.
*/
carro.obterMarcaModelo = function (){ return "Esse carro é um " + this.obterMarca() + " " + this.obterModelo();  };

/*
Crie um método que irá adicionar pessoas no carro. Esse método terá as
seguintes características:
- Ele deverá receber por parâmetro o número de pessoas entrarão no carro. Esse
número não precisa encher o carro, você poderá acrescentar as pessoas aos
poucos.
- O método deve retornar a frase: "Já temos [X] pessoas no carro!"
- Se o carro já estiver cheio, com todos os assentos já preenchidos, o método
deve retornar a frase: "O carro já está lotado!"
- Se ainda houverem lugares no carro, mas a quantidade de pessoas passadas por
parâmetro for ultrapassar o limite de assentos do carro, então você deve
mostrar quantos assentos ainda podem ser ocupados, com a frase:
"Só cabem mais [QUANTIDADE_DE_PESSOAS_QUE_CABEM] pessoas!"
- Se couber somente mais uma pessoa, mostrar a palavra "pessoa" no retorno
citado acima, no lugar de "pessoas".
*/

carro.adicionaPessoas = function (numPessoas) {

  var assentosRestantes = this.assentos - this.quantidadePessoas;
  var pessoaPlural = (assentosRestantes === 1 && numPessoas + this.quantidadePessoas > this.assentos)
    || (this.quantidadePessoas + numPessoas === 1) ? '' : 's';

  if (numPessoas + this.quantidadePessoas > this.assentos) {

    if(this.quantidadePessoas < this.assentos) {

      return "Só cabem mais " + assentosRestantes + " pessoa" + pessoaPlural + " !";
    }

    return "O carro já está lotado!";
  }

  this.quantidadePessoas += numPessoas;

  return "Já temos " + this.quantidadePessoas + " pessoa" + pessoaPlural + " no carro";

};

/*
Agora vamos verificar algumas informações do carro. Para as respostas abaixo,
utilize sempre o formato de invocação do método (ou chamada da propriedade),
adicionando comentários _inline_ ao lado com o valor retornado, se o método
retornar algum valor.

Qual a cor atual do carro?
*/
carro.obterCor();//Azul Marinho

// Mude a cor do carro para vermelho.
carro.mudaCor('Verde');

// E agora, qual a cor do carro?
//Verde

// Mude a cor do carro para verde musgo.
carro.mudaCor('verde musgo')

// E agora, qual a cor do carro?
carro.obterCor();//verde musgo

// Qual a marca e modelo do carro?
carro.obterMarca();//Volkswagem

// Adicione 2 pessoas no carro.
carro.adicionaPessoas(2); //'Já temos 2 pessoas no carro'

// Adicione mais 4 pessoas no carro.
carro.adicionaPessoas(4);//'Só cabem mais 3 pessoas!'

// Faça o carro encher.
carro.adicionaPessoas(3);//'Já temos 5 pessoas no carro'

// Tire 4 pessoas do carro.
carro.adicionaPessoas(-5);// 'Já temos 0 pessoas no carro'

// Adicione 10 pessoas no carro.
carro.adicionaPessoas(10);//'Só cabem mais 5 pessoas!'

// Quantas pessoas temos no carro?
0
```
