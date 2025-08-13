"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('mongodb', () => {
    const { MONGO_URI } = process.env;
    return { uri: MONGO_URI };
});
//# sourceMappingURL=index.js.map