import { v2 as cloudinary } from 'cloudinary'

const CLOUDINARY_API_KEY="563368826192122"
const CLOUDINARY_API_SECRET="ZJUT5VflU49EaBPGzB52bTLc2bU"

export const UploadImageProvider = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_API_SECRET,
        })
    }
}