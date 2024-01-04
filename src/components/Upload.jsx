import axios from "axios";
import React from "react";
import { useState } from "react";

const API_URL = "https://homol.extraidados.com.br/api/portalEngines-processApp/process";
const numeroDoUsuario = 77;
const token = "9HieJfuOlVcHVesu6Gy31WkMnTOVLLa3u7XhMjOQsCN6LOr8Ab"

export default function Upload(){
    const [imagem, setImagem] = useState({file: null});
    const [tipoDocumento, setTipoDocumento] = useState("");
    const [results, setResults] = useState(null);

    function requisicaoApi(event) {
      event.preventDefault();
        const header = { headers: {
            'Authorization': token,
            'content-type': 'multipart/form-data'
            }    
        }
        const formApi = new FormData();
        formApi.append('image',imagem.file);
        formApi.append('userId',numeroDoUsuario);
        formApi.append('documentClassification',tipoDocumento)
        
        axios.post(API_URL, formApi, header)
          .then((response) => {
            setResults(response.data.resultados[0].camposExtraidos);
            console.log(response.data.resultados[0].camposExtraidos);
          })
      }
    
      function onChangeImagem(event) {
        setImagem({file: event.target.files[0]});
      }

      function onChangeTipo(e) {
        setTipoDocumento(e.target.value);
      }
      console.log(tipoDocumento)
      console.log(imagem);

    return(
        <>
        <form onSubmit={requisicaoApi}>
          <p>Tire uma foto do seu documento, ou selecione da sua galeria:</p>
          <input 
            id="documentoimagem" 
            type="file" 
            name="documentoimagem" 
            required 
            placeholder="Imagem do documento" 
            onChange={onChangeImagem}
          />
          <label htmlFor="documenttype">Escolha o tipo de documento:</label>
            <select onChange={onChangeTipo} name="documenttype" id="documenttype">
            <option value="cnh">CNH</option>
            <option value="rg">RG</option>
            <option value="cpf">CPF</option>
            </select>
          <button>Enviar</button>
        </form>
        <p>{results?.data_nascimento[0].text}</p>
        <p>{results?.orgao_expedidor[0].text}</p>
        </>
    )
}