let alunos = []

function renderizarAlunos(){
    let corpo = document.getElementById('corpoTabela')
    corpo.innerHTML = ''
    alunos.forEach((aluno, index) => {
        let tr = document.createElement('tr') //tr adiciona linha
        let tdNome = document.createElement('td') //td adiciona coluna
        tdNome.textContent = aluno.nome
        let td1Nota = document.createElement('td')
        td1Nota.textContent = aluno.primeiranota
        let td2Nota = document.createElement('td')
        td2Nota.textContent = aluno.segundanota
        let tdMedia = document.createElement('td')
        tdMedia.textContent = aluno.media.toFixed(2)
        let tdstatus = document.createElement('td')
        tdstatus.textContent = aluno.status

        tr.appendChild(tdNome)
        tr.appendChild(td1Nota)
        tr.appendChild(td2Nota)
        tr.appendChild(tdMedia)
        tr.appendChild(tdstatus)
        corpo.appendChild(tr)
    })
}
function verificarinput(x, y, z){
    if(x == "" || y == 0 || z == 0){
        alert("[ERRO] FALTAM DADOS!, Preencha os Dados que estão faltando!")
        return false
    } else{
        return true
    }
}
function definirStatus(x){
    if(x >= 6){
        return "Aprovado"
    }
    else{
        return "Reprovado"
    } //retorna status do aluno
}

function adicionar(){
    // Manipulando o DOM, pega os valores digitados nos inputs do index.html
    let nome = document.getElementById('nome') 
    let nota1 = document.getElementById('nota1')
    let nota2 = document.getElementById('nota2')
    
    if(!verificarinput(nome.value, Number(nota1.value), Number(nota2.value))){
        return
    }
    
    let media = (Number(nota1.value) + Number(nota2.value)) / 2 //define a média
    let status = definirStatus(media)// chama a função pra definir status do aluno
    
    //cria um objeto com valores que serão passado pro o array
    const aluno = {
        nome: nome.value,
        primeiranota: Number(nota1.value),
        segundanota: Number(nota2.value),
        media: media,
        status: status
    }
    alunos.push(aluno) //puxa os valores do objeto definidos acima

    nome.value = ''
    nota1.value = ''
    nota2.value = ''
    nome.focus()
    renderizarAlunos()
}
