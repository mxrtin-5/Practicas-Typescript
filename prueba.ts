const persona = {
    name: "John Doe",
    age: 30,
}

persona.name = 'juan'

// inferencia

const a = 1
const b = 2
const c = a + b
// c tambien sera number

let cadenaDeTexto = 'hola'

cadenaDeTexto.toLowerCase() // detecta que este metodo existe ya que es una cadena de texto

//❌ cadenaDeTexto = 2 no se puede pq ya detecta a la variable como cadena de texto
//❌ cadenaDeTexto.propiesdadInexistente

//any
let obj: any = { x: 0 };

obj.foo();
obj()
obj.bar = 100
obj = 'hi'
const n: number = obj

//functions
// si no se le pone el tipo de dato que es name, este toma el valor de any
function saludar2 (name) {
    console.log(`Hola ${name}`)
}

// si se declara una variable sin un valor como LET A; esta toma el valor any
//any es cualquier tipo de dato, entonces como no sabemos que tiene, podria ser un string o un number o lo que sea
//con el any, le decimos que IGNORE el tipado de typescript



let anyValue: any = 'hola'
// o sea que por mas que el valor de anyValue sea de un string, jamas lo trata como tal
//gracias al :any
anyValue.toUpperCase()


function saludar(name: string) {
    console.log(`Hola ${name}`)
}

saludar('Pepe');
//❌saludar(2)

// unknow

let value: unknown = 'Hola buenas'

anyValue.aaa // al ser unknown el valor de value, no se pueden usar propiedades, ya que no sa sabe si son validas o existen


// concepto inferir

const humano = 'Pepeeee'


//typescript en este caso sabe que es un string
// pero en casos mas complejos puede que no

// function saludo5 ({name: sting, age: number}){
// console.log(`Hola ${name}, tienes ${age} de edad`)
// }

// saludo5({name: 1, age: 'pepe'})

//❌esto esta mal, ya que entra en conflicto con la sintaxis de javascript
//ya que este permite renombrar la propiedad de un objeto
// de esta manera se transforma el nombre name a string y age a number



function saludo({ name, age }: { name: string, age: number }) {
    console.log(`Hola ${name}, tienes ${age} de edad`)
}

saludo({ name: 'pepe', age: 2 })

//⏫ esto funciona

function saludo2(persona: { name: string, age: number }) {
    const { name, age } = persona // desestructuracion para sacar name y age de persona
    console.log(`Hola ${name}, tienes ${age} de edad`)
}

//⏫❗❗este metodo obliga a sacar name y age de persona

saludo2({ name: 'pepe', age: 2 })



function saludo3({ name, age }: { name: string, age: number }) {
    console.log(`Hola ${name}, tienes ${age} de edad`)
    return age
}

// typescript si tiene inferencia del tipo que retorna es decire que sabe que tipo de dato retorna
// en este caso un tipo number

// let userName: string
// userName = saludo3({name: 'papasito', age: 2})

//❌esto no se puede 
//❗no es posibleasignarle el valor del llamdo de la funcion, ya que esta retorna un tipo number y la variable es de tipo string


function saludo4({ name, age }: { name: string, age: number }): number {
    console.log(`Hola ${name}, tienes ${age} de edad`)
    return age
}

//❗Para nosotros asignar el tipo que la funcion returna se pone un : y el tipo de dato luego de la funcion

// function saludo5 ({name, age}: { name: string, age: number}) : string{
//     console.log(`Hola ${name}, tienes ${age} de edad`)
//     return age
// }

//asi no funciona ya que no coincide el valor asignado que se etorna con el valor retornado


// funciones como paremetros (callback)

const sayHi = (fn) => {
    return fn('Miguel')
}

// se le pasa el parametro fn a ('miguel)
//❗❗ ya se sabe que va a ser una funcion pero cuando es declarada tan solo es un parametro

sayHi((name) => {
    console.log(`Hola ${name}`)
})

