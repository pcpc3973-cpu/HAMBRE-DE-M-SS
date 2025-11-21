document.addEventListener("DOMContentLoaded", () => {

  const listaCarrito = document.getElementById("lista-carrito");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (listaCarrito) {
    if (carrito.length === 0) {
      listaCarrito.innerHTML = "<li>Tu carrito está vacío</li>";
    } else {
      carrito.forEach(producto => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - ${producto.precio}`;
        listaCarrito.appendChild(li);
      });
    }
  }

  
  const botonesCompra = document.querySelectorAll(".producto-card button");
  botonesCompra.forEach(boton => {
    boton.addEventListener("click", () => {
      const card = boton.closest(".producto-card");
      const nombre = card.querySelector("h3").textContent;
      const precio = card.querySelector(".precio").textContent;

      const producto = { nombre, precio };
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      carrito.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carrito));

      alert(`${nombre} agregado al carrito 🛒`);
    });
  });

  
  const metodoPago = document.getElementById("metodo-pago");
  const cuentaInfo = document.getElementById("cuenta-info");
  const numeroCuenta = document.getElementById("numero-cuenta");

  if (metodoPago && cuentaInfo && numeroCuenta) {
    metodoPago.addEventListener("change", () => {
      if (metodoPago.value === "Transferencia") {
        cuentaInfo.style.display = "block";
        numeroCuenta.required = true;
      } else {
        cuentaInfo.style.display = "none";
        numeroCuenta.required = false;
      }
    });
  }

 
  const formPago = document.getElementById("form-pago");
  const recibo = document.getElementById("recibo");
  const detalleRecibo = document.getElementById("detalle-recibo");

  if (formPago && recibo && detalleRecibo) {
    formPago.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = formPago.querySelector('input[placeholder="Nombre completo"]').value;
      const correo = formPago.querySelector('input[placeholder="Correo electrónico"]').value;
      const direccion = formPago.querySelector('input[placeholder="Dirección de envío"]').value;
      const metodo = metodoPago.value;
      const cuenta = numeroCuenta ? numeroCuenta.value : "";

      
      const numeroOrden = "HDM-" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
      const fechaCompra = new Date().toLocaleString("es-CO", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      let total = 0;
      let productosHTML = "<ul>";
      carrito.forEach(producto => {
        productosHTML += `<li>${producto.nombre} - ${producto.precio}</li>`;
        total += parseFloat(producto.precio.replace("$", ""));
      });
      productosHTML += "</ul>";

      detalleRecibo.innerHTML = `
        <p><strong>Número de orden:</strong> ${numeroOrden}</p>
        <p><strong>Fecha de compra:</strong> ${fechaCompra}</p>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${correo}</p>
        <p><strong>Dirección:</strong> ${direccion}</p>
        <p><strong>Método de pago:</strong> ${metodo}</p>
        ${metodo === "Transferencia" ? `<p><strong>Número de cuenta:</strong> ${cuenta}</p>` : ""}
        <p><strong>Productos:</strong></p>
        ${productosHTML}
        <p><strong>Total pagado:</strong> $${total.toFixed(2)}</p>
      `;

      recibo.style.display = "flex";
      localStorage.removeItem("carrito");
      if (listaCarrito) listaCarrito.innerHTML = "<li>Tu carrito está vacío</li>";
      formPago.reset();
      cuentaInfo.style.display = "none";
    });
  }

  const seguirBtn = document.getElementById("seguir-navegando");
  if (seguirBtn) {
    seguirBtn.addEventListener("click", () => {
      window.location.href = "index.html"; 
    });
  }
});