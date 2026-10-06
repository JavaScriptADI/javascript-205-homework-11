> 🇬🇧 [English version](./README.md)

# საშინაო დავალება 11 — `async` / `await` და შეცდომები

მოგესალმებით მეთერთმეტე საშინაო დავალებაზე! 🎉

საშინაო დავალება 10-ში ინტერნეტიდან მონაცემები ჩატვირთეთ და გვერდზე გამოსახეთ. ეს მუშაობდა — სანამ ინტერნეტი მუშაობდა. ეს დავალება ორ რამეს ეხება, რაც რეალურმა პროგრამამ სწორად უნდა გააკეთოს:

* **სწორად ლოდინი** — `async` / `await` და რამდენიმე მოთხოვნის **ერთდროულად** გაშვება `Promise.all`-ით
* **სწორად წარუმატებლობა** — `response.ok`, `throw`, `try` / `catch` / `finally`, რომ ერთმა ცუდმა პასუხმა ყველაფერი არ ჩააგდოს

**ხუთი სავარჯიშოა.** ისინი **Node.js**-ში სრულდება (ბრაუზერისა და HTML-ის გარეშე) და იმავე საიტს ესაუბრება, რასაც აქამდე — https://dummyjson.com. ბოლო სავარჯიშო გაფუჭებული პროგრამაა, რომელიც ბაგ-ბაგ უნდა გაასწოროთ, როგორც მე-10 workshop-ის ბაგების ძებნაში.

**ბოლო ვადა:** მე-13 workshop-მდე.

> **გჭირდებათ Node.js 22 ან უფრო ახალი.** შეამოწმეთ `node -v`-ით. ძველ ვერსიებს `fetch` ჩაშენებული არ აქვს. თუ თქვენი ძველია, დააინსტალირეთ LTS ვერსია https://nodejs.org-დან. მუშაობისას ინტერნეტთან კავშირიც გჭირდებათ.

---

## 📄 ამ დავალების ორი გვერდი

| | |
|---|---|
| **[📚 სავარჯიშოები](./EXERCISES_ka.md)** | ხუთი სავარჯიშო, მათი მოსალოდნელი შედეგი და წესები |
| **[📤 როგორ ჩავაბაროთ](./SUBMITTING_ka.md)** | Fork, ბრენჩი, Pull Request — ნაბიჯ-ნაბიჯ, ჩეკლისტიანად |

ჯერ წაიკითხეთ ქვემოთ მოცემული მოკლე ნაწილი, შემდეგ გადადით სავარჯიშოებზე.

---

## დაწყებამდე — რა ნახეთ მე-12 workshop-ზე

### `await` ელოდება promise-ს

`fetch` პასუხს არ გაძლევთ. ის გაძლევთ **promise**-ს — ქვითარს იმ პასუხზე, რომელიც ჯერ არ მოსულა. `await` ელოდება მას და გადმოგცემთ რეალურ შედეგს. ის მხოლოდ `async`-ით მონიშნული ფუნქციის შიგნით მუშაობს:

```javascript
async function getProduct(id) {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const product = await response.json();   // ტანის წაკითხვაც promise-ია
    return product;
}
```

> **`await` დაგავიწყდათ?** მაშინ ცვლადში თავად promise ზის. კონსოლში დაინახავთ `Promise { <pending> }`-ს ან `response.json is not a function`-ს. ყოველ ჯერზე ეძებეთ გამოტოვებული `await`.

`async` ფუნქცია ყოველთვის promise-ს აბრუნებს, ამიტომ ვინც მას იძახებს, იმანაც `await` უნდა გამოიყენოს:

```javascript
const product = await getProduct(1);
```

### 404 შეცდომა არაა — `fetch`-ისთვის

`fetch` **უარყოფილია** (rejected) მხოლოდ მაშინ, როცა თავად მოთხოვნა ჩავარდა: ინტერნეტი არ არის ან მისამართი არ არსებობს. როცა სერვერი პასუხობს `404`-ით ან `500`-ით, `fetch` სრულიად კმაყოფილია — სერვერმა ხომ უპასუხა. არაფერი გადაიგდება და მის გარშემო `try` / `catch` არასოდეს ამოქმედდება.

ამიტომ ვამოწმებთ `response.ok`-ს (true არის 200-დან 299-მდე სტატუსზე) და შეცდომას **თავად ვაგდებთ**:

```javascript
const response = await fetch(url);
if (!response.ok) {
    throw Error(`The server answered ${response.status}`);
}
```

### `try` / `catch` / `finally`

```javascript
try {
    const product = await getProduct(9999);   // აგდებს შეცდომას
    console.log(product.title);               // გამოტოვებულია
} catch (error) {
    console.log("Could not load:", error.message);   // სრულდება, თქვენ გადაგდებული შეტყობინებით
} finally {
    console.log("done");                      // სრულდება ᲧᲕᲔᲚᲐ შემთხვევაში
}
```

### სათითაოდ თუ ყველა ერთად

```javascript
// სათითაოდ: ყოველი await წინას ელოდება
for (const id of ids) {
    products.push(await getProduct(id));
}

// ყველა ერთად: map ყველა მოთხოვნას იწყებს, Promise.all კი ყველას ელოდება
const products = await Promise.all(ids.map(id => getProduct(id)));
```

`Promise.all` გამოიყენეთ, როცა მოთხოვნებს ერთმანეთი არ სჭირდებათ. თუ ერთი მათგანი ჩავარდა, `Promise.all`-იც ვარდება.

> **გაუფრთხილდით `forEach`-ს.** `ids.forEach(async id => { … })` callback-ებს იწყებს, მაგრამ მათ **არ ელოდება**, ამიტომ მის შემდეგ კოდი ძალიან ადრე სრულდება. გამოიყენეთ `for...of` და `await`, ან `Promise.all` და `map`.

ახლა გახსენით **[სავარჯიშოები](./EXERCISES_ka.md)**.

---

## სასარგებლო ბმულები

* `fetch`-ის გამოყენება: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
* `async function`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
* `await`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
* `try...catch`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
* `Promise.all()`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
* `Response.ok`: https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
* DummyJSON products: https://dummyjson.com/docs/products
