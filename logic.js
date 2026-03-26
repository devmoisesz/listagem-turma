let nomev = []
let nota1v = []
let nota2v = []

function adicionar(){
    let nome = document.getElementById('nome')
    let num1 = document.getElementById('nota1')
    let num2 = document.getElementById('nota2')
    let listalunos = document.getElementById('selalunos')
    if(nome.value == "" || num1.value.length == 0 || num2.value.length == 0){
        alert('[ERRO] Preencha os dados!')
        return
    } if(nomev.includes(nome.value)){
        alert('Aluno já adicionado')
        return
    }
        let nota1 = Number(num1.value)
        let nota2 = Number(num2.value)
        var media = (nota1 + nota2) / 2

        nomev.push(nome.value)
        nota1v.push(nota1)
        nota2v.push(nota2)

        let item = document.createElement('option')
        item.textContent = `${nome.value} tem a média ${media}`
        item.value = `alu${media}`
        listalunos.appendChild(item)

        nome.value = ''
        num1.value = ''
        num2.value = ''
        nome.focus()
}
function finalizar(){
    let res = document.querySelector('div#res')
    if(nomev.length == 0){
        alert('Adicione valores antes de finalizar')
        return
    }
    let soma = 0

    //calcula a média da turma
    for(let i = 0;i < nomev.length;i++){
        let mediavet = (nota1v[i] + nota2v[i]) / 2
        soma += mediavet
    }

    let mediaTurma = soma / nomev.length

    //conta quantos alunos acima da média tem
    let tot = 0
    for(let i =0;i < nomev.length; i++){
        let media = (nota1v[i] + nota2v[i]) / 2
        if(media > mediaTurma){
            tot++
        }
    }

    res.innerHTML = `A média da turma é ${mediaTurma.toFixed(2)}<br>`
    res.innerHTML += `Temos ${tot} alunos acima da média`
}