//aca se pasa la funcion al valor de fn, y fn pasa a ser la funcion
// y el valor que va a tomar el parametro name de la funcion va a ser en este caso 'miguel


// esto esta bien si fuera javascript pero en typescript esta plagado de errores por los valores any

const sayHi2 = (fn: Function) => { // esto funciona pero no esta bien
    return fn('Miguel')
}

sayHi2((name) => {
    console.log(`Hola ${name}`)
})

// esto esta tecnicamente bien pero practicamente fatal
// ya que al indicar que el valor del parametro de fn va a ser una funcion de esa manera
//esta pasa a aceptar cualquie funcion 
//por ej
// es el any de las funciones por ende se debe evitar


sayHi2(() => {
    return Math.random()
})

// para establecer los tipos de datos que se esperan

const sayHiFromFunction = (fn: (name: string) => string) => {// se asigna a fn que : la funcion que se espera () con un parametro llamado name de tipo string (name: string)
    // y que lo que devuelve es un string
    fn('miguel')
}

const sayHi4 = (name: string) => {
    console.log(`Hola ${name}`)
}

// sayHiFromFunction(sayHi4) //❌en este caso la funcion sayHi4 no retorna nada por ende no es un string




const sayHiFromFunction2 = (fn: (name: string) => string) => {
    fn('miguel')
}

const sayHi5 = (name: string) => {
    console.log(`Hola ${name}`)
    return name
}


sayHiFromFunction(sayHi5) //✅✅ esto funciona ya que retorna name y name es un string

// en caso que se quiera validar que no devuelva nada se tendria que poner => void



// tipar arrow functions

const sumar = (a: number, b: number): number =>{
    return a + b
}

// esta es una manera en la que se definen los ripos de datos de los parametros y el tipo que retorna

// y la otra 

const restar: (a: number, b: number) => number = (a, b) =>{
    return a-b
}

// donde se hace const restar, se le indica el tipo de la funcion y lo que retorna
// y despues se hace la funcion en si


//❗❗ NEVER

function throwError(message: string){
    throw new Error(message);
}

// esta funcion nunca va a devolver nada (return)
// por ende se le puede indicar que nunca va a devolver nada


function throwError2(message: string): never{
    throw new Error(message);
}

// se usa para funciones que sabes que nunca van a devolver nada para no tener problemas al intentar declarar variables o algo asi


/*
❗❗❗❗
NEVER Y VOID
no son lo mismo
never es cuando sabes que nunca va a devolver ningun valor
y void es una forma de indicar que la funcion puede devolver un valor, pero que no te importa que lo devuelva o no

*/


function logMessage(message: string): void{
    console.log(`Log message ${message}`); // no devuelve nada pero ejecuta
    //thow



    //return <= te da igual => void => no llega
}

// esto significa que nunca devuelve el return implicito
// el void llega al final pero no devuelve nada y el never hace que nunca termine de ejecutarse la funcion


//❗❗ depende el contexto en el que se crea la funcion, puede haber inferencia de tipos

//inferencia en funciones anonimas segun el contexto

const avengers = ['Spider Man', 'Hulk', 'Iron Man'];

avengers.forEach(avenger =>{ // se te posas ariba de AVENGERS puedes ver claramente que typescript detecta que es un string 
    console.log(avenger.toUpperCase())// por ende trira los metodos de string validos 
})

//✅✅✅ esto funciona pq al usar un array de strings, sabe que al parametro de la funcion anonima le va a llegar un array

avengers.forEach(function(avenger){ 
    console.log(avenger.toUpperCase())
})

//✅✅✅ asi tambien funciona


//OBJETOS ❗❗

let hero = {
    name : "Batman",
    age :  35,

}

//hero.power = 100
//❌❌ no se puede acceder a una propiedad inexistente, ni crearla

function createHero(name: string, age: number){
    return{
        name, age
    }
}

const thor = createHero('Thor', 1500);

