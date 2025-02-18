import { Category } from '../categories/entities/category.entity';
import { Repository, DataSource } from 'typeorm';
import { Product } from '../products/entities/product.entity';
export declare class SeederService {
    private readonly categoryRepository;
    private readonly productRepository;
    private dataSource;
    constructor(categoryRepository: Repository<Category>, productRepository: Repository<Product>, dataSource: DataSource);
    onModuleInit(): Promise<void>;
    seed(): Promise<void>;
}
