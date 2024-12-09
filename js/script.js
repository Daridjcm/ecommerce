// Variables globales
let cart = [];

fetch('./products.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error al cargar el archivo JSON: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    const productList = document.getElementById('product-list');
    data.products.forEach(product => {
      const productCard = `
        <div class="col-md-4 mb-4">
          <div class="card">
            <img src="./images/${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text">Category: ${product.category}</p>
              <p class="card-text"><strong>$${product.price}</strong></p>
              <button class="btn btn-primary" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Añadir al carrito</button>
            </div>
          </div>
        </div>`;
      productList.innerHTML += productCard;
    });
  })
  .catch(error => {
    console.error('Error al cargar los productos:', error);
    alert('No se pudo cargar el archivo de productos. Intenta más tarde.');
  });


// Añadir al carrito
function addToCart(id, name, price) {
  cart.push({ id, name, price });
  updateCartCount();
  alert(`${name} ha sido añadido al carrito.`);
}

// Actualizar contador del carrito
function updateCartCount() {
  const cartButton = document.querySelector('header button');
  cartButton.textContent = `Carrito (${cart.length})`;
}

// Mostrar carrito
document.getElementById('cartModal').addEventListener('show.bs.modal', () => {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${item.name} - $${item.price}
        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Eliminar</button>
      </li>`;
  });
});

// Eliminar del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  document.querySelector('#cartModal').dispatchEvent(new Event('show.bs.modal')); // Refrescar modal
}

// Comprar
document.getElementById('checkout-btn').addEventListener('click', () => {
  alert('Gracias por tu compra.');
  cart = [];
  updateCartCount();
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
});
