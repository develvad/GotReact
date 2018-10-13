'use strict';

console.log(window.location.hostname);
var server;
if(window.location.hostname == 'localhost'){
  server = 'http://zoomzon.es/'
}else{
  server ='';
}

//Variables globales
var configGlobal = {
  numOfertas: 100,
  urlGetOfertas: server + '/getOfertas',
  urlGetNumOfertas: server + '/numOfertas/100',
  urlGetMarcas: server +'/getMarcas',
  urlGetWhatsAppOb: server +'/getOfertaById/'
}

//Funciones
var todosLosDatos = true;
var getOfertasSrv;
var init;
var generarJSONyFiltros;
var generarObjetoProducto;
var generarFiltros;
var parseFiltro;
var anadirFiltroDinamico;
var setBackup;
var getBackup;
var setArrayProductos;
var getArrayProductos;
var getFiltro;
var opcionPrecio;
var recoverArrayProductos;
var opcionGenero;
var getActualArray;
var setActualArray;
var getPaginacion;
var getPaginacion;
var newPaginacion;
var initPaginacion;
var getPuntuacion;
var ordenarPorPuntiacion;
var getPuntuacionDescuento;
var getPuntuacionMarca;
var getPuntuacionTiempo;
var getPuntuacionPrecio;
var getTallaFiltro;
var getActualSearch;
var setActualSearch;
var getModelo;
var getFiltroMarca;
var eliminarDuplicados;
var getParameterByName;
var getWhatsappObject;
var reloadPage;
var getSeccion;
//Productos
var responseBackup = [];
var response = [];
var arrayProductos= [];
var actualArray = [];
var actualSearch;
var getIdProduct;

//Ordenación y filtrado_borrar
var ordenacionJSON = {
  id: 'ordenacion',
  value: 'Ordenar',
  totalOpciones: 4,
  opcionesSeleccionadas: 0,
  opciones:[
    {id:'novedades', value:'Novedades', seleccionado: false},
    {id:'descuento', value:'Mayores descuento', seleccionado: false},
    {id:'precio_menor', value:'Precio de menor a mayor', seleccionado: false},
    {id:'precio_mayor', value:'Precio de mayor a menor', seleccionado: false},
    {id:'nombre', value:'Por marcas', seleccionado: false}
  ]
}
var filtrosJSON = {
  id: 'categorias',
  value: 'Filtros',
  totalOpciones: 5,
  opcionesSeleccionadas: 0,
  opciones:[
    {id:'filtroGenero', value:'Mujer / Hombre', seleccionado: false},
    {id:'filtroSeccion', value:'Tipo de prenda', seleccionado: false},
    {id:'filtroPrecio', value:'Precio', seleccionado: false},
    {id:'filtroMarca', value:'Marcas', seleccionado: false},
    {id:'filtroTalla', value:'Talla', seleccionado: false}
  ]
}


//Herramientas
Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


// Filtros
var filtros = ['filtroGenero', 'filtroSeccion', 'filtroPrecio','filtroMarca','filtroTalla'];

var filtroMarca = [];


var filtroGenero = {
  id: 'filtroGenero',
  value: 'Mujer / Hombre',
  totalOpciones: 2,
  opcionesSeleccionadas: 0,
  opciones:[
    {id: "categoriaHombre", value: "Hombre", seleccionado: false},
    {id: "categoriaMujer", value: "Mujer", seleccionado: false}
  ]
}

var filtroSeccion = {
  id: 'filtroSeccion',
  value: 'Tipo de prenda',
  totalOpciones: 19,
  opcionesSeleccionadas: 0,
  opciones:[
    {id: "categoriaAbrigo", value: "Abrigos", seleccionado: false},
    {id: "categoriaAmericanas/Trajes", value: "Americanas/Trajes", seleccionado: false},
    {id: "categoriaBañadores", value: "Bañadores", seleccionado: false},
    {id: "categoriaCamisa", value: "Camisas", seleccionado: false},
    {id: "categoriaCamiseta", value: "Camisetas", seleccionado: false},
    {id: "categoriaChaqueta", value: "Chaquetas", seleccionado: false},
    {id: "categoriaFalda", value: "Faldas", seleccionado: false},
    {id: "categoriaGafas", value: "Gafas", seleccionado: false},
    {id: "categoriaJersey", value: "Jerséis", seleccionado: false},
    {id: "categoriaPantalón", value: "Pantalónes", seleccionado: false},
    {id: "categoriaPolo", value: "Polos", seleccionado: false},
    {id: "categoriaRopa_interior", value: "Ropa_interior", seleccionado: false},
    {id: "categoriaShorts", value: "Shorts", seleccionado: false},
    {id: "categoriaSudadera", value: "Sudaderas", seleccionado: false},
    {id: "categoriaVaqueros", value: "Vaqueros", seleccionado: false},
    {id: "categoriaVestido", value: "Vestidos", seleccionado: false},
    {id: "categoriaZapatillas", value: "Zapatillas", seleccionado: false},
    {id: "categoriaZapatos", value: "Zapatos", seleccionado: false},
    {id: "categoriaOtros", value: "Otros", seleccionado: false}
  ]
}

var filtroPrecio = {
  id: 'filtroPrecio',
  value: 'Precio',
  totalOpciones: 4,
  opcionesSeleccionadas: 0,
  opciones: [
    {id:'categoria0', value:'Menos de 25€', seleccionado: false},
    {id:'categoria25', value:'De 25€ hasta 50€', seleccionado: false},
    {id:'categoria50', value:'De 50€ hasta 100€', seleccionado: false},
    {id:'categoria75', value:'Más de 100€', seleccionado: false},
  ]
}

