
let listaIdEntrada = ["nome", "data-nascimento", "cpf", "sexo", "email", "telefone", "rg", "cep", "rua", "numero", "cidade", "estado", "comprovante-residencia", "aceite"];
let listaIdMensagem = ["erro-nome", "erro-data", "erro-cpf", "erro-sexo", "erro-email", "erro-telefone", "erro-rg", "erro-cep", "erro-rua", "erro-numero", "erro-cidade", "erro-estado", "erro-comprovante-residencia", "erro-aceite" ];
let contadorDeEntradas = 0;

// Dinâmica da seleção de arquivo.
const listaEntradaArquivo = document.querySelectorAll('input[type="file"]');
let indiceArquivo;
let entradaArquivo;
listaEntradaArquivo[0].addEventListener('click', function() {
    indiceArquivo = 0;
    entradaArquivo = listaEntradaArquivo[indiceArquivo];
    selecionarArquivo(entradaArquivo);
});
listaEntradaArquivo[1].addEventListener('click', function() {
    indiceArquivo = 1;
    entradaArquivo = listaEntradaArquivo[indiceArquivo];
    selecionarArquivo(entradaArquivo);
});

function selecionarArquivo(entrada) {
    let IdArquivo = entrada.id;
    const arquivo = document.getElementById(IdArquivo);
    const nomeArquivo = document.getElementById(`nome-do-arquivo-${IdArquivo}`);
    const selecaoArquivo = document.getElementById(`selecionar-${IdArquivo}`);
    const selecionadoArquivo= document.getElementById(`selecionado-${IdArquivo}`);
    arquivo.addEventListener("change", function() {
                if (arquivo.files.length > 0) {
                    selecaoArquivo.style.display = 'none';
                    selecionadoArquivo.style.display = 'flex';
                    nomeArquivo.textContent = arquivo.files[0].name;
                    contadorDeEntradas = 0;
                } else {
                    selecionadoArquivo.style.display = 'none';
                    selecaoArquivo.style.display = 'flex';
                    contadorDeEntradas++;
                };
    });

};

// Função de verificação de entradas de preenchimento
function verificarEntrada(idDaEntrada, idDaMensagem) {
    //
    let entrada = document.getElementById(idDaEntrada);
    let erro = document.getElementById(idDaMensagem);
    if (entrada.type == 'checkbox') {
        if (!entrada.checked) {
            erro.style.display = 'flex'; // Mostra a mensagem
            contadorDeEntradas = 0
        } else {
            erro.style.display = 'none'; // Esconde a mensagem
            contadorDeEntradas++;
        };
    };
    if (entrada.type == 'text' || entrada.type == 'email' || entrada.type == 'file' || entrada.type == 'date' || entrada.matches('select')) {
        if (entrada.value == '' || entrada.value == 'selecione') {
            erro.style.display = 'flex'; // Mostra a mensagem
            contadorDeEntradas = 0;
        } else {
            erro.style.display = 'none'; // Esconde a mensagem
            contadorDeEntradas++;
        };
    };
};

// Função de Verificação de seleção de trilha
function verificarTrilha () {
    const listaTrilhas = ['frontend', 'backend', 'jogos', 'ux', 'dados'];
    let trilhasChecked = [];
    let erro = document.getElementById('erro-trilha');
    for (let i = 0; i < listaTrilhas.length; i++ ) {
        let valorTrilha = document.querySelector(`input[value=${listaTrilhas[i]}]`);
        if (valorTrilha.checked) {
            trilhasChecked.push('checked');
        } else {
            trilhasChecked.push('not-checked');
        };
    };
    if (!trilhasChecked.includes('checked')) {
        erro.style.display = 'flex';
        contadorDeEntradas = 0;
    } else {
        erro.style.display = 'none';
        contadorDeEntradas++;
    };
};
    

// Define a entrada de CPF no formato 123.456.789-00
document.getElementById('cpf').addEventListener('input', function(e) {
    var value = e.target.value;
    var cpfPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
                          .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
                          .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
                          .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o nono dígito
                          .replace(/(-\d{2})\d+?$/, '$1'); // Impede entrada de mais de 11 dígitos
    e.target.value = cpfPattern;
});

// Define a entrada de telefone no formato (00) 12345-6789
document.getElementById('telefone').addEventListener('input', function(e) {
    var value = e.target.value;
    var telefonePattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
                          .replace(/(\d{2})(\d)/, '($1) $2') // Adiciona dois parantese entre os dois primeiros numeros (ddd)
                          .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona traço após setimo dígito
                          .replace(/(-\d{4})\d+?$/, '$1'); // Impede entrada de mais de 11 dígitos
    e.target.value = telefonePattern;
});

// Define a entrada de CEP no formato 12345-678
document.getElementById('cep').addEventListener('input', function(e) {
    var value = e.target.value;
    var cepPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
                          .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona traço após quinto dígito
                          .replace(/(-\d{3})\d+?$/, '$1'); // Impede entrada de mais de 8 dígitos
    e.target.value = cepPattern;
});

// Função de enviar o formulário e impulso verfifcação de preechimento de dados
function enviar() {
    for (let i = 0; i < (listaIdEntrada.length); i++){
        let idEntrada = listaIdEntrada [i];
        let idMensagem = listaIdMensagem [i];
        verificarEntrada(idEntrada, idMensagem);;
    };
    verificarTrilha();
    if (contadorDeEntradas < 15 ) {
        alert('Erro no formulário! Verifique se você preencheu todos os dados');
    } else {
        alert('Inscrição efetuada com sussesso!');
        window.location.href = 'end.html';
    };
};

function cancelar() {
    const cancelar = confirm('Deseja realmente cancelar sua inscrição?')
    if (cancelar) {
        window.location.href = 'index.html';
    }  else {
        return;
    }
    
}


