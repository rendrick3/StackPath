"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_js_1 = require("./app.js");
const app = (0, app_js_1.createApp)();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`[StackPath Academy API] Server listening on http://localhost:${PORT}`);
    console.log(`[StackPath Academy API] Ready for learning.`);
});
