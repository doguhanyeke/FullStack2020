"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
const PORT = 3000;
app.get('/api/ping', (req, res) => {
    console.log("here", req);
    res.send("pong!");
});
app.listen(PORT, () => {
    console.log("Listening port: ", PORT);
});
