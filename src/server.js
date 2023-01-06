const express = require('express')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000

app.get('/get', (req, res) => {
  res.send('get route');
});

const authMiddleware = (req, res, next) => {
    console.log("Hello from auth middleware ")
    console.log(req.body);
    // ToDo: Write auth middleware
    return;
}

app.use(authMiddleware);

app.post('/post', (req, res) => {
    console.log("Hello from POST");
    res.json(req.body);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});