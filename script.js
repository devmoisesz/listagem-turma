let alunos = []

function renderizarAlunos(){ //function para cadastrar os alunos na tabela
    let corpo = document.getElementById('corpoTabela')
    corpo.innerHTML = ''
    alunos.forEach((aluno) => { 
        //tr adiciona linha
        //td adiciona coluna
        let tr = document.createElement('tr') 
        let tdNome = document.createElement('td') 
        tdNome.textContent = aluno.nome
        let td1Bim = document.createElement('td')
        td1Bim.textContent = aluno.primeirobimestre
        let td2Bim = document.createElement('td')
        td2Bim.textContent = aluno.segundobimestre
        let td3Bim = document.createElement('td')
        td3Bim.textContent = aluno.terceirobimestre
        let td4Bim = document.createElement('td')
        td4Bim.textContent = aluno.quartobimestre
        let tdMedia = document.createElement('td')
        tdMedia.textContent = aluno.media.toFixed(2)
        let tdstatus = document.createElement('td')
        tdstatus.textContent = aluno.status
        if(aluno.status === "Aprovado"){
            tdstatus.style.color = "green"
        } else if(aluno.status === "Reprovado"){
            tdstatus.style.color = "red"
        } else{
            tdstatus.style.color = "blue"
        }

        tr.appendChild(tdNome)
        tr.appendChild(td1Bim)
        tr.appendChild(td2Bim)
        tr.appendChild(td3Bim)
        tr.appendChild(td4Bim)
        tr.appendChild(tdMedia)
        tr.appendChild(tdstatus)
        corpo.appendChild(tr)
    })
}
function verificarinput(a, b, c, d, e){ //function para verificar se o usuario deixou input vazio
    //Se os inputs estiverem vazios, alerta na tabela, e retorna falso
    if(a === "" || b === "" || c === "" || d === "" || e === ""){
        alert("[ERRO] FALTAM DADOS!, Preencha os Dados que estão faltando!")
        return false
    } 
    else{
        return true
    }
}
function definirStatus(x){ //function para definir status do aluno
    if(x >= 7){
        return "Aprovado"
    }
    else if(x >= 5){
        return "Recuperação"
    } else{
        return "Reprovado"
    }
}

function adicionar(){
    // Manipulando o DOM, pega os valores digitados nos inputs do index.html
    let nome = document.getElementById('nome') 
    let bim1 = document.getElementById('bim1')
    let bim2 = document.getElementById('bim2')
    let bim3 = document.getElementById('bim3')
    let bim4 = document.getElementById('bim4')

    //se o valores passados pra função for falso execute == ! NÂO VERDADEIRO 
    if(!verificarinput(nome.value, bim1.value, bim2.value, bim3.value, bim4.value)
    ){ 
        return
    }

    const notas = [ //guarda as notas no array
        Number(bim1.value),
        Number(bim2.value),
        Number(bim3.value),
        Number(bim4.value)
    ]
    
    let media = notas.reduce((acumulador, n) => acumulador + n, 0) / notas.length
    
    let status = definirStatus(media)// chama a função pra definir status do aluno
    
    //cria um objeto com valores que serão passado pro o array
    const aluno = {
        nome: nome.value,
        primeirobimestre: Number(bim1.value),
        segundobimestre: Number(bim2.value),
        terceirobimestre: Number(bim3.value),
        quartobimestre: Number(bim4.value),
        media: media,
        status: status
    }
    alunos.push(aluno) //puxa os valores do objeto definidos acima para o array

    renderizarAlunos()
    nome.value = ''
    bim1.value = ''
    bim2.value = ''
    bim3.value = ''
    bim4.value = ''
    nome.focus()
}
function resultado(){
    let res = document.getElementById('resultado')
    const alunosAprovados = alunos.filter(alunoap =>{
        if(alunoap.status === "Aprovado"){
            return true
        } else{
            return false
        }
    })
    const alunosReprovados = alunos.filter(alunorep => {
        if(alunorep.status === "Reprovado"){
            return true
        } else{
            return false
        }
    })
    const alunosRecuperacao = alunos.filter(alunorec => {
        if(alunorec.status === "Recuperação"){
            return true
        } else{
            return false
        }
    })
    res.innerHTML = `${alunosAprovados.length} Alunos Aprovados<br>`
    res.innerHTML += `${alunosReprovados.length} Alunos Reprovados<br>`
    res.innerHTML += `${alunosRecuperacao.length} Alunos em Recuperação<br>`
}
function limpar(){
    if(confirm("Tem certeza que deseja limpar todos os alunos?")){
    alunos = []
    renderizarAlunos()
    let corpo = document.getElementById('corpoTabela')
    corpo.innerHTML = ""
    let res = document.getElementById('resultado')
    res.innerHTML = ''
    }
}
