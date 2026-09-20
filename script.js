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


// ================================
// CALCULATOR ELEMENTS
// ================================

const serviceButtons = document.querySelectorAll(".add-button");

const billItems = document.getElementById("billItems");
const totalAmount = document.getElementById("totalAmount");
const totalItems = document.getElementById("totalItems");

const clearButton = document.getElementById("clearButton");
const printButton = document.getElementById("printButton");
const customerName = document.getElementById("customerName");

let cart = [];


// ================================
// ADD SERVICE
// ================================

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


// ================================
// UPDATE BILL
// ================================

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


// ================================
// QUANTITY
// ================================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateBill();
}


function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);
    }

    updateBill();
}


function removeItem(index) {

    cart.splice(index, 1);

    updateBill();
}


// ================================
// CLEAR BILL
// ================================

clearButton.addEventListener("click", () => {

    cart = [];

    updateBill();

});


// ================================
// PRINT BILL
// ================================

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

                    ${
                        item.description
                            ? `<br><small>${item.description}</small>`
                            : ""
                    }
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


// ==================================================
// 🔐 SECURE INCOME MANAGER
// ==================================================

const incomeLocked = document.getElementById("incomeLocked");
const incomePasswordBox =
    document.getElementById("incomePasswordBox");

const incomeContent =
    document.getElementById("incomeContent");

const unlockIncomeButton =
    document.getElementById("unlockIncomeButton");

const confirmPasswordButton =
    document.getElementById("confirmPasswordButton");

const lockIncomeButton =
    document.getElementById("lockIncomeButton");

const incomePassword =
    document.getElementById("incomePassword");

const passwordMessage =
    document.getElementById("passwordMessage");

const incomeMonth =
    document.getElementById("incomeMonth");

const monthlyIncome =
    document.getElementById("monthlyIncome");

const incomeEntryCount =
    document.getElementById("incomeEntryCount");

const incomeEntries =
    document.getElementById("incomeEntries");

const addIncomeButton =
    document.getElementById("addIncomeButton");


const INCOME_STORAGE_KEY =
    "tailorEncryptedIncome";

const PASSWORD_CHECK_KEY =
    "tailorPasswordCheck";


let encryptionKey = null;
let incomeData = [];


// ================================
// PASSWORD HELPERS
// ================================

const encoder = new TextEncoder();
const decoder = new TextDecoder();


function arrayBufferToBase64(buffer) {

    const bytes = new Uint8Array(buffer);

    let binary = "";

    bytes.forEach(byte => {

        binary += String.fromCharCode(byte);

    });

    return btoa(binary);
}


function base64ToArrayBuffer(base64) {

    const binary =
        atob(base64);

    const bytes =
        new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {

        bytes[i] =
            binary.charCodeAt(i);

    }

    return bytes.buffer;
}


// ================================
// CREATE ENCRYPTION KEY
// ================================

async function createKey(password, salt) {

    const passwordKey =
        await crypto.subtle.importKey(
            "raw",
            encoder.encode(password),
            "PBKDF2",
            false,
            ["deriveKey"]
        );


    return crypto.subtle.deriveKey(

        {
            name: "PBKDF2",
            salt: salt,
            iterations: 250000,
            hash: "SHA-256"
        },

        passwordKey,

        {
            name: "AES-GCM",
            length: 256
        },

        false,

        ["encrypt", "decrypt"]

    );

}


// ================================
// ENCRYPT DATA
// ================================

async function encryptIncome(data, key) {

    const iv =
        crypto.getRandomValues(
            new Uint8Array(12)
        );


    const encrypted =
        await crypto.subtle.encrypt(

            {
                name: "AES-GCM",
                iv: iv
            },

            key,

            encoder.encode(
                JSON.stringify(data)
            )

        );


    return {

        iv: arrayBufferToBase64(iv),

        data: arrayBufferToBase64(
            encrypted
        )

    };

}


// ================================
// DECRYPT DATA
// ================================

async function decryptIncome(record, key) {

    const decrypted =
        await crypto.subtle.decrypt(

            {
                name: "AES-GCM",

                iv:
                    new Uint8Array(
                        base64ToArrayBuffer(
                            record.iv
                        )
                    )
            },

            key,

            base64ToArrayBuffer(
                record.data
            )

        );


    return JSON.parse(
        decoder.decode(decrypted)
    );

}


// ================================
// INITIALIZE PASSWORD
// ================================

async function setupPassword(password) {

    const salt =
        crypto.getRandomValues(
            new Uint8Array(16)
        );


    const key =
        await createKey(
            password,
            salt
        );


    const verificationData = {

        message: "TAILOR_PASSWORD_OK"

    };


    const encrypted =
        await encryptIncome(
            verificationData,
            key
        );


    localStorage.setItem(

        PASSWORD_CHECK_KEY,

        JSON.stringify({

            salt:
                arrayBufferToBase64(
                    salt
                ),

            encrypted:
                encrypted

        })

    );


    localStorage.setItem(

        INCOME_STORAGE_KEY,

        JSON.stringify({

            salt:
                arrayBufferToBase64(
                    salt
                ),

            entries: []

        })

    );


    encryptionKey = key;

    incomeData = [];

}


