> 🇬🇪 [ქართული ვერსია](./SUBMITTING_ka.md) · [← Back to the overview](./README.md) · [📚 Exercises](./EXERCISES.md)

# How to submit — with a Pull Request

This is the same process as the last homework. A **fork** is your own copy of the repository, a **branch** is where your changes live, and a **Pull Request (PR)** asks to bring those changes into the original repository.

Follow the steps in order. If a command fails, read the error message carefully — it usually tells you what is wrong.

> Everywhere you see `<your-username>`, replace it with **your GitHub username** (without the angle brackets). For example, if your username is `nino-b`, your branch and your folder are both called `nino-b`.

---

## 1. Fork this repository

Open https://github.com/JavaScriptADI/javascript-205-homework-11 in your browser.

Click the **Fork** button in the top-right corner, keep the default settings and click **Create fork**.

GitHub creates your own copy of the repository at:

```text
https://github.com/<your-username>/javascript-205-homework-11
```

You can push to your fork. You cannot push to the original repository — that is exactly what the Pull Request is for.

## 2. Clone YOUR fork

On the page of **your fork**, click the green **Code** button, copy the URL and run:

```bash
git clone https://github.com/<your-username>/javascript-205-homework-11.git
cd javascript-205-homework-11
```

> Make sure the URL contains **your** username, not `JavaScriptADI`. If you cloned the original repository by accident, delete the folder and clone again from your fork.

## 3. Create a branch named after your GitHub username

```bash
git checkout -b <your-username>
```

You should see:

```text
Switched to a new branch '<your-username>'
```

You can check which branch you are on at any time with `git branch` — the current branch has a `*` in front of it.

## 4. Create your folder and your files

Inside the `submissions/` folder, create a folder named after your GitHub username and put your five exercise files inside it:

```bash
mkdir submissions/<your-username>
cd submissions/<your-username>
```

When you are done, your repository should look like this (with your own username instead of `<your-username>`):

```text
javascript-205-homework-11/
│
├── README.md
├── EXERCISES.md
├── SUBMITTING.md
├── starter/
│   └── buggy.js
└── submissions/
    ├── README.md
    └── <your-username>/
        ├── exercise_1.js
        ├── exercise_2.js
        ├── exercise_3.js
        ├── exercise_4.js
        └── exercise_5.js
```

Only your own folder changes. Do not edit `README.md`, `EXERCISES.md`, `SUBMITTING.md` or any other student's folder.

## 5. Run every file before committing

From inside your folder, run every file and compare what you see with the **expected output** in the [exercises](./EXERCISES.md):

```bash
node exercise_1.js
node exercise_2.js
# ...and so on, up to exercise_5.js
```

A file that stops with an error is not finished yet.

## 6. Commit and push your branch

Go back to the repository folder, then add, commit and push:

```bash
cd ../..
git add .
git commit -m "Add homework 11"
git push -u origin <your-username>
```

If you are not inside your folder any more, skip the `cd ../..` line — check with `pwd` that you are in `javascript-205-homework-11`.

You should see something like:

```text
[<your-username> 3f2a9c1] Add homework 11
 5 files changed, 110 insertions(+)
...
remote: Create a pull request for '<your-username>' on GitHub by visiting:
remote:      https://github.com/<your-username>/javascript-205-homework-11/pull/new/<your-username>
```

> The first push needs `-u origin <your-username>` because the branch does not exist on GitHub yet. Later pushes to the same branch only need `git push`.

## 7. Open the Pull Request

1. Open your fork on GitHub. A yellow banner says that `<your-username>` had recent pushes — click **Compare & pull request**. (If the banner is gone, click **Pull requests** → **New pull request** and pick your branch in the **compare** dropdown.)
2. Check the four dropdowns at the top of the page:
   * **base repository:** `JavaScriptADI/javascript-205-homework-11` and **base:** `main`
   * **head repository:** `<your-username>/javascript-205-homework-11` and **compare:** `<your-username>`
3. **Title:** "Homework 11 - Your Name" with your real name, for example "Homework 11 - Nino Beridze".
4. The description box already contains a template. Fill in your username and tick every box in the checklist that is true.
5. Click the green **Create pull request** button (not the *draft* option in its dropdown).

Your PR now appears on the page of the original repository, with the instructor listed under **Reviewers**.

## 8. Wait for the review — and fix things on the same branch

The instructor is added as a reviewer automatically and will leave comments on your code.

If something needs fixing, edit the files in your folder, then commit and push to the **same branch**:

```bash
git add .
git commit -m "Fix exercise 3"
git push
```

Your Pull Request updates itself — you do **not** need to open a new one. **Do not open a second PR.** When everything is fine, the instructor approves and merges your PR.

> **Good to know**
>
> * You cannot push to the **original** repository (`JavaScriptADI/javascript-205-homework-11`) and its `main` branch is protected. That is expected: your work always goes to your fork, on your branch, and reaches the original repository only through a Pull Request.
> * One folder per student. Do not touch other students' folders or the documentation files.
> * If you get stuck, take a screenshot of the error and bring it to the next workshop.

---

## Checklist before you submit

* [ ] `exercise_1.js` … `exercise_5.js` are inside `submissions/<your-username>/`
* [ ] Every file runs with `node` without errors and prints the expected output
* [ ] I used **no** `.then()` or `.catch()` — only `await` and `try` / `catch`
* [ ] Exercise 1 checks `response.ok` and throws an error for a 404
* [ ] Exercise 2 never throws, and `finished` prints in every case
* [ ] Exercise 3 uses `Promise.all`, and exercise 5 has the comments `FIX 1` … `FIX 4`
* [ ] My answers are in comments: exercises 1, 2 and 3
* [ ] No files outside your own folder were changed
* [ ] Your branch is named after your GitHub username
* [ ] The Pull Request is open with the title "Homework 11 - Your Name"
* [ ] The checklist in the Pull Request description is filled in

Good luck! 🚀

---

## Helpful links

* GitHub Docs — Fork a repository: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo
* GitHub Docs — Creating a pull request from a fork: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork
