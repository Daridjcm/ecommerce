// Variable globals
let cart = [];

fetch('./products.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error to load JSON file: ${response.statusText}`);
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
              <button class="btn btn-danger" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
            </div>
          </div>
        </div>`;
      productList.innerHTML += productCard;
    });
  })
  .catch(error => {
    console.error('Error to load the products', error);
    alert('Failed to load file, please try again later.');
  });


// Add to Cart
function addToCart(id, name, price) {
  cart.push({ id, name, price });
  updateCartCount();
  alert(`${name} it's was added to cart.`);
}

// Update Cart Count
function updateCartCount() {
  const cartButton = document.querySelector('header button');
  cartButton.textContent = `Cart (${cart.length})`;
}

// Show Cart
document.getElementById('cartModal').addEventListener('show.bs.modal', () => {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${item.name} - $${item.price}
        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Delete</button>
      </li>`;
  });
});

// Delete from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  document.querySelector('#cartModal').dispatchEvent(new Event('show.bs.modal')); // Refrescar modal
}

// Checkout
document.getElementById('checkout-btn').addEventListener('click', ({name, id} = cart) => {
  alert(`You was asked a ${name} with ID.${id}. Thanks for the shop!`);
  updateCartCount();
  const cartItems = document.getElementById('cart-items');
  cart = [];
  cartItems.innerHTML = '';
});