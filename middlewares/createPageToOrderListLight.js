
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
        tableItems += `
        <div class="policy" style = " border-radius: 2em; background-color: white; margin-bottom: 20px; -moz-box-shadow: 0 0 3px grey; -webkit-box-shadow: 0 0 3px grey; box-shadow: 0 0 5px grey; display:flex; justify-content: center; align-items: center;">
            <span style="flex-basis: 20%">
                <a href="/product/${itemToOrder._id}">
                    <img class="img-fluid" src="https://stk-progress.ru/img/gallery/14.jpg" alt="" style="width: 90px; height: auto;border-radius: 25px; border: 2px solid #ea6153; box-shadow: 0 0 7px #666; padding: 8px">
                </a>
            </span>
            <span style="flex-basis: 20%" style="font-size: 30px"><a href="/product/${itemToOrder._id}">${itemToOrder.name}</a></span>
            <span style="flex-basis: 20%" style="font-size: 30px">
                ${itemToOrder.discount !== 0 ? `<p style="text-decoration: line-through;">${dataOrder.currency_name} ${itemToOrder.price} </p>` : ``}
                <p>${dataOrder.currency_name} ${(itemToOrder.price - itemToOrder.price * (itemToOrder.discount/100)).toFixed(2)}</p>
            </span>
            <span style="flex-basis: 20%" style="font-size: 30px">${quantityItem.quantity}</span>
            <span style="flex-basis: 20%" style="font-size: 30px">
                ${dataOrder.currency_name} ${((itemToOrder.price - itemToOrder.price * (itemToOrder.discount/100)) * quantityItem.quantity).toFixed(2)}
            </span>
        </div>`
    })
    
    var body = `
    <div>
        <img src="https://149.154.66.75/assets/img/logo/logo-4.png" alt="" style="height:auto; width:300px" />
        <h3>Hello ${dataOrder.name}!</h3>
        <a href="https://149.154.66.75/status-order/${dataOrder.order}" style="text-decoration: underline overline;"> Your Order: <span style="font-style: italic;">${dataOrder.order}</span></a>
        <div class="policy-container" style="width: 700px; padding-left: 50px; background-color: #eefbfb;font-family: sans-serif;font-size: 16px;">
            <div class="policy-table" style="color: grey;text-align: center;">
                <div class="headings" style="display: -webkit-box; display: -ms-flexbox;display: flex;-webkit-box-pack: justify;-ms-flex-pack: justify; justify-content: space-between; margin-bottom: 1em; padding: 1em;">
                    <span class="heading" style="flex-basis: 20%;font-weight: bold;">Image</span>
                    <span class="heading" style="flex-basis: 20%;font-weight: bold;">Product Name</span>
                    <span class="heading" style="flex-basis: 20%;font-weight: bold;">Unit Price</span>
                    <span class="heading" style="flex-basis: 20%;font-weight: bold;">Qty</span>
                    <span class="heading" style="flex-basis: 20%;font-weight: bold;">Subtotal</span>
                </div>
                ${tableItems}
                <div class="title-wrap" style="font-size: 30px">
                    <h4 class="cart-bottom-title section-bg-gary-cart">Cart Total</h4>
                </div>
                <h4>Total products <span> ${totalProductInOrder}</span></h4>
                <h3 class="grand-totall-title">Grand Total <span>${dataOrder.currency_name} ${dataOrder.price}</span></h3>
            </div>
        </div>
    </div>`;
    return  body;
};

module.exports = {
    CreateHTMLOrderlight
};