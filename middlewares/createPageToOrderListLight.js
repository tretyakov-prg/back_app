var http = require('http');
var fs = require('fs');

function CreateHTMLOrderlight(dataOrder){
    var html = buildHtml(dataOrder);
    return html;
}
//const img = ${itemToOrder.image[0]}
function buildHtml(dataOrder) {
    
    var tableItems = '';
    var totalProductInOrder = 0;

    dataOrder.item.map((itemToOrder, idx)=>{
        const quantityItem = dataOrder.quantity.find(itemArray => itemArray._id === (itemToOrder._id).toString())
        totalProductInOrder += quantityItem.quantity;
        tableItems += `<tr>
                            <td class="product-thumbnail">
                                <a href="/product/${itemToOrder._id}">
                                    <img class="img-fluid" src="https://stk-progress.ru/img/gallery/14.jpg" alt="" style="width: 150px; height: auto;">
                                </a>
                            </td>
                            <td class="product-name">
                                <a href="/product/${itemToOrder._id}">${itemToOrder.name}</a>
                            </td>
                            <td class="product-price-cart">
                                <span class="amount old">${dataOrder.currency_name} ${itemToOrder.price}</span>
                                <span class="amount">${(itemToOrder.price - itemToOrder.price * (itemToOrder.discount/100)).toFixed(2)}</span>
                            </td>
                            <td class="product-quantity">
                                <div class="cart-plus-minus">
                                    <div class="cart-plus-minus-box">${quantityItem.quantity}</div>
                                </div>
                            </td>
                            <td class="product-subtotal">${dataOrder.currency_name} ${((itemToOrder.price - itemToOrder.price * (itemToOrder.discount/100)) * quantityItem.quantity).toFixed(2)}</td>
                        </tr>`
    })
    
    var body = `
        <div id="root">
                <div class="cart-main-area pt-90 pb-100">
                    <div class="container">
                        <h3 class="cart-page-title">Your cart items</h3>
                        <div class="row">
                            <div class="col-12">
                                <div class="table-content table-responsive cart-table-content">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Product Name</th>
                                                <th>Unit Price</th>
                                                <th>Qty</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                ${tableItems}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="cart-shiping-update-wrapper">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4 col-md-6">
                                
                            </div>
                            <div class="col-lg-4 col-md-6">
                                
                            </div>
                            <div class="col-lg-4 col-md-12">
                                <div class="grand-totall">
                                    <div class="title-wrap">
                                        <h4 class="cart-bottom-title section-bg-gary-cart">Cart Total</h4>
                                    </div>
                                    <h5>Total products <span> ${totalProductInOrder}</span></h5>
                                    <h4 class="grand-totall-title">Grand Total <span>${dataOrder.currency_name} ${dataOrder.price}</span></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
  
  
    return  body;
};

module.exports = {
    CreateHTMLOrderlight
};