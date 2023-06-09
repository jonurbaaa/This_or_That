const popUpCookies = document.getElementById('cookies')
const aceptarCookiesBTN = document.getElementById('aceptarCookies')
const linkPrivacidad = document.getElementById('linkPrivacidad') // link al aviso de privacidad
const politicaPrivacidad = document.getElementById('avisoPrivacidad') // p donde insertarlo
const popUpInicio = document.getElementById('popUpInicio')
const botonComienzo = document.getElementById('botonComienzo')
const main = document.getElementById("main")
const preguntaDiv = document.getElementById('preguntaDiv')
const containerA = document.querySelector('.containerA')
const containerB = document.querySelector('.containerB')
let opcionA = document.getElementById('opcionA')
let opcionB = document.getElementById('opcionB')
let laOpcionA = document.getElementById('laOpcionA')
let laOpcionB = document.getElementById('laOpcionB')
const botonA = document.getElementById('botonA')
const botonB = document.getElementById('botonB')

// NO se puede clickar nada hasta que no se acepten las cookies
function inClickable(){
    console.log('hellooooo')
    popUpInicio.style.display = 'none'
    main.style.display = 'none'
}
inClickable()

linkPrivacidad.onclick = () =>{
    politicaPrivacidad.innerText = 'En esta aplicación, se registran la cantidad de votos que reciben cada una de las opciones. No recopilamos ni almacenamos información personal de los usuarios. Además se utiliza Google Analytics, para recopilar información no personal sobre el uso de nuestra aplicación.'
    popUpCookies.appendChild('newp')
    
}
aceptarCookiesBTN.onclick = ()=>{
    popUpCookies.style.display = "none"
    popUpInicio.style.display = 'block'
    main.style.display = 'block'
}
botonComienzo.onclick = () =>{
    popUpInicio.style.display = "none"
}

const urlTodasPreguntas = 'https://thisorthat-burn.onrender.com/api/datos'

let contadorPreguntas = 0
let arrayPreguntas 


function retraerData(){



    // Pedir TODAS las preguntas y sus datos. Devuelve un Array
    fetch(urlTodasPreguntas)
    .then((res) => res.json() )
    .then((data)=>{

        arrayPreguntasO = data

        function compareRandom() {
            return Math.random() - 0.5;
          }
          // Ordenar aleatoriamente el array
          arrayPreguntas = arrayPreguntasO.sort(compareRandom);
          
        console.log(arrayPreguntas.length)
        manejo(contadorPreguntas)
    })
    


    let resOpcA
    let resOpcB
    // Para obtener los datos de una pregunta concreta. Empieza en 0 y luego 1,2...
    function manejo(preguntaNum){
        
        if(arrayPreguntas[preguntaNum] !== undefined) {
           
            laOpcionA.innerText = arrayPreguntas[preguntaNum].opcion1
            laOpcionB.innerText = arrayPreguntas[preguntaNum].opcion2
           
            resOpcA = arrayPreguntas[preguntaNum].voto1 // Respuestas A en Base de Datos
            resOpcB = arrayPreguntas[preguntaNum].voto2 // Respuestas B en Base de Datos
            
            console.log(resOpcA,resOpcB)
        } else {
            popUpFinal()
            console.log('Se terminó el juego')
        }
    }
    
    botonA.addEventListener('click', () =>{
        resOpcA += 1    
        // console.log(resOpcA)
        containerA.style.border = "none"
        containerB.style.border = "none"
        calcPorcent()
    })
    botonB.addEventListener('click', () =>{
        resOpcB += 1    
        // console.log(resOpcB)
        containerA.style.border = "none"
        containerB.style.border = "none"
        calcPorcent()
    })

    // Para calcular el porcentaje de cada opcion que la gente eligió
    function calcPorcent(){
        let total = resOpcA + resOpcB
        let APorcen = ((resOpcA/total)*100).toFixed(2)
        let BPorcen = ((resOpcB/total)*100).toFixed(2)

        fetch(`https://thisorthat-burn.onrender.com/api/put/${arrayPreguntas[contadorPreguntas]._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            voto1: resOpcA,
            voto2: resOpcB
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos actualizados en la base de datos:', data)
    })
    .catch(error => {
        console.error('Error actualizando los datos en la base de datos:', error)
    })

        console.log(`Si:${APorcen}%, No: ${BPorcen}%`)
        PopUps(APorcen,BPorcen)
        
    }

    function PopUps(elA,elB){

        botonA.style.display = 'none'
        botonB.style.display = 'none'


        let datosA = document.createElement('span')
        datosA.className = 'datos_A'
        datosA.innerText = `${elA}%`
        let datosB = document.createElement('span')
        datosB.className = 'datos_B'
        datosB.innerText = `${elB}%`
        
        opcionA.appendChild(datosA)
        opcionB.appendChild(datosB)

        let newButton = document.createElement('button') // NEXT button
        newButton.className = 'newButton'
        newButton.innerText = "next"
        preguntaDiv.style.transition = "0.5s"

        preguntaDiv.appendChild(newButton)
    
        newButton.addEventListener('click', ()=>{

        containerA.style.borderRight = "3px solid #1b222e"
        containerB.style.borderLeft = "3px solid #1b222e"

            nuevaPregunta()
        })
        
    
        
    }
    
    function nuevaPregunta(){
        
        botonA.style.display = 'block'
        botonB.style.display = 'block'

        contadorPreguntas +=1
        
        popupA = document.querySelector('.datos_A').remove()
        popupB = document.querySelector('.datos_B').remove()
        popupNext = document.querySelector('.newButton').remove()
        manejo(contadorPreguntas)
        
    
    }

    function popUpFinal(){
        let newDiv = document.createElement('div')
        newDiv.className = 'divFinal'
        let newH1 = document.createElement('h1')
        newH1.innerText = 'Fin del Juego'
        let newH2 = document.createElement('h2')
        newH2.innerText = 'Respondiste a todas las preguntas'
        let newButton = document.createElement('button')
        newButton.innerText = 'Volver a empezar'
        
        newDiv.appendChild(newH1)
        newDiv.appendChild(newH2)
        newDiv.appendChild(newButton)
        main.appendChild(newDiv)
        preguntaDiv.style.opacity = "0"
        
        newButton.addEventListener('click', ()=>{
            window.location.reload()
        })
    }
}
retraerData()






///////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Pregguntas sacadas de: https://www.reddit.com/r/AskReddit/comments/8vieca/whats_your_best_would_you_rather////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
