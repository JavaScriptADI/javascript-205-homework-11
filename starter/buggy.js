// ===============================================
// Homework 11 — exercise 5 starter: the broken price loader
// It has FOUR bugs. Copy this file to submissions/<your-username>/exercise_5.js and fix them,
// one at a time. Run after every fix. Mark each fix with a comment: // FIX 1: ...
// ===============================================

async function getPrice(id) {
    const response = fetch(`https://dummyjson.com/products/${id}`);
    const product = await response.json();
    return product.price;
}

async function getTotal(ids) {
    let total = 0;
    ids.forEach(async (id) => {
        total += await getPrice(id);
    });
    return total;
}

async function main() {
    console.log("total:", (await getTotal([1, 2, 3])).toFixed(2));
    console.log("price 9999:", await getPrice(9999));
}

main();
