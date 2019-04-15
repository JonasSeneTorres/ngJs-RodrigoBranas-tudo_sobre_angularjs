import { setTimeout } from "timers";

angular.module("listaTelefonica")
    .controller('listaTelefonicaCtrl', function ($scope, contatosAPI, operadorasAPI, serialGenerator) {
        $scope.app = "Lista Telefônica"
        $scope.contatos = [];
        $scope.operadoras = [];

        var carregarContatos = function () {
            contatosAPI.getContatos()
                .success(function (data) {
                    $scope.contatos = data;
                });
        };

        var carregarOperadoras = function () {
            operadorasAPI.getOperadoras()
                .success(function (data) {
                    $scope.operadoras = data;
                });
        };

        $scope.adicionarContato = function (contato) {
            contato.serial = serialGenerator.generate();
            contato.cor = "red";
            contato.data = new Date();
            contatosAPI.saveContato(contato)
                .success(function (data) {
                    delete $scope.contato;
                    $scope.contatoForm.$setPristine();
                    $scope.contatos.push(angular.copy(data));
                });
        }

        $scope.apagarContatos = function (contatos) {
            var contatosSelecionados = contatos.filter(function (contato) {
                if (contato.selecionado) {
                    return contato;
                }
            });

            for (var index = 0; index < contatosSelecionados.length; index++) {
                var jaDeletou = false;
                
                contatosAPI.deleteContatos(contatosSelecionados[index]).success(function (data){
                    setTimeout(function () {
                        jaDeletou = true;
                    }, 200);
                });

                while (!jaDeletou) {
                    setTimeout(function () {}, 200);
                }
            }
            carregarContatos();
        }

        $scope.isContatoSelecionado = function (contatos) {
            try {
                return contatos.some(function (contato) {
                    return contato.selecionado;
                });                
            } catch (error) {
                return false;
            }
        }

        $scope.ordenarPor = function (nomeCampo) {
            $scope.criterioDeOrdenacao = nomeCampo;
            $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
        }

        carregarContatos();
        carregarOperadoras();
    });