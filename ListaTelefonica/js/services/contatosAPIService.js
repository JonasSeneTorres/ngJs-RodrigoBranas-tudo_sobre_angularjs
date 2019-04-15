angular.module("listaTelefonica").factory("contatosAPI", function($http, config) {
    var _getContatos = function () {
        return $http.get(config.baseURL + "/contatos");
    };

    var _saveContato = function (contato) {
        return $http.post(config.baseURL + "/contatos", contato);
    };

    var _deleteContatos = function (contato) {
        return $http.delete(config.baseURL + "/contatos/"+ contato.nome);

    };

    return {
        getContatos: _getContatos,
        saveContato: _saveContato,
        deleteContatos: _deleteContatos
    }
});