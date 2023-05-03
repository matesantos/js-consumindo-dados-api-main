async function searchStreet(cep){
    const mensagemDeErro =  document.querySelector('#erro');
    mensagemDeErro.innerHTML = "";
    try{
        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaCEPConvertida = await consultaCEP.json();
        if(consultaCEPConvertida.erro){
            throw Error("O CEP não existe!");
        }
        const cidade = document.querySelector('#cep');
        const logradouro  = document.querySelector('#endereco');
        const estado  = document.querySelector('#estado');
        const bairro  = document.querySelector('#bairro');
        const localidade  = document.querySelector('#cidade');

        cidade.value = consultaCEPConvertida.localidade;
        logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        bairro.value = consultaCEPConvertida.bairro;
        localidade.value = consultaCEPConvertida.localidade;
        
        return consultaCEPConvertida;    
    }catch(error) {
        mensagemDeErro.innerHTML = `
            <p>CEP ${cep} inválido. Tente novamente</p>
        `
        console.log(error);
    }
}

const cep = document.querySelector('#cep');
cep.addEventListener('focusout', () => {
    searchStreet(cep.value);
})



