document.addEventListener("DOMContentLoaded", () => {
    const cartKey = "bluebasket_cart";

    // Function to get cart items from localStorage
    function getCartItems() {
        return JSON.parse(localStorage.getItem(cartKey)) || [];
    }

    // Function to save cart items to localStorage
    function saveCartItems(items) {
        localStorage.setItem(cartKey, JSON.stringify(items));
    }

    // Function to add an item to the cart
    function addToCart(id, name, price) {
        let cart = getCartItems();
        let existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        saveCartItems(cart);
        alert(`${name} added to cart!`);
    }

    // Attach event listener to "Add to Cart" buttons
    document.querySelectorAll(".atc").forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));
            addToCart(id, name, price);
        });
    });

    // Function to update the cart UI on cart.html
    function updateCartUI() {
        const cartItemsContainer = document.querySelector(".cart-items");
        const subtotalElement = document.getElementById("subtotal");
        let cart = getCartItems();
        
        cartItemsContainer.innerHTML = cart.length ? "" : "<p>Your cart is empty.</p>";

        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;

            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <p><strong>${item.name}</strong> - $${item.price} x ${item.quantity}</p>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(div);
        });

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

        // Attach event listeners to remove buttons
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => {
                const id = button.getAttribute("data-id");
                removeFromCart(id);
            });
        });
    }

    // Function to remove an item from the cart
    function removeFromCart(id) {
        let cart = getCartItems();
        cart = cart.filter(item => item.id !== id);
        saveCartItems(cart);
        updateCartUI();
    }

    // Load the cart UI if on cart.html
    if (document.querySelector(".cart-items")) {
        updateCartUI();
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const clearCartButton = document.querySelector(".clear-cart-btn");
    const cartItemsContainer = document.querySelector(".cart-items");
    const subtotalElement = document.getElementById("subtotal");

    if (clearCartButton) {
        clearCartButton.addEventListener("click", () => {
            // Clear localStorage/cart array
            localStorage.removeItem("cart"); 

            // Clear the cart display
            cartItemsContainer.innerHTML = "";

            // Reset subtotal
            subtotalElement.textContent = "$0.00";

            console.log("Cart cleared!");
        });
    }
});

