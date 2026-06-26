document.addEventListener("DOMContentLoaded", () => {
    
    //PERSISTENCIA DEL CARRITO//
    let carrito = JSON.parse(localStorage.getItem("carritoCompras")) || [];

    function actualizarContadorCarrito() {
        const cartCounter = document.getElementById("cart-counter");
        if (cartCounter) {
            const totalItems = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
            cartCounter.textContent = `🛒 Carrito: (${totalItems})`;
        }
    }
    actualizarContadorCarrito();
    //CATÁLOGO LOCAL//
   const productContainer = document.getElementById('product-container');

    const btnComprarAhora = document.getElementById('btn-comprar-ahora');
    if (btnComprarAhora) {
        btnComprarAhora.addEventListener('click', () => {
            const secProductos = document.getElementById('section-productos');
            if (secProductos) secProductos.scrollIntoView({ behavior: 'smooth' });
        });
    }
    const misProductos = [
        {
            id: "1",
            title: "Cajita guarda figus",
            price: 12000,
            image: "img/cajitafigusmundial.jpg"
        },
        {
            id: "2",
            title: "Jarra cervecera personalizada",
            price: 20000,
            image: "img/jarrosdefutbol.jpg"
        },
        {
            id: "3",
            title: "click anti stress",
            price: 6000,
            image: "img/clickcopamundialOro.jpg"
        },
        {
            id: "4",
            title: "Cake Toper personalizados",
            price: 3500,
            image: "img/cakeToper.jpg"
        },
        {
            id: "5",
            title: "Cortantes para Galletitas",
            price: 3000,
            image: "img/cortante galletas.jpg"
        },
        {
            id: "6",
            title: "cortante galletas navidad",
            price: 3500,
            image: "img/cortantesGalletas.jpg"
        },
        {
            id: "7",
            title: "Carpinteria; centrador de tarugos",
            price: 15000,
            image: "img/centrador de tarugos.jpg"
        },
        {
            id: "8",
            title: "Carpinteria: escuadra cajones",
            price: 8000,
            image: "img/escuadrascarpintero.jpg"
        },
        {
            id: "9",
            title: "Lámparas diseños personalizados",
            price: 20000,
            image: "img/lampara escorpio.jpg"
        },
        {
            id: "10",
            title: "Lámparas diseños personalizados2",
            price: 20000,
            image: "img/lamparaGeminis.jpg"
        },
        {
            id: "11",
            title: "Macetas facetadas",
            price: 5000,
            image: "img/macetas facetadas.jpg"
        },
        {
            id: "12",
            title: "Molde Macetas",
            price: 15000,
            image: "img/moldeMacetas.jpg"
        },
        {
            id: "13",
            title: "Molde macetas2",
            price: 15500,
            image: "img/macetas2.jpg"
        },
        {
            id: "14",
            title: "Soporte PlayStation",
            price: 12000,
            image: "img/soporteplay.jpg"
        },
        {
            id: "15",
            title: "Soporte casco moto",
            price: 7000,
            image: "img/soporte casco.jpg"
        },
        {
            id: "16",
            title: "Soporte bandeja clio",
            price: 16000,
            image: "img/soporte para bandeja bajo luneta clio.jpg"
        },
        {
            id: "17",
            title: "Soporte bandeja gol",
            price: 16000,
            image: "img/soporte bandeja bajo luneta vw gol.jpg"
        },
        {
            id: "18",
            title: "Soporte celular",
            price: 6500,
            image: "img/soporte celu.jpg"
        },
        {
            id: "19",
            title: "Laringoscopio covid",
            price: 20000,
            image: "img/laringoscopio.jpg"
        },
        {
            id: "20",
            title: "Diseños educativos",
            price: 19000,
            image: "img/disenios educativos.jpg"
        },
        {
            id: "21",
            title: "Porta Saumerio",
            price: 12000,
            image: "img/portasaum.jpg"
        },
        {
            id: "22",
            title: "LLaveros",
            price: 3000,
            image: "img/llaveros.jpg"
        },
        {
            id: "23",
            title: "Pedidos especiales",
            price: 10000,
            image: "img/Cthulhu.jpg"
        }
    ];

    // lee lista y dibuja las tarjetas en la página de la tienda//
    function cargarProductosLocales() {
        if (!productContainer) return; 

        productContainer.innerHTML = ""; 

        misProductos.forEach(producto => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <div class="img-wrapper">
                    <img src="${producto.image}" alt="${producto.title}">
                </div>
                <h3>${producto.title}</h3>
                <span class="price">$${producto.price.toLocaleString('es-AR')} ARS</span>
                <button class="btn btn-cart" data-id="${producto.id}" data-title="${producto.title}" data-price="${producto.price}">
                    Agregar al carrito
                </button>
            `;
            productContainer.appendChild(card);
        });

        configurarBotonesCarrito();
    }

    // botones de compra//
    function configurarBotonesCarrito() {
        const botones = document.querySelectorAll(".btn-cart");
        botones.forEach(boton => {
            boton.addEventListener("click", (e) => {
                const id = e.target.getAttribute("data-id");
                const titulo = e.target.getAttribute("data-title");
                const precio = parseInt(e.target.getAttribute("data-price"));

                const productoExistente = carrito.find(item => item.id === id);

                if (productoExistente) {
                    productoExistente.cantidad += 1;
                } else {
                    carrito.push({ id, titulo, precio, cantidad: 1 });
                }

                localStorage.setItem("carritoCompras", JSON.stringify(carrito));
                actualizarContadorCarrito();

                // Exito verde//
                const botonOriginalText = e.target.textContent;
                e.target.textContent = "¡Añadido! ✓";
                e.target.style.backgroundColor = "#2ecc71";
                setTimeout(() => {
                    e.target.textContent = botonOriginalText;
                    e.target.style.backgroundColor = "#3498db";
                }, 1000);
            });
        });
    }

    //carga de productos//
    cargarProductosLocales();

    //Formulario//
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm) {
        const savedEmail = localStorage.getItem("lastSavedEmail");
        if (savedEmail) {
            document.getElementById("email").value = savedEmail;
        }

        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = document.getElementById("nombre").value.trim();
            const email = document.getElementById("email").value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (nombre === "" || email === "") {
                formMessage.style.color = "#e74c3c";
                formMessage.textContent = "Todos los campos son obligatorios.";
                return;
            }

            if (!emailRegex.test(email)) {
                formMessage.style.color = "#e74c3c";
                formMessage.textContent = "Por favor, ingresa un formato de email válido.";
                return;
            }

            localStorage.setItem("lastSavedEmail", email);
            formMessage.style.color = "#2ecc71";
            formMessage.textContent = `¡Gracias, ${nombre}! Tu mensaje ha sido enviado de forma simulada.`;
            contactForm.reset();
        });
    }
});
