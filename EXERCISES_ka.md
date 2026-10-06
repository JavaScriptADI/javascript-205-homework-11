> 🇬🇧 [English version](./EXERCISES.md) · [← მიმოხილვაზე დაბრუნება](./README_ka.md) · [📤 როგორ ჩავაბაროთ](./SUBMITTING_ka.md)

# საშინაო დავალება 11 — სავარჯიშოები

შექმენით ქვემოთ მოცემული ფაილები `submissions/<your-username>/`-ის შიგნით და დაწერეთ JavaScript კოდი თითოეული ამოცანის გადასაჭრელად.

გამოიყენეთ მხოლოდ ის, რასაც ქვემოთ მოცემული [წესები](#წესები) გაძლევთ. ყოველი ფაილის გაშვება შეგიძლიათ ასე:

```bash
node exercise_1.js
```

ყოველ სავარჯიშოს აქვს **მოსალოდნელი შედეგი**. თქვენმა პროგრამამ ზუსტად ის უნდა დაბეჭდოს. მონაცემები პირდაპირ https://dummyjson.com-იდან მოდის, ამიტომ ინტერნეტი გჭირდებათ.

როცა მნიშვნელობას წარწერით ბეჭდავთ, გადაეცით წარწერაც და მნიშვნელობაც **ორი არგუმენტის სახით**: `console.log("title:", product.title);` გამოიყენეთ ყოველ მოსალოდნელ შედეგში ნაჩვენები წარწერები.

---

## `exercise_1.js` — `getProduct` და 404

დაწერეთ `async` ფუნქცია `getProduct(id)`, რომელიც:

1. ჩატვირთავს `https://dummyjson.com/products/${id}`-ს
2. შეამოწმებს `response.ok`-ს. თუ ის `false`-ია, **გადააგდებს** შეცდომას შეტყობინებით `Product ${id} not found (status ${response.status})`
3. სხვა შემთხვევაში დააბრუნებს პროდუქტს (დაპარსულ JSON-ს)

შემდეგ დაწერეთ `async` ფუნქცია `main()` და გამოიძახეთ. `main`-ის შიგნით:

1. აიღეთ მე-`6` პროდუქტი და დაბეჭდეთ მისი `title`, `price` და `category`
2. სცადეთ მე-`9999` პროდუქტის აღება `try` / `catch`-ის შიგნით. თუ ჩავარდა, დაბეჭდეთ `error:` და შეცდომის შეტყობინება

მოსალოდნელი შედეგი:

```text
title: Calvin Klein CK One
price: 49.99
category: fragrances
error: Product 9999 not found (status 404)
```

შემდეგ უპასუხეთ ამ კითხვას კომენტარში, ფაილის ბოლოში:

**სერვერი 9999 პროდუქტზე 404-ით პასუხობს, მაგრამ `fetch` არაფერს აგდებს. რატომ გვჭირდება `response.ok`?**

> მინიშნება: `await response.json()` გაძლევთ პროდუქტს. 9999 პროდუქტი არ არსებობს, ამიტომ `throw` უნდა მოხდეს **მანამ**, სანამ პასუხიდან რამეს წაიკითხავთ.

---

## `exercise_2.js` — `safeGetProduct`

დააკოპირეთ თქვენი `getProduct` სავარჯიშო 1-დან და მიეცით არასავალდებულო მეორე პარამეტრი, რომ სხვა საიტზე მიუთითოთ:

```javascript
async function getProduct(id, baseUrl = "https://dummyjson.com") {
    const response = await fetch(`${baseUrl}/products/${id}`);
    // ... დანარჩენი იგივეა, რაც ადრე
}
```

ახლა დაწერეთ `safeGetProduct(id, baseUrl)`. ის **არასოდეს აგდებს შეცდომას**. ის `getProduct`-ს იყენებს `try` / `catch` / `finally`-ს შიგნით:

* ჯერ ბეჭდავს `loading <id>...`
* თუ გამოვიდა, აბრუნებს პროდუქტს
* თუ რამე ჩაფუშა, ბეჭდავს `failed:` და შეცდომის შეტყობინებას და აბრუნებს `null`-ს
* **ყველა** შემთხვევაში, სულ ბოლოს, ბეჭდავს `finished <id>`

შემდეგ `async` `main()`-ში გამოიძახეთ სამჯერ და დაბეჭდეთ შედეგები:

```javascript
const good = await safeGetProduct(2);
console.log("good:", good.title);

const missing = await safeGetProduct(9999);
console.log("missing:", missing);

const offline = await safeGetProduct(2, "https://dummyjson.invalid");   // საიტი, რომელიც არ არსებობს
console.log("offline:", offline);
```

მოსალოდნელი შედეგი:

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

შემდეგ უპასუხეთ ამ კითხვას კომენტარში, ფაილის ბოლოში:

**"finished" სამივე შემთხვევაში დაიბეჭდა, იმ ორშიც კი, რომლებიც ჩავარდა. რატომ? როგორი კოდი უნდა ეწეროს `finally`-ში?**

> მინიშნება: `return` `try`-ის შიგნით `finally`-ს არ გამოტოვებს — `finally` მაინც სრულდება, სანამ ფუნქცია რეალურად დაბრუნდება.
>
> შეტყობინება `fetch failed` არის ის, რასაც **Node.js** ამბობს, როცა მისამართი არ არსებობს. ბრაუზერში იგივე შეცდომა `Failed to fetch`-ს ამბობს.

---

## `exercise_3.js` — ყველა ერთად

დააკოპირეთ თქვენი `getProduct` სავარჯიშო 1-დან. შემდეგ დააკოპირეთ ეს ხაზი:

```javascript
const ids = [11, 12, 13, 14, 15];
```

დაწერეთ ორი `async` ფუნქცია:

1. `getOneByOne(ids)` — `for...of` ციკლი `await`-ით შიგნით. აბრუნებს პროდუქტების **მასივს**.
2. `getAllAtOnce(ids)` — **ყველა** მოთხოვნას ჯერ იწყებს და ყველას ერთად ელოდება `Promise.all`-ითა და `map`-ით. ისიც პროდუქტების მასივს აბრუნებს.

`main()`-ში `Date.now()`-ით გაზომეთ, რამდენ ხანს გრძელდება თითოეული:

```javascript
let start = Date.now();
const slow = await getOneByOne(ids);
const slowMs = Date.now() - start;
```

(იგივე გააკეთეთ `getAllAtOnce`-ისთვის) და დაბეჭდეთ:

1. `titles` — `getAllAtOnce`-დან მიღებული პროდუქტების სათაურები
2. `same result` — ორივე მასივი ერთსა და იმავე პროდუქტებს შეიცავს თუ არა, ერთი და იმავე რიგით. შეადარეთ მათი `id`-ები, სტრიქონად გაერთიანებული: `slow.map(p => p.id).join() === fast.map(p => p.id).join()`
3. `total` — ხუთივე ფასის ჯამი **ორი ათწილადით** (გამოიყენეთ `.toFixed(2)`)
4. `all at once is faster` — `true` ან `false`

მოსალოდნელი შედეგი:

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

შემდეგ უპასუხეთ ამ კითხვას კომენტარში, ფაილის ბოლოში:

**რატომ არის `Promise.all` აქ უფრო სწრაფი? აღწერეთ სიტუაცია, როცა მას ვერ გამოიყენებდით.**

> მინიშნება: `Promise.all` promise-ების მასივს ითხოვს. `ids.map(id => getProduct(id))` სწორედ ამას გაძლევთ, რადგან `async` ფუნქციის `await`-ის გარეშე გამოძახება მის promise-ს გაძლევთ.

---

## `exercise_4.js` — ძებნა

საიტს აქვს ძებნა: `https://dummyjson.com/products/search?q=phone&limit=5` აბრუნებს ობიექტს, პროდუქტები კი მის `products` თვისებაშია.

დაწერეთ `async` ფუნქცია `searchProducts(word)`, რომელიც `word`-ის ძებნის შედეგებს ჩატვირთავს, ბოლოში `&limit=5`-ით. ის ამოწმებს `response.ok`-ს (თუ `false`-ია, აგდებს `Search failed (status <status>)`-ს) და აბრუნებს **მასივს** `data.products`.

`main()`-ში, `try` / `catch`-ის შიგნით (`catch`-ში დაბეჭდეთ `error:` და შეტყობინება):

1. მოძებნეთ `"phone"` და დაბეჭდეთ `found` (რამდენია) და `titles` (სათაურების მასივი)
2. დაბეჭდეთ `cheapest`: ყველაზე იაფის სათაური და ფასი, ასე: `Some Title · $9.99`. გამოიყენეთ `reduce`, როგორც საშინაო დავალება 8-ში.
3. მოძებნეთ `"qwertyuiop"` — სიტყვა, რომელსაც არაფერი ემთხვევა. დაბეჭდეთ `nothing:` და ტექსტი `no results`, როცა მასივი ცარიელია.

მოსალოდნელი შედეგი:

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

> მინიშნება: ძებნა, რომელიც არაფერს პოულობს, **არ არის** შეცდომა. სერვერი პასუხობს `200`-ით და ცარიელი `products` მასივით, ამიტომ `response.ok` `true`-ა და უბრალოდ `[]` მოგდით.
>
> სიმბოლო `·` შუა წერტილია. დააკოპირეთ ეს გვერდიდან თქვენს template literal-ში.

---

## `exercise_5.js` — გაასწორეთ გაფუჭებული ჩამტვირთავი

ჩამოტვირთეთ **[`starter/buggy.js`](./starter/buggy.js)** და დააკოპირეთ `submissions/<your-username>/exercise_5.js`-ში. ეს პატარა ფასების ჩამტვირთავია **ოთხი ბაგით**, და ოთხივე ის რამეა, რაც მე-12 workshop-ზე ნახეთ.

გაასწორეთ ისინი **სათითაოდ** და ყოველი შესწორების შემდეგ გაუშვით ფაილი. პირველი შეცდომა, რომელსაც ხედავთ, აუცილებლად ერთადერთი არ არის: როცა ერთ ბაგს გაასწორებთ, შემდეგი ჩნდება.

ყოველი შესწორების ზემოთ დატოვეთ კომენტარი, რომელიც ამბობს, რა იყო არასწორი:

```javascript
// FIX 1: fetch returns a promise, so it needs await
```

დანომრეთ ისინი `FIX 1` … `FIX 4`, იმ რიგით, როგორც გაასწორეთ.

როცა ოთხივე გასწორებულია, შედეგი ასეთია:

```text
total: 44.97
error: Product 9999 not found (status 404)
```

> მინიშნება: შეგიძლიათ ხაზები **დაამატოთ** და არასწორები შეცვალოთ, მაგრამ პროგრამამ იგივე ფუნქციები უნდა შეინარჩუნოს: `getPrice`, `getTotal` და `main`. `main`-ში შედეგის ბოლო ხაზი თქვენი `catch`-იდან უნდა მოდიოდეს.
>
> მინიშნება მესამე ბაგისთვის: `total` იბეჭდება როგორც `0.00`. ფუნქცია მანამ დაბრუნდა, სანამ ფასები მოვიდოდა. მასივის რომელი მეთოდი იწყებს callback-ებს, მაგრამ მათ არ ელოდება?

---

## წესები

შეგიძლიათ გამოიყენოთ:

* ყველაფერი წინა საშინაო დავალებებიდან: ცვლადები, მასივები, ობიექტები, template literal-ები, ისრიანი ფუნქციები, `map`, `filter`, `reduce` და ა.შ.
* **`async` / `await`**, `fetch`, `response.ok`, `response.json()`, `response.status`
* **`try` / `catch` / `finally`** და `throw Error(...)`
* **`Promise.all`**
* `Date.now()` და `.toFixed()`

**ამ დავალებაში** არ შეიძლება:

* `.then()` და `.catch()` — ყველაფერი დაწერეთ `await`-ითა და `try` / `catch`-ით. ეს არის ამ დავალების მიზანი
* `var` — გამოიყენეთ `const` ან `let`
* `prompt()` — ის Node.js-ში არ არსებობს, ამიტომ ფაილი ჩავარდებოდა
* რაიმე პაკეტის დაინსტალირება (`npm install`). Node.js-ს `fetch` უკვე აქვს

ყოველი ფუნქცია, რომელიც `await`-ს იყენებს, დაწერეთ როგორც `async` ფუნქცია და ყოველ ფუნქციას მიეცით გასაგები სახელი.

> სასარგებლო ჩვევა: გაუშვით თქვენი ფაილი, შემდეგ განზრახ გააფუჭეთ რამე (გამორთეთ wifi ან შეცვალეთ მისამართი `…/producs`-ზე) და უყურეთ, რას აკეთებს თქვენი პროგრამა. პროგრამა, რომელიც ამბობს "Could not load: …", სჯობს პროგრამას, რომელიც წითელი ტექსტის კედლით ვარდება.

---

როცა თქვენი ხუთი ფაილი მზადაა, გადადით **[როგორ ჩავაბაროთ](./SUBMITTING_ka.md)**-ზე.
