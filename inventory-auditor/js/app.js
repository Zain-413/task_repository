import {Product} from "./product.js"
import {debounce} from "./utils.js"
import {auditCounter} from "./auditor.js"

const grid=document.getElementById("productGrid")
const searchInput=document.getElementById("searchInput")
const statsDiv=document.getElementById("stats")

let products=[]

const audit=auditCounter()

async function loadProducts(){

const res=await fetch("../data/products.json")

const data=await res.json()

products=data.map(p=>new Product(
p.id,
p.name,
p.price,
p.stock,
p.category,
p.sales
))

renderProducts(products)

}

function renderProducts(list){

grid.innerHTML=""

list.forEach(p=>{

grid.innerHTML+=`

<div class="col-md-3 mb-3">

<div class="card p-3 product" data-id="${p.id}">

<h5>${p.name}</h5>

<p>$${p.price}</p>

<p>Stock: ${p.stock}</p>

<button class="btn btn-danger delete">
Delete
</button>

</div>

</div>

`

})

}

loadProducts()

searchInput.addEventListener(

"input",

debounce((e)=>{

const value=e.target.value.toLowerCase()

const filtered=products.filter(p=>

p.name.toLowerCase().includes(value)

)

renderProducts(filtered)

},400)

)

grid.addEventListener("click",(e)=>{

if(e.target.classList.contains("delete")){

const id=Number(

e.target.closest(".product").dataset.id

)

products=products.filter(p=>p.id!==id)

renderProducts(products)

console.log("Audit count:",audit())

}

})

document
.getElementById("statsBtn")
.addEventListener("click",()=>{

const topSeller=products.reduce((a,b)=>

a.sales>b.sales?a:b

)

const lowStock=products.filter(p=>p.stock<5)

statsDiv.innerHTML=`

<div class="alert alert-info">

Top Seller: ${topSeller.name}<br>

Low Stock Items: ${lowStock.length}

</div>

`

})

document
.getElementById("bulkForm")
.addEventListener("submit",(e)=>{

e.preventDefault()

const price=document
.getElementById("bulkPrice").value

const stock=document
.getElementById("bulkStock").value

products.forEach(p=>{

if(price) p.updatePrice(price)
if(stock) p.updateStock(stock)

})

renderProducts(products)

})

document
.getElementById("exportBtn")
.addEventListener("click",()=>{

const data=JSON.stringify(products)

const blob=new Blob([data])

const url=URL.createObjectURL(blob)

const a=document.createElement("a")

a.href=url
a.download="inventory.json"

a.click()

})