// pero el tipo de el hero de createHero es el mismo al de hero??
// no se sabe en realidad
// se ve que tiene las mismas propiesdades y todo pero no sabemos si es del mismo tipo
/*
Asi se hace como un contrato de los objetos

*/
type Hero = { // se escriben en Pascalcase ❗❗
    name: string,
    age: number
}

// se crea un tipo hero

let hero2 : Hero = { // se le asigna el tipo hero al objeto hero
    name : "Batman",
    age :  35,

}

//hero.power = 100
//❌❌ no se puede acceder a una propiedad inexistente, ni crearla

function createHero2(name: string, age: number){
    return{
        name, age
    }
}

const thor2 = createHero2('Thor', 1500);
// nos gustaria que thor fuera nuestro tipo
// ya que si se quier mas adelante agregar algo al objeto hero❗ no al tipo, nos gustaria que el tipo lo tuviera en lugar de trabajar con el objeto en todos lados

function createHero3(name: string, age: number): Hero{
    return{ name, age }
}

const thor3 = createHero3('Thor', 1500);
// asi devuelve a thor como un tipo
// encapsulandolo asi en algo similar a un contrato

// function createHero4(name: string, age: number): Hero{
//     return{ name, age, isActive: true }// no se le puede agregar un parametro que no existe en el tipo
// }

function createHero4(hero: Hero): Hero{// los parametros son los mismos a los del tipo por ende se puede poner asi
    const { name, age } = hero  // extraemos el name y el age del hero
    return{ name, age }  // ydevolvemos un objeto con el name y el age
}

// const thor4 = createHero4('Thor', 1500); // asi no se puede, pq espera un objerto
const thor4 = createHero4({name: 'Thor', age: 1500}); // asi si

////////////////////////////////////////////////////////////////////////////////////////////////////////////


// optionel properties

type Heroes = {
    id?: number
    name: string
    age:number
    isActive?: boolean // propiedad opcional con el ?
}

let heroes: Hero = {
    "name": "Bruce",
    "age" :  76
};

function createHeroe(heroe: Hero) : Heroes{
    const {name, age} = heroe
    return {name, age}
}

const batman = createHeroe({name: 'Peter pan', age: 1500})

batman.id?.toString()
// lo que hace es que si BATMAN tiene ID entonces que lo convierta a string
//si no no se ejecuta 
// al ponerse el ? en esta linea, se le llama OPTIONAL CHANING

// se puede modificar el id y poner cuaquier numero

batman.id = 85686513
// esto es un problema
// para solucionar esto
// se creo el readOnly

type Heroes2 = {
    readonly id?: number // <==== readonly
    name: string
    age:number
    isActive?: boolean 
}

let heroes2: Hero = {
    "name": "Bruce",
    "age" :  76
};

function createHeroe2(heroe: Hero) : Heroes2{
    const {name, age} = heroe
    return {name, age}
}

const ironMan = createHeroe2({name: 'Peter pan', age: 1500})

ironMan.id?.toString()

//con el readonly 

// ironMan.id = 6876876813 //esto es un error pq solo se puede leer esa propiedad
// con esta propiedad NO ❗❗ estamos haciendo que sea inmutalble
// pero que si alguien intenta sobreescribir tenga un error en typescript

// pq no es inmutable?
// pq el codigo typescript se compila a javascript
// al compilarse pasa a codigo javascript, y javascript no entiende el readonly ni el ?
// lo unico que hace es que mientras desarrolamos avisarnos coin un error, pero al compilarse ese error no esta


//✅✅ la unica forma de hacerlo realmente iunmutable es con codigo javascript, o sea con el
//OBJECT FREEZE


type Heroes3 = {
    readonly id?: number // <==== readonly
    name: string
    age:number
    isActive?: boolean 
}

let heroes3: Hero = {
    "name": "Bruce",
    "age" :  76
};

function createHeroe3(heroe: Hero) : Heroes3{
    const {name, age} = heroe
    return {name, age}
}

