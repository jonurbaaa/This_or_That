const main = document.getElementById("main")
const preguntaDiv = document.getElementById('preguntaDiv')
let preguntaHTML = document.getElementById('pregunta')
const botonSi = document.getElementById('botonSi')
const botonNo = document.getElementById('botonNo')

const urlTodasPreguntas = 'http://localhost:3000/api/datos'

contadorPreguntas = 0


function retraerData(numPregunta){

    let resSiBD
    let resNoBD

    //Pedir TODOS los DATOS
    fetch(urlTodasPreguntas)
    .then((res) => res.json())
    .then((data)=>{
        console.log(data)
        let idPregunta = data[contadorPreguntas]._id
        resSiBD = data[contadorPreguntas].si // Respuestas Si en Base de Datos
        resNoBD = data[contadorPreguntas].no// Respuestas No en Base de Datos
        preguntaHTML.innerText = data[contadorPreguntas].pregunta


        // console.log(resSiBD,resNoBD)
    })
    
    
    botonSi.addEventListener('click', () =>{
        resSiBD += 1    
        calcPorcent()
    })
    botonNo.addEventListener('click', () =>{
        resNoBD += 1    
        calcPorcent()
    })


    function calcPorcent(){
        let total = resSiBD + resNoBD
        let noPorcen = ((resNoBD/total)*100).toFixed(2)
        let siPorcen = ((resSiBD/total)*100).toFixed(2)

        // console.log(`Si:${siPorcen}%, No: ${noPorcen}%`)

        let siPorcenDis = document.createElement('h3')
        siPorcenDis.innerText = `${siPorcen}%`
        let noPorcenDis = document.createElement('h3')
        noPorcenDis.innerText = `${noPorcen}%`

        sumarPregunta()
        PopUps(siPorcen,noPorcen)
    }
    function sumarPregunta(){
        contadorPreguntas +=1
        // console.log(contadorPreguntas)

    }
    
}

retraerData()

function PopUps(elSi,elNo){
    preguntaDiv.style.opacity = "0.4"
    
    setTimeout(() => {
    let newDiv = document.createElement('div')

    let containerRespuestas = document.createElement('div')
    containerRespuestas.className = 'containerRespuestas'
    let containerSi = document.createElement('div')
    containerSi.className = 'containerSi'
    let containerNo = document.createElement('div')
    containerNo.className = 'containerNo'


    let spanSi = document.createElement('span')
    spanSi.innerText = 'Votos a SI'
    let datosSi = document.createElement('span')
    datosSi.innerText = `${elSi}%`
    let spanNo = document.createElement('span')
    spanNo.innerText = 'Votos a NO'
    let datosNo = document.createElement('span')
    datosNo.innerText = `${elNo}%`

    let newButton = document.createElement('button') // NEXT button
    newButton.innerText = "next"

    containerSi.appendChild(spanSi)
    containerSi.appendChild(datosSi)
    containerNo.appendChild(spanNo)
    containerNo.appendChild(datosNo)


    containerRespuestas.appendChild(containerSi)
    containerRespuestas.appendChild(containerNo)
    newDiv.appendChild(containerRespuestas)
    newDiv.appendChild(newButton)
    newDiv.className = 'nextPopUP'
    main.appendChild(newDiv)


    newButton.addEventListener('click', ()=>{
    
        console.log('contador: ',contadorPreguntas)
        // retraerData(contadorPreguntas)
    })
    
}, 1000);

    
}