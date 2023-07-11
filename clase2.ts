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




