//Creamos una función asíncrona que nos devuelva las categorías

const obtenerCategorias=async()=>{
    
    //Obtenemos la url de la API
    
    const url=`www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;
    
     const response= await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");

     
    console.log(response);

    //Seleccionamos el elemento del documento con el id categorías
    let selectCategorias=document.getElementById("categorias");

    //Creamos una variables con las opciones de la categoría

    let selectHtml=`<option  value="" >Selecciona una categoría</option>`;
//Vamos añadiendo todas las categorías recorriéndolas
    response.data.drinks.map(drink=>{
        selectHtml+=`<option value="${drink.strCategory}" >${drink.strCategory}</option>`;
        
    });

    //Lo añadimos en nuestro elemento de Html
    selectCategorias.innerHTML=selectHtml;


    }

    //Invocamos la función

   

    obtenerCategorias();


   
   //Creamos una función para poder obtener las recetas de las bebidas

const obtenerRecetas= async()=>{

  //Seleccionamos los elementos del DOM de los que vamos a recoger los datos para luego buscar recetas
    let ingrediente=document.getElementById("nombre").value;
    let categoria=document.getElementById("categorias").value;
    
    console.log(ingrediente);
    console.log(categoria);

    //Creamos una variable donde seleccionamos un div del DOM para mostrar una frase de error si falta algún ingrediente
    let error=document.getElementById("mostrarErrores");
    
//Hacemos una validación: si falta introducir el ingrediente o la categoría se mostrará ese mensaje de error

  if (!ingrediente || !categoria){
    

 
    error.innerHTML=`<p class="error" >Te faltan campos por rellenar</p>`;
 
  } else {
    //Si se han rellenado los datos ese div se oculta
    error.style.display="none";
  }
 //Obtenemos la url en la que vamos a introducir el ingrediente y categoría que queramos para encontrar la receta
  const url=`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}&c=${categoria}`;

  const response= await axios.get(url);
//Recorremos las recetas y las mostramos en un div

let listadoHtml=`<div></div>`;
let divListado=document.getElementById("divListadoRecetas");

response.data.drinks.map(drink=>{

    listadoHtml+= `<div class="listaBebidas"> 
    <h2 class="h2"> ${drink.strDrink}</h2>
    <img width="250px" height="auto" class="imagen" src="${drink.strDrinkThumb}" alt="${drink.strDrink}"/>
    <div>
    <button type="button" id="boton" onclick="verReceta(${drink.idDrink})">Ver receta
    </button>
    <a href="#volver" class="subir">Volver</a>
    </div>
    </div>`;

    divListado.innerHTML=listadoHtml;
    

    

  
});
 
}

const verReceta=async(idReceta)=>{
  
  let tituloReceta=document.querySelector("#tituloReceta");
  let instruccionesReceta=document.querySelector("#instruccionesReceta");
  let imagenReceta=document.querySelector("#imagen");
  let ingredientesReceta=document.querySelector("#ingredientesReceta");
   let modalReceta=document.querySelector("#modalReceta");

  if(!idReceta)return;
  if(idReceta){
    modalReceta.style.display="block";


  };
  const url=`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
  
  const response=await axios.get(url);
  //console.log(response);

//Seleccionamos el array de bebidas desde la posición 0
let info= response.data.drinks[0];

tituloReceta.innerHTML=info.strDrink;
instruccionesReceta.innerHtml=info.strInstructions;
imagenReceta.src=info.strDrinkThumb;

//Los ingredientes serán una función que recorrerá los mismos y sus medidas
ingredientesReceta.innerHTML=listarIngredientes(info);


}

const listarIngredientes=info=>{
  //Como el máximo de ingredientes son 15 recorremos desde el 1 al 14
  let listaIngredientes=``;
  for(var i=1;i<=15;i++){
  //Añadimos el valor del índice del ingrediente y de la medida que hay que incluir en la receta
    if(info[`strIngredient${i}`]){
      listaIngredientes+=`<li id="ingredientes">${info[`strIngredient${i}`]} - ${info[`strMeasure${i}`]}</li>`;
    }
    
  }
  return listaIngredientes;
}

const cerrarModal=()=>{

  let modal=document.querySelector("#modalReceta");
  modal.style.display="none";
}


const subir=()=>{


}
