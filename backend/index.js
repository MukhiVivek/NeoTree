const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server is running on port 4000' });
});

app.get('/positions', (req, res) => {
    // Dummy data for open positions
});

app.post("/createPosition", (req, res) => {
    const positions = req.body.positions;
    console.log("Creating position with data: ", positions);
    res.json({ message: 'Position created', data: positions });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