var filtroTalla = {
  id: 'filtroTalla',
  value: 'Talla',
  totalOpciones: 48,
  opcionesSeleccionadas: 0,
  opciones:[
    {id:'ft_ps_xxs', value:'XXS', seleccionado: false},
    {id:'ft_ps_xs', value:'XS', seleccionado: false},
    {id:'ft_ps_s', value:'S', seleccionado: false},
    {id:'ft_ps_m', value:'M', seleccionado: false},
    {id:'ft_ps_l', value:'L', seleccionado: false},
    {id:'ft_ps_xl', value:'XL', seleccionado: false},
    {id:'ft_ps_xxl', value:'XXL', seleccionado: false},
    {id:'ft_ca_34', value:'34', seleccionado: false},
    {id:'ft_ca_35', value:'35', seleccionado: false},
    {id:'ft_ca_36', value:'36', seleccionado: false},
    {id:'ft_ca_37', value:'37', seleccionado: false},
    {id:'ft_ca_38', value:'38', seleccionado: false},
    {id:'ft_ca_39', value:'39', seleccionado: false},
    {id:'ft_ca_40', value:'40', seleccionado: false},
    {id:'ft_ca_41', value:'41', seleccionado: false},
    {id:'ft_ca_42', value:'42', seleccionado: false},
    {id:'ft_ca_43', value:'43', seleccionado: false},
    {id:'ft_ca_44', value:'44', seleccionado: false},
    {id:'ft_ca_45', value:'45', seleccionado: false},
    {id:'ft_ca_46', value:'46', seleccionado: false},
    {id:'ft_ca_47', value:'47', seleccionado: false},
    {id:'ft_ca_48', value:'48', seleccionado: false},
    {id:'ft_pi_23w', value:'23W', seleccionado: false},
    {id:'ft_pi_24w', value:'24W', seleccionado: false},
    {id:'ft_pi_25w', value:'25W', seleccionado: false},
    {id:'ft_pi_26w', value:'26W', seleccionado: false},
    {id:'ft_pi_27w', value:'27W', seleccionado: false},
    {id:'ft_pi_28w', value:'28W', seleccionado: false},
    {id:'ft_pi_29w', value:'29W', seleccionado: false},
    {id:'ft_pi_30w', value:'30W', seleccionado: false},
    {id:'ft_pi_31w', value:'31W', seleccionado: false},
    {id:'ft_pi_32w', value:'32W', seleccionado: false},
    {id:'ft_pi_33w', value:'33W', seleccionado: false},
    {id:'ft_pi_34w', value:'34W', seleccionado: false},
    {id:'ft_pi_35w', value:'35W', seleccionado: false},
    {id:'ft_pi_36w', value:'36W', seleccionado: false},
    {id:'ft_pi_37w', value:'37W', seleccionado: false},
    {id:'ft_pi_38w', value:'38W', seleccionado: false},
    {id:'ft_pi_39w', value:'39W', seleccionado: false},
    {id:'ft_pi_40w', value:'40W', seleccionado: false},
    {id:'ft_pi_41w', value:'41W', seleccionado: false},
    {id:'ft_pi_42w', value:'42W', seleccionado: false},
    {id:'ft_pi_43w', value:'43W', seleccionado: false},
    {id:'ft_pi_44w', value:'44W', seleccionado: false},
    {id:'ft_pi_45w', value:'45W', seleccionado: false},
    {id:'ft_pi_46w', value:'46W', seleccionado: false},
    {id:'ft_pi_47w', value:'47W', seleccionado: false},
    {id:'ft_pi_48w', value:'48W', seleccionado: false}

  ]
}

var paginacion = { pagina: 0, cuantosMuestro: 28, inicio: -28, fin:0 };

var agrupacionTallasSeccion ={
  parteSuperior: ['Abrigos',"Americanas/Trajes", 'Camisas','Camisetas','Chaquetas','Jerséis','Polos','Sudaderas','Vestidos'],
  parteInferior: ['Faldas','Pantalones','Shorts','Vaqueros'],
  calzado: ['Zapatillas','Zapatos']
}

function getFiltroMarca(){
  var getMarcas = new XMLHttpRequest();
  getMarcas.onreadystatechange = function() {
    if(getMarcas.readyState === 4) {
      if(getMarcas.status === 200) {
        var respuesta = JSON.parse(getMarcas.responseText).descuento;
        console.log('GET MARCAS', respuesta);
        var filtroMarcaAux = [];
        for( var i= 0; i < respuesta.length; i++){
          filtroMarcaAux.push(respuesta[i].marca.capitalize());
        }console.log('GET MARCAS', filtroMarcaAux);

        filtroMarca = parseFiltro(filtroMarcaAux.unique(), 'marca', 'Marca');
        estructurarCabecera();
      } else {
        console.log(getMarcas);
      }
    }
  }
  getMarcas.open('Get', configGlobal.urlGetMarcas);
  getMarcas.send();
}

function initPaginacion(){
  var paginacion = { pagina: 0, cuantosMuestro: 28, inicio: -28, fin:0};
  setPaginacion(paginacion);

}

function reloadPage(){
  console.log('VOLVERRR');
  window.location = window.location.href.split("?")[0];
}
function setPaginacion(paginacionA){
  paginacion = paginacionA;
}

