"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const app_1 = require("./app");
const portString = process.env.PORT;
if (!portString) {
    throw new Error('PORT environment variable is not defined');
}
const port = parseInt(portString);
if (isNaN(port)) {
    throw new Error('PORT must be a valid number');
}
const server = app_1.app.listen(port, () => {
    console.log(`CORS-enabled. Listening on port ${port}`);
});
exports.server = server;