const superMan =Object.freeze(createHeroe3({name: 'Peter pan', age: 1500})) 

// superMan.id = 2749492387492 // ahora si tira error de que la propiedad es READONLY

// ❗TEMPLATE UNION TYPES
type HeroId = `${string}-${string}-${string}-${string}${string}`


type Heroes4 = {
    readonly id?: HeroId
    name: string
    age:number
    isActive?: boolean 
}

let heroes4: Hero = {
    "name": "Bruce",
    "age" :  76
};

function createHeroe4(heroe: Hero) : Heroes4{
    const {name, age} = heroe
    return {
        id: crypto.randomUUID(), // el randomIIID crea un id de tipo string como este '3cc966a4-4197-8b82-8c6f916ece41'
        //⏫ ahora si nos posamos sobre el ID nos muestra el tipo de id que espera
        // si se pusiera por ej id: '123-123-123-123-123' esto si que se lo traga
        //no llega a validarlo pero lo acepta
        name,
        age,
        isActive: true
    }
}

const spiderMan = Object.freeze(createHeroe4({name: 'Peter pan', age: 1500})) 


// esto tambien sirve para colores guardados en variables

type HexadecimalColor = `#${string}`

const color = '0033f' //⏫mal pq se guarda con #
const color2 = '#003f'// bien pq se guarda con #

// const color3: HexadecimalColor = '0033f' // al pasarle el type, esta la marca como mal ya que no tiene #
const color4: HexadecimalColor = '#0033f'// y esta como bien




type HeroeID = `${string}-${string}-${string}-${string}${string}`

//❗UNION TYPES
type HeroPowerScale = 'Local'| 'Planetary' | 'Galactic' | 'Universal' | 'Multiversal'
//es el or de javascript ||, indica que el valor de algo puede ser uno u otro u otro u otro y asi

type Heroes5 = {
    readonly id?: HeroId
    name: string
    age: number
    isActive?: boolean 
    powerScale?: HeroPowerScale
}

let heroes5: Hero = {
    "name": "Bruce",
    "age" :  76
};

function createHeroe5(heroe: Hero) : Heroes5{
    const {name, age} = heroe
    return {
        id: crypto.randomUUID(),
        name,
        age,
        isActive: true
    }
}

const robin = createHeroe5({name: 'Peter pan', age: 1500}) 
// robin.powerScale = 'LA LECHE DE FUERTE' // no funciona
// tiene que ser uno de los tipos que se pasaron como opciones 
//como este
robin.powerScale = 'Planetary'

// ❗como exteneder tipos
// como el anterior pero con &

type FoodId = `${string}-${string}-${string}-${string}-${string}`

type FoodAlimentationScale = 'Null' | 'Low' | 'Medium' | 'High'

type FoodBasicInfo ={
    name: string;
    quantity: number
}

type FoodProperties = {
    readonly id?: FoodId
    name: string
    quantity: number
    alimentationScale?:FoodAlimentationScale
}

type Food = FoodBasicInfo & FoodProperties

let food: Food ={
    name:'Arroz con pollo a la brasa y queso fresco',
    quantity:24
};

function createFood(input: FoodBasicInfo): Food{
    const {name, quantity} = input
    return{
        id: crypto.randomUUID(),
        name,
        quantity
    }
}

// con esto podemos separar los tipos en tipos mas basicos y luego unirlos


const potatoe = createFood({name: 'Potatoe', quantity: 30})
potatoe.alimentationScale = 'Low'


//❗TYPE INDEXING

type PropiedadesHeroe = {
    isActive: boolean
    address:{
        planet: string
        city: string
    }
}

const addresHero: PropiedadesHeroe['address'] = {
    planet: 'Earth',
    city: 'CABA'
}

// esto permite reuticlizar partes de tipos que ya tengas por ahi


//❗type from value

const addres = {
    planet: "Mars",
    city:"USA"
}

