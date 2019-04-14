angular.module("listaTelefonica").controller('listaTelefonicaCtrl', function ($scope, contatosAPI, operadorasAPI) {
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
        contato.data = new Date()
        contatosAPI.saveContato(contato)
            .success(function (data) {
                delete $scope.contato;
                $scope.contatoForm.$setPristine();
                $scope.contatos.push(angular.copy(data));
            });
    }

    $scope.apagarContatos = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if (!contato.selecionado) {
                return contato;
            }
        });
    }

    $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
            return contato.selecionado;
        });
    }

    $scope.ordenarPor = function (nomeCampo) {
        $scope.criterioDeOrdenacao = nomeCampo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }

    carregarContatos();
    carregarOperadoras();
});