import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (req, res) => {
    console.log("here", req);
    res.send("pong!");
});

app.listen(PORT, () => {
    console.log("Listening port: ", PORT);
});
