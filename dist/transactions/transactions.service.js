"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const transaction_entity_1 = require("./entities/transaction.entity");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../products/entities/product.entity");
const date_fns_1 = require("date-fns");
const coupons_service_1 = require("../coupons/coupons.service");
let TransactionsService = class TransactionsService {
    constructor(transactionRepository, transactionContentsRepository, productRepository, couponService) {
        this.transactionRepository = transactionRepository;
        this.transactionContentsRepository = transactionContentsRepository;
        this.productRepository = productRepository;
        this.couponService = couponService;
    }
    async create(createTransactionDto) {
        await this.productRepository.manager.transaction(async (transactionEntityManager) => {
            const transaction = new transaction_entity_1.Transaction();
            const total = createTransactionDto.contents.reduce((total, item) => total + (item.quantity * item.price), 0);
            transaction.total = total;
            if (createTransactionDto.coupon) {
                const coupon = await this.couponService.applyCoupon(createTransactionDto.coupon);
                const discount = (coupon.percentage / 100) * total;
                transaction.discount = discount;
                transaction.coupon = coupon.name;
                transaction.total -= discount;
            }
            for (const contents of createTransactionDto.contents) {
                const product = await transactionEntityManager.findOneBy(product_entity_1.Product, { id: contents.productId });
                const errors = [];
                if (!product) {
                    errors.push(`El producto con el ID: ${contents.productId} no existe`);
                    throw new common_1.NotFoundException(errors);
                }
                if (contents.quantity > product.inventory) {
                    errors.push(`El artículo ${product.name} excede la cantidad disponible`);
                    throw new common_1.BadRequestException(errors);
                }
                product.inventory -= contents.quantity;
                const transactionContent = new transaction_entity_1.TransactionContents();
                transactionContent.price = contents.price;
                transactionContent.product = product;
                transactionContent.quantity = contents.quantity;
                transactionContent.transaction = transaction;
                await transactionEntityManager.save(transaction);
                await transactionEntityManager.save(transactionContent);
            }
        });
        return { message: "Venta Almacenada Correctamente" };
    }
    findAll(transactionDate) {
        const options = {
            relations: {
                contents: true
            }
        };
        if (transactionDate) {
            const date = (0, date_fns_1.parseISO)(transactionDate);
            if (!(0, date_fns_1.isValid)(date)) {
                throw new common_1.BadRequestException('Fecha no válida');
            }
            const start = (0, date_fns_1.startOfDay)(date);
            const end = (0, date_fns_1.endOfDay)(date);
            options.where = {
                transactionDate: (0, typeorm_2.Between)(start, end)
            };
        }
        return this.transactionRepository.find(options);
    }
    async findOne(id) {
        const transaction = await this.transactionRepository.findOne({
            where: {
                id
            },
            relations: {
                contents: true
            }
        });
        if (!transaction) {
            throw new common_1.NotFoundException('Transacción no encontrada');
        }
        return transaction;
    }
    async remove(id) {
        const transaction = await this.findOne(id);
        for (const contents of transaction.contents) {
            const product = await this.productRepository.findOneBy({ id: contents.product.id });
            product.inventory += contents.quantity;
            await this.productRepository.save(product);
            const transactionContents = await this.transactionContentsRepository.findOneBy({ id: contents.id });
            await this.transactionContentsRepository.remove(transactionContents);
        }
        await this.transactionRepository.remove(transaction);
        return { message: 'Venta Eliminada' };
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __param(1, (0, typeorm_1.InjectRepository)(transaction_entity_1.TransactionContents)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        coupons_service_1.CouponsService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map