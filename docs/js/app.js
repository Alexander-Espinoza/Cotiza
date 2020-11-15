//Cotizador constructor

function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}
Seguro.prototype.cotizarSeguro = function() {
    const AMERICANO = 1.25;
    const ASIATICO = 1.05;
    const EUROPEO = 1.35;
    let cantidad;
    const base = 2000;
    switch(this.marca){
        case '1':
            cantidad = base * AMERICANO;
            break;
        case '2':
            cantidad = base * ASIATICO;
            break;
        case '3':
            cantidad = base * EUROPEO;
            break;
    }
    //Leer el año
    const diferencia = new Date().getFullYear() - this.anio;
    cantidad -= 3*diferencia*cantidad/100;

    if(this.tipo === "basico") {
        cantidad *= 1.3;
    } else {
        cantidad *= 1.5;
    }
    return cantidad
}

function Interfaz() {}

Interfaz.prototype.mostrarMensaje = function(mensaje, tipo) {
    const div = document.createElement('div');

    if (tipo === "error") {
        div.classList.add('mensaje',"error");
    } else {
        div.classList.add('mensaje',"correcto");
    }
    div.innerHTML = `${mensaje}`;
    formulario.insertBefore(div, document.querySelector('.form-group'));
    setTimeout(() => {
        document.querySelector(".mensaje").remove();
        
    }, 2000);
}

Interfaz.prototype.mostrarResultado = function (seguro, total) {
    const resultado = document.getElementById("resultado");
    let marca;
    console.log(seguro)
    switch (seguro.marca) {
        case '1':
            marca = "Americano";
            break;
        case  '2':
            marca = "Asiático";
            break;
        case '3':
            marca = "Europeo";
            break;
    }
    if(seguro.tipo === "basico") {
        tipo = "Básico";
    }
    else{
        tipo = "Completo";
    }
    const div = document.createElement('div');
    //Insertar la información
    div.innerHTML = `
        <p class="header" >Tu Resumen: </p>
        <p>Marca: ${marca} </p>
        <p>Año: ${seguro.anio} </p>
        <p>Tipo: ${tipo} </p>
        <p>Total: ${total} </p>
    `;
    const spinner = document.querySelector("#cargando img");
    spinner.style.display = 'block';
    setTimeout(() => {
        resultado.appendChild(div);
        spinner.style.display = 'none';
        
    }, 2000);
    
}

//Event Listener
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    //leer el valor del radiobutton
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //crear instancia de interfaz
    const interfaz = new Interfaz();

    //Validación
    if(marcaSeleccionada==="" || anioSeleccionado==="" || tipo ===""){
        interfaz.mostrarMensaje('Faltan datos, revisar el formulario de nuevo', 'error')
        const resultados = document.querySelector('#resultado div');
        if(resultados != null) {
            resultados.remove();
        }
    } else {
        //Limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if(resultados != null) {
            resultados.remove();
        }

        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        const cantidad = seguro.cotizarSeguro();
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando...', 'correcto')
    }
})


const max = new Date().getUTCFullYear();
      min = max - 20;

      console.log(max)
      console.log(min)

const selectAnios = document.getElementById('anio');
for(let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}