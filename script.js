// Sample product data
const products = [
    { id: 1, name: "Comida para Perros", category: "perros", price: 50, image: "imagenes/perro.jpg" },
    { id: 2, name: "Juguete para Gatos", category: "gatos", price: 20, image: "imagenes/juguetegatoiteractivo.jpg" },
    { id: 6, name: "Collar Ajustable", category: "perros", price: 15, image: "imagenes/collar.jpg" },
    { id: 7, name: "ALIMENTO PARA GATOS", category: "gatos", price: 15, image: "imagenes/gatos.jpg" },
    { id: 8, name: "Alimento para Peces de Agua Dulce", category: "accesorios", price: 15, image: "imagenes/Alimento para Peces de Agua Dulce.jpg" },
    { id: 9, name: "Shampoo Hipoalergénico para Mascotas", category: "collar", price: 15, image: "imagenes/Shampoo Hipoalergénico para Mascotas.jpg" },
    { id: 10, name: "Cama Ortopédica para Perro", category: "accesorios", price: 15, image: "imagenes/Cama Ortopédica para Perro.jpg" },
    { id: 10, name: "rascador para gatos", category: "accesorios", price: 15, image: "imagenes/rascador para gatos.jpg" },
];

let cart = [];

// Initialize products
function displayProducts(category = "all") {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";
    const filteredProducts = category === "all" ? products : products.filter(p => p.category === category);
    filteredProducts.forEach(product => {
        const productCard = `
            <div class="product-card bg-white p-4 rounded-lg shadow-md">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded-md mb-4">
                <h4 class="text-lg font-semibold">${product.name}</h4>
                <p class="text-gray-600">S/ ${product.price}</p>
                <button class="add-to-cart bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700" data-id="${product.id}">Agregar al Carrito</button>
            </div>
        `;
        productsContainer.insertAdjacentHTML("beforeend", productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.getAttribute("data-id"));
            addToCart(productId);
        });
    });
}

// Filter products
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        displayProducts(category);
    });
});

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500">El carrito está vacío 😔</p>';
    } else {
        cartItems.innerHTML = "";
        cart.forEach(item => {
            const cartItem = `
                <div class="cart-item flex justify-between items-center py-2">
                    <span>${item.name}</span>
                    <span>S/ ${item.price}</span>
                </div>
            `;
            cartItems.insertAdjacentHTML("beforeend", cartItem);
        });
    }
}

// Cart modal toggle
document.getElementById("cart-count").addEventListener("click", () => {
    document.getElementById("cart-modal").classList.remove("hidden");
});

document.getElementById("close-cart").addEventListener("click", () => {
    document.getElementById("cart-modal").classList.add("hidden");
});

// Initialize page
displayProducts();