// ================================
// UNLOCK
// ================================

async function unlockIncome() {

    const password =
        incomePassword.value;

    if (!password) {

        passwordMessage.textContent =
            "Please enter a password.";

        return;
    }


    const savedPassword =
        localStorage.getItem(
            PASSWORD_CHECK_KEY
        );


    try {

        // FIRST TIME

        if (!savedPassword) {

            if (password.length < 6) {

                passwordMessage.textContent =
                    "Password must contain at least 6 characters.";

                return;
            }


            await setupPassword(password);

            showIncome();

            passwordMessage.textContent = "";

            incomePassword.value = "";

            return;
        }


        // EXISTING PASSWORD

        const saved =
            JSON.parse(
                savedPassword
            );


        const salt =
            new Uint8Array(
                base64ToArrayBuffer(
                    saved.salt
                )
            );


        const key =
            await createKey(
                password,
                salt
            );


        const verification =
            await decryptIncome(
                saved.encrypted,
                key
            );


        if (
            verification.message !==
            "TAILOR_PASSWORD_OK"
        ) {

            throw new Error();

        }


        encryptionKey = key;


        await loadIncome();


        showIncome();

        passwordMessage.textContent = "";

        incomePassword.value = "";

    }

    catch (error) {

        passwordMessage.textContent =
            "Incorrect password.";

    }

}


// ================================
// LOAD INCOME
// ================================

async function loadIncome() {

    const saved =
        localStorage.getItem(
            INCOME_STORAGE_KEY
        );


    if (!saved) {

        incomeData = [];

        return;
    }


    try {

        const record =
            JSON.parse(saved);


        incomeData =
            await decryptIncome(
                record.entries,
                encryptionKey
            );

    }

    catch (error) {

        incomeData = [];

    }

}


// ================================
// SAVE INCOME
// ================================

async function saveIncome() {

    if (!encryptionKey) {

        return;

    }


    const stored =
        JSON.parse(

            localStorage.getItem(
                INCOME_STORAGE_KEY
            )

        );


    const encrypted =
        await encryptIncome(
            incomeData,
            encryptionKey
        );


    localStorage.setItem(

        INCOME_STORAGE_KEY,

        JSON.stringify({

            salt: stored.salt,

            entries: encrypted

        })

    );

}


// ================================
// SHOW INCOME
// ================================

function showIncome() {

    incomeLocked.classList.add(
        "hidden"
    );

    incomePasswordBox.classList.add(
        "hidden"
    );

    incomeContent.classList.remove(
        "hidden"
    );

    lockIncomeButton.classList.remove(
        "hidden"
    );


    const now =
        new Date();


    incomeMonth.value =
        `${now.getFullYear()}-${String(
            now.getMonth() + 1
        ).padStart(2, "0")}`;


    displayIncome();

}


// ================================
// LOCK
// ================================

function lockIncome() {

    encryptionKey = null;

    incomeData = [];

    incomeContent.classList.add(
        "hidden"
    );

    incomePasswordBox.classList.add(
        "hidden"
    );

    incomeLocked.classList.remove(
        "hidden"
    );

    lockIncomeButton.classList.add(
        "hidden"
    );

}


// ================================
// UNLOCK BUTTON
// ================================

unlockIncomeButton.addEventListener(
    "click",
    () => {

        incomeLocked.classList.add(
            "hidden"
        );

        incomePasswordBox.classList.remove(
            "hidden"
        );

        incomePassword.focus();

    }
);


// ================================
// CONFIRM PASSWORD
// ================================

confirmPasswordButton.addEventListener(
    "click",
    unlockIncome
);


incomePassword.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            unlockIncome();

        }

    }
);


// ================================
// LOCK BUTTON
// ================================

lockIncomeButton.addEventListener(
    "click",
    lockIncome
);


// ================================
// MONTH CHANGE
// ================================

incomeMonth.addEventListener(
    "change",
    displayIncome
);


// ================================
// DISPLAY MONTHLY INCOME
// ================================

function displayIncome() {

    if (!incomeMonth.value) {

        return;
    }


    const selectedMonth =
        incomeMonth.value;


    const monthEntries =
        incomeData.filter(
            entry =>
                entry.date.startsWith(
                    selectedMonth
                )
        );


    const total =
        monthEntries.reduce(
            (sum, entry) =>
                sum + entry.amount,
            0
        );


    monthlyIncome.textContent =
        `₹${total}`;


    incomeEntryCount.textContent =
        `${monthEntries.length} ${
            monthEntries.length === 1
                ? "entry"
                : "entries"
        }`;


    incomeEntries.innerHTML = "";


    if (monthEntries.length === 0) {

        incomeEntries.innerHTML = `

            <div class="income-empty">

                No income recorded
                for this month.

            </div>

        `;

        return;
    }


    monthEntries
        .slice()
        .reverse()
        .forEach(entry => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "income-entry";


            const formattedDate =
                new Date(
                    entry.date
                ).toLocaleDateString(
                    "en-IN"
                );


            div.innerHTML = `

                <div>

                    <strong>
                        ${entry.description}
                    </strong>

                    <div class="income-entry-date">
                        ${formattedDate}
                    </div>

                </div>


                <div>

                    <span class="income-entry-amount">
                        ₹${entry.amount}
                    </span>

                    <button
                        class="income-delete"
                        onclick="deleteIncome('${entry.id}')">
                        ✕
                    </button>

                </div>

            `;


            incomeEntries.appendChild(div);

        });

}


