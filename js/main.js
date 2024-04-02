// LISTA PRODUCTOS

const productos = [
    {   
        id: 1,
        img: "img/zapatillas-adidas.png",
        nombre: "Zapatillas Adidas",
        marca:"Adidas",
        precio: 10000
    },
    {   
        id: 2,
        img: "img/zapatillas-adidas-2.png",
        nombre: "Zapatillas Adidas",
        marca:"Adidas",
        precio: 8500
    },
    {   
        id: 3,
        img: "img/zapatillas-jordan.png",
        nombre: "Zapatillas Jordan",
        marca:"Jordan",
        precio: 15000
    },
    {   
        id: 4,
        img: "img/zapatillas-jordan-2.png",
        nombre: "Zapatillas Jordan",
        marca:"Jordan",
        precio: 17500
    },
    {   
        id: 5,
        img: "img/zapatillas-nike.png",
        nombre: "Zapatillas Nike",
        marca:"Nike",
        precio: 11000
    },
    {   
        id: 6,
        img: "img/zapatillas-nike-2.png",
        nombre: "Zapatillas All Nike",
        marca:"Nike",
        precio: 7000
    },
    {   
        id: 7,
        img: "img/zapatillas-converse.png",
        nombre: "Zapatillas Converse",
        marca:"Converse",
        precio: 9000
    },
    {   
        id: 8,
        img: "img/zapatillas-converse-2.png",
        nombre: "Zapatillas Converse",
        marca:"Converse",
        precio: 10000
    },
    {   
        id: 9,
        img: "img/zapatillas-puma.png",
        nombre: "Zapatillas Puma",
        marca:"Puma",
        precio: 14000
    }
];

// DARK MODE

const btnColorMode = document.querySelector("#color-mode"); 

btnColorMode.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")) {
        btnColorMode.innerHTML = '<i class ="bi bi-moon-stars-fill"><i>';
    }else{
        btnColorMode.innerHTML = '<i class="bi bi-brightness-high-fill"></i>';
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
    });
    
    div.append(btnProductos);
    containerProductos.append(div);
}) 

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

