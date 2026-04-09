let alunos = []
const nome = document.getElementById('nome') 
const bim1 = document.getElementById('bim1')
const bim2 = document.getElementById('bim2')
const bim3 = document.getElementById('bim3')
const bim4 = document.getElementById('bim4')

function renderizarAlunos(){ 
    let corpo = document.getElementById('corpoTabela')
    corpo.innerHTML = ''
    // Percorre cada aluno no array "alunos"
    alunos.forEach((aluno) => { 
        // createElement('tr') == Cria uma nova linha na tabela
        let tr = document.createElement('tr') 
        // Cria as colunas da linha e coloca os valores do aluno
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

        // Adiciona todas as colunas criadas na linha
        tr.appendChild(tdNome)
        tr.appendChild(td1Bim)
        tr.appendChild(td2Bim)
        tr.appendChild(td3Bim)
        tr.appendChild(td4Bim)
        tr.appendChild(tdMedia)
        tr.appendChild(tdstatus)
        // Adiciona a linha completa na tabela
        corpo.appendChild(tr)
    })
}
// Função para verificar se algum input está vazio
function verificarinput(a, b, c, d, e){ 
    // Se algum dos valores passados for vazio, mostra alerta e retorna falso
    if(a === "" || b === "" || c === "" || d === "" || e === ""){
        alert("[ERRO] FALTAM DADOS!, Preencha os Dados que estão faltando!")
        return false
    } 
    else{
        return true
    }
}
function definirStatus(x){ 
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
    //Se algum campo estiver vazio, interrompe a função
    if(!verificarinput(nome.value, bim1.value, bim2.value, bim3.value, bim4.value)){
        return
    }
    const nomeDuplicado = alunos.some(aluno => 
        aluno.nome.toLowerCase() === nome.value.toLowerCase()
    )
    if(nomeDuplicado){
        alert(`[ERRO] O aluno "${nome.value}" já está cadastrado!`)
        nome.value = ''
        bim1.value = ''
        bim2.value = ''
        bim3.value = ''
        bim4.value = ''
        nome.focus()
        return
    }
    const notas = [ 
        Number(bim1.value),
        Number(bim2.value),
        Number(bim3.value),
        Number(bim4.value)
    ]
    
    let media = notas.reduce((acumulador, n) => acumulador + n, 0) / notas.length
    
    let status = definirStatus(media)
    
    // Cria um objeto representando o aluno com nome, notas, média e status
    const aluno = {
        nome: nome.value,
        primeirobimestre: Number(bim1.value),
        segundobimestre: Number(bim2.value),
        terceirobimestre: Number(bim3.value),
        quartobimestre: Number(bim4.value),
        media: media,
        status: status
    }
    // Adiciona o aluno criado ao array "alunos"
    alunos.push(aluno) 

    renderizarAlunos()
 
    nome.value = ''
    bim1.value = ''
    bim2.value = ''
    bim3.value = ''
    bim4.value = ''
    nome.focus()
 
}
function resultado(){
    // Primeiro verificar se algum aluno foi cadastrado
    if(alunos.length === 0){
        alert("[ERRO] Nenhum aluno cadastrado! Cadastre algum aluno antes de ver o resultado")
        return
    }
    let res = document.getElementById('resultado')
    //Filter para criar arrays separados com os alunos aprovados, reprovados e em recuperação
    const alunosAprovados = alunos.filter(alunoap =>{
        if(alunoap.status === "Aprovado"){
            return true
        } else{
            return false
        }
    })
    const alunosReprovados = alunos.filter(alunorep =>{
        if(alunorep.status === "Reprovado"){
            return true
        } else{
            return false
        }
    })
    const alunosRecuperacao = alunos.filter(alunorec =>{
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