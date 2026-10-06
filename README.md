> 🇬🇪 [ქართული ვერსია](./README_ka.md)

# Homework 11 — `async` / `await` and errors

Welcome to your eleventh homework! 🎉

In Homework 10 you loaded data from the internet and put it on a page. It worked — as long as the internet did. This homework is about the two things a real program has to get right:

* **waiting properly** — `async` / `await`, and running several requests **at once** with `Promise.all`
* **failing properly** — `response.ok`, `throw`, `try` / `catch` / `finally`, so that one bad answer doesn't crash everything

There are **five exercises**. They run in **Node.js** (no browser, no HTML) and talk to the same site as before, https://dummyjson.com. The last one is a broken program that you have to fix, bug by bug, like the bug hunt in Workshop 10.

**Deadline:** before Workshop 13.

> **You need Node.js 22 or newer.** Check with `node -v`. Older versions do not have `fetch` built in. If yours is older, install the LTS version from https://nodejs.org. You also need an internet connection while you work.

---

## 📄 The two pages of this homework

| | |
|---|---|
| **[📚 Exercises](./EXERCISES.md)** | The five exercises, their expected output, and the rules |
| **[📤 How to submit](./SUBMITTING.md)** | Fork, branch, Pull Request — step by step, plus the checklist |

Read the short section below first, then go to the exercises.

---

## Before you start — what you saw in Workshop 12

### `await` waits for a promise

`fetch` does not give you the answer. It gives you a **promise** — a receipt for an answer that has not arrived yet. `await` waits for it and hands you the real thing. It only works inside a function marked `async`:

```javascript
async function getProduct(id) {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const product = await response.json();   // reading the body is a promise too
    return product;
}
```

> **Forgot an `await`?** Then the variable holds the promise itself. You will see `Promise { <pending> }` in the console, or `response.json is not a function`. Every time, look for the missing `await`.

An `async` function always gives back a promise, so whoever calls it has to `await` it as well:

```javascript
const product = await getProduct(1);
```

### A 404 is not an error — to `fetch`

`fetch` **rejects** only when the request itself fails: no internet, or an address that does not exist. When the server answers `404` or `500`, `fetch` is perfectly happy — the server did answer. Nothing is thrown, and a `try` / `catch` around it would never fire.

That is why we check `response.ok` (true for status 200 to 299) and **throw the error ourselves**:

```javascript
const response = await fetch(url);
if (!response.ok) {
    throw Error(`The server answered ${response.status}`);
}
```

### `try` / `catch` / `finally`

```javascript
try {
    const product = await getProduct(9999);   // throws
    console.log(product.title);               // skipped
} catch (error) {
    console.log("Could not load:", error.message);   // runs, with the message you threw
} finally {
    console.log("done");                      // runs in EVERY case
}
```

### One at a time, or all at once

```javascript
// one at a time: each await waits for the one before it
for (const id of ids) {
    products.push(await getProduct(id));
}

// all at once: map starts every request, Promise.all waits for all of them
const products = await Promise.all(ids.map(id => getProduct(id)));
```

Use `Promise.all` when the requests don't need each other. If one of them fails, `Promise.all` fails as well.

> **Careful with `forEach`.** `ids.forEach(async id => { … })` starts the callbacks but does **not wait** for them, so the code after it runs too early. Use `for...of` with `await`, or `Promise.all` with `map`.

Now open the **[exercises](./EXERCISES.md)**.

---

## Helpful links

* Using `fetch`: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
* `async function`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
* `await`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
* `try...catch`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
* `Promise.all()`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
* `Response.ok`: https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
* DummyJSON products: https://dummyjson.com/docs/products
