# Proyeccion

> Sistema de proyeccion de ventas

---

## Descripcion
Este proyecto es un sistema de proyeccion de ventas donde ingresas la meta de ventas mensual, dicho de otra manera el total que se espera vender a fin de mes, los productos que ya se vendieron hasta el dia actual, y los asuetos que aun no se hayan usado o dicho de otra forma, los dias de descanzo que aun se esperan tener en el mes. Se llenara el formulario y te devolvera resultados, meta diaria o lo que se deberia vender diariamente para llegar a la meta mensual, la proyeccion y la proyeccion en porcentaje.

Inicialmente este proyecto tenia ciertos inconvenientes, debido a que lo quize terminar rapido y genere un codigo ilegible y poco practico, y una caracteriestica mala, donde se colocaban cuantos asuetos tendrian en el mes y generaria tantos inputs como asuetos hayas puesto, ya que se esperaba que en cada input se colocara el dia del asueto, pero los inputs no desaparecian, y si colocabas numeros diferentes se sumarian los asuetos, por lo que decidi usar **Typescript** para cambiar la logica, y le añadi programacion orientada a objetos, la logica fue remplazada pero la anterior logica aun sigue estando pero sin ser implementada, se cambio la forma del html, quitando que sean tres formularios separados con su propio input a un solo formulario y un solo input y cambiando los estilos con **tailwindcss** por un tono mas oscuro menos cansado para la vista, el proyecto ya esta terminado y no se espera tener mejoras mas alla de lo que ya se implementos

## Caracteristicas
* **metodos estaticos** todos los metodos y propiedades son estaticos ya que no se necesitan instancias de las clases, solamente usar sus metodos
* **gestion de fechas** se creo una clase Fecha con metodos que retornan dias transcurridos o dias faltantes para terminar el mes, se usan para las formulas
* **gestion de formulas** las formulas son metodos de una clase, que utilizan sus propiedades para realizar las formulas

## Tecnologias utilizadas
* **HTML**
* **CSS**
* **Javascript / Typescript**
* **Tailwindcss**

## Enlae del proyecto
Puedes ver el proyecto con el enlace: [https://joelitorepos.github.io/proyeccion/](https://joelitorepos.github.io/proyeccion/)

## Tener el proyecto en tu dispositivo

1. **clonar el repositorio**
```
bash
git clone [https://github.com/joelitorepos/proyeccion.git](https://github.com/joelitorepos/proyeccion.git)
cd proyeccion

```