const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

const description =  document.getElementById('description');
const calories =  document.getElementById('calories');
const carbs =  document.getElementById('carbs');
const protein =  document.getElementById('protein');
const addCalories = document.getElementById('addCalories');

let list = []

const validateInputs = ()=>{
  description.value? '' : description.classList.add('is-invalid')
  calories.value? '' : calories.classList.add('is-invalid')
  carbs.value? '' : carbs.classList.add('is-invalid')
  protein.value? '' : protein.classList.add('is-invalid')
  if(description.value && calories.value && protein.value) add();
  }
  const add = ()=>{
    const newItem = {
      description: description.value,
      calories: parseInt(calories.value),
      carbs: parseInt(carbs.value),
      protein: parseInt(protein.value)
    };
    list.push(newItem);
    clearInputs();
    updateTotals();
    renderItems();
    console.log(list);
  }
 const  clearInputs = () => {
   description.value = '';
  calories.value = '';
   protein.value = '';
  }
const updateTotals = () =>{
  let calories =  0 , carbs = 0, protein = 0;
  list.map(item=>{
    calories += item.calories
    carbs += item.carbs
    protein += item.protein
  });

  document.querySelector('#totalCalories').textContent = calories;
  document.querySelector('#totalCarbs').textContent = carbs;
  document.querySelector('#totalProtein').textContent = protein;

}

const renderItems=()=>{
 const tBody = document.querySelector('#tbody');
 tBody.innerHTML  = '';
 list.map(item=>  tBody.innerHTML  += tableRow([item.description,item.calories,
  item.carbs,item.protein ]))
}
  const attrsToString = (obj = {}) => {
    const keys = Object.keys(obj);
    const attrs = [];
     for(let i = 0; i< keys.length; i++){
     const attr = keys[i];
     attrs.push(`${attr}="${obj[attr]}"`);
    }
    const string = attrs.join('');
    return string;
  }
  const tag = t => content => `<${t}>${content}</${t}>`;
  const tableCell= tag('td')
  const tableCells= items =>items.map(tag('td')).join('');
// formas de pintar filas y celdas 
  const tableRowTag= tag('tr');
// 1

  // const tableRow= items => tableRowTag(tableCells(items))
  // 2
  const tableRow= items => compose(tableRowTag,tableCells)(items)


  const tagAttrs = (obj) => (content = '') => 
  `<${obj.tag}${obj.attrs ? ' ': ''} ${ attrsToString(obj.attrs)}>
  ${content}</${obj.tag}>`;
  
  description.addEventListener('keypress', ()=>{
    description.classList.remove('is-invalid')
  })
  calories.addEventListener('keypress', ()=>{
    calories.classList.remove('is-invalid')
  })
  
  carbs.addEventListener('keypress', ()=>{
    carbs.classList.remove('is-invalid')
  })
  
  protein.addEventListener('keypress', ()=>{
    protein.classList.remove('is-invalid')
  })

  addCalories.addEventListener('click', validateInputs)
/* 

*/

