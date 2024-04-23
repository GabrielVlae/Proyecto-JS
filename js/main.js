fetch("/data/productos.json")
    .then((res) => res.json ())
    .then((data) => {
        cargarLosProductos(data)
    })

// DARK MODE

const btnColorMode = document.querySelector("#color-mode"); 

const colorModeLS = localStorage.getItem("modocolor");
if(colorModeLS === "oscuro"){
    document.body.classList.toggle("dark-mode")
}

btnColorMode.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")) {
        localStorage.setItem("modocolor", "oscuro");
        btnColorMode.innerHTML = '<i class ="bi bi-moon-stars-fill"><i>';
    }else{
        btnColorMode.innerHTML = '<i class="bi bi-brightness-high-fill"></i>';
        localStorage.removeItem("modocolor");
    }

});


// MENU CARRITO

const menuCarrito = document.querySelector("#carrito-menu");
const abrirCarrito = document.querySelector("#abrir");
const cerrarCarrito = document.querySelector("#cerrar");

abrirCarrito.addEventListener("click", () => {

    menuCarrito.classList.add("ver-compras");

});

cerrarCarrito.addEventListener("click", () => {

    menuCarrito.classList.remove("ver-compras");

});

// MOSTRAR PRODUCTOS EN LA PAGINA Y CARRITO

const carritoCompra = JSON.parse(localStorage.getItem("carrito")) || [];

const containerProductos = document.querySelector("#productos");
const carritoTotal = document.querySelector("#carrito-total");
const carritoProductos = document.querySelector("#carrito-compras");

// CARGAR PRODUCTOS

const cargarLosProductos = (productos) => {

    containerProductos.innerHTML = "";

    productos.forEach((producto) => {
    
        let div = document.createElement("div");
        div.classList.add("card-productos");
        div.innerHTML = `
        <img src="${producto.img}">
        <div class="card-body-productos"> 
            <h3>${producto.nombre}</h3>        
            <p>$${producto.precio}</p>
        </div>`;
        
        let btnProductos = document.createElement("button");
        btnProductos.classList.add("btn-carrito");
        btnProductos.innerText = "Agregar al carrito";
        btnProductos.addEventListener("click", () => {
            agregarCarrito(producto);
    
            Toastify({
                text: "Producto Agregado",
                className: "toastify",
                duration: 1300,
                style: {
                  background: "#33032f",
                }
            }).showToast();
        });
        
        div.append(btnProductos);
        containerProductos.append(div);
    }) 
}

const btnMarcas = document.querySelectorAll('.btn-marcas');

btnMarcas.forEach(boton => {
    boton.addEventListener("click", (e) => {

        const productosBoton = productos.filter(producto => producto.marca === e.currentTarget.marca);
        cargarLosProductos(productosBoton);

    })
});

// AGREGAR PRODUCTOS AL CARRITO

const agregarCarrito = (producto) => {
    const productoEncontrado = carritoCompra.find(encontrado => encontrado.id === producto.id)
    if(productoEncontrado){
        productoEncontrado.cantidad++;
    }else{
        carritoCompra.push( {...producto, cantidad:1} );
    }
    actualizarCarrito()
}

// ACTUALIZAR CARRITO

const actualizarCarrito = () => {

    carritoProductos.innerHTML = "";
    carritoCompra.forEach((producto) => {
        let div = document.createElement("div");
        div.classList.add("compras");
        div.innerHTML = `
        <img src="${producto.img}">
        <p>Precio: $${producto.precio}</p>
        <p>Cant: ${producto.cantidad}</p>
        `;

        let btnEliminar = document.createElement("button");
        btnEliminar.classList.add("carrito-producto-btn");
        btnEliminar.innerHTML = `<i class="bi bi-x-lg btn-producto"></i>`;
        btnEliminar.addEventListener("click", () => {
            eliminarProducto(producto);
        })
            
        div.append(btnEliminar);
        carritoProductos.append(div);
    })

    totalCarrito()
    localStorage.setItem("carrito", JSON.stringify(carritoCompra));
}

// ELIMINAR PRODUCTOS DE CARRITO

const eliminarProducto = (producto) => {
    const prodIndex = carritoCompra.findIndex(item => item.id === producto.id);
    carritoCompra.splice(prodIndex, 1);
    actualizarCarrito();
}

// CALCULAR TOTAL DE PRODUCTOS

const totalCarrito = () => {
    const total = carritoCompra.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
}

actualizarCarrito()

