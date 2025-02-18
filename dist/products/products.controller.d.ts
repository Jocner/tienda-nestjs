import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQueryDto } from './dto/get-product.dto';
import { UploadImageService } from 'src/upload-image/upload-image.service';
export declare class ProductsController {
    private readonly productsService;
    private readonly uploadImageService;
    constructor(productsService: ProductsService, uploadImageService: UploadImageService);
    create(createProductDto: CreateProductDto): Promise<{
        category: import("../categories/entities/category.entity").Category;
        name: string;
        image: string;
        price: number;
        inventory: number;
        categoryId: number;
    } & import("./entities/product.entity").Product>;
    findAll(query: GetProductsQueryDto): Promise<{
        products: import("./entities/product.entity").Product[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/product.entity").Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./entities/product.entity").Product>;
    remove(id: string): Promise<{
        message: string;
    }>;
    uploadImage(file: Express.Multer.File): Promise<import("../upload-image/upload-image.response").CloudinaryResponse>;
}