function getPaginacion(){
  return paginacion;
}

function getActualSearch(){
  return actualSearch;
}

function setActualSearch(newSearch){
  actualSearch = newSearch
}

function newPaginacion(){
  var paginacionAux = getPaginacion();
  var numProductos = getActualArray().length;
  var paginacionNueva = {
    pagina: paginacionAux.pagina++,
    cuantosMuestro: paginacionAux.cuantosMuestro,
    inicio: paginacionAux.inicio + paginacionAux.cuantosMuestro,
    fin:  (paginacionAux.fin + paginacionAux.cuantosMuestro <= getActualArray().length)?paginacionAux.fin + paginacionAux.cuantosMuestro:getActualArray().length
  }
  setPaginacion(paginacionNueva);
  return paginacionNueva;
}


function getIdProduct(){

}

function getWhatsappObject(idObjeto){
  var getObjeto = new XMLHttpRequest();
  getObjeto.onreadystatechange = function() {
    if(getObjeto.readyState === 4) {
      if(getObjeto.status === 200) {
        console.log('getObjeto', getObjeto);
        var respuesta = JSON.parse(getObjeto.responseText).oferta[0];
        if(respuesta == undefined){
          window.location = window.location.href.split("?")[0];
          //window.location.reload();
        }
        console.log('GET OBJETO', respuesta);
        var aaa =   {"ofertas": [{
            0:respuesta.asin,
            1:respuesta.descuento,
            2:respuesta.imagen,
            3:respuesta.seccion,
            4:respuesta.articulo,
            5:respuesta.link,
            6:respuesta.modelo,
            7:respuesta.marca,
            8:respuesta.talla,
            9:respuesta.otras_tallas,
            10:respuesta.precio_oferta,
            11:respuesta.precio_anterior,
            12:respuesta.momento,
            13:respuesta.genero
          }]};
        console.log('aaa',aaa);
        generarJSONyFiltros(aaa);
      } else {
        console.log(getObjeto);
      }
    }
  }
  getObjeto.open('Get', configGlobal.urlGetWhatsAppOb + idObjeto);
  getObjeto.send();
}

function init(){
  var id = getParameterByName('product');
  if(id){
    getWhatsappObject(id);
    document.getElementById("mobileFilter").classList.add("d-none");
    document.getElementById("desktopFilter").classList.add("d-none");
    document.getElementById("allProducts").classList.remove("d-none");
    document.getElementById("product-grid").classList.add("marginCustom");

  }else{
    initPaginacion();
    getOfertasSrv();
    getAllTheOffers();
    getFiltroMarca();
  }

};

function getParameterByName(name, url) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


var getAllTheOffers;

function getAllTheOffers() {

    var request2 = new XMLHttpRequest();

    request2.onreadystatechange = function() {
      if(request2.readyState === 4) {
        if(request2.status === 200) {
          var respuesta = JSON.parse(request2.responseText);

          generarJSONyFiltros(respuesta , 'primeras');

          configGlobal.numOfertas = respuesta.ofertas.length;
          console.log('numOfertas', configGlobal.numOfertas);
        } else {
          console.log(request2);
        }
      }
    }
    request2.open('Get', configGlobal.urlGetNumOfertas);
    request2.send();
}

function getOfertasSrv() {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(request.readyState === 4) {
      if(request.status === 200) {
        var respuesta = JSON.parse(request.responseText);
        generarJSONyFiltros(respuesta, 'todas');
        configGlobal.numOfertas = respuesta.ofertas.length;
        console.log('numOfertas', configGlobal.numOfertas);
        todosLosDatos = true;
      } else {
        console.log(request);
      }
    }
  }

  request.open('Get', configGlobal.urlGetOfertas);
  request.send();
};

function anadirFiltroDinamico(objeto){
  filtroGeneroAux.push(objeto.genero);
  filtroSeccionAux.push(objeto.seccion);
  filtroMarcaAux.push(objeto.marca);
};

function getModelo(modelo,seccion){
  var modeloParse;
  var modeloAux = modelo.replace(seccion,"");
  var modeloAux = modeloAux.split(',');
  if(modeloAux.length > 1){
    modeloParse = modeloAux[0] + ' | ' + seccion;
  }else{
    modeloParse = seccion;
  }
  return modeloParse;
}
var colores= [];
function generarObjetoProducto(objeto, servicio){

  var producto = {
    genero: opcionGenero(objeto[13]),
    descuento: objeto[1],
    imagen:objeto[2],
    seccion: getSeccion(objeto[3]),
    link:objeto[5],
    modelo: getModelo(objeto[6],getSeccion(objeto[3])),
    marca: objeto[7],
    tallaMostrar: objeto[8].replace('Talla','').replace(' y más tallas',"").split("(")[0],
    precio_oferta: objeto[10],
    precio_anterior: objeto[11],
    precio: opcionPrecio(objeto[10]),
    tiempo:  objeto[12],
    talla: getTallaFiltro(objeto[8], getSeccion(objeto[3]),opcionGenero(objeto[13])),
    color: objeto[6].split(',')[2],
    id: objeto[0],
    ordenacion:  objeto[12]
    }

    colores.push(objeto[3]);



  return producto;
};

