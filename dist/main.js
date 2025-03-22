"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true
    }));
    app.use(cors({
        origin: 'https://pear-tec.com',
    }));
    app.useStaticAssets((0, path_1.join)(__dirname, '../public'));
    await app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map