fetch("./data/productos.json")
    .then((res) => res.json ())
    .then((data) => {
        productos = [...data];
        cargarLosProductos(productos);
        window.productos = data;
    });

const menuCarrito = document.querySelector("#carrito-menu");
const abrirCarrito = document.querySelector("#abrir");
const cerrarCarrito = document.querySelector("#cerrar");
const containerProductos = document.querySelector("#productos");
const carritoTotal = document.querySelector("#carrito-total");
const carritoProductos = document.querySelector("#carrito-compras");
const finalizarVaciar = document.querySelector("#btns-eliminar-confirmar");
const vaciarCarritoBtn = document.querySelector("#eliminar-carrito");
const finalizarCompraBtn = document.querySelector("#finalizar-compra");
const btnColorMode = document.querySelector("#color-mode");
const btnTodas = document.querySelector('#Todas');
const btnMarcas = document.querySelectorAll(".btn-marcas");

// DARK MODE
const colorModeLS = localStorage.getItem("modocolor");

if(colorModeLS === "oscuro"){
    document.body.classList.toggle("dark-mode");
}

btnColorMode.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")) {
        localStorage.setItem("modocolor", "oscuro");
        btnColorMode.innerHTML = '<i class ="bi bi-moon-stars-fill"></i>';
    } else {
        btnColorMode.innerHTML = '<i class="bi bi-brightness-high-fill"></i>';
        localStorage.removeItem("modocolor");
    }
});

//ABRIR MENU CARRITO

abrirCarrito.addEventListener("click", () => {
    menuCarrito.classList.add("ver-compras");
});

cerrarCarrito.addEventListener("click", () => {
    menuCarrito.classList.remove("ver-compras");
});


const carritoCompra = JSON.parse(localStorage.getItem("carrito")) || [];


// BOTONES DE VACIAR Y CONFIRMAR

vaciarCarritoBtn.addEventListener ("click", () => {
    Swal.fire({
        title: "¿Quieres vaciar el carrito?",
        icon: "warning",
        showCancelButton: "Cancelar",
        confirmButtonText: "Vaciar carrito",
      }).then((result) => {
        if (result.isConfirmed) {
            carritoCompra.length = 0;
            actualizarCarrito();
            Swal.fire({
                title: "Carrito vaciado",
                icon: "success"
            });
        }
    });
});

finalizarCompraBtn.addEventListener ("click", () => {
    Swal.fire({
        title: "¿Quieres Finalizar tu compra?",
        icon: "question",
        showCancelButton: "Cancelar",
        confirmButtonText: "Confirmar",
      }).then((result) => {
        if (result.isConfirmed) {
            carritoCompra.length = 0;
            actualizarCarrito();
          Swal.fire({
            title: "Compra finalizada",
            icon: "success"
          });
        }
    });
});

// CARGAR PRODUCTOS

const cargarLosProductos = (productos) => {
    
    containerProductos.innerHTML = "";

    productos.forEach((producto) => {
        let div = document.createElement("div");
        div.classList.add("card-productos");
        div.innerHTML = `
        <img src="${producto.img}" alt="${productos.nombre}">
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
                duration: 1300,
                style: {
                    background: "#33032f",
                }
            }).showToast();
        });

        div.append(btnProductos);
        containerProductos.append(div);
    });
};

// FILTADO DE MARCAS

btnMarcas.forEach(boton => {
    boton.addEventListener("click", (e) => {
        const productosBoton = productos.filter(producto => producto.marca.toLowerCase() === e.currentTarget.textContent.toLowerCase());
        cargarLosProductos(productosBoton);
    });
});

btnTodas.addEventListener("click", () => {
    cargarLosProductos(productos);
});

// AGREGAR PRODUCTOS AL CARRITO

const agregarCarrito = (producto) => {
    const productoEncontrado = carritoCompra.find(encontrado => encontrado.id === producto.id)
    if(productoEncontrado){
        productoEncontrado.cantidad++;
    } else {
        carritoCompra.push( {...producto, cantidad:1} );
    }
    actualizarCarrito();
};

// ACTUALIZAR CARRITO

const actualizarCarrito = () => {

    carritoCompra.length === 0 ? finalizarVaciar.classList.remove("d-visible") : finalizarVaciar.classList.add("d-visible"),

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
        });

        div.append(btnEliminar);
        carritoProductos.append(div);
    });

    totalCarrito();
    localStorage.setItem("carrito", JSON.stringify(carritoCompra));
};

// ELIMINAR PRODUCTOS DE CARRITO

const eliminarProducto = (producto) => {
    const prodIndex = carritoCompra.findIndex(item => item.id === producto.id);
    carritoCompra.splice(prodIndex, 1);
    actualizarCarrito();
};

// CALCULAR TOTAL DE PRODUCTOS

const totalCarrito = () => {
    const total = carritoCompra.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
};

actualizarCarrito();
