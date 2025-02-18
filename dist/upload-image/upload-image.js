"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadImageProvider = void 0;
const cloudinary_1 = require("cloudinary");
exports.UploadImageProvider = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
};
//# sourceMappingURL=upload-image.js.map