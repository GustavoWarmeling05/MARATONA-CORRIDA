 let tabela = document.querySelector("table")
 let botaoInserir = document.querySelector('#inserir')
 let campoBusca = document.querySelector("#filtro");
 let campoCEP = document.querySelector("#cep")
 let campoCidade = document.querySelector("#cidade")
 
 //adiciona dados do corredor para a tabela
 botaoInserir.addEventListener("click", function(){
 
     let formulario = document.querySelector('#form-inscricao')
 
     let corredor = dadosDoFormulario(formulario)
     adicionaCorredor(corredor)
     formulario.reset()
 
 })
 
 tabela.addEventListener("dblclick", function(event){
     let alvo = event.target
     let alvoPai = alvo.parentNode
     alvoPai.remove();
 })
 
 //filtro de busca
 campoBusca.addEventListener("input", function(event){
 
     let corredores = document.querySelectorAll(".corredor")
     for(let pos = 0; pos < corredores.length; pos++){
         let corredor = corredores[pos]
         let nomeTd = corredor.querySelector(".info-nome")
         let nome = nomeTd.textContent;
 
         let expressaoBusca = new RegExp(this.value,"i")
 
         if(!expressaoBusca.test(nome)){
             corredor.classList.add("invisivel")
         }
         else{
             corredor.classList.remove("invisivel")
         }

     }
 
 })
 
 
 //chamar API para carregar dados do CEP
 campoCEP.addEventListener("focusout", function(){
 
     let cepAPI = new XMLHttpRequest()
     cepAPI.open("GET", "https://viacep.com.br/ws/"+campoCEP.value+"/json/")
     cepAPI.send()
     cepAPI.addEventListener("load", function(){
         let resposta = cepAPI.responseText
         let dados = JSON.parse(resposta)
         campoCidade.value = dados.localidade
     })
 })
 
 function dadosDoFormulario(form){
     let corredor = {
         nome: form.nome.value,
         cpf: form.cpf.value,
         datadenascimento: form.datadenascimento.value,
         fone:form.fone.value,
         cep:form.cep.value,
         cidade:form.cidade.value,
         email:form.email.value,
         distancia:form.dist.value
     }
     return corredor
 }
 
 function adicionaCorredor(corredor){
     let corredorTr = constroiTr(corredor)
     let tabela = document.querySelector('#tabela')
     tabela.appendChild(corredorTr)
 }
 
 function constroiTr(corredor){

     let corredorTr = document.createElement("tr")
     corredorTr.classList.add("corredor")
 
     corredorTr.appendChild(constroiTd(corredor.nome, "info-nome"))
     corredorTr.appendChild(constroiTd(corredor.cpf, "info-cpf"))
     corredorTr.appendChild(constroiTd(calcularIdade(corredor.datadenascimento),"info-datadenascimento"))
     corredorTr.appendChild(constroiTd(corredor.fone,"info-fone"))
     corredorTr.appendChild(constroiTd(corredor.distancia,"info-distancia"))
     return corredorTr
 }
 
 function constroiTd(dado, classe){
     var td = document.createElement("td")
     td.textContent = dado
     td.classList.add(classe)
     return td;
 }
 
 function calcularIdade (datadenascimento) {
    
    var d = new Date()
        anoAtual = d.getFullYear()
        mesAtual = d.getMonth() + 1
        diaAtual = d.getDate()

        niver = new Date(datadenascimento)
        anoAniversario = niver.getFullYear()
        mesAniversario = niver.getMonth()
        diaAniversario = niver.getDate()


        quantosAnos = anoAtual - anoAniversario;
        
        if (mesAtual < mesAniversario || mesAtual == mesAniversario && diaAtual < diaAniversario) {
            quantosAnos--
        }  
        
        
        return quantosAnos < 0 ? 0 : quantosAnos;
}