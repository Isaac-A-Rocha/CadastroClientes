function nextForm(formId) {
    const formCliente = document.getElementById("formCliente");
    const formEndereco = document.getElementById("formEndereco");
    
    if (formId === "formEndereco") {
        formCliente.style.display = "none";
        formEndereco.style.display = "block";
    } else {
        formCliente.style.display = "block";
        formEndereco.style.display = "none";
    }
}