var seccioness = [];
function getSeccion(seccion){
  //ABRIGOS
  if(seccion == 'Ropa de abrigo'){ return 'Abrigos'};
  if(seccion == 'Chaquetas de pluma'){ return 'Abrigos'};
  if(seccion == 'Forros'){ return 'Abrigos'};
  if(seccion == 'Abrigo'){ return 'Abrigos'};
  if(seccion == 'Soft shell'){ return 'Abrigos'};
  if(seccion == 'Chalecos'){ return 'Abrigos'};
  if(seccion == 'Abrigos'){ return 'Abrigos'};
  if(seccion == 'Chubasqueros'){ return 'Abrigos'};
  if(seccion == 'Cortavientos'){ return 'Abrigos'};

  //AMERICANAS/TRAJES
  if(seccion == 'Pantalones de traje'){ return 'Americanas/Trajes'};
  if(seccion == 'Chaquetas de traje y americanas'){ return 'Americanas/Trajes'};
  if(seccion == 'Blazers'){ return 'Americanas/Trajes'};

  //BAÑADORES
  if(seccion == 'Bañadores'){ return 'Bañadores'};
  if(seccion == 'Trajes de una pieza'){ return 'Bañadores'};

  //CAMISAS
  if(seccion == 'Camisa'){ return 'Camisas'};
  if(seccion == 'Camisas formales'){ return 'Camisas'};
  if(seccion == 'Camisas casual'){ return 'Camisas'};
  if(seccion == 'Blusas y camisas'){ return 'Camisas'};

  //CAMISETAS
  if(seccion == 'Camiseta'){ return 'Camisetas'};
  if(seccion == 'Camisetas de pijama'){ return 'Camisetas'};
  if(seccion == 'Camisetas sin mangas'){ return 'Camisetas'};
  if(seccion == 'Camisetas y tops'){ return 'Camisetas'};
  if(seccion == 'Camisetas de equipación'){ return 'Camisetas'};
  if(seccion == 'Camisetas térmicas'){ return 'Camisetas'};
  if(seccion == 'Camisetas de manga larga'){ return 'Camisetas'};
  if(seccion == 'Camisetas de manga corta'){ return 'Camisetas'};
  if(seccion == 'Camisetas deportivas'){ return 'Camisetas'};
  if(seccion == 'Camisas y camisetas'){ return 'Camisetas'};
  if(seccion == 'Camisetas'){ return 'Camisetas'};

  //CHAQUETAS
  if(seccion == 'Chaquetas deportivas'){ return 'Chaquetas'};
  if(seccion == 'Chaqueta'){ return 'Chaquetas'};
  if(seccion == 'Chaquetas'){ return 'Chaquetas'};


  //FALDA
  if(seccion == 'Falda'){ return 'Falda'};

  //GAFAS/GAFAS DE SOL
  if(seccion == 'Gafas de sol'){ return 'Gafas'};
  if(seccion == 'Monturas de gafas'){ return 'Gafas'};

  //JERSÉIS
  if(seccion == 'Jersey'){ return 'Jerséis'};
  if(seccion == 'Cárdigans'){ return 'Jerséis'};
  if(seccion == 'Jerséis'){ return 'Jerséis'};
  if(seccion == 'Prendas de punto'){ return 'Jerséis'};

  //MATERIAL DEPORTIVO
  //if(seccion == 'Balones'){ return 'Material_Deportivo'};
  //if(seccion == 'Wakeboarding'){ return 'Material_Deportivo'};
  //if(seccion == 'Guantes de combate'){ return 'Material_Deportivo'};

  //PANTALONES
  if(seccion == 'Pantalón'){ return 'Pantalones'};
  if(seccion == 'Pantalones deportivos'){ return 'Pantalones'};
  if(seccion == 'Ropa y uniformes de trabajo'){ return 'Pantalones'};
  if(seccion == 'Pantalones y petos'){ return 'Pantalones'};
  if(seccion == 'Pantalones y monos para la nieve'){ return 'Pantalones'};
  if(seccion == 'Pantalones cortos deportivos'){ return 'Pantalones'};
  if(seccion == 'Pantalones cortos'){ return 'Pantalones'};
  if(seccion == 'Pantalones'){ return 'Pantalones'};

  //POLOS
  if(seccion == 'Polos'){ return 'Polos'};
  if(seccion == 'Polo'){ return 'Polos'};

  //ROPA INTERIOR
  if(seccion == 'Boxers'){ return 'Ropa_interior'};
  if(seccion == 'Pantalones de pijama'){ return 'Ropa_interior'};
  if(seccion == 'Ropainterior deportiva'){ return 'Ropa_interior'};
  if(seccion == 'Pijamas'){ return 'Ropa_interior'};
  if(seccion == 'Bóxers ajustados'){ return 'Ropa_interior'};
  if(seccion == 'Sujetadores básicos'){ return 'Ropa_interior'};
  if(seccion == 'Pijamas de una pieza'){ return 'Ropa_interior'};
  if(seccion == 'Bikinis y Braguitas'){ return 'Ropa_interior'};
  if(seccion == 'Braguitas, tangas y culotes'){ return 'Ropa_interior'};
  if(seccion == 'Calcetines hasta la pantorrilla'){ return 'Ropa_interior'};
  if(seccion == 'Camisetas interiores'){ return 'Ropa_interior'};
  if(seccion == 'Ropa de baño'){ return 'Ropa_interior'};

  //SHORTS
  if(seccion == 'Shorts'){ return 'Shorts'};

  //SUDADERAS
  if(seccion == 'Sudaderas sin capucha'){ return 'Sudaderas'};
  if(seccion == 'Sudadera'){ return 'Sudaderas'};
  if(seccion == 'Sudaderas'){ return 'Sudaderas'};
  if(seccion == 'Sudaderas con capucha'){ return 'Sudaderas'};

  //VAQUEROS
  if(seccion == 'Vaqueros'){ return 'Vaqueros'};

  //VESTIDOS
  if(seccion == 'Vestidos'){ return 'Vestidos'};
  if(seccion == 'Vestido'){ return 'Vestidos'};

  //ZAPATILLAS
  if(seccion == 'Deportes de interior'){ return 'Zapatillas'};
  if(seccion == 'Correr en montaña'){ return 'Zapatillas'};
  if(seccion == 'Correr en asfalto'){ return 'Zapatillas'};
  if(seccion == 'Aire libre y deporte'){ return 'Zapatillas'};
  if(seccion == 'Aire libre y deportes'){ return 'Zapatillas'};
  if(seccion == 'Zapatillas'){ return 'Zapatillas'};

  //ZAPATOS
  if(seccion == 'Botas'){ return 'Zapatos'};
  if(seccion == 'Zapatos'){ return 'Zapatos'};


    seccioness.push(seccion);
    return 'Otros';
}
function generarJSONyFiltros(respuesta,servicio){

  var jsonMock = respuesta.ofertas;
  for(var i=0; i < jsonMock.length; i++){
    var objeto = generarObjetoProducto(jsonMock[i],servicio);
    if(objeto.genero != 'N'){

          response.push(objeto);






    }
    //anadirFiltroDinamico(objeto);
  }
  console.log('seccioness', seccioness);
  console.log('------',response.length);
  response = eliminarDuplicados(response,'link');
  console.log('AAA', response);
  console.log('------',response.length);
  console.log('Tallas', colores.unique());
  //Primera ordenación
  response.sort(function (o1,o2) {
    if (o1.ordenacion < o2.ordenacion) { //comparación lexicogŕafica
      return 1;
    } else if (o1.ordenacion > o2.ordenacion) {
      return -1;
    }
    return 0;
  });

  setBackup(response.unique());

  if(servicio == 'primeras'){
    setArrayProductos(response.unique());
    setActualArray(response.unique());
    //generarFiltros();
    pintarProductos();
    window.scrollTo(0, 0);
  }else{
    addToActualArray()
  }
};