type Addres = typeof addres
//  en typescript el typeOf hace mas cosas

const addresPingo: Addres={
    planet:'Venus',
    city: 'Pingo'
}

/*

con el typeof se pueden extraer los tipos de un objeto
de funciones , etc

*/


//❗TYPE FROM FUNCTION RETURN 

function createAddres(){
    return{
        planet: 'Earth',
        city:'Tu hermana'
    }
}

// imagina que el tipo que retorna la funcion se lo quiere recuperar

type Addres2 = ReturnType<typeof createAddres>
//type addres el return type pide el type de lo que devuelve la funcion del typeof
// se pide el typeof createAddres y el type de retorno (ReturnType) se lo guarda en el type Addres



//❗❗❗❗❗ ARRAYS 

// const lenguajes = [] // toma al array como un valor que nunca va a tomar ningun valor

// lenguajes.push('Javascript') //❗ error, no se puede pushear a un valor :never

const lenguajes: string [] = [] // asi le decimos que va a ser un array de strings y asi si entran strings

lenguajes.push('Javascript')// asi si
lenguajes.push('Javascript')// todo esto se puede
lenguajes.push('Javascript')
lenguajes.push('Javascript')
lenguajes.push('Javascript')
// lenguajes.push(6) //❌❌ pero esto no
// lenguajes.push(true) //❌❌ tampoco funciona

// hay otra manera de tiparlo

const lenguajes2: Array<string> = []

lenguajes2.push('Javascript')
lenguajes2.push('Javascript')
lenguajes2.push('Javascript')
lenguajes2.push('Javascript')

// tambien funciona

//✅✅ para hacer arrays de varios tipos de datos se hace asi

const lenguajes3: (string | number)[] = []

lenguajes3.push('Javascript')
lenguajes3.push('Javascript')
lenguajes3.push('Javascript')
lenguajes3.push('Javascript')
lenguajes3.push(56)

//❗❗❗ MATRICES Y TUPLAS

/*
[
    ['X', '0', 'X'], <==  strings[]
    ['0', 'X', '0'], <==  strings[]
    ['X', '', '0']  <==  strings[]
]
*/

type CellValue = 'X' | '0' | ''

//tupla
type GameBoard = [ // es un array con
    [CellValue, CellValue, CellValue], // un array de 3 posiciones en su primera posicion
    [CellValue, CellValue, CellValue], // un array de 3 posiciones en su segunda posicion
    [CellValue,CellValue, CellValue]// un array de 3 posiciones en su tercera posicion
]

//❗❗❗❗✅✅✅ UNA TUPLA ES UN ARRAY CON UN LIMITE FIJADO DE LONGITUD

// const gameBoard: CellValue[][] = [ // se debe hacer con un array de arrays
//     ['X', '0', 'X'], 
//     ['0', 'X', '0'], // pero aca se le pueden seguir poniendo valores
//     ['X', '', '0'] // hay que limitar el juego a un 3x3
// ]

// const gameBoard : GameBoard = [
//     ['X', '0', 'X', '0'], 
//     ['0', 'X', '0', 'X'], // si se le quiere poner mas valores da error
//     ['X', '', '0', '']
// ]

// gameBoard[0][1] = ' 1936131' // ❌❌❌❌se puede poner lo que quieras 
// con el CellVaue, ya solo se pueden poner X 0 o ''


const gameBoard : GameBoard = [
        ['X', '0', 'X'], 
        ['0', 'X', '0'], 
        ['X', '', '0']
]

// MAS EJEMPLOS DE TUPLAS

// type State = [string, (newName: string) => void]

// const [hero, setHero]: State = useState('thor')
// esto es un tupla
// pq el useState siempre devuelve dos posiciones


// otro ejemplo

type RGB = [number, number, number]

// const rgb: RGB = ['a', '2', true, 8]//❌❌❌❌

const rgb: RGB = [2, 5, 6]//✅✅✅✅

// const RGB = [255, 255, 0]



