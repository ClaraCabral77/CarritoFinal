const productosArray= [ {
    id: 0,
    nombre: "Zapatilla 1",
    precio: 13500,
    stock: 100,
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
    imgSrc: "./img/Zap1.jpg"
    },
    {
      id: 1,
      nombre: "Zapatilla 2",
      precio: 21650,
      stock: 43,
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
      imgSrc: "./img/Zap2.jpg"
    },
    {
      id: 2,
    nombre: "Zapatilla 3",
      precio: 18300,
      stock: 2,
    descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
      imgSrc: "./img/Zap3.jpg"
    },
    {
      id: 3,
      nombre: "Zapatilla 4",
      precio: 25200,
      stock: 5,
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
      "imgSrc": "./img/Zap4.jpg"
    },
    {
      id: 4,
      nombre: "Zapatilla 5",
      precio: 29500,
      stock: 4,
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
      imgSrc: "./img/Zap5.jpg"
    },
    {
      id: 5,
      nombre: "Zapatilla 6",
      precio: 17900,
      stock: 40,
      descripcion:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, error.",
      imgSrc: "./img/Zap6.jpg"
    }
  ]
  


/* elementos seleccionados */
const productos = document.querySelector(".products");
const itemsDelCarrito = document.querySelector(".cart-items");
const subtotal = document.querySelector(".subtotal");
const totalProductosCarrito = document.querySelector(".totalEnCarrito");


/* Agregar productos */
function agregarProductos() {

    const fetch1 = async () =>{
    const respuestaProductos= await fetch("./productos.json");
    const arrayProducto= await respuestaProductos.json();


  arrayProducto.forEach((producto)=> {
    productos.innerHTML += `
            <div class="item">
                <div class="item-container">
                    <div class="item-img">
                        <img src="${producto.imgSrc}" alt="${producto.nombre}">
                    </div>
                    <div class="desc">
                        <h3>${producto.nombre}</h3>
                        <h3><small>$</small>${producto.precio}</h3>
                        <p>
                            ${producto.descripcion}
                        </p>
                    </div>
                    <div class="add-to-wishlist">
                        <img src="./iconos/heart.png" alt="add to wish list">
                    </div>
                    <div class="add-to-cart" onclick="agregarAlCarrito(${producto.id})">
                        <img src="./iconos/bag-plus.png" alt="add to cart">
                    </div>
                </div>
            </div>
        `;
  });
}
}
agregarProductos()

/* Array carrito */
/*OPERADOR LOGICO OR*/ 
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
actualizarCarrito();

/* Agregar al carrito */
function agregarAlCarrito(id) {
  /* ver si el producto ya existe*/
  if (carrito.some((item) => item.id === id)) {
   //ALERTA
   
    Swal.fire({
        position:'center',
        width: '30%',
        heigth: '30%',
        border: 20,
        title: 'Ya agregaste este producto al carrito',
        text: 'Si desea agregar más unidades puede modificarlo utilizando los botones + o - ',
        imageUrl: 'img/SraNisman.jpg',
        background: 'url(img/fondoAnimado.gif)',
        color: 'white',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Bisman',
        confirmButtonColor: 'rgb(216, 112, 211)',
        confirmButtonTextColor: 'black',
    
      })
      // FIN DE AlERTA
    cambiarNumeroDeUnidades("más", id);
  } else {
    const item = productosArray.find((producto) => producto.id === id);

    carrito.push({

        /*SPREAD*/ 
      ...item,
      numeroDeUnidades: 1,
    });
  }

  actualizarCarrito();
}

/* Actualizar carrito*/
function actualizarCarrito() {
  actualizarItemsAlCarrito();
  actualizarSubtotal();

  /* guardar en el local Storage */
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* calcular y actualizar el subtotal */
function actualizarSubtotal() {
  let totalPrecio = 0,
    totalItems = 0;

  carrito.forEach((item) => {
    totalPrecio += item.precio * item.numeroDeUnidades;
    totalItems += item.numeroDeUnidades;
  });

  subtotal.innerHTML = `Subtotal (${totalItems} items): $${totalPrecio.toFixed(2)}`;
  totalProductosCarrito.innerHTML = totalItems;
}

/* Actualizar Items del carrito */
function actualizarItemsAlCarrito() {
  itemsDelCarrito.innerHTML = ""; // borra elemento del carrito
  carrito.forEach((item) => {
    itemsDelCarrito.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onclick="quitarItemCarrito(${item.id})">
                <img src="${item.imgSrc}" alt="${item.nombre}">
                <h4>${item.nombre}</h4>
            </div>
            <div class="unit-precio">
                <small>$</small>${item.precio}
            </div>
            <div class="units">
                <div class="btn menos" onclick="cambiarNumeroDeUnidades('menos', ${item.id})">-</div>
                <div class="number">${item. numeroDeUnidades}</div>
                <div class="btn más" onclick="cambiarNumeroDeUnidades('más', ${item.id})">+</div>           
            </div>
        </div>
      `;
  });
}

/* quitar un producto del carrito */
function quitarItemCarrito(id) {
  carrito = carrito.filter((item) => item.id !== id);

  actualizarCarrito();
}

/* cambiar el número de unidades x producto */
function cambiarNumeroDeUnidades(accion, id) {
  carrito = carrito.map((item) => {
    let  numeroDeUnidades = item.numeroDeUnidades;

    if (item.id === id) {
      if (accion === "menos" &&  numeroDeUnidades > 1) {
         numeroDeUnidades--;
      } else if (accion === "más" && numeroDeUnidades < item.stock) {
        numeroDeUnidades++;
      }
    }

    return {
        /*SPREAD*/
      ...item,
       numeroDeUnidades,
    };
  });

  actualizarCarrito();
}