var addToActualArray;
function addToActualArray(){
  filtrar();
}

var getSeccionTalla;
var getTallaFormateada;
var getTallaFormateadaPS;
var getTallaFormateadaPI;
var getTallaFormateadaCA;

var tallaXXS = 0;
var tallaXS = 0;
var tallaS = 0;
var tallaM = 0;
var tallaL = 0;
var tallaXL = 0;
var tallaXXL = 0;
var resto = 0;
var contadorZapatos = 0;

function getTallaFormateadaPS(talla, genero){

  var tallaPS = talla.replace('y más tallas','').replace('Talla','').trim().split(' ')[0];;

    switch (tallaPS) {
      case 'XXS':
        tallaXXS++;
        return 'XXS'
      break;
      case 'XS':
        tallaXS++;
        return 'XS'
      break;
      case 'S':
        tallaS++;
        return 'S'
      break;
      case 'M':
        tallaM++;
        return 'M'
      break;
      case 'L':
        tallaL++;
        return 'L'
      break;
      case 'XL':
        tallaXL++;
        return 'XL'
      break;
      case 'XXL':
        tallaXXL++;
        return 'XXL'
      break;

      break;
      default:

      if(tallaPS == 'XXXL'){ return 'XL'}

      if((genero == 'M' || genero == 'Mujer') && (tallaPS == '32')){ return 'XXS'}
      if((genero == 'M' || genero == 'Mujer') && (tallaPS == '34')){ return 'XS'}
      if((genero == 'M' || genero == 'Mujer') && (tallaPS == '36')){ return 'S'}
      if((genero == 'M' || genero == 'Mujer') && (tallaPS == '38')){ return 'M'}
      if((genero == 'M' || genero == 'Mujer') && (tallaPS == '40')){ return 'L'}
      if((genero == 'M' || genero == 'Mujer') && (tallaPS == '42')){ return 'L'}
      if((genero == 'M' || genero == 'Mujer') && (tallaPS == '44')){ return 'XL'}
      if((genero == 'M' || genero == 'Mujer') && (tallaPS == '46')){ return 'XL'}
      if((genero == 'M' || genero == 'Mujer') && (tallaPS == '48')){ return 'XXL'}
      if((genero == 'M' || genero == 'Mujer') && (tallaPS == '50')){ return 'XXL'}
      if((genero == 'H' || genero == 'Hombre') && (tallaPS == '36')){ return 'XXS'}
      if((genero == 'H' || genero == 'Hombre') && (tallaPS == '38')){ return 'XXS'}
      if((genero == 'H' || genero == 'Hombre') && (tallaPS == '40')){ return 'XXS'}
      if((genero == 'H' || genero == 'Hombre') && (tallaPS == '42')){ return 'XXS'}
      if((genero == 'H' || genero == 'Hombre') && (tallaPS == '43')){ return 'XS'}
      if((genero == 'H' || genero == 'Hombre') && (tallaPS == '44')){ return 'XS'}
      if((genero == 'H' || genero == 'Hombre') && (tallaPS == '46')){ return 'S'}
      if((genero == 'H' || genero == 'Hombre') && (tallaPS == '48')){ return 'M'}
      if((genero == 'H' || genero == 'Hombre') && (tallaPS == '50')){ return 'L'}
      if((genero == 'H' || genero == 'Hombre') && (tallaPS == '52')){ return 'L'}
      if((genero == 'H' || genero == 'Hombre') && (tallaPS == '54')){ return 'XL'}
      if((genero == 'H' || genero == 'Hombre') && (tallaPS == '56')){ return 'XL'}
      if((genero == 'H' || genero == 'Hombre') && (tallaPS == '58')){ return 'XXL'}
      if((genero == 'H' || genero == 'Hombre') && (tallaPS == '60')){ return 'XXL'}


      if(tallaPS == 'Large'){ return 'L'}
      if(tallaPS == 'Medium'){ return 'M'}
      if(tallaPS == 'Small'){ return 'S'}
      if(tallaPS == 'X-Large'){ return 'XL'}
      if(tallaPS == 'X-large'){ return 'XL'}
      if(tallaPS == 'XX-Large'){ return 'XXL'}
      if(tallaPS == 'XXX-Large'){ return 'XXL'}
      if(tallaPS == 'X-Small'){ return 'XS'}
      if(tallaPS == 'XX-Small'){ return 'XXS'}


      return '';

      resto++;

    }
  return '';
}

