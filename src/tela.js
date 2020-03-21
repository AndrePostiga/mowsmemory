//nao adianta colocar util num construtor pois todos os métodos são estáticos
const util = Util

const ID_CONTEUDO = "conteudo"
const ID_BTN_JOGAR = "jogar"
const ID_BTN_MOSTRAR_TUDO = "mostrarTudo"
const ID_DA_MENSAGEM = "mensagem"
const ID_CARREGANDO = "carregando"
const ID_CONTADOR = "contador"
const CLASSE_INVISIVEL = "invisible"
const MENSAGENS = {
    sucesso : {
        texto: 'Combinação correta',
        classe: 'alert-success'
    },
    erro: {
        texto: 'Combinação incorreta!',
        classe: 'alert-danger'
    }

}
class Tela {
    static obterCodigoHtml(item){
        return `
        <div class="col-md-3">
            <div class="card" style="width: 40%;" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
                <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">        
            </div>
            <br />
        </div>
        `
    }

    static alterarConteudoHtml(codigoHtml){
        let elemento = document.getElementById(ID_CONTEUDO)
        elemento.innerHTML = codigoHtml
    }

    static getStringHtmlPelaImagem(itens){
        //para cada item da lista, vai exetucar a função e ao final concatenar tudo em uma unica string
        return itens.map(Tela.obterCodigoHtml).join('')
    }

    static atualizarImagens(itens){
        const codigoHtml = Tela.getStringHtmlPelaImagem(itens)
        Tela.alterarConteudoHtml(codigoHtml)
    }

    static configurarBotaoJogar(funcaoOnClick) {
        const btnJogar = document.getElementById(ID_BTN_JOGAR)
        btnJogar.onclick = funcaoOnClick
    }

    static configurarBotaoVerificarSelecao(funcaoOnClick){
        window.verificarSelecao = funcaoOnClick
    }

    static configurarBotaoMostrarTudo(funcaoOnClick){
        const btnMostrarTudo = document.getElementById(ID_BTN_MOSTRAR_TUDO)
        btnMostrarTudo.onclick = funcaoOnClick
    }

    static exibirCartas(nomeDaCarta, img) {
        const elementosHtml = document.getElementsByName(nomeDaCarta)
        //alterar o src para cada elemento do html com aquele nome
        elementosHtml.forEach(item => (item.src = img))
    }

    static async exibirMensagem(sucesso = true){
        const elemento = document.getElementById(ID_DA_MENSAGEM)
        if (sucesso) {
            elemento.classList.remove(MENSAGENS.erro.classe)
            elemento.classList.add(MENSAGENS.sucesso.classe)
            elemento.innerHTML = MENSAGENS.sucesso.texto
        }else {
            elemento.classList.remove(MENSAGENS.sucesso.classe)
            elemento.classList.add(MENSAGENS.erro.classe)
            elemento.innerHTML = MENSAGENS.erro.texto
        }
        elemento.classList.remove(CLASSE_INVISIVEL)
        await util.timeout(1000)
        elemento.classList.add(CLASSE_INVISIVEL)
    }

    static exibirCarregando(mostrar = true) {
        const carregando = document.getElementById(ID_CARREGANDO)
        if (mostrar) {
            carregando.classList.remove(CLASSE_INVISIVEL)
            return;
        }
        carregando.classList.add(CLASSE_INVISIVEL)
    }

    static iniciarContador() {
        let contarAte = 3
        const elementoContador = document.getElementById(ID_CONTADOR)
        //comecar a substituir a partir do contador
        const identificadorNoTexto = "$$contador"
        const textoPadrao = `Começando em ${identificadorNoTexto} segundos...`
        //criar funcao em linha para atualizar texto a cada segundo
        const atualizarTexto = () => 
        (elementoContador.innerHTML = textoPadrao.replace(identificadorNoTexto, contarAte--))

        atualizarTexto()
        //a cada segundo vai chamar a funcao de atualizar o texto
        //retorna o id do intervalo para trabalhar com ele dps
        const idDoIntervalo = setInterval(atualizarTexto, 1000)
        return idDoIntervalo

    }

    static limparContador(idDoIntervalo) {
        clearInterval(idDoIntervalo)
        document.getElementById(ID_CONTADOR).innerHTML = ""
    }
}