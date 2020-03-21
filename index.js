//const JogoDaMemoria = require('./src/jogoDaMemoria')
function onLoad() {
    
    const dependencias = {
        tela : Tela,
        util: Util
    }
    //iniCIALIZAR O JOGO
    const jogoDaMemoria = new JogoDaMemoria(dependencias)
    jogoDaMemoria.inicializar()

}
window.onload = onLoad