var contadorW = 0;
var contadorE = 0;
function getTallaFormateadaPI(talla, genero){
  //console.log('Talla ropa:', talla);
  var tallaPI = talla.replace('y más tallas','').replace('Talla','').trim();
  tallaPI = tallaPI.split('/')[0].trim();
  if(tallaPI.indexOf('W') > -1){
    if(tallaPI.indexOf('23') > -1){ return '23W'}
    if(tallaPI.indexOf('24') > -1){ return '24W'}
    if(tallaPI.indexOf('25') > -1){ return '25W'}
    if(tallaPI.indexOf('26') > -1){ return '26W'}
    if(tallaPI.indexOf('27') > -1){ return '27W'}
    if(tallaPI.indexOf('28') > -1){ return '28W'}
    if(tallaPI.indexOf('29') > -1){ return '29W'}
    if(tallaPI.indexOf('30') > -1){ return '30W'}
    if(tallaPI.indexOf('31') > -1){ return '31W'}
    if(tallaPI.indexOf('32') > -1){ return '32W'}
    if(tallaPI.indexOf('33') > -1){ return '33W'}
    if(tallaPI.indexOf('34') > -1){ return '34W'}
    if(tallaPI.indexOf('35') > -1){ return '35W'}
    if(tallaPI.indexOf('36') > -1){ return '36W'}
    if(tallaPI.indexOf('37') > -1){ return '37W'}
    if(tallaPI.indexOf('38') > -1){ return '38W'}
    if(tallaPI.indexOf('39') > -1){ return '39W'}
    if(tallaPI.indexOf('40') > -1){ return '40W'}
    if(tallaPI.indexOf('41') > -1){ return '41W'}
    if(tallaPI.indexOf('42') > -1){ return '42W'}
    if(tallaPI.indexOf('43') > -1){ return '43W'}
    if(tallaPI.indexOf('44') > -1){ return '44W'}
    if(tallaPI.indexOf('45') > -1){ return '45W'}
    if(tallaPI.indexOf('46') > -1){ return '46W'}
    if(tallaPI.indexOf('47') > -1){ return '47W'}
    if(tallaPI.indexOf('48') > -1){ return '48W'}
    if(tallaPI.indexOf('49') > -1){ return '48W'}
    if(tallaPI.indexOf('50') > -1){ return '48W'}
    if(tallaPI.indexOf('52') > -1){ return '48W'}
  }else{
    if(genero = "H"){
      if(tallaPI.indexOf('23') > -1){ return '23W'}
      if(tallaPI.indexOf('24') > -1){ return '24W'}
      if(tallaPI.indexOf('25') > -1){ return '25W'}
      if(tallaPI.indexOf('26') > -1){ return '26W'}
      if(tallaPI.indexOf('27') > -1){ return '27W'}
      if(tallaPI.indexOf('28') > -1){ return '28W'}
      if(tallaPI.indexOf('29') > -1){ return '29W'}
      if(tallaPI.indexOf('30') > -1){ return '30W'}
      if(tallaPI.indexOf('31') > -1){ return '31W'}
      if(tallaPI.indexOf('32') > -1){ return '32W'}
      if(tallaPI.indexOf('33') > -1){ return '33W'}
      if(tallaPI.indexOf('34') > -1){ return '34W'}
      if(tallaPI.indexOf('35') > -1){ return '35W'}
      if(tallaPI.indexOf('36') > -1){ return '26W'}
      if(tallaPI.indexOf('37') > -1){ return '37W'}
      if(tallaPI.indexOf('38') > -1){ return '28W'}
      if(tallaPI.indexOf('39') > -1){ return '39W'}
      if(tallaPI.indexOf('40') > -1){ return '30W'}
      if(tallaPI.indexOf('41') > -1){ return '41W'}
      if(tallaPI.indexOf('42') > -1){ return '32W'}
      if(tallaPI.indexOf('43') > -1){ return '33W'}
      if(tallaPI.indexOf('44') > -1){ return '34W'}
      if(tallaPI.indexOf('45') > -1){ return '35W'}
      if(tallaPI.indexOf('46') > -1){ return '36W'}
      if(tallaPI.indexOf('47') > -1){ return '37W'}
      if(tallaPI.indexOf('48') > -1){ return '38W'}
      if(tallaPI.indexOf('49') > -1){ return '39W'}
      if(tallaPI.indexOf('50') > -1){ return '40W'}
      if(tallaPI.indexOf('52') > -1){ return '42W'}
      if(tallaPI.indexOf('54') > -1){ return '44W'}
      if(tallaPI.indexOf('56') > -1){ return '46W'}
      if(tallaPI.indexOf('58') > -1){ return '48W'}
      if(tallaPI.indexOf('60') > -1){ return '48W'}
    }

    if(genero = "M"){
      if(tallaPI.indexOf('23') > -1){ return '23W'}
      if(tallaPI.indexOf('24') > -1){ return '24W'}
      if(tallaPI.indexOf('25') > -1){ return '25W'}
      if(tallaPI.indexOf('26') > -1){ return '26W'}
      if(tallaPI.indexOf('27') > -1){ return '27W'}
      if(tallaPI.indexOf('28') > -1){ return '28W'}
      if(tallaPI.indexOf('29') > -1){ return '29W'}
      if(tallaPI.indexOf('30') > -1){ return '30W'}
      if(tallaPI.indexOf('31') > -1){ return '31W'}
      if(tallaPI.indexOf('32') > -1){ return '32W'}
      if(tallaPI.indexOf('33') > -1){ return '33W'}
      if(tallaPI.indexOf('34') > -1){ return '24W'}
      if(tallaPI.indexOf('35') > -1){ return '35W'}
      if(tallaPI.indexOf('36') > -1){ return '26W'}
      if(tallaPI.indexOf('37') > -1){ return '37W'}
      if(tallaPI.indexOf('38') > -1){ return '28W'}
      if(tallaPI.indexOf('39') > -1){ return '39W'}
      if(tallaPI.indexOf('40') > -1){ return '30W'}
      if(tallaPI.indexOf('41') > -1){ return '41W'}
      if(tallaPI.indexOf('42') > -1){ return '32W'}
      if(tallaPI.indexOf('43') > -1){ return '33W'}
      if(tallaPI.indexOf('44') > -1){ return '34W'}
      if(tallaPI.indexOf('45') > -1){ return '35W'}
      if(tallaPI.indexOf('46') > -1){ return '36W'}
      if(tallaPI.indexOf('47') > -1){ return '37W'}
      if(tallaPI.indexOf('48') > -1){ return '38W'}
      if(tallaPI.indexOf('49') > -1){ return '39W'}
      if(tallaPI.indexOf('50') > -1){ return '40W'}
      if(tallaPI.indexOf('52') > -1){ return '42W'}
      if(tallaPI.indexOf('54') > -1){ return '44W'}
      if(tallaPI.indexOf('56') > -1){ return '46W'}
      if(tallaPI.indexOf('58') > -1){ return '48W'}
      if(tallaPI.indexOf('60') > -1){ return '48W'}
      if(tallaPI == 'XS'){ return '34W'}
      if(tallaPI == 'S'){ return '24W/26W'}
      if(tallaPI == 'M'){ return '28W/30W'}
      if(tallaPI == 'L'){ return '32W/34W'}
      if(tallaPI == 'XL'){ return '36W/38W'}

      if(tallaPI == 'XS'){ return '34W'}
      if(tallaPI == 'Small'){ return '24W/26W'}
      if(tallaPI == 'Medium'){ return '28W/30W'}
      if(tallaPI == 'Large'){ return '32W/34W'}
      if(tallaPI == 'X-Large'){ return '36W/38W'}


    }
  }

    return '';
}
function getTallaFormateadaCA(talla, genero){
  //console.log('Talla ropa:', talla);
  contadorZapatos++;
  var tallaCA = talla.replace('y más tallas','').replace('Talla','').trim();
  if(tallaCA.indexOf('34') > -1){ return '34';}
  if(tallaCA.indexOf('35') > -1){ return '35'}
  if(tallaCA.indexOf('36') > -1){ return '36'}
  if(tallaCA.indexOf('37') > -1){ return '37'}
  if(tallaCA.indexOf('38') > -1){ return '38'}
  if(tallaCA.indexOf('39') > -1){ return '39'}
  if(tallaCA.indexOf('40') > -1){ return '40'}
  if(tallaCA.indexOf('41') > -1){ return '41'}
  if(tallaCA.indexOf('42') > -1){ return '42'}
  if(tallaCA.indexOf('43') > -1){ return '43'}
  if(tallaCA.indexOf('44') > -1){ return '44'}
  if(tallaCA.indexOf('45') > -1){ return '45'}
  if(tallaCA.indexOf('46') > -1){ return '46'}
  if(tallaCA.indexOf('47') > -1){ return '47'}
  if(tallaCA.indexOf('48') > -1){ return '47'}

    return '';
}
function getTallaFormateada(talla,seccionTalla, genero){
  switch (seccionTalla) {
    case 'parteSuperior':
      return getTallaFormateadaPS(talla ,genero );
      break;
    case 'parteInferior':
      return getTallaFormateadaPI(talla, genero)
      break;
    case 'calzado':
    return getTallaFormateadaCA(talla ,genero );
      break;
    default:

  }
}