// ================================
// ADD MANUAL INCOME
// ================================

addIncomeButton.addEventListener(
    "click",
    async () => {

        const amount =
            prompt(
                "Enter income amount:"
            );


        if (amount === null) {

            return;

        }


        const numericAmount =
            Number(
                amount
            );


        if (
            !Number.isFinite(
                numericAmount
            ) ||
            numericAmount <= 0
        ) {

            alert(
                "Please enter a valid amount."
            );

            return;
        }


        const description =
            prompt(
                "Description:",
                "Tailoring work"
            );


        if (description === null) {

            return;

        }


        incomeData.push({

            id:
                crypto.randomUUID(),

            date:
                new Date()
                    .toISOString(),

            amount:
                numericAmount,

            description:
                description.trim() ||
                "Tailoring work"

        });


        await saveIncome();

        displayIncome();

    }
);


// ================================
// DELETE INCOME
// ================================

async function deleteIncome(id) {

    const confirmed =
        confirm(
            "Delete this income entry?"
        );


    if (!confirmed) {

        return;

    }


    incomeData =
        incomeData.filter(
            entry =>
                entry.id !== id
        );


    await saveIncome();

    displayIncome();

}


// ================================
// SAVE CURRENT BILL AS INCOME
// ================================

const saveBillAsIncome =
    document.createElement("button");

saveBillAsIncome.id =
    "saveBillIncomeButton";

saveBillAsIncome.className =
    "print-button";

saveBillAsIncome.textContent =
    "💰 Save Bill as Income";


printButton.insertAdjacentElement(
    "afterend",
    saveBillAsIncome
);


saveBillAsIncome.addEventListener(
    "click",
    async () => {

        if (!encryptionKey) {

            alert(
                "Please unlock Income Manager first."
            );

            return;

        }


        if (cart.length === 0) {

            alert(
                "Please add services to the bill first."
            );

            return;

        }


        let total = 0;


        cart.forEach(item => {

            total +=
                item.price *
                item.quantity;

        });


        const name =
            customerName.value.trim() ||
            "Walk-in Customer";


        incomeData.push({

            id:
                crypto.randomUUID(),

            date:
                new Date()
                    .toISOString(),

            amount:
                total,

            description:
                name

        });


        await saveIncome();

        displayIncome();


        alert(
            `₹${total} saved to income.`
        );

    }
);
// ================================
// SHARE BILL
// ================================

const shareBillButton =
    document.createElement("button");

shareBillButton.id =
    "shareBillButton";

shareBillButton.className =
    "print-button";

shareBillButton.textContent =
    "📤 Share Bill";

shareBillButton.style.marginTop =
    "8px";

saveBillAsIncome.insertAdjacentElement(
    "afterend",
    shareBillButton
);


shareBillButton.addEventListener(
    "click",
    async () => {

        if (cart.length === 0) {

            alert(
                "Please add services to the bill first."
            );

            return;
        }

        const name =
            customerName.value.trim() ||
            "Customer";

        let total = 0;

        let message =
            "🧵 *Tailoring Bill*\n\n";

        message +=
            `Hello ${name},\n\n`;

        message +=
            "Here is your tailoring bill:\n\n";

        cart.forEach(item => {

            const itemTotal =
                item.price *
                item.quantity;

            total += itemTotal;

            message +=
                `${item.name}`;

            if (item.description) {

                message +=
                    ` (${item.description})`;
            }

            message +=
                ` × ${item.quantity} — ₹${itemTotal}\n`;
        });

        message +=
            `\n*Total Amount: ₹${total}*`;

        message +=
            "\n\nThank you for choosing us! ❤️";


        if (navigator.share) {

            try {

                await navigator.share({

                    title:
                        "Tailoring Bill",

                    text:
                        message

                });

            }

            catch (error) {

                console.log(
                    "Share cancelled."
                );

            }

        }

        else {

            try {

                await navigator.clipboard.writeText(
                    message
                );

                alert(
                    "Bill copied! You can paste it into WhatsApp or Messages."
                );

            }

            catch (error) {

                alert(message);

            }

        }

    }
);


// ================================
// INITIAL STATE
// ================================

lockIncomeButton.classList.add(
    "hidden"
);

updateBill();
