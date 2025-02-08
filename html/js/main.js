
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search");
    const searchDropdown = document.getElementById("search-dropdown");

    // Sample product data (Replace with actual product fetching logic)
    const products = [
        { name: "Men's Jacket", link: "men.html" },
        { name: "Men's Shoes", link: "men.html" },
        { name: "Women's Dress", link: "women.html" },
        { name: "Women's Bag", link: "women.html" },
        { name: "Ladies Jeans", link: "women.html" },
        { name: "Women's Shoes", link: "women.html" },
        { name: "Children's Toys", link: "children.html" },
        { name: "Children's Clothes", link: "children.html" },
        { name: "Children's Cap", link: "children.html" },
        { name: "Children's Cycles", link: "children.html" },
        { name: "Stroller", link: "children.html" },
        { name: "Puzzles", link: "children.html" },
        { name: "Outdoor Playground Sets", link: "children.html" },
        { name: "Children's Backpacks", link: "children.html" },
        { name: "Action Figures", link: "children.html" },
        { name: "Lego", link: "children.html" },
        { name: "Phone", link: "elect.html" },
        { name: "Charger", link: "elect.html" },
        { name: "XBOX", link: "elect.html" },
        { name: "Vintage Camera", link: "elect.html" },
        { name: "Cooler", link: "elect.html" },
        { name: "Laptop", link: "elect.html" },
        { name: "Fiction Books", link: "book.html" },
        { name: "Non-Fiction Books", link: "book.html" },
        { name: "Educational Books", link: "book.html" }
    ];

    // Function to filter products based on search input
    function filterProducts(query) {
        return products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    }

    // Function to update the search dropdown with results
    function updateSearchDropdown() {
        const query = searchInput.value.trim();
        searchDropdown.innerHTML = ""; // Clear previous results

        if (query.length === 0) {
            searchDropdown.style.display = "none"; // Hide dropdown if empty
            return;
        }

        const filteredProducts = filterProducts(query);

        if (filteredProducts.length === 0) {
            searchDropdown.innerHTML = `<div class="no-results">No results found</div>`;
        } else {
            filteredProducts.forEach(product => {
                const item = document.createElement("div");
                item.classList.add("search-item");
                item.textContent = product.name;
                item.addEventListener("click", () => {
                    window.location.href = product.link; // Navigate on click
                });
                searchDropdown.appendChild(item);
            });
        }

        searchDropdown.style.display = "block"; // Show dropdown
    }

    // Event Listeners
    searchInput.addEventListener("keyup", updateSearchDropdown);
    searchInput.addEventListener("focus", updateSearchDropdown);

    // Hide dropdown when clicking outside
    document.addEventListener("click", (event) => {
        if (!searchInput.contains(event.target) && !searchDropdown.contains(event.target)) {
            searchDropdown.style.display = "none";
        }
    });
});