function getSeccionTalla(seccion){
  var keys = Object.keys( agrupacionTallasSeccion );
  for(var i = 0; i < keys.length;i++){
    if(agrupacionTallasSeccion[keys[i]].indexOf(seccion) > -1){
      return keys[i];
    }
  }
}

function getTallaFiltro(talla,seccion,genero){
  var seccionTalla = getSeccionTalla(seccion);
  var tallaFormateada = getTallaFormateada(talla,seccionTalla,genero);
  return tallaFormateada;

}

function getActualArray(){
  return actualArray;
}

function setActualArray(array){
  actualArray = array;
}

function generarFiltros(){

}


function getBackup(){
  return responseBackup;
};

function setBackup(response){
  responseBackup = response;
};

function getArrayProductos(){
  return arrayProductos;
};

function setArrayProductos(newArray){
  arrayProductos = newArray;
};

function parseFiltro(filtroParse, tipo ,value){
  var filtro = filtroParse.sort();
  var filtroJSON = {};
  filtroJSON = {
    id: 'filtro'+ tipo.capitalize().split(' ').join(''),
    value: value,
    totalOpciones: filtro.length,
    opcionesSeleccionadas: 0,
    opciones: []
  }
  for(var i=0; i < filtro.length; i++){
    var objeto = {
      id: 'categoria'+filtro[i].capitalize().split(' ').join('').split('-').join('—'),
      value: filtro[i].capitalize(),
      seleccionado: false
    }
    filtroJSON.opciones.push(objeto);
  }
  return filtroJSON;
}

