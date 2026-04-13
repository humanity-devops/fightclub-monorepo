const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

const rules = [
  { number: 1, rule: 'You do not talk about Fight Club.' },
  { number: 2, rule: 'You DO NOT talk about Fight Club.' },
  { number: 3, rule: 'If someone says "stop" or goes limp, taps out, the fight is over.' },
  { number: 4, rule: 'Only two guys to a fight.' },
  { number: 5, rule: 'One fight at a time.' },
  { number: 6, rule: 'No shirts, no shoes.' },
  { number: 7, rule: 'Fights will go on as long as they have to.' },
  { number: 8, rule: 'If this is your first night at Fight Club, you HAVE to fight.' },
];

app.get('/api/rules', (req, res) => {
  res.json({ rules });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