/*
Funciones puras e impuras:

 funcion pura
 -usan solo sus paramtros
 -son predecibles
 -no mutan variables, datos externos
con la misma entrada, retorna el mismo resultado
  const double = x => x * 2
  double(2) = 4 siempre

  const isGreaterThan = (value, comparison) => value > comparison;
  isGreaterThan(4,3) = true siempre

funcion impura 

const time = () =>new Date().toLocaleTimeString();
 no retornara lo mismo dos veces 



 Objetos y tipo de memoria
OBJETOS
 cuando inicializamos un objeto,
este se crea en algun lugar, en algun espacio de
 memoria, al cual podemos acceder mediante coordenadas
  A   B   C
 1__|____|__
 2__|{..}|___    coordenada del objeto: B2
 3__|____|___
 4  |    |  


TIPOS DE MEMORIA:
STACK:
ALMACENA PRIMITIVOS: booleanos, numeros, strings
 __________
|____Ann___|  <= let name
 __________
|____10____|
 __________
|___true___|

se apilan uno sobre otro,
el acceso al los valores que contiene es mucho más
 rápido.
---------------------------------------------------------------
HEAP: 
ALMACENA OBJETOS: objetos, arrays , funciones
 ___________    ____________
|____{..}___|  |____{..}____|
          __________
         |___{..}___|
se almacenan de forma desordenada 
en cualquier espacio de memoria

 forma de leer: 
 cuando declaramos una variable ,
  se crea un apuntador a ese lugar de la memoria (coordenada),
  con el que podemos acceder al valor del objeto

 _________________________________________________
 STACK                    |           HEAP
             __________   |  ___________    ____________
            |____Ann___|  | |____{..}___|  |____{..}____|      
             __________   |
            |____10____|  |     
             __________   |        __________   
            |_pointer__|  |===>   |___{..}___|
                 ^         
                 |         
            let object
 __________________________________________________
Copiar y modificar objetos

let a = 1;
let b = a;
console.log(a,b)// 11 
b += 1 
console.log(a,b)// 1 2 


let car = {
  color: 'red',
  year: 2019,
  km: 0,
};
let newCar = car;
console.log(car, newCar)// son iguales 
newCar.year = 2000; 
console.log(car, newCar); //son iguales, el año cambia en ambos

hay dos formas de acceder a la misma información: 1 mediante  car; mediante newCar
solo hemos copiado la referencia al mismo lugar en memoria, no el valor en sí
formas de copiar el valor de memoria (objeto) :

 let newCar = object.assign({},car )  // parametro 1: donde se hará la copia , parametro 2: fuente de valoress (car)
newCar.year = 2000; 
console.log(car, newCar); //son distintos, el año cambio solo en newCar

hemos copiado el valor que se encontraba en memoria, no la referencia

DETALLE object.assign : 
let car = {
  color: 'red',
  year: 2019,
  km: 0,
  owner: {
    name: 'Yuli',
    age:  19,
  }
};
let newCar = car;
console.log(car, newCar)// son iguales 

newCar.owner.age = 24; 
console.log(car, newCar)// son iguales 

object.assign nos copia los valores del objeto solo en el primer nivel,
 los objetos anidados seran una referencia hacia el mismo lugar en memoria de lareferencia original 
Solo copia los datos por valor en el primer nivel de propiedades, mientras que los objetos de los siguientes niveles
 son asignados por referencia, de la misma manera que si se hiciera con
COPIAR OBJETOS COMPLEJOS: 
 JSON.stringify() 
 convierte el objeto en string

  JSON.parse() 
   convierte el string en objeto
   let newCar = JSON.parse(JSON.stringify(car));

newCar.owner.age = 24;
console.log(car, newCar)
//ahora si cambiamos cualquier propiedad, de car o de car.owner,
   el cambio se hará solo en nerCar


Utilizando inmutabilidad en nuestras funciones
MUTANDO LOS DATOS:
const  addToList=(list, item, quantity)=>{
  list.push({
    item,
    quantity
  });
  return list
}
 DATOS INMUTABLES:
const  addToList = (list, item, quantity)=>{
  const newList = JSON.parse(JSON.stringify(list));
  newList.push({
    item,
    quantity
  });
  return newList
}

Estado compartido o shared state
 significa que diferentes métodos
 trabajan a partir de una misma variable. y, 
 cuando modificamos variables con el mismo
  objeto de referencia podemos encontrarnos
   con algunos problemas y obtener resultados
  inesperados a pesar de ejecutar el mismo código y 
  recibir los mismos parámetros:

// Intento #1
const a = {
        value: 2
}

const addOne = () => a.value += 1
const timesTwo = () => a.value *= 2

addOne()
timesTwo()

console.log(a.value) // 6

// Sin embargo, si ejecutamos las 
mismas funciones en orden invertido
// obtenemos resultados diferentes

timesTwo()
addOne()
console.log(a.value) // 5
// Intento #2
const b = {
        value: 2
}
const addOne = () =>  object.assign({},b,{value: b.value + 1} );
const timesTwo = () => object.assign({},b,{value: b.value * 1});

console.log(addOne(timesTwo(b)));// 6

DIFERENCIA: el orden en la ejecucion de las
 funciones no importa,
 el resultados  siempre será el mismo
 



 Funciones compuestas:
 const tag = t => content => `<${t}>${content}</${t}>`;
 tag('h1')('Title');

//   {
//    tag: 'h1' ,
//    attr: {
//     class: 'title'
//    }
//  }

 const attrsToString = (obj = {}){
   const keys = Object.keys(obj);
   const attrs = [];
    for(let i = 0; i< keys.length; i++){
    const attr = keys[0];
    attrs.push(`${attr}= ${obj[attr]}`);
   }
   const string = attrs.join('');
 }
 // tag="h1", class="title"
COSURE?
funcion que retorna otra función, donde estas recuerdan el 
scope donde fueron creadas


reto: completar buildSum para que lo siguiente funcione: 

const buildSum = (a){

}

const addFive = buildSum(5);

  console.log(addFive(5))//10


  solucion:
  const buildSum = (a) =>{
    return (b)=>{
      return  a +b;
    }
  }
  como arrow function:

   const buildSum =(a) => (b)=>  a +b;

   los closures estan ligados a curring, pues
    permiten componer funciones

    Curring:
    descomponenr funciones en funciones pequeñas 
    para que cada una reciba un solo argumento
  
 const buildSum =(a) => (b)=>  a +b;  
 const tag = t => content => `<${t}>${content}</${t}>`;
 ambas retornan una funcion

 const sumThreeNumber = (a ,b , c )=> {
   return  a + b + c 
 }

 con curring :
 es posible gracias a los closures

 const sumThreeNumber = (a) =>{
 return (b) =>{
    return (c)=>{
  return a + b +c 
    }
 }
 }
  const sumThreeNumber = (a) =>(b) => (c)=> a + b +c ;
 console.log(sumThreeNumber)

Higher Order Functions
reciben comoargumeno una funcionyla retornan;
ejemplo: 
map 
const array1 = [1,2,3];
const array2 = [1,2,3];
 for(let i = 0 ; i < array1.length; i++){
   array.push(array1[i * 2 ])
 }

 console.log(array2)// [1,2,3]


 con Higher Order Functions
 const array1 = [1,2,3];
 const array2 = array1.map((item)=> item * 2)
  console.log(array2)// [1,2,3]
 */


 



