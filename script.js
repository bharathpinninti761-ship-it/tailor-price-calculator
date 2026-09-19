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
        description: "Fall stitching",
        price: 50
    },
    {
        name: "Cotton Blouse",
        description: "Blouse stitching",
        price: 100
    },
    {
        name: "Dress",
        description: "Dress stitching",
        price: 500
    },
    {
        name: "Lehenga / Langa Vani",
        description: "With lining",
        price: 750
    }
];


const serviceButtons = document.querySelectorAll(".add-button");

const billItems = document.getElementById("billItems");

const totalAmount = document.getElementById("totalAmount");

const totalItems = document.getElementById("totalItems");

const clearButton = document.getElementById("clearButton");

const printButton = document.getElementById("printButton");

const customerName = document.getElementById("customerName");


let cart = [];


/* =========================
   ADD SERVICE
========================= */

serviceButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const service = services[index];

        const existingItem = cart.find(
            item =>
                item.name === service.name &&
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


/* =========================
   UPDATE BILL
========================= */

function updateBill() {

    billItems.innerHTML = "";

    let total = 0;

    let itemCount = 0;


    if (cart.length === 0) {

        billItems.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">🧾</div>

                <h3>No services selected</h3>

                <p>
                    Add a service to start creating the bill.
                </p>

            </div>
        `;

        totalAmount.textContent = "₹0";

        totalItems.textContent = "0";

        return;

    }


    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        itemCount += item.quantity;


        const billItem = document.createElement("div");

        billItem.className = "bill-item";


        billItem.innerHTML = `

            <div class="bill-item-info">

                <h3>${item.name}</h3>

                <p>
                    ${item.description} • ₹${item.price}
                </p>

            </div>


            <div class="quantity-controls">

                <button
                    onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span class="quantity">
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>


            <strong class="item-price">
                ₹${itemTotal}
            </strong>


            <button
                class="remove-button"
                onclick="removeItem(${index})"
                title="Remove item">
                ✕
            </button>

        `;


        billItems.appendChild(billItem);

    });


    totalAmount.textContent = `₹${total}`;

    totalItems.textContent = itemCount;

}


/* =========================
   INCREASE QUANTITY
========================= */

function increaseQuantity(index) {

    cart[index].quantity++;

    updateBill();

}


/* =========================
   DECREASE QUANTITY
========================= */

function decreaseQuantity(index) {

    cart[index].quantity--;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateBill();

}


/* =========================
   REMOVE ITEM
========================= */

function removeItem(index) {

    cart.splice(index, 1);

    updateBill();

}


/* =========================
   CLEAR BILL
========================= */

clearButton.addEventListener("click", () => {

    if (cart.length === 0) {
        return;
    }

    cart = [];

    updateBill();

});


/* =========================
   PRINT BILL
========================= */

printButton.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Please add at least one service before printing.");

        return;

    }


    const name =
        customerName.value.trim() || "Walk-in Customer";


    let total = 0;

    let itemsHTML = "";


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        itemsHTML += `
            <tr>
                <td>
                    ${item.name}
                    ${item.description
                        ? `<br><small>${item.description}</small>`
                        : ""}
                </td>

                <td>${item.quantity}</td>

                <td>₹${itemTotal}</td>
            </tr>
        `;

    });


    const printWindow = window.open(
        "",
        "_blank",
        "width=700,height=800"
    );


    printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>Tailoring Bill</title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 35px;
                    color: #111827;
                }

                .receipt {
                    max-width: 600px;
                    margin: auto;
                }

                h1 {
                    text-align: center;
                    margin-bottom: 5px;
                }

                .subtitle {
                    text-align: center;
                    color: #666;
                    margin-bottom: 25px;
                }

                .customer {
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 15px;
                    margin-bottom: 15px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th,
                td {
                    padding: 12px 5px;
                    border-bottom: 1px solid #ddd;
                    text-align: left;
                }

                th:last-child,
                td:last-child {
                    text-align: right;
                }

                .total {
                    display: flex;
                    justify-content: space-between;
                    font-size: 20px;
                    font-weight: bold;
                    margin-top: 20px;
                    padding-top: 15px;
                    border-top: 2px solid #111827;
                }

                .footer {
                    text-align: center;
                    margin-top: 40px;
                    color: #777;
                    font-size: 13px;
                }

            </style>

        </head>


        <body>

            <div class="receipt">

                <h1>🧵 Tailoring Bill</h1>

                <div class="subtitle">
                    Tailor Price Calculator
                </div>


                <div class="customer">

                    <strong>Customer:</strong>
                    ${name}

                    <br><br>

                    <strong>Date:</strong>
                    ${new Date().toLocaleDateString("en-IN")}

                </div>


                <table>

                    <thead>

                        <tr>
                            <th>Service</th>
                            <th>Qty</th>
                            <th>Amount</th>
                        </tr>

                    </thead>


                    <tbody>

                        ${itemsHTML}

                    </tbody>

                </table>


                <div class="total">

                    <span>Total</span>

                    <span>₹${total}</span>

                </div>


                <div class="footer">

                    Thank you for choosing us! ❤️

                </div>

            </div>

        </body>

        </html>

    `);


    printWindow.document.close();

    printWindow.focus();


    setTimeout(() => {

        printWindow.print();

    }, 300);

});
