
document.getElementById('tipo-proyecto').addEventListener('change', function () {
    const tipoProyecto = this.value;
    const rangoInput = document.getElementById('rango');
    const textoRango = document.getElementById('texto-rango'); // Captura del elemento donde se mostrará el texto

    // Configurar el rango según el tipo de proyecto seleccionado
    switch (tipoProyecto) {
        case 'orgánico':
            rangoInput.value = 50; // Rango inicial 50-80
            rangoInput.min = 50;
            rangoInput.max = 80;
            textoRango.innerText = 'El rango permitido es de 50 a 80.';
            break;
        case 'semi-acoplado':
            rangoInput.value = 81; // Rango inicial 81-100
            rangoInput.min = 81;
            rangoInput.max = 100;
            textoRango.innerText = 'El rango permitido es de 81 a 100.';
            break;
        case 'acoplado':
            rangoInput.value = 101; // Rango inicial 101-150
            rangoInput.min = 101;
            rangoInput.max = 150;
            textoRango.innerText = 'El rango permitido es de 101 a 150.';
            break;
        default:
            textoRango.innerText = ''; // Limpia el texto si no hay selección válida
            break;
    }
});

document.getElementById('rango').addEventListener('input', function () {
    const rangoMin = parseInt(this.min);
    const rangoMax = parseInt(this.max);
    const valor = parseInt(this.value);

    // Forzar a que el valor quede dentro del rango
    /*
    if (valor < rangoMin) {
        this.value = rangoMin;
    } else if (valor > rangoMax) {
        this.value = rangoMax;
    }*/

    if (valor < rangoMin || valor > rangoMax) {
        this.setCustomValidity(`El valor debe estar entre ${rangoMin} y ${rangoMax}.`);
    } else {
        this.setCustomValidity('');
    }
});

document.getElementById('rango').addEventListener('input', function () {
    const valorRango = this.value; // Capturar el valor actual
    console.log(`El rango actualizado es: ${valorRango}`);

    // Usar el valor en otra parte
    
    actualiza
actualizarResultados(valorRango);
});


//////////////////////

document.getElementById('estimacion-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Captura y validación de valores
    const entrada = parseInt(document.getElementById('entrada').value) || 0;
    const salida = parseInt(document.getElementById('salida').value) || 0;
    const salario = parseFloat(document.getElementById('salario').value) || 0;
    const tipoProyecto = document.getElementById('tipo-proyecto').value;
    const rangoLDC = parseInt(document.getElementById('rango').value) || 0;

    // Asegúrate de que todos los valores son válidos
    if (entrada === 0 || salida === 0 || salario === 0 || rangoLDC === 0) {
        alert('Por favor, rellena todos los campos correctamente.');
        return;
    }

    // Valores de A y B según el tipo de proyecto
    let A, B;
    switch (tipoProyecto) {
        case 'orgánico':
            A = 3.2;
            B = 1.05;
            C = 2.5;
            D = 0.38;
            break;
        case 'semi-acoplado':
            A = 3.0;
            B = 1.12;
            C = 2.5;
            D = 0.35;
            break;
        case 'acoplado':
            A = 2.8;
            B = 1.20;
            C = 2.5;
            D = 0.32;
            break;
        default:
            alert('Selecciona un tipo de proyecto válido.');
            return;
    }

    // Cálculos principales
    const can_flujo = entrada + salida; //Suma total de las sumas y entradas
    const ldc = can_flujo * rangoLDC; //calculo de lineas de codigo
    const mldc = ldc / 1000; // Miles de Líneas de Código
    const esfuerzo = Math.round(A * Math.pow(mldc, B)); // Esfuerzo nominal
    const tdev = Math.ceil(C * Math.pow(esfuerzo, D)); // Tiempo de desarrollo
    const productividad = Math.ceil(ldc / esfuerzo); // Productividad
    const costo = esfuerzo * salario; // Costo total del software
    const costoPorLinea = costo / ldc; // Costo por línea de código

    // Mostrar resultados
    document.getElementById('cantidad-total-entradas-salidas').innerText = `Cantidad Total Entradas/Salidas: ${can_flujo}`;
    document.getElementById('calculo-de-lineas-de-codigo').innerText = `Cálculo de Líneas de Código: ${ldc}`;
    document.getElementById('calculo-de-Miles-de-lineas-de-codigo').innerText = `Cálculo de Miles de Líneas de Código: ${mldc}`;
    document.getElementById('esfuerzo-nominal').innerText = `Esfuerzo Nominal: ${esfuerzo} personas-mes`;
    document.getElementById('tiempo-desarrollo').innerText = `Tiempo de Desarrollo: ${tdev} meses`;
    document.getElementById('estimacion-de-productividad').innerText = `Estimación de Productividad: ${productividad} LDC/persona-mes`;
    document.getElementById('costo-de-software').innerText = `Costo del Software: ${costo.toFixed(2)} Bs.`;
    document.getElementById('costo-por-linea-de-codigo').innerText = `Costo por Línea de Código: ${costoPorLinea.toFixed(2)} Bs./LDC`;
});



document.getElementById('estimacion-form').addEventListener('reset', function () {
    // Limpiar los resultados
    document.getElementById('cantidad-total-entradas-salidas').innerText = '';
    document.getElementById('calculo-de-lineas-de-codigo').innerText = '';
    document.getElementById('calculo-de-Miles-de-lineas-de-codigo').innerText = '';
    document.getElementById('esfuerzo-nominal').innerText = '';
    document.getElementById('tiempo-desarrollo').innerText = '';
    document.getElementById('estimacion-de-productividad').innerText = '';
    document.getElementById('costo-de-software').innerText = '';
    document.getElementById('costo-por-linea-de-codigo').innerText = '';
});
