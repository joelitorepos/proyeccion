// -- formulario -
const formulario = document.getElementById("formulario-ventas") as HTMLFormElement;

// -- inputs --
const inputMetas = document.getElementById('metas') as HTMLInputElement;
const inputArticulos = document.getElementById('articulos') as HTMLInputElement;
const inputAsuetos = document.getElementById('asuetos') as HTMLInputElement;

// -- documento de reusltados --
const resultados = document.getElementById("resultados") as HTMLDivElement;

// -- clases --
class Fecha {
  static getFecha(): Date {
    return new Date();
  }

  static getDiaDelMes() {
    return this.getFecha().getDate()
  }

  static getUltimoDiaDelMes(): number {
    const fecha = this.getFecha();
    /*
      le pasamos como primer parametro el año actual,
      segundo parametro el mes siguiente al actual,
      tercer parametro 0 que nos pasara el ultimo dia del mes anterior
    */
  const ultimoDia = new Date(fecha.getFullYear(), (fecha.getMonth() + 1), 0).getDate();
    return ultimoDia;
  }

  static getPrimerDiaDelMes() {
    const fecha = this.getFecha();
    const primerDia = new Date(fecha.getFullYear(), (fecha.getMonth()), 1).getDate();
    return primerDia;
  }

  // dias que faltan del mes por trabajar
  static diasRestantes(asuetos: number = 0) {
    let diasRestantes = 0; // dias que faltan para terminar el mes
    let dia = this.getDiaDelMes(); // dia actual en el mes
    const ultimoDia = this.getUltimoDiaDelMes(); // fin del mes

    // desde el dia actual hasta el ultimo del mes
    for (dia; dia <= ultimoDia; dia++) { 
      const esSabado = dia === 6;
      
      // si es sabado no suma un dia ya que no es un dia que se deba de trabajar
      if (esSabado) {
        continue;
      }

      dia++
    }
    // todos los dias que se espera trabajar menos los dias que dan de descanzo
    return diasRestantes - asuetos;
  }

  // dias del mes que ya han transcurrido
  static getDiasTranscurridos() {
    let diasTranscurridos = 0;
    let primerDia = this.getPrimerDiaDelMes();
    let dia = this.getDiaDelMes();

    // desde el primer dia del mes hasta el dia actual
    for (primerDia; primerDia <= dia   ; primerDia++) {
      diasTranscurridos++
    }
    return diasTranscurridos;
  }
}

class Proyeccion {
  // -- datos iniciales --
  static metaVentas = 0;
  static articulosVendidos = 0;
  static asuetos = 0;
  
  // -- datos esperados --
  static metaDiaria = 0;
  static proyeccion = 0;
  static porcentajeProyeccion = 0;

  static setMetaVentas( meta: number ) {
    this.metaVentas = meta;
  }
  
  static setArticulosVendidos( articulos: number ) {
    this.articulosVendidos = articulos;
  }
  
  static setAsuetos( numAsuetos: number ) {
    this.asuetos = numAsuetos;
  }

  

  // los articulos que deberia vender por dia para llegar a la meta de venta
  static setMetaDiaria() {
    const articulosFaltantes = this.metaVentas - this.articulosVendidos;
    const diasRestantes = Fecha.diasRestantes();
    // redondeado hacia arriba
    this.metaDiaria = Math.ceil(articulosFaltantes / diasRestantes);
  }

  static setProyeccion() {
    // this.articulosVendidos
    const diasTranscurridos = Fecha.getDiasTranscurridos();
    this.proyeccion = parseFloat((this.articulosVendidos / diasTranscurridos).toFixed(2));
  }

  static setPorcentajeProyeccion() {
    this.porcentajeProyeccion = parseFloat(((this.proyeccion / this.metaVentas) * 100).toFixed(2))
  }

  static mostrarResultados() {
    resultados.innerHTML = `
      <div class="resultados">meta diaria: ${this.metaDiaria}</div>
      <div class="resultados">proyeccion: ${this.proyeccion}</div>
      <div class="resultados">porcentaje de proyeccion: ${this.porcentajeProyeccion}%</div>
    `
  }

  static alerta() {

  }
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault(); // para que no se recargue la pagina al enviar el formulario

  let metaDeVentas = parseInt(inputMetas.value);
  Proyeccion.setMetaVentas(metaDeVentas);

  let articulosVendidos = parseInt(inputArticulos.value);
  Proyeccion.setArticulosVendidos(articulosVendidos);

  let asuetos = parseInt(inputAsuetos.value);
  Proyeccion.setAsuetos(asuetos);

  // actualizar los valores y mostrarlos dennuevo en pantalla
  Proyeccion.setMetaDiaria();
  Proyeccion.setProyeccion();
  Proyeccion.setPorcentajeProyeccion();
  Proyeccion.mostrarResultados();
});

Proyeccion.mostrarResultados();
