> 🇬🇪 [ქართული ვერსია](./EXERCISES_ka.md) · [← Back to the overview](./README.md) · [📤 How to submit](./SUBMITTING.md)

# Homework 11 — Exercises

Create the files below inside `submissions/<your-username>/` and write JavaScript code to solve each task.

Use only what the [Rules](#rules) at the bottom allow. You can run each file with:

```bash
node exercise_1.js
```

Every exercise shows its **expected output**. Your program should print exactly that. The data comes live from https://dummyjson.com, so you need an internet connection.

When you print a value with a label, pass the label and the value as **two arguments**: `console.log("title:", product.title);` Use the labels shown in each expected output.

---

## `exercise_1.js` — `getProduct` and the 404

Write an `async` function `getProduct(id)` that:

1. fetches `https://dummyjson.com/products/${id}`
2. checks `response.ok`. If it is `false`, it **throws** an error with the message `Product ${id} not found (status ${response.status})`
3. otherwise returns the product (the parsed JSON)

Then write an `async` function `main()` and call it. Inside `main`:

1. get product number `6` and print its `title`, `price` and `category`
2. try to get product number `9999` inside a `try` / `catch`. If it fails, print `error:` and the message of the error

Expected output:

```text
title: Calvin Klein CK One
price: 49.99
category: fragrances
error: Product 9999 not found (status 404)
```

Then answer this question in a comment at the bottom of the file:

**The server answers 404 for product 9999, but `fetch` doesn't throw anything. Why do we need `response.ok`?**

> Hint: `await response.json()` gives you the product. Product 9999 doesn't exist, so the `throw` must happen **before** you try to read anything from the answer.

---

## `exercise_2.js` — `safeGetProduct`

Copy your `getProduct` from exercise 1, and give it an optional second parameter, so you can point it at a different website:

```javascript
async function getProduct(id, baseUrl = "https://dummyjson.com") {
    const response = await fetch(`${baseUrl}/products/${id}`);
    // ... the same as before
}
```

Now write `safeGetProduct(id, baseUrl)`. It **never throws**. It uses `getProduct` inside `try` / `catch` / `finally`:

* first it prints `loading <id>...`
* if it works, it returns the product
* if anything goes wrong, it prints `failed:` and the error message, and returns `null`
* in **every** case, at the very end, it prints `finished <id>`

Then, in an `async` `main()`, call it three times and print the results:

```javascript
const good = await safeGetProduct(2);
console.log("good:", good.title);

const missing = await safeGetProduct(9999);
console.log("missing:", missing);

const offline = await safeGetProduct(2, "https://dummyjson.invalid");   // a website that does not exist
console.log("offline:", offline);
```

Expected output:

```text
loading 2...
finished 2
good: Eyeshadow Palette with Mirror
loading 9999...
failed: Product 9999 not found (status 404)
finished 9999
missing: null
loading 2...
failed: fetch failed
finished 2
offline: null
```

Then answer this question in a comment at the bottom of the file:

**"finished" was printed in all three cases, even in the two that failed. Why? What kind of code belongs in `finally`?**

> Hint: `return` inside `try` does not skip `finally` — `finally` still runs before the function really returns.
>
> The message `fetch failed` is what **Node.js** says when the address does not exist. In a browser the same failure says `Failed to fetch`.

---

## `exercise_3.js` — all at once

Copy your `getProduct` from exercise 1. Then copy this line:

```javascript
const ids = [11, 12, 13, 14, 15];
```

Write two `async` functions:

1. `getOneByOne(ids)` — a `for...of` loop with `await` inside. It returns an **array** of the products.
2. `getAllAtOnce(ids)` — starts **every** request first and waits for all of them together with `Promise.all` and `map`. It also returns an array of products.

In `main()`, measure how long each takes with `Date.now()`:

```javascript
let start = Date.now();
const slow = await getOneByOne(ids);
const slowMs = Date.now() - start;
```

(do the same for `getAllAtOnce`), and print:

1. `titles` — the titles of the products from `getAllAtOnce`
2. `same result` — whether both arrays contain the same products in the same order. Compare their `id`s joined into a string: `slow.map(p => p.id).join() === fast.map(p => p.id).join()`
3. `total` — the sum of all five prices, with **two decimals** (use `.toFixed(2)`)
4. `all at once is faster` — `true` or `false`

Expected output:

```text
titles: [
  'Annibale Colombo Bed',
  'Annibale Colombo Sofa',
  'Bedside Table African Cherry',
  'Knoll Saarinen Executive Conference Chair',
  'Wooden Bathroom Sink With Mirror'
]
same result: true
total: 5999.95
all at once is faster: true
```

Then answer this question in a comment at the bottom of the file:

**Why is `Promise.all` faster here? Describe a situation where you could NOT use it.**

> Hint: `Promise.all` wants an array of promises. `ids.map(id => getProduct(id))` gives you exactly that, because calling an `async` function without `await` gives you its promise.

---

## `exercise_4.js` — search

The site has a search: `https://dummyjson.com/products/search?q=phone&limit=5` gives back an object, and the products are in its `products` property.

Write an `async` function `searchProducts(word)` that fetches the search results for `word`, with `&limit=5` at the end. It checks `response.ok` (throws `Search failed (status <status>)` if it is `false`) and returns the **array** `data.products`.

In `main()`, inside a `try` / `catch` (print `error:` and the message in `catch`):

1. search for `"phone"`, and print `found` (how many) and `titles` (an array of the titles)
2. print `cheapest`: the title and price of the cheapest one, like `Some Title · $9.99`. Use `reduce`, as in Homework 8.
3. search for `"qwertyuiop"`, a word that matches nothing. Print `nothing:` and the text `no results` when the array is empty.

Expected output:

```text
found: 5
titles: [
  'Apple AirPods Max Silver',
  'Apple iPhone Charger',
  'Apple MagSafe Battery Pack',
  'Beats Flex Wireless Earphones',
  'iPhone 12 Silicone Case with MagSafe Plum'
]
cheapest: Apple iPhone Charger · $19.99
nothing: no results
```

> Hint: a search that finds nothing is **not** an error. The server answers `200` with an empty `products` array, so `response.ok` is `true` and you just get `[]`.
>
> The `·` character is a middle dot. Copy it from this page into your template literal.

---

## `exercise_5.js` — fix the broken loader

Download **[`starter/buggy.js`](./starter/buggy.js)** and copy it to `submissions/<your-username>/exercise_5.js`. It is a small price loader with **four bugs**, and all four are things you saw in Workshop 12.

Fix them **one at a time**, and run the file after every fix. The first error you see is not necessarily the only one: when you fix one bug, the next one appears.

Above every fix, leave a comment that says what was wrong:

```javascript
// FIX 1: fetch returns a promise, so it needs await
```

Number them `FIX 1` … `FIX 4`, in the order you fixed them.

When all four are fixed, the output is:

```text
total: 44.97
error: Product 9999 not found (status 404)
```

> Hint: you may **add** lines and change the ones that are wrong, but the program must keep the same functions: `getPrice`, `getTotal` and `main`. In `main`, the last line of the output must come from your `catch`.
>
> Hint for the third bug: `total` prints as `0.00`. The function returned before the prices arrived. Which array method starts the callbacks but does not wait for them?

---

## Rules

You may use:

* Everything from the earlier homeworks: variables, arrays, objects, template literals, arrow functions, `map`, `filter`, `reduce`, and so on
* **`async` / `await`**, `fetch`, `response.ok`, `response.json()`, `response.status`
* **`try` / `catch` / `finally`** and `throw Error(...)`
* **`Promise.all`**
* `Date.now()` and `.toFixed()`

Not allowed **in this homework**:

* `.then()` and `.catch()` — write everything with `await` and `try` / `catch`. That is the point of this homework
* `var` — use `const` or `let`
* `prompt()` — it does not exist in Node.js, so the file would crash
* Installing any package (`npm install`). Node.js already has `fetch`

Write every function that uses `await` as an `async` function, and give every function a clear name.

> A useful habit: run your file, then break something on purpose (turn off the wifi, or change the address to `…/producs`) and look at what your program does. A program that says "Could not load: …" beats a program that crashes with a wall of red text.

---

When your five files are ready, go to **[How to submit](./SUBMITTING.md)**.
