
function removeItem(key)
{
    localStorage.removeItem(key);
    showProducts();
}

function showProducts()
{
    let cartItem = document.querySelector("#cart-items");
    let cartTotal = document.querySelector("#cart-total");
    let row = document.createElement("div");
    row.className = "row";
    let total = 0;
    for(let i=0; i<localStorage.length; i++)
    {
        let col = document.createElement("div");
        col.className = "col-md-3 col-xs-6";

        let card = document.createElement("div");
        card.className = "product";
        let key = localStorage.key(i);
        let product = JSON.parse(localStorage.getItem(key));
        card.innerHTML = 
        `<div class="product-img">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="product-body">
            <p class="product-category">${product.type}</p>
            <h3 class="product-name">${product.title}</h3>
            <h4 class="product-price">$ ${Number(product.price)}</h4>
            <h4>Quantity: ${Number(product.quantity)}</h4>
            <h4>total price: $ ${Number(product.quantity) * Number(product.price)}</h4>
            <button class="primary-btn" onclick="removeItem(${key})">
            Remove
            </button>
        </div>`;
        total+= Number(product.quantity) * Number(product.price)
        col.appendChild(card);
        row.appendChild(col);
    }
    cartItem.appendChild(row);
    cartTotal.innerHTML = `<h4 class="product-price">total price: $ ${total.toFixed(2)}</h4>`
}

window.addEventListener("load", showProducts);