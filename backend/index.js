"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const test_1 = require("./routes/test");
const ws_1 = require("./socket/ws");
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
exports.server = http_1.default.createServer(app);
exports.server.listen(PORT, () => {
    console.log("Listening to port:", PORT);
});
app.use('/auth', authRoutes_1.default);
app.get('/test', test_1.testConnection);
(0, ws_1.socketConnection)(exports.server);
