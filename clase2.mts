//ENUMS

const enum ERROR_TYPES{
    NOT_FOUND,
    UNAUTHORIZED,
    FORBIDDEN
}

// ❗❗siempre que se pueda es recomendable usar el CONST
//pero

// se recomienda usar solo el enum sin el const
//cuando se esta creando una biblioterca o libreria
// o un componente que va hacia el exterior, o sea que se consuma fuera de la aplicacion


//al compilarse en codigo javascript se le asignan indices empezando del 0
// pero eso se puede cambiar

// enum ERROR_TYPES{
//     NOT_FOUND = 'notFound',
//     UNAUTHORIZED = 'unauthorized',
//     FORBIDDEN = 'forbidden'
// }

// asi le pueden asignar valores por defecto a los indices


// esto sirve para colecciones de datos finita
//como dias de la semana o cosas asi

function mostrarMensaje(tipoDeError: ERROR_TYPES){
    if(tipoDeError === ERROR_TYPES.NOT_FOUND){
        console.log('No se encuentra el resultado')
    } else if (tipoDeError === ERROR_TYPES.UNAUTHORIZED){
        console.log('No tienes permisos para acceder')
    } else if (tipoDeError === ERROR_TYPES.FORBIDDEN){
        console.log('No tienes permisos para acceder')
    }
}


//ASERCION DE TIPOS

// const canvas = document.getElementById('canvas')

//devuelve null si no lo encuentra 
// y HTMLElement si lo encuentra

// devuelve HTMLElement pq typescript no sabe realmente de que tipo es el elemento que se recupera del HTML
//no lo sabe pq typescript no funciona en tiempo de ejecucion


//????? como sabe typescript qie realmente estas recuperando un elemento <canvas/>?


// const canvas = document.getElementById('canvas') as HTMLCanvasElement
    
// asi se le dice que tiene que tratar al HTMLElement que devuelve como un HTMLCanvasElement

// pero si lo hacemos asi, canvas nunca va a poder ser null e



// if(canvas !== null){
//     const ctx = canvas.getContext('2d')
// }



// lo que esta un poco mejor es hacer la asercion despues de la comprobacion


// const canvas = document.getElementById('canvas')



// if(canvas !== null){
//     const ctx = (canvas as HTMLCanvasElement).getContext('2d')
// }

//asi esta mejor

// pero 

const canvas = document.getElementById('span')

// si nos equivocamos y en lugar de recuperar un canvas recupera un span por ejemplo
//Typescript no se da cuenta de este error
// entonces para prevenir esto 

if(canvas !== null && canvas instanceof HTMLCanvasElement){ // se hace esto para comprobar que canvas sea una instancia de CanvasElement
    const ctx = canvas.getContext('2d')
}

//////////////////////////////////////////////////////

// typeof => para tipos
// instanceof => para instancias

//typeof es para tipos basicos, como number, string, boolean. etc

//instanceof por ejemplo para fechas y cosas asi


//Fetching data en typescript

const API_URL = 'https://api.github.com/serch/repositories?q=javascript'

const response = await fetch(API_URL) // se tiene que usar la extencion de archivo mts para que acepte modulos

if(!response.ok){
    throw new Error('Request failed')
}

type APIResponse ={
    items: object[]
}

const data = await response.json() as APIResponse
// una vez que se le indica como tiene que tratar a la respuesta, data pasa a tener un tipo


// data.ajgdfjad // <== ❌❌❌ no detecta el error pq toma a DATA como :any

// const resp = data.title.map(repo =>{
//     console.log(repo)
// })

data.items

///////////////////////////////////////////////////

// type Heroe = {
//     id:string
//     name: string
//     age:number
// }

// asi se crea un tipo 



//otra forma de hacerlo 

interface Heroe{
    id:string
    name: string
    age: number
    saludar: () => void
}
// las interfaces son lo mismo que los tipos pero medio diferente
// con las intefaces moldeamos cual es el contrato que debe tener nuesto objeto


const hero: Heroe = {
    id: '1',
    name:'spiderman',
    age: 30,
    saludar: () =>{
        console.log('Hola')
    }
}
// asi se le asigna calor a una variable hero de tipo HEROE

// las interfaces pueden estar anidadas

interface Producto{
    id: number
    nombre: string
    precio: number
    quantity: number
}

interface Carrito{
    totalPrice:number
    productos: Producto[]
}

interface Carrito2{
        totalPrice:number
        productos: Zapatilla[]
}

interface Carrito3{
    totalPrice: number
    productos: (Producto | Zapatilla)[]
}

interface Zapatilla extends Producto{
    talla:number
}

// a la interface zapatilla se le puede extender las caracteristicas de productos y agregarle nuevas

//se pueden hacer interfaces de funciones

interface CarritoOps{
    add: (product: Producto) => void,
    remove: (id: number) => void,
    clear: () => void
}

// interface CarritoOps{
//     add(product: Producto): void
//     remove(id: number) : void
//     clear(): void
// }



const ops: CarritoOps ={
    add: (product: Producto) => {},
    remove: (id: number) => {},
    clear:()=>{}
}


const carrito: Carrito ={
    totalPrice :56789 ,
    productos:[
        {
        id: 1,
        nombre: 'Producto 1',
        precio: 100,
        quantity: 1
    }
    ]
}

const carroZapatillas: Carrito2 ={
    totalPrice :678 ,
    productos:[
        {
        id: 1,
        nombre: 'Producto 1',
        precio: 100,
        quantity: 1,
        talla: 40
    }
    ]
}


