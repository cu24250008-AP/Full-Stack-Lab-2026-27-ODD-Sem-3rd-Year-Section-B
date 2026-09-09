// ==========================================
// CRAZZY FASHION STORE
// LAB SHEET 2 - VANILLA JAVASCRIPT
// ==========================================


// ==========================================
// PRODUCT ARRAY
// ==========================================

const products = [

    {
        id: 1,
        name: "Jackets",
        price: 2499,
        image: "jackets.jpg"
    },

    {
        id: 2,
        name: "Traditional Wear",
        price: 1799,
        image: "traditional.jpg"
    },

    {
        id: 3,
        name: "Women Casual Pants",
        price: 2299,
        image: "Woman pants casual work.jpg"
    },

    {
        id: 4,
        name: "Bags",
        price: 3499,
        image: "Bag.jpg"
    },

    {
        id: 5,
        name: "Accessories",
        price: 1299,
        image: "accessories.jpg"
    },

    {
        id: 6,
        name: "Classic Watch",
        price: 2199,
        image: "watch.jpg"
    },

    {
        id: 7,
        name: "Shoes",
        price: 2099,
        image: "shoes.jpg"
    },

    {
        id: 8,
        name: "Specs",
        price: 2799,
        image: "specs.jpg"
    }

];


// ==========================================
// GET CART FROM LOCAL STORAGE
// ==========================================

let cart = JSON.parse(
    localStorage.getItem("crazzyCart")
) || [];


// ==========================================
// SAVE CART
// ==========================================

function saveCart() {

    localStorage.setItem(
        "crazzyCart",
        JSON.stringify(cart)
    );

}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const countElements =
        document.querySelectorAll(".cart-count");


    const totalItems = cart.reduce(
        function(total, item) {

            return total + item.quantity;

        },
        0
    );


    countElements.forEach(function(element) {

        element.textContent = totalItems;

    });

}


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(productId) {


    // find() is used here

    const product = products.find(
        function(item) {

            return item.id === productId;

        }
    );


    if (!product) {
        return;
    }


    const existingProduct = cart.find(
        function(item) {

            return item.id === productId;

        }
    );


    if (existingProduct) {

        existingProduct.quantity++;

    }

    else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();


    showMessage(
        "Product added to cart!"
    );

}


// ==========================================
// SIMPLE MESSAGE
// ==========================================

function showMessage(message) {

    const oldMessage =
        document.querySelector(".js-message");


    if (oldMessage) {
        oldMessage.remove();
    }


    const messageBox =
        document.createElement("div");


    messageBox.className = "js-message";

    messageBox.textContent = message;


    document.body.appendChild(messageBox);


    setTimeout(function() {

        messageBox.remove();

    }, 2000);

}


// ==========================================
// RENDER PRODUCTS
// ==========================================

function renderProducts() {


    const productGrid =
        document.querySelector("#product-grid");


    if (!productGrid) {
        return;
    }


    productGrid.innerHTML = "";


    // map() is used here

    products.map(function(product) {


        const card =
            document.createElement("div");


        card.className = "product-card";


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}">


            <div class="product-info">

                <p class="product-category">
                    CRAZZY COLLECTION
                </p>


                <h3>
                    ${product.name}
                </h3>


                <p class="description">
                    Stylish and comfortable fashion
                    for your everyday use.
                </p>


                <p class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>


                <div class="product-buttons">

                    <a
                        href="product-detail.html?id=${product.id}"
                        class="product-btn">

                        VIEW DETAILS

                    </a>


                    <button
                        class="cart-btn"
                        onclick="addToCart(${product.id})">

                        ADD TO CART

                    </button>

                </div>

            </div>

        `;


        productGrid.appendChild(card);

    });

}


// ==========================================
// RENDER CART
// ==========================================

function renderCart() {


    const cartBody =
        document.querySelector("#cart-items");


    if (!cartBody) {
        return;
    }


    cartBody.innerHTML = "";


    if (cart.length === 0) {


        cartBody.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="empty-cart">

                    Your cart is empty 🛍

                </td>

            </tr>

        `;


        calculateTotal();

        return;

    }


    cart.forEach(function(item) {


        const subtotal =
            item.price * item.quantity;


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="cart-product">

                    <img
                        src="${item.image}"
                        alt="${item.name}">

                    <span>
                        ${item.name}
                    </span>

                </div>

            </td>


            <td>

                <input
                    type="number"
                    min="1"
                    value="${item.quantity}"
                    class="cart-quantity"
                    data-id="${item.id}">

            </td>


            <td>

                ₹${item.price.toLocaleString("en-IN")}

            </td>


            <td>

                ₹${subtotal.toLocaleString("en-IN")}

            </td>


            <td>

                <button
                    class="remove-btn"
                    data-id="${item.id}">

                    REMOVE

                </button>

            </td>

        `;


        cartBody.appendChild(row);

    });


    // ======================================
    // QUANTITY CHANGE
    // ======================================

    const quantityInputs =
        document.querySelectorAll(".cart-quantity");


    quantityInputs.forEach(function(input) {


        input.addEventListener(
            "change",
            function() {


                const id =
                    Number(this.dataset.id);


                let quantity =
                    Number(this.value);


                if (
                    quantity < 1 ||
                    isNaN(quantity)
                ) {

                    quantity = 1;

                    this.value = 1;

                }


                const item =
                    cart.find(function(product) {

                        return product.id === id;

                    });


                if (item) {

                    item.quantity = quantity;

                }


                saveCart();

                renderCart();

                updateCartCount();

            }
        );

    });


    // ======================================
    // REMOVE PRODUCT
    // ======================================

    const removeButtons =
        document.querySelectorAll(".remove-btn");


    removeButtons.forEach(function(button) {


        button.addEventListener(
            "click",
            function() {


                const id =
                    Number(this.dataset.id);


                // filter() is used here

                cart = cart.filter(
                    function(item) {

                        return item.id !== id;

                    }
                );


                saveCart();

                renderCart();

                updateCartCount();

            }
        );

    });


    calculateTotal();

}


// ==========================================
// CALCULATE TOTAL
// ==========================================

function calculateTotal() {


    const totalElement =
        document.querySelector("#grand-total");


    if (!totalElement) {
        return;
    }


    // reduce() is used here

    const total = cart.reduce(
        function(sum, item) {

            return sum +
                (item.price * item.quantity);

        },
        0
    );


    totalElement.textContent =
        "₹" + total.toLocaleString("en-IN");

}


// ==========================================
// PRODUCT DETAIL PAGE
// ==========================================

function setupProductDetail() {


    const productName =
        document.querySelector(
            "#detail-product-name"
        );


    if (!productName) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        Number(params.get("id")) || 1;


    const product =
        products.find(function(item) {

            return item.id === productId;

        });


    if (!product) {
        return;
    }


    const image =
        document.querySelector(
            "#detail-product-image"
        );


    const price =
        document.querySelector(
            "#detail-product-price"
        );


    image.src = product.image;

    image.alt = product.name;

    productName.textContent =
        product.name;

    price.textContent =
        "₹" +
        product.price.toLocaleString("en-IN");


    const addButton =
        document.querySelector(
            "#detail-add-cart"
        );


    addButton.addEventListener(
        "click",
        function() {


            const quantity =
                Number(
                    document.querySelector(
                        "#detail-quantity"
                    ).value
                );


            for (
                let i = 0;
                i < quantity;
                i++
            ) {

                addToCart(product.id);

            }

        }
    );

}


// ==========================================
// CHECKOUT VALIDATION
// ==========================================

function setupCheckout() {


    const form =
        document.querySelector(
            "#checkout-form"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        function(event) {


            event.preventDefault();


            // Clear old errors

            document
                .querySelectorAll(".error-message")
                .forEach(function(error) {

                    error.textContent = "";

                });


            const confirmation =
                document.querySelector(
                    "#confirmation"
                );


            confirmation.style.display =
                "none";


            let isValid = true;


            // =================================
            // NAME
            // =================================

            const name =
                document.querySelector("#name");


            if (
                name.value.trim() === ""
            ) {

                document.querySelector(
                    "#name-error"
                ).textContent =
                    "Name is required.";

                isValid = false;

            }


            // =================================
            // ADDRESS
            // =================================

            const address =
                document.querySelector(
                    "#address"
                );


            if (
                address.value.trim() === ""
            ) {

                document.querySelector(
                    "#address-error"
                ).textContent =
                    "Address is required.";

                isValid = false;

            }


            // =================================
            // PINCODE
            // =================================

            const pincode =
                document.querySelector(
                    "#pincode"
                );


            if (
                !/^\d{6}$/.test(
                    pincode.value.trim()
                )
            ) {

                document.querySelector(
                    "#pincode-error"
                ).textContent =
                    "Pincode must be exactly 6 digits.";

                isValid = false;

            }


            // =================================
            // PHONE
            // =================================

            const phone =
                document.querySelector(
                    "#phone"
                );


            if (
                !/^\d{10}$/.test(
                    phone.value.trim()
                )
            ) {

                document.querySelector(
                    "#phone-error"
                ).textContent =
                    "Phone number must be exactly 10 digits.";

                isValid = false;

            }


            // =================================
            // PAYMENT
            // =================================

            const payment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );


            if (!payment) {

                document.querySelector(
                    "#payment-error"
                ).textContent =
                    "Please select a payment method.";

                isValid = false;

            }


            // =================================
            // SUCCESS
            // =================================

            if (isValid) {


                // Clear cart

                localStorage.removeItem(
                    "crazzyCart"
                );


                cart = [];


                updateCartCount();


                confirmation.textContent =
                    "Order placed successfully! Thank you for shopping with CRAZZY. 🎉";


                confirmation.style.display =
                    "block";


                form.reset();

            }

        }
    );

}


// ==========================================
// RUN FUNCTIONS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        renderProducts();

        renderCart();

        setupProductDetail();

        setupCheckout();

    }
);