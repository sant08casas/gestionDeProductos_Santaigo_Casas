const botones = document.querySelectorAll("#containerBotones > button");

botones.forEach((option) => {
    option.addEventListener("click", function () {
        if (this.id === "registrarProducto") {
        registrarProducto();
        } else if (this.id === "listarProducto") {
        mostrarProductos();
        }
    }); 
});

function registrarProducto() {
    const main = document.getElementById("main");
    main.innerHTML = `        
            <form id="productoForm">
                <span class="identificadores">Código</span>
                <input type="text" id="codigo" class="inputs" placeholder="código">
                
                <span class="identificadores">Nombre</span>
                <input type="text" id="nombre" class="inputs" placeholder="nombre">
                
                <span class="identificadores">Descripción</span>
                <input type="text" id="descripcion" class="inputs" placeholder="descripción">
                
                <span class="identificadores">Precio</span>
                <input type="text" id="precio" class="inputs" placeholder="precio">
                <div id="containerSubmits">
                    <button type="submit" class="submits" id="guardar">Guardar</button>
                    <button type="button" class="submits" id="cancelar">Cancelar</button>
                </div>
            </form>`;

    document.getElementById("cancelar").addEventListener("click", () => {
        main.innerHTML = "";
    });
    document.getElementById("productoForm").addEventListener("submit", function (event) {
        guardarProductos();
        });
}

function guardarProductos() {
    const codigo = document.getElementById("codigo").value;
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;

    const producto = {
        codigo: codigo,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
    };

    let listaProductos = JSON.parse(localStorage.getItem("listaProductos"));

    listaProductos.push(producto);

    localStorage.setItem("listaProductos", JSON.stringify(listaProductos));

    document.getElementById("main").innerHTML = "";
}

function mostrarProductos() {
    const mostrarLista = document.getElementById("mostrarProducto");
    mostrarLista.innerHTML = "";

    const listaProductos = JSON.parse(localStorage.getItem("listaProductos"));

    if (listaProductos.length === 0) {
        mostrarLista.innerHTML = `
            <div id="aviso">
                <h1>No hay productos registrados en la base de datos</h1> 
            </div>`;
    }

    listaProductos.forEach((producto) => {
        mostrarLista.innerHTML += `
            <div class="productoItem">
                <p><strong>Código:</strong> ${producto.codigo}</p>
                <p><strong>Nombre:</strong> ${producto.nombre}</p>
                <p><strong>Descripción:</strong> ${producto.descripcion}</p>
                <p><strong>Precio:</strong> ${producto.precio}</p>
                <hr>
                    <button class="botonesLista eliminar" id="eliminar" data-codigo="${producto.codigo}" >Eliminar</button>
                    <button class="botonesLista">Editar</button>
            </div>
            `;
        });
        document.querySelectorAll(".eliminar").forEach((boton) => {
            boton.addEventListener("click", function () {
            const codigo = this.getAttribute(`data-codigo`);
            eliminarProducto(codigo);
            });
    });
}

function eliminarProducto(codigo) {
    let listaProductos = JSON.parse(localStorage.getItem("listaProductos"));

    let indiceAEliminar = -1;
    for (let i = 0; i < listaProductos.length; i++) {
        if (listaProductos[i].codigo === codigo) {
        indiceAEliminar = i;
        break;
        }
    }
    if (indiceAEliminar !== -1) {
        listaProductos.splice(indiceAEliminar, 1);

        localStorage.setItem("listaProductos", JSON.stringify(listaProductos));

        mostrarProductos();
    }
}
