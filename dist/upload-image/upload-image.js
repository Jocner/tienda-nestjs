"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadImageProvider = void 0;
const cloudinary_1 = require("cloudinary");
const CLOUDINARY_API_KEY = "563368826192122";
const CLOUDINARY_API_SECRET = "ZJUT5VflU49EaBPGzB52bTLc2bU";
exports.UploadImageProvider = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_API_SECRET,
        });
    }
};
//# sourceMappingURL=upload-image.js.map