function getFiltro(idFiltro){
  switch (idFiltro) {
    case 'filtroGenero':
      return filtroGenero;
      break;
    case 'filtroSeccion':
      return filtroSeccion;
      break;
    case 'filtroPrecio':
      return filtroPrecio;
      break;
    case 'filtroTalla':
      return filtroTalla;
      break;
    case 'filtroMarca':
      return filtroMarca;
      break;
    default:
  }
}

function opcionPrecio(precio){
  if(precio <= 25){
    return 'Menos de 25€'
  }else if (precio >= 25 && precio <= 50) {
    return 'De 25€ hasta 50€';
  }else if (precio >= 50 && precio <= 100) {
    return 'De 50€ hasta 100€';
  }else{
    return 'Más de 100€';
  }
}

function recoverArrayProductos(){
  setArrayProductos(getBackup());
}

function opcionGenero(genero){
  switch (genero) {
    case 'H':
      return 'Hombre'
    break;
    case 'Hombre':
      return 'Hombre'
    break;
    case 'M':
      return 'Mujer'
    break;
    case 'Mujer':
      return 'Mujer'
    break;
    case 'Niñas':
      return 'N'
    break;
    case 'Niños':
      return 'N'
    break;
    case 'Bebé-Niños':
      return 'N'
    break;
    default:
      return 'N'

  }
}

function getPuntuacion(descuento, marca, tiempo, precio_oferta,servicio){
   var puntuacion = getPuntuacionDescuento(descuento) +
                    getPuntuacionMarca(marca)     +
                    getPuntuacionPrecio(precio_oferta);

   if(servicio == 'primeras'){
     puntuacion = puntuacion + 30;
   }
   return puntuacion;
}

function getPuntuacionPrecio(precio){
  switch (true) {
    case precio < 25:
      return 4;
      break;
    case precio >= 25 && precio < 50:
      return 3;
      break;
    case precio >= 50 && precio < 100:
      return 2;
      break;
    case precio >= 100:
      return 1;
      break;
    default:
      return 1;
  }
}

function getPuntuacionTiempo(tiempo){
  var aux = tiempo.split(' ')[2];
  switch (true) {
    case aux.indexOf("segundo") > -1:
      return 8;
      break;
    case aux.indexOf("minuto") > -1:
      return 5;
      break;
  case aux.indexOf("hora") > -1:
    return 3;
    break;
  case aux.indexOf("dia") > -1:
    return 1;
    break;
    default:
  }
}

function getPuntuacionDescuento(descuento){
  switch (true) {
    case descuento < 50:
      return 1;
      break;
    case descuento >= 50 && descuento < 60:
      return 2;
      break;
    case descuento >= 60 && descuento < 70:
      return 3;
      break;
    case descuento >= 70 && descuento < 80:
      return 4;
      break;
    case descuento >= 80 :
      return 5;
      break;
    default:

  }
}

function getPuntuacionMarca(marca){
  var aux = ["Levi's","Adidas","Calvin Klein", "Converse", "New Balance", "Nike", "The North Face", "Vans"];
  return (aux.indexOf(marca) > -1)?3:0;
}

function eliminarDuplicados(arr, prop){
  var nuevoArray = [];
  var lookup  = {};

for (var i in arr) {
    lookup[arr[i][prop]] = arr[i];
}

for (i in lookup) {
    nuevoArray.push(lookup[i]);
}
nuevoArray.pop();
return nuevoArray;

}

var InfiniteScroll = function() {
        this.initialize = function() {
            this.setupEvents();
        };

        this.setupEvents = function() {
            $(window).on(
                'scroll',
                this.handleScroll.bind(this)
            );
        };

        this.handleScroll = function() {
            var scrollTop = $(document).scrollTop();
            var windowHeight = $(window).height();
            var height = $(document).height() - windowHeight;
            var scrollPercentage = (scrollTop / height);

            // if the scroll is more than 90% from the top, load more content.
            if(scrollPercentage > 0.9) {
              pintarProductos()
            }
        }

        this.initialize();
    }

    $(document).ready(
        function() {
            // Initialize scroll
            new InfiniteScroll();
        }
    );
