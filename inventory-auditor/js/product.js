export function Product(
id,
name,
price,
stock,
category,
sales
){

this.id=id
this.name=name
this.price=price
this.stock=stock
this.category=category
this.sales=sales

}

Product.prototype.updatePrice=function(price){

this.price=Number(price)

}

Product.prototype.updateStock=function(stock){

this.stock=Number(stock)

}

Product.prototype.isLowStock=function(){

return this.stock<5

}