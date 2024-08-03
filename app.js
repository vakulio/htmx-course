import express from 'express';
import { randomUUID } from 'crypto';

const courseGoals = [];

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Learn HTMX</title>
      <link rel="stylesheet" href="/main.css" />
      <script src="/htmx.js" defer></script>
    </head>
    <body>
      <main>
        <h1>Manage your course goals</h1>
        <section>
          <form id="goal-form" 
          hx-post="/goal" 
          hx-target="#goals"
          hx-swap="beforeend"
          >
            <div>
              <label htmlFor="goal">Goal</label>
              <input type="text" id="goal" name="goal" />
            </div>
            <button type="submit">Add goal</button>
          </form>
        </section>
        <section>
          <ul id="goals" hx-swap="outerHTML">
          ${courseGoals.map(
            (goal) => `
            <li id="goal-${goal.id}">
              <span>${goal.text}</span>
              <button 
                hx-delete="/goal/${goal.id}" 
                hx-target="#goal-${goal.id}"
              >Remove</button>
            </li>
          `
          ).join('')}
          </ul>
        </section>
      </main>
    </body>
  </html>
  `);
});

app.post('/goal', (req, res) => {
  const goalText = req.body.goal;
  const goal = { text: goalText, id: randomUUID() };
  courseGoals.push(goal);
  res.send(`<li id="goal-${goal.id}">
              <span>${goal.text}</span>
              <button 
                hx-delete="/goal/${goal.id}" 
                hx-target="#goal-${goal.id}"
              >Remove</button>
            </li>`);
});

app.delete('/goal/:id', (req, res) => {
  const id = req.params.id;
  const deleted = courseGoals.findIndex((goal) => goal.id === id);
  courseGoals.splice(deleted, 1);
  res.send();
})

app.listen(3000);
