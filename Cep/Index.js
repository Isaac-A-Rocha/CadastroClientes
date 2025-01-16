document.getElementById("cep").addEventListener("blur", async () => {
    const cepInput = document.getElementById("cep");
    const cep = cepInput.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cep.length === 8) {
        console.log("CEP formatado corretamente:", cep);
        await buscarCEP(cep);
    } else {
        console.error("CEP inválido. Verifique o valor inserido:", cepInput.value);
        alert("Digite um CEP válido com 8 dígitos.");
    }
});

const buscarCEP = async (cep) => {
    try {
        console.log("Iniciando busca do CEP:", cep);
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            console.error(`Erro na requisição: ${response.status}`);
            alert("Ocorreu um erro na requisição. Tente novamente.");
            return;
        }

        const data = await response.json();
        console.log("Dados retornados da API:", data);

        if (data.erro) {
            alert("CEP não encontrado.");
            console.warn("API retornou erro para o CEP:", cep);
            return;
        }

        // Preenche os campos automaticamente
        document.getElementById("endereco").value = data.logradouro || "";
        document.getElementById("bairro").value = data.bairro || "";
        document.getElementById("cidade").value = data.localidade || "";
        document.getElementById("estado").value = data.uf || "";

        console.log("Campos preenchidos com sucesso.");
    } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
        alert("Ocorreu um erro ao buscar o CEP. Tente novamente.");
    }
};

const confirmarDados = () => {
    const endereco = document.getElementById("endereco").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;

    if (!endereco || !bairro || !cidade || !estado) {
        alert("Preencha todos os campos antes de confirmar.");
        console.warn("Dados incompletos:", { endereco, bairro, cidade, estado });
        return;
    }

    alert("Dados confirmados com sucesso!");
    console.log("Dados confirmados:", { endereco, bairro, cidade, estado });
};

const limparCampos = () => {
    document.getElementById("endereco").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
};
