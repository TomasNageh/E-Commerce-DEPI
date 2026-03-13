// Camera products API:
// https://dummyjson.com/products/search?q=camera

let xhr = new XMLHttpRequest();
xhr.open("GET", "https://dummyjson.com/products/search?q=camera");
xhr.onload = () => {
    let data = JSON.parse(xhr.responseText);
    let products = data.products;
    console.log(products);
    
    showProducts(products);
}
xhr.send();
let openProduct = null;
function showProducts(products)
{
    let container = document.querySelector("#container");
    let row = document.createElement("div");
    row.className = "row";

    for(let i=0; i<products.length; i++)
    {
        let col = document.createElement("div");
        col.className = "col-md-3 col-xs-6";

        let card = document.createElement("div");
        card.className = "product";
        card.innerHTML = 
        `<div class="product-img">
            <img src="${products[i].images[0]}" alt="${products[i].title}">
        </div>
        <div class="product-body">
            <p class="product-category">Camera</p>
            <h3 class="product-name">${products[i].title}</h3>
            <h4 class="product-price">$ ${products[i].price}</h4>
        </div>`;
        let product = products[i];
        card.addEventListener("click", () => {
            openProduct = product;
            document.getElementById("sidebar-img").src = product.images[0];
            document.getElementById("sidebar-img").alt = product.title;
            document.getElementById("sidebar-title").innerText = product.title;
            document.getElementById("sidebar-price").innerText = "$ " + product.price;
            document.getElementById("sidebar-description").innerText = product.description;
            document.getElementById("sidebar-qty").value = 1;
            document.getElementById("sidebar-overlay").classList.add("show");
            document.getElementById("product-sidebar").classList.add("show");
        });
        col.appendChild(card);
        row.appendChild(col);
    }
    container.appendChild(row);
}   

function closeSideBar()
{
    document.getElementById("sidebar-overlay").classList.remove("show");
    document.getElementById("product-sidebar").classList.remove("show");
}

function plus()
{
    let qty = document.getElementById("sidebar-qty");
    qty.value = Number(qty.value) + 1;
}

function minus()
{
    let qty = document.getElementById("sidebar-qty");
    if(Number(qty.value) > 1)
    {
        qty.value = Number(qty.value) - 1;
    }
}

function addToCard()
{
    let qty = document.getElementById("sidebar-qty");
    let product = {
        "type":"camera",
        "image":openProduct.images[0],
        "title":openProduct.title,
        "description":openProduct.description,
        "price":openProduct.price,
        "quantity":qty.value,
    };
    console.log(product);
    let productString = JSON.stringify(product);
    console.log(productString);
    let isExisting = localStorage.getItem(openProduct.id)
    if(isExisting)
    {
        let existingProduct = JSON.parse(isExisting);
        existingProduct.quantity = Number(existingProduct.quantity) + Number(qty.value);
        localStorage.setItem(openProduct.id, JSON.stringify(existingProduct));
    }
    else
    {
        localStorage.setItem(openProduct.id, productString);
    }
    closeSideBar();
}