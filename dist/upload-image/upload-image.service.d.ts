import { CloudinaryResponse } from './upload-image.response';
export declare class UploadImageService {
    uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse>;
}
