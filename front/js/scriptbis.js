let totalQty = 0;

for (let item in cart) {
    let newtotalQty = item.qtyProduit + newtotalQty;
    totalQty = newtotalQty;
}