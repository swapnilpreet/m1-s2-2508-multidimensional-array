
function cart() {
    let cart = [];

    cart.push("Apples", "Bananas", "Bread", "Milk");
    let removeElement=cart.pop();

    return {
        totalItems: cart.length,
        items: cart,
        removedItem: removeElement
    }
}

console.log("Cart", cart())