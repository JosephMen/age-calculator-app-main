
const formulario = document.querySelector(".form-entradas")

const spanAnhos = document.querySelector('.salida-years')
const spanMonths = document.querySelector('.salida-months')
const spanDays = document.querySelector('.salida-days')
formulario.addEventListener('submit', (event) => {

    event.preventDefault()

    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.validity.valid === false){
            input.parentElement.classList.add('invalid')
            input.nextElementSibling.textContent = "Required field"
            if(input.validity.rangeOverflow || input.validity.rangeUnderflow){
                let mensaje = 'Must be a valid'
                if(input.id === 'dia') mensaje += ' day'
                if(input.id === 'mes') mensaje += ' month'
                if(input.id === 'anho'){
                    let fechaIngresada = new Date(`01-01-${input.value}`)
                    if (fechaIngresada > Date.now()){
                        mensaje = "Must be in the past"
                    }else{
                        mensaje = "Must be > 1900)"
                    }
                }
                input.nextElementSibling.textContent = mensaje
                return
            }
            if(input.validity.stepMismatch){
                input.nextElementSibling.textContent = "Only integer numbers"
                return
            }
    
            return 
        }
        input.parentElement.classList.remove('invalid')
    })
    if(event.target.checkValidity() === false){
        return
    }
    if (parseInt(dia.value) === 31 && [2, 4, 6, 9, 11].includes(parseInt(mes.value))){
        dia.parentElement.classList.add('invalid')
        dia.nextElementSibling.textContent = "Day out of range"
        return
    }
    if (parseInt(dia.value) === 30 && parseInt(mes.value) === 2){
        dia.parentElement.classList.add('invalid')
        dia.nextElementSibling.textContent = "Day out of range"
        return
    }
    if (parseInt(dia.value) === 29 && parseInt(mes.value) === 2 && parseInt(anho.value) % 4 !== 0){
        dia.parentElement.classList.add('invalid')
        dia.nextElementSibling.textContent = "Day out of range ea"
        return
    }

    let fechaIngresada = new Date(`${mes.value}-${dia.value}-${anho.value}`)
    let ahora = new Date();
    if (fechaIngresada > ahora){
        dia.parentElement.classList.add('invalid')
        dia.nextElementSibling.textContent = "Must be in the past"
        return
    }

    const mesActual = ahora.getMonth()
    const mesIngresado = fechaIngresada.getMonth()

    const diaActual = ahora.getDate()
    const diaIngresado = fechaIngresada.getDate()

    const anioActual = ahora.getFullYear()
    const anioIngresado = fechaIngresada.getFullYear()

    const ingresadoEsMesMayor = mesActual < mesIngresado
    const ingresadoEsMesigual = mesActual === mesActual
    const ingresadoEsDiaMayor = diaActual < diaIngresado

    const one_or_zero = ingresadoEsMesMayor || (ingresadoEsMesigual && ingresadoEsDiaMayor)

    let year_difference = anioActual - anioIngresado

    console.log("Actual", anioActual, mesActual, diaActual)
    console.log("Ingresada", anioIngresado, mesIngresado, diaIngresado)
    const age = year_difference - one_or_zero
    let months = mesIngresado <= mesActual ? (mesActual - mesIngresado) : (11 - mesIngresado) + mesActual + 1
    let days = diaIngresado
    if(mesIngresado > mesActual){
        let diasMesPasadoAlActual = (mesActual === 0 ? 31 : cantidadDias(mesActual, anioIngresado))
        if (diaIngresado >= diaActual){
            let diasSobrantes = diasMesPasadoAlActual < diaIngresado ? 0 : diasMesPasadoAlActual - diaIngresado
            days = diasSobrantes + diaActual
            months -= 1
        }else{
            days = diaActual - diaIngresado
        }
    }else{
        if(diaActual >= diaIngresado){
            days = diaActual - diaIngresado
        }else{
            days = (cantidadDias(mesActual, anioActual) - diaIngresado) + diaActual
            months -= 1
        }

    }

    spanAnhos.textContent = age
    spanMonths.textContent = months
    spanDays.textContent = days

})

function cantidadDias(mes, anio){
    if(mes === 2){
        if (anio % 4 === 0){
            return 29
        }
        return 28
    }
    if ([4, 6, 9, 11].includes(mes)){
        return 30
    }
    return 31
}