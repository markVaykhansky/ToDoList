const fs = require("fs");
const os = require('os');
const express = require('express')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000

const authMiddleware = (req, res, next) => {
    console.log("Hello from auth middleware ")
    next();
}

app.use(authMiddleware);


app.get('/get', async (req, res) => {
    const data = await fs.promises.readFile('tasks.csv', { encoding: 'UTF8' });
    res.send(data.split(os.EOL));
});

app.post('/post', async (req, res) => {
    try {
        console.log("hello");
        const { userName, task } = req.body;
        console.log("Hello from post2");

        const newTaskString = `${userName},${task}${os.EOL}`;
        console.log("Writting " + newTaskString + " to DB");

        await fs.promises.appendFile('tasks.csv', newTaskString)
        res.json(4);
    } catch(err) {
        console.error("Error during POST", err);
    }
})

// app.post('/post', async (req, res) => {
//     try {
//         console.log("Hello from post");

//         const { userName, task } = req.body;
//         console.log("Hello from post2");
    
//         const newTaskString = `${userName},${task}`;
//         console.log("Writting " + newTaskString + " to DB");
//         await fs.appendFile('tasks.csv', newTaskString)
//         res.json(req.body);
//     } catch(err) {
//         console.error("Error during POST");
//     }
// })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});