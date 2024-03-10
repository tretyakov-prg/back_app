var http = require('http');
var fs = require('fs');

function CreateHTMLOrder(dataOrder){
    var html = buildHtml(dataOrder);
    return html;
}
//const img = ${itemToOrder.image[0]}
function buildHtml(dataOrder) {
    var style = `
    .container{
        margin-top: 50px;
    }
     @media only screen and (max-width: 767px) {
         .cart-main-area.pb-100 {
             padding-bottom: 60px;
        }
    }
     h3.cart-page-title {
         font-size: 20px;
         font-weight: 500;
         margin: 0 0 15px;
    }
     .cart-table-content table {
         border: 1px solid #ebebeb;
    }
     .cart-table-content table thead > tr {
         border: 1px solid #ebebeb;
         background-color: #f9f9f9;
    }
     .cart-table-content table thead > tr th {
         font-size: 14px;
         font-weight: 500;
         padding: 21px 45px 22px;
         text-align: center;
         vertical-align: middle;
         white-space: nowrap;
         text-transform: uppercase;
         color: #333;
         border-top: medium none;
    }
     @media only screen and (min-width: 992px) and (max-width: 1199px) {
         .cart-table-content table thead > tr th {
             padding: 21px 35px 22px;
        }
    }
     @media only screen and (max-width: 767px) {
         .cart-table-content table thead > tr th {
             padding: 21px 20px 22px;
        }
    }
     .cart-table-content table tbody > tr {
         border-bottom: 1px solid #ebebeb;
    }
     .cart-table-content table tbody > tr td.product-thumbnail {
         width: 150px;
    }
     .cart-table-content table tbody > tr td.product-name {
         width: 435px;
         text-align: left;
    }
     .cart-table-content table tbody > tr td.product-name a {
         font-size: 15px;
         font-weight: 500;
         color: #333;
    }
     .cart-table-content table tbody > tr td.product-name a:hover {
         color: #ff4f49;
    }
     .cart-table-content table tbody > tr td.product-price-cart {
         width: 435px;
    }
     .cart-table-content table tbody > tr td.product-price-cart span {
         font-weight: 500;
         color: #333;
    }
     .cart-table-content table tbody > tr td.product-price-cart span.old {
         margin-right: 10px;
         text-decoration: line-through;
         color: #8e8e8e;
    }
     .cart-table-content table tbody > tr td.product-subtotal {
         font-weight: 500;
         color: #333;
    }
     .cart-table-content table tbody > tr td.product-quantity {
         width: 435px;
    }
     .cart-table-content table tbody > tr td.product-quantity .cart-plus-minus {
         position: relative;
         display: inline-block;
         width: 110px;
         height: 40px;
         padding: 0;
    }
     .cart-table-content table tbody > tr td.product-quantity .cart-plus-minus .qtybutton {
         font-size: 16px;
         position: absolute;
         float: inherit;
         width: 20px;
         margin: 0;
         cursor: pointer;
         transition: all 0.3s ease 0s;
         text-align: center;
         color: #333;
         border: none;
         background: none;
    }
     .cart-table-content table tbody > tr td.product-quantity .cart-plus-minus .dec.qtybutton {
         top: 0;
         left: 0;
         height: 40px;
         border-right: 1px solid #e5e5e5;
    }
     .cart-table-content table tbody > tr td.product-quantity .cart-plus-minus .inc.qtybutton {
         top: 0;
         right: 0;
         height: 40px;
         border-left: 1px solid #e5e5e5;
    }
     .cart-table-content table tbody > tr td.product-quantity .cart-plus-minus input.cart-plus-minus-box {
         font-size: 14px;
         float: left;
         width: 110px;
         height: 40px;
         margin: 0;
         padding: 0;
         text-align: center;
         color: #333;
         border: 1px solid #e1e1e1;
         background: transparent none repeat scroll 0 0;
    }
     .cart-table-content table tbody > tr td.product-remove {
         width: 100px;
    }
     .cart-table-content table tbody > tr td.product-remove a, .cart-table-content table tbody > tr td.product-remove button {
         font-size: 17px;
         margin: 0 13px;
         color: #666;
         border: none;
         background: none;
    }
     .cart-table-content table tbody > tr td.product-remove a:hover, .cart-table-content table tbody > tr td.product-remove button:hover {
         color: #ff4f49;
    }
     .cart-table-content table tbody > tr td.product-wishlist-cart > a, .cart-table-content table tbody > tr td.product-wishlist-cart > button {
         font-size: 13px;
         font-weight: 500;
         line-height: 1.2;
         display: block;
         margin: 0 auto;
         padding: 10px 15px;
         text-transform: uppercase;
         color: #fff;
         border: none;
         border-radius: 50px;
         background: none;
         background-color: #ff4f49;
    }
     .cart-table-content table tbody > tr td.product-wishlist-cart > a:hover, .cart-table-content table tbody > tr td.product-wishlist-cart > button:hover, .cart-table-content table tbody > tr td.product-wishlist-cart > a.active, .cart-table-content table tbody > tr td.product-wishlist-cart > button.active {
         background-color: #333;
    }
     .cart-table-content table tbody > tr td.product-wishlist-cart > a:disabled, .cart-table-content table tbody > tr td.product-wishlist-cart > button:disabled {
         cursor: not-allowed;
    }
     .cart-table-content table tbody > tr td {
         font-size: 15px;
         padding: 30px 0 30px 30px;
         text-align: center;
         color: #333;
    }
     .cart-shiping-update-wrapper {
         display: flex;
         justify-content: space-between;
         padding: 30px 0 55px;
    }
     @media only screen and (max-width: 767px) {
         .cart-shiping-update-wrapper {
             display: block;
             padding: 30px 0 15px;
        }
    }
     .cart-shiping-update-wrapper .cart-shiping-update > a, .cart-shiping-update-wrapper .cart-clear > button, .cart-shiping-update-wrapper .cart-clear > a {
         font-size: 14px;
         font-weight: 500;
         line-height: 1;
         display: inline-block;
         padding: 18px 63px 17px;
         text-transform: uppercase;
         color: #363f4d;
         border-radius: 50px;
         background-color: #f2f2f2;
    }
     @media only screen and (min-width: 768px) and (max-width: 991px) {
         .cart-shiping-update-wrapper .cart-shiping-update > a, .cart-shiping-update-wrapper .cart-clear > button, .cart-shiping-update-wrapper .cart-clear > a {
             font-size: 13px;
             padding: 18px 25px 17px;
        }
    }
     @media only screen and (max-width: 767px) {
         .cart-shiping-update-wrapper .cart-shiping-update > a, .cart-shiping-update-wrapper .cart-clear > button, .cart-shiping-update-wrapper .cart-clear > a {
             margin: 0 0 15px;
             padding: 18px 40px 17px;
        }
    }
     .cart-shiping-update-wrapper .cart-shiping-update > a:hover, .cart-shiping-update-wrapper .cart-clear > button:hover, .cart-shiping-update-wrapper .cart-clear > a:hover {
         color: #fff;
         background-color: #ff4f49;
    }
     .cart-shiping-update-wrapper .cart-clear > button {
         margin-right: 27px;
         cursor: pointer;
         transition: all 0.3s ease 0s;
         border: medium none;
    }
     .cart-shiping-update-wrapper .cart-clear > button:last-child {
         margin-right: 0;
    }
     @media only screen and (min-width: 768px) and (max-width: 991px) {
         .cart-shiping-update-wrapper .cart-clear > button {
             margin-right: 15px;
        }
    }
     .cart-tax, .discount-code-wrapper {
         padding: 45px 30px 50px;
         border: 1px solid #ebebeb;
         border-radius: 5px;
         background-color: #f9f9f9;
    }
     @media only screen and (min-width: 992px) and (max-width: 1199px) {
         .cart-tax, .discount-code-wrapper {
             padding: 45px 18px 50px;
        }
    }
     @media only screen and (max-width: 767px) {
         .cart-tax, .discount-code-wrapper {
             padding: 45px 18px 50px;
        }
    }
     .cart-tax .title-wrap, .discount-code-wrapper .title-wrap {
         position: relative;
    }
     .cart-tax .title-wrap::before, .discount-code-wrapper .title-wrap::before {
         position: absolute;
         z-index: 1;
         top: 10px;
         left: 0;
         width: 100%;
         height: 1px;
         content: "";
         transition: all 0.4s ease 0s;
         background-color: #e3e1e1;
    }
     .cart-tax .title-wrap h4.cart-bottom-title, .discount-code-wrapper .title-wrap h4.cart-bottom-title {
         font-size: 18px;
         font-weight: 500;
         display: inline-block;
         margin: 0;
         padding-right: 18px;
    }
     @media only screen and (min-width: 992px) and (max-width: 1199px) {
         .cart-tax .title-wrap h4.cart-bottom-title, .discount-code-wrapper .title-wrap h4.cart-bottom-title {
             font-size: 16px;
        }
    }
     .cart-tax .title-wrap .section-bg-gray, .discount-code-wrapper .title-wrap .section-bg-gray {
         position: relative;
         z-index: 99;
         background-color: #f8f9f9;
    }
     .cart-tax .tax-wrapper, .discount-code-wrapper .tax-wrapper {
         margin-top: 22px;
    }
     .cart-tax .tax-wrapper p, .discount-code-wrapper .tax-wrapper p {
         margin: 0;
    }
     .cart-tax .tax-wrapper .tax-select-wrapper, .discount-code-wrapper .tax-wrapper .tax-select-wrapper {
         margin: 5px 0 0;
    }
     .cart-tax .tax-wrapper .tax-select-wrapper .tax-select, .discount-code-wrapper .tax-wrapper .tax-select-wrapper .tax-select {
         margin: 0 0 26px;
    }
     .cart-tax .tax-wrapper .tax-select-wrapper .tax-select label, .discount-code-wrapper .tax-wrapper .tax-select-wrapper .tax-select label {
         font-size: 14px;
         margin: 0 0 5px;
         color: #242424;
    }
     .cart-tax .tax-wrapper .tax-select-wrapper .tax-select select, .discount-code-wrapper .tax-wrapper .tax-select-wrapper .tax-select select {
         font-size: 12px;
         width: 100%;
         height: 40px;
         padding: 0 50px 0 15px;
         cursor: pointer;
         color: #242424;
         border: 1px solid #ebebeb;
         box-shadow: none;
         -webkit-appearance: none;
         -moz-appearance: none;
    }
     .cart-tax .tax-wrapper .tax-select-wrapper .tax-select input, .discount-code-wrapper .tax-wrapper .tax-select-wrapper .tax-select input {
         height: 40px;
         border: 1px solid #ebebeb;
         background: #fff none repeat scroll 0 0;
    }
     .cart-tax .tax-wrapper .tax-select-wrapper button.cart-btn-2, .discount-code-wrapper .tax-wrapper .tax-select-wrapper button.cart-btn-2 {
         font-size: 14px;
         font-weight: 500;
         padding: 13px 42px 12px;
         cursor: pointer;
         transition: all 0.3s ease 0s;
         text-transform: uppercase;
         color: #fff;
         border: medium none;
         border-radius: 50px;
         background-color: #ff4f49;
    }
     .cart-tax .tax-wrapper .tax-select-wrapper button.cart-btn-2:hover, .discount-code-wrapper .tax-wrapper .tax-select-wrapper button.cart-btn-2:hover {
         background-color: #333;
    }
     .cart-tax .discount-code, .discount-code-wrapper .discount-code {
         margin: 21px 0 0;
    }
     .cart-tax .discount-code p, .discount-code-wrapper .discount-code p {
         margin: 0 0 15px;
    }
     .cart-tax .discount-code form input, .discount-code-wrapper .discount-code form input {
         height: 40px;
         margin-bottom: 30px;
         padding-left: 10px;
         border: 1px solid #ebebeb;
         background: #fff;
    }
     .cart-tax .discount-code form button.cart-btn-2, .discount-code-wrapper .discount-code form button.cart-btn-2 {
         font-size: 14px;
         font-weight: 500;
         padding: 13px 42px 12px;
         cursor: pointer;
         transition: all 0.3s ease 0s;
         text-transform: uppercase;
         color: #fff;
         border: medium none;
         border-radius: 50px;
         background-color: #ff4f49;
    }
     .cart-tax .discount-code form button.cart-btn-2:hover, .discount-code-wrapper .discount-code form button.cart-btn-2:hover {
         background-color: #333;
    }
     .grand-totall {
         padding: 45px 30px 50px;
         border: 1px solid #ebebeb;
         border-radius: 5px;
         background-color: #f9f9f9;
    }
     @media only screen and (min-width: 992px) and (max-width: 1199px) {
         .grand-totall {
             padding: 45px 18px 50px;
        }
    }
     @media only screen and (min-width: 768px) and (max-width: 991px) {
         .grand-totall {
             margin-top: 30px;
        }
    }
     .grand-totall .title-wrap {
         position: relative;
    }
     .grand-totall .title-wrap::before {
         position: absolute;
         z-index: 1;
         top: 10px;
         left: 0;
         width: 100%;
         height: 1px;
         content: "";
         transition: all 0.4s ease 0s;
         background-color: #e3e1e1;
    }
     .grand-totall .title-wrap h4.cart-bottom-title {
         font-size: 18px;
         font-weight: 500;
         display: inline-block;
         margin: 0;
         padding-right: 18px;
    }
     .grand-totall .title-wrap .section-bg-gary-cart {
         position: relative;
         z-index: 9;
         background-color: #f9f9f9;
    }
     .grand-totall h5 {
         font-size: 14px;
         margin: 36px 0 27px;
    }
     .grand-totall h5 span {
         font-size: 18px;
         font-weight: 500;
         float: right;
    }
     .grand-totall .total-shipping {
         margin: 0 0 27px;
         padding: 28px 0;
         border-top: 1px solid #ebebeb;
         border-bottom: 1px solid #ebebeb;
    }
     .grand-totall .total-shipping h5 {
         font-size: 14px;
         margin: 0;
    }
     .grand-totall .total-shipping ul {
         padding: 19px 0 0 0;
    }
     .grand-totall .total-shipping ul li {
         margin: 0 0 6px;
         list-style: outside none none;
         color: #242424;
    }
     .grand-totall .total-shipping ul li:last-child {
         margin: 0 0 0;
    }
     .grand-totall .total-shipping ul li input {
         position: relative;
         top: 2px;
         width: 13px;
         height: 13px;
         margin-right: 10px;
         padding: 0;
         cursor: pointer;
         color: #626262;
         border: 1px solid #d7d7d7;
         border-radius: 5px !important;
         background: #e9e9e9 none repeat scroll 0 0;
    }
     .grand-totall .total-shipping ul li span {
         float: right;
    }
     .grand-totall h4.grand-totall-title {
         font-size: 20px;
         font-weight: 500;
         margin: 0 0 25px;
         color: #ff4f49;
    }
     .grand-totall h4.grand-totall-title span {
         float: right;
    }
     .grand-totall a {
         font-size: 14px;
         font-weight: 500;
         line-height: 1;
         display: block;
         padding: 18px 10px 17px;
         text-align: center;
         text-transform: uppercase;
         color: #fff;
         border-radius: 50px;
         background-color: #ff4f49;
    }
     .grand-totall a:hover {
         background-color: #333;
    }
     @media only screen and (max-width: 767px) {
         .discount-code-wrapper {
             margin: 30px 0;
        }
    }
     .cart-item-variation {
         margin-top: 10px;
    }
     .cart-item-variation span {
         display: block;
    }`;
    var tableItems = '';
    var totalProductInOrder = 0;

    dataOrder.item.map((itemToOrder, idx)=>{
        const quantityItem = dataOrder.quantity.find(itemArray => itemArray._id === (itemToOrder._id).toString())
        totalProductInOrder += quantityItem.quantity;
        tableItems += `<tr>
                            <td class="product-thumbnail">
                                <a href="/product/${itemToOrder._id}">
                                    <img class="img-fluid" src="https://stk-progress.ru/img/gallery/14.jpg" alt="">
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

    var header = `<meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="theme-color" content="#000000">
		<meta name="description" content="Angel Boxxx market">
		<link rel="manifest" href="/manifest.json">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<title>Angel | Cart</title>
        <style>
        ${style}
        </style> 
        <meta charset="utf-8" data-rh="true"><meta name="description" content="Cart page with selected items." data-rh="true"></meta>`;
    
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
  
  
    return '<!DOCTYPE html>'
         + '<html><head>' + header + '</head><body>' + body + '</body></html>';
};

module.exports = {
    CreateHTMLOrder
};