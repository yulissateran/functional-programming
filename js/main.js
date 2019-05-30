const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)


//  funcion pura
// con la misma entrada, retorna el mismo resultado

  const double = x => x * 2
 // double(2) = 4 siempre

 const isGreaterThan = (value, comparison) => value > comparison;
 //isGreaterThan(4,3) = true siempre

// funcion impura 

const time = () =>new Date().toLocaleTimeString();
 // no retornara lo mismo dos veces 




const description =  document.getElementById('description');
const calories =  document.getElementById('calories');
const carbs =  document.getElementById('carbs');
const protein =  document.getElementById('protein');


/*
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

 */


 



