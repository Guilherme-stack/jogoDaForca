import React, { useEffect } from 'react';
import { useState } from 'react';
import elementos from "./palavras.js"
import "./jogo.css"
import img1 from "./imagens/img-1.png"
import img2 from "./imagens/img-2.png"
import img3 from "./imagens/img-3.png"
import img4 from "./imagens/img-4.png"
import img5 from "./imagens/img-5.png"
const Teste = () => {
    console.log(elementos[0].pista)
    const styles = {
        borderBottom: '1px solid #000',
        marginRight: '20px'
    };
    const escolhidas = {
        borderBottom: '1px solid #000',
        marginLeft: '20px'
    };
    const semEstilo = {
        borderBottom: '1px solid #000',
        marginRight: '20px',
        opacity: "0"
    };


    const [numero, setNumero] = useState(-1);
    /* var palavra = "hamburguer" */
    const [letraEscolhida, setLetraEscolhida] = useState('');
    const [letra, setLetra] = useState([]);

    const [escrever, setEscrever] = useState('');
    const [verificar, setVerificar] = useState('');
    const [vogais, setVogais] = useState(2);
    const [consoante, setConsoante] = useState(3);
    const [erro, setErro] = useState(0);
    const [aleatorio, setAleatorio] = useState(0);
    useEffect(() => {
        setAleatorio(Math.floor(Math.random() * (9 - 0)) + 0)

    }, []);

    function verificarAcerto(escrever) {


        if (escrever === elementos[aleatorio].palavra) {
            return setVerificar("Parabéns, você acertou!!")
        } else {
            return setVerificar("Ops, infelizmente você errou :(")
        }
    }


    function tentar(letraEscolhida) {

        if (letraEscolhida === "a" || letraEscolhida === "e" || letraEscolhida === "i" || letraEscolhida === "o" || letraEscolhida === "u") {

            if (vogais > 0) {
                setVogais(vogais - 1)
                setLetra([...letra, letraEscolhida])
                setLetraEscolhida('')
            }

        } else {

            if (consoante > 0) {
                setConsoante(consoante - 1)
                setLetra([...letra, letraEscolhida])
                setLetraEscolhida('')
            }

        }



    }

    useEffect(() => {
        countErro()
    }, [letra]);


    function letras(params) {
        var arrayPalavra = []
        for (let index = 0; index < elementos[aleatorio].palavra.length; index++) {
            arrayPalavra[index] = elementos[aleatorio].palavra[index];
        }
        return arrayPalavra
    }

    function countErro(params) {
        console.log(numero)
        console.log(letra.length)
        if ((letras().indexOf(letra[numero]) === -1) && letra.length !== 0) {
            setErro(erro + 1)
        }
        setNumero(numero + 1)

    }
    console.log(erro)
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <h2>Pista: {elementos[aleatorio].pista} </h2>
                        {erro === 0 ? <img src={img1} alt="" /> : ''}
                        {erro === 1 ? <img src={img2} alt="" /> : ''}
                        {erro === 2 ? <img src={img3} alt="" /> : ''}
                        {erro === 3 ? <img src={img4} alt="" /> : ''}

                    </div>
                    <div className="col-md-7">
                        <div className={consoante === 0 && vogais === 0 ? "display" : "inputs"} >

                            <h1 className="vogais">Escolha {vogais} Vogais e {consoante} Consoantes. </h1>
                            <input className="escolheLetra" type="text" maxLength={1} value={letraEscolhida} onChange={(e) => setLetraEscolhida(e.target.value)} />
                            <button onClick={() => tentar(letraEscolhida)}>escolher</button>
                            <br />
                            <br />
                            <span style={{ display: 'block' }}>Letras escolhidas: {
                                letra.map(item => <span style={escolhidas}>{

                                    item

                                }</span>)
                            }</span>

                        </div>
                        <span className={consoante === 0 && vogais===0?'': 'display'}>Letras escolhidas: {
                            letra.map(item => <span style={escolhidas}>{

                                item

                            }</span>)
                        }</span>

                        <h1>
                            {
                                letras().map(item => <span style={styles}>{

                                    item === letra[0] || item === letra[1] || item === letra[2] || item === letra[3] || item === letra[4] ? item : <span style={semEstilo}>?</span>

                                }</span>)
                            }


                        </h1>
                        {
                            consoante === 0 && vogais == 0 ? <h4>Escreva a palavra a ser descoberta</h4> : ''
                        }
                        {
                            consoante === 0 && vogais === 0  ? <input type="text" value={escrever} onChange={e => setEscrever(e.target.value)} /> : ''

                        }
                        {consoante === 0 && vogais === 0 ? <button onClick={() => verificarAcerto(escrever)}>enviar</button> : ''}

                        <h2>
                            {
                                verificar
                            }

                        </h2>
                        {
                            verificar !== '' ? <button onClick={() => document.location.reload(true)}>jogar novamente</button> : ''
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}


export default Teste;
