const inputMetas = document.getElementById('metas');
const inputArticulos = document.getElementById('articulos');
const inputAsuetos = document.getElementById('asuetos');

const formularioVentas = document.getElementById('formulario-ventas');
const formularioArticulos = document.getElementById('formulario-articulos');
const formularioAsuetos = document.getElementById('formulario-asuetos');

let metaVentas = 0;
let articulosVendidos = 0;
let asuetosFechas = [];
let resultados = {
    metaDiaria: 0,
    proyeccion: 0,
    porcentajeProyeccion: 0
};

const fecha = new Date();

const diaDelMes = () => {
    return fecha.getDate();
};

const ultimoDiaDelMes = () => {
    return new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0).getDate();
};

const diasRestantes = () => {
    let diasRestantes = 0;
    for (let dia = diaDelMes(); dia <= ultimoDiaDelMes(); dia++) {
        const fechaDia = new Date(fecha.getFullYear(), fecha.getMonth(), dia);
        const esSabado = fechaDia.getDay() === 6;
        const esAsueto = asuetosFechas.some(asueto => asueto.toDateString() === fechaDia.toDateString());
        if (!esSabado && !esAsueto) {
            diasRestantes++;
        }
    }
    return diasRestantes;
};

const diasTranscurridos = () => {
    let diasTranscurridos = 0;
    const primerDiaMes = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
    const hoy = new Date();
    for (let dia = primerDiaMes.getDate(); dia <= hoy.getDate(); dia++) {
        const fechaDia = new Date(fecha.getFullYear(), fecha.getMonth(), dia);
        if (fechaDia.getDay() !== 6) {
            diasTranscurridos++;
        }
    }
    return diasTranscurridos;
};

const mostrarAlerta = (formulario, mensaje) => {
    const alertaPrevia = formulario.querySelector('.alerta');
    if (alertaPrevia) alertaPrevia.remove();
    const alerta = document.createElement('div');
    alerta.className = 'alerta';
    alerta.textContent = mensaje;
    formulario.appendChild(alerta);
    setTimeout(() => alerta.remove(), 3000);
};

const actualizarResultados = () => {
    const diasRestantesCount = diasRestantes();
    const diasTranscurridosCount = diasTranscurridos();
    
    // Meta diaria: artículos que faltan por vender dividido entre días restantes
    const articulosFaltantes = metaVentas - articulosVendidos;
    resultados.metaDiaria = diasRestantesCount > 0 ? Math.ceil(articulosFaltantes / diasRestantesCount) : 0;
    
    // Proyección: promedio de artículos vendidos por día hasta ahora
    resultados.proyeccion = diasTranscurridosCount > 0 ? (articulosVendidos / diasTranscurridosCount).toFixed(2) : 0;
    
    // Proyección en porcentaje: (proyección / metaVentas) * 100
    resultados.porcentajeProyeccion = metaVentas > 0 ? ((resultados.proyeccion / metaVentas) * 100).toFixed(2) : 0;
};

const mostrarResultados = () => {
    // Verificar si todos los datos están completos
    if (metaVentas > 0 && articulosVendidos >= 0 && document.querySelectorAll('.form-asueto').length === asuetosFechas.length) {
        // Crear o actualizar el contenedor de resultados
        let resultadosContainer = document.querySelector('.resultados-container');
        if (!resultadosContainer) {
            resultadosContainer = document.createElement('div');
            resultadosContainer.className = 'resultados-container';
            document.querySelector('.form-container').appendChild(resultadosContainer);
        }
        
        // Limpiar contenido previo
        resultadosContainer.innerHTML = '';

        // Agregar los divs al contenedor principal
        resultadosContainer.innerHTML = `
            <div class="resultados">Meta diaria: ${resultados.metaDiaria} </div>
            <div class="resultados">Proyección: ${resultados.proyeccion} </div>
            <div class="resultados">Proyección en porcentaje: ${resultados.porcentajeProyeccion}%</div>
        `;
    }
};

formularioVentas.addEventListener('submit', (event) => {
    event.preventDefault();
    const meta = parseInt(inputMetas.value, 10);
    if (isNaN(meta) || meta < 0) {
        mostrarAlerta(formularioVentas, 'Debe ingresar un número válido');
        return;
    }
    metaVentas = meta;
    actualizarResultados();
    mostrarResultados();
});

formularioArticulos.addEventListener('submit', (event) => {
    event.preventDefault();
    const articulos = parseInt(inputArticulos.value, 10);
    if (isNaN(articulos) || articulos < 0) {
        mostrarAlerta(formularioArticulos, 'Debe ingresar un número válido');
        return;
    }
    articulosVendidos = articulos;
    actualizarResultados();
    mostrarResultados();
});

formularioAsuetos.addEventListener('submit', (event) => {
    event.preventDefault();
    const asuetos = parseInt(inputAsuetos.value, 10);
    if (isNaN(asuetos) || asuetos < 0 || asuetos > ultimoDiaDelMes()) {
        mostrarAlerta(formularioAsuetos, 'Debe ingresar un número entre 0 y el último día del mes');
        return;
    }

    const formulariosAsuetos = document.querySelectorAll('.form-asueto');
    formulariosAsuetos.forEach(form => form.remove());
    asuetosFechas = [];

    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= asuetos; i++) {
        const form = document.createElement('form');
        form.className = 'form-asueto';
        form.innerHTML = `
            <h3>Día del asueto ${i}</h3>
            <input type="number" class="input-fecha" id="asueto-dia-${i}" min="1" max="${ultimoDiaDelMes()}" required>
            <button type="submit" class="button-submit">Guardar</button>
        `;
        fragment.appendChild(form);
    }
    document.querySelector('.form-container').appendChild(fragment);

    document.querySelectorAll('.form-asueto').forEach((form, index) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const inputDia = form.querySelector(`#asueto-dia-${index + 1}`);
            const diaAsueto = parseInt(inputDia.value, 10);
            if (isNaN(diaAsueto) || diaAsueto < 1 || diaAsueto > ultimoDiaDelMes()) {
                mostrarAlerta(form, 'Debe ingresar un día válido del mes actual');
                return;
            }
            const fechaAsueto = new Date(fecha.getFullYear(), fecha.getMonth(), diaAsueto);
            if (asuetosFechas.some(asueto => asueto.toDateString() === fechaAsueto.toDateString())) {
                mostrarAlerta(form, 'Este día ya fue ingresado');
                return;
            }
            asuetosFechas.push(fechaAsueto);
            actualizarResultados();
            mostrarResultados();
        });
    });

    // Mostrar resultados si no hay asuetos (asuetos = 0)
    if (asuetos === 0) {
        actualizarResultados();
        mostrarResultados();
    }
});