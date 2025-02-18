import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { CouponsService } from '../coupons/coupons.service';
export declare class TransactionsService {
    private readonly transactionRepository;
    private readonly transactionContentsRepository;
    private readonly productRepository;
    private readonly couponService;
    constructor(transactionRepository: Repository<Transaction>, transactionContentsRepository: Repository<TransactionContents>, productRepository: Repository<Product>, couponService: CouponsService);
    create(createTransactionDto: CreateTransactionDto): Promise<{
        message: string;
    }>;
    findAll(transactionDate?: string): Promise<Transaction[]>;
    findOne(id: number): Promise<Transaction>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
