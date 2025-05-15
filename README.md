# 🧮 Calcudle

**Calcudle** is a math-based puzzle game inspired by Wordle — but instead of guessing words, you're solving mathematical expressions. Each puzzle hides a valid math expression, and your goal is to uncover it through logic and deduction.

---

## 🎯 Objective

You must guess the digits that complete a hidden expression. Each attempt receives feedback on a tile-by-tile basis:

- 🟩 Green: Correct digit/operator in the correct place
- 🟨 Yellow: Digit/operator exists in the solution but is in the wrong place
- ⬜ Gray: Digit/operator is not in the solution at all

---

## 🧠 Gameplay Rules

- Operators (`+`, `-`, `*`, `/`, `=`, `^`, `!`, `<`, `>`) are fixed and visible.
- You only need to input the missing **digits**.
- You get limited attempts — equal to the length of the solution **plus 3**.
- After each guess, feedback helps guide your next attempt.
- A puzzle is solved when your input produces the correct expression.

---

## ✨ Features

- Dynamic puzzles from `puzzles.json`
- Expression feedback with color-coded tiles
- Digit-only input — operators are pre-filled
- New game resets with a fresh random puzzle
- Keyboard feedback to guide digit selection

---

## 🛠️ Tech Stack

- **React** (functional components + hooks)
- **Tailwind CSS** for layout and styling
- **JSON-based puzzles**
- No external backend — works entirely client-side

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/calcudle.git
cd calcudle
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Game Locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Puzzle Format (`puzzles.json`)

Each puzzle includes an `expression` with placeholders (`?`) and a full `solution`:

```json
{
  "expression": ["?", "?", "*", "?", "?", "=", "?", "?", "?"],
  "solution": ["2", "0", "*", "1", "4", "=", "2", "8", "0"]
}
```

✅ Supported operators: `+`, `-`, `*`, `/`, `=`, `^`, `!`, `<`, `>`

---

## 🔣 Expression Types

You can define puzzles using:

| Type           | Example        |
|----------------|----------------|
| Multiplication | `12 * 21 = 252` |
| Factorials     | `5! = 120`     |
| Comparisons    | `45 > 12`      |
| Custom combos  | `3 + 4 = 7`    |

Expressions must evaluate correctly and match the given format.

---

## ➕ Adding New Puzzles

Add to `src/data/puzzles.json` using this structure:

```json
{
  "expression": ["?", "!", "=", "1", "2", "0"],
  "solution": ["5", "!", "=", "1", "2", "0"]
}
```

Use any mix of digits and the allowed operators.

---

## 🔧 Customization Ideas

- Add sound effects or animations
- Add a streak or score system
- Add hints (e.g., reveal one digit)
- Support multi-character operators (like `<=`, `==`)
- Support player-submitted puzzles

---

## 📝 License

This project is open source under the [MIT License](LICENSE).

---

## 🙋 FAQ

**Q: Can I evaluate expressions dynamically?**  
A: Not yet — the game compares against predefined solutions. But safe evaluation could be added with caution.

**Q: Why is `!`, `<`, `>` supported but not `==` or `<=`?**  
A: The current version uses single-character operators only. Multi-character operators would need parsing updates.

---

## 💡 Author

Created by [James Wolfe](https://github.com/jamesdwolfe)