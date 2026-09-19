
// ================================
// TAILORING SERVICES
// ================================

const services = [
    {
        name: "Saree Fall + Blouse",
        description: "With lining",
        price: 350
    },
    {
        name: "Saree Fall + Blouse",
        description: "Without lining",
        price: 250
    },
    {
        name: "Saree Fall Only",
        description: "",
        price: 50
    },
    {
        name: "Cotton Blouse",
        description: "",
        price: 100
    },
    {
        name: "Dress",
        description: "",
        price: 500
    },
    {
        name: "Lehenga / Langa Vani",
        description: "With lining",
        price: 750
    }
];


// ================================
// SELECT HTML ELEMENTS
// ================================

const serviceButtons = document.querySelectorAll(".service button");
const billItems = document.getElementById("billItems");
const totalAmount = document.getElementById("totalAmount");
const clearButton = document.getElementById("clearButton");


// ================================
// STORE SELECTED SERVICES
// ================================

let cart = [];


// ================================
// ADD SERVICE
// ================================

serviceButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const service = services[index];

        const existingItem = cart.find(
            item => item.name === service.name &&
                    item.description === service.description
        );

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                ...service,
                quantity: 1
            });

        }

        updateBill();
    });

});


// ================================
// UPDATE BILL
// ================================

function updateBill() {

    billItems.innerHTML = "";

    let total = 0;


    // No items
    if (cart.length === 0) {

        billItems.innerHTML = `
            <p class="empty-message">
                No services selected yet.
            </p>
        `;

        totalAmount.textContent = "₹0";

        return;
    }


    // Display each item
    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;


        const billItem = document.createElement("div");

        billItem.className = "bill-item";

        billItem.innerHTML = `
            <div class="bill-item-info">

                <h3>${item.name}</h3>

                <p>
                    ${item.description}
                    ${item.description ? " • " : ""}
                    ₹${item.price} × ${item.quantity}
                </p>

            </div>

            <strong>
                ₹${itemTotal}
            </strong>

            <button
                class="remove-button"
                onclick="removeItem(${index})">
                ✕
            </button>
        `;


        billItems.appendChild(billItem);

    });


    // Update total
    totalAmount.textContent = `₹${total}`;
}


// ================================
// REMOVE ITEM
// ================================

function removeItem(index) {

    cart.splice(index, 1);

    updateBill();
}


// ================================
// CLEAR EVERYTHING
// ================================

clearButton.addEventListener("click", () => {

    cart = [];

    updateBill();

});
