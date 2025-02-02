const CART_KEY = 'bluebasket_cart';

class CartManager{
    //Managing the cart features

    constructor(){
        this.cart=JSON.parse(localStorage.getItem(CART_KEY))||[];
    }

    saveCart(){
        localStorage.setitem(CART_KEY,JSON.stringify(this.cart));
        this.updateCartCount();
    }

    // updating the cart adding counter
    addItem(productId){
        const existing= this.cart.find(item =>item.id === productId);

        if(existing){
            existing.quantity++;
        } else {
            this.cart.push({ id : productId, quantity : 1 });
        }

        this.saveCart();
    }
    getCount(){
        return this.cart.reduce((sum,item)=>sum+item.quantity,0);
    }
    updateCartCount(){
        document.querySelectorAll('.cart-count').forEach(e1 =>{});

    }
}

// Product Loader
const PRODUCTS = [
    {
        id: 1,
        name: "Vintage Camera",
        price: 45.99,
        image: "vintage camera.jpg",
        condition: "Used"
    },
    {
        id: 2,
        name: "Designer Jeans",
        price: 29.99,
        image: "designer jeans.jpg",
        condition: "Like New"
    }
];

function renderProducts() {
    const grid = document.getElementById('featured-products');
    if(!grid) return;

    grid.innerHTML = PRODUCTS.map(product => `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-meta">
                    <span class="product-price">$${product.price}</span>
                    <span class="product-condition">${product.condition}</span>
                </div>
                <button class="add-to-cart" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        </article>
    `).join('');
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    const cartManager = new CartManager();
    
    // Update cart count on all pages
    cartManager.updateCartCount();

    // Handle add to cart
    document.addEventListener('click', (e) => {
        if(e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            cartManager.addItem(productId);
            e.target.disabled = true;
            setTimeout(() => e.target.disabled = false, 1000);
        }
    });

    // Render products
    renderProducts();
});