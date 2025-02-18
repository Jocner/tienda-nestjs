"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const dotenv = require("dotenv");
const path_1 = require("path");
dotenv.config();
const typeOrmConfig = (configService) => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASS'),
    database: configService.get('DATABASE_NAME'),
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        },
    },
    entities: [(0, path_1.join)(__dirname + '../../**/*.entity.{js,ts}')],
    synchronize: true
});
exports.typeOrmConfig = typeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map