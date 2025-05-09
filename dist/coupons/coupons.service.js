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
exports.CouponsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const coupon_entity_1 = require("./entities/coupon.entity");
const typeorm_2 = require("typeorm");
const date_fns_1 = require("date-fns");
let CouponsService = class CouponsService {
    constructor(couponRepository) {
        this.couponRepository = couponRepository;
    }
    create(createCouponDto) {
        return this.couponRepository.save(createCouponDto);
    }
    findAll() {
        return this.couponRepository.find();
    }
    async findOne(id) {
        const coupon = await this.couponRepository.findOneBy({ id });
        if (!coupon) {
            throw new common_1.NotFoundException(`El cupón con el ID: ${id} no fue encontrado`);
        }
        return coupon;
    }
    async update(id, updateCouponDto) {
        const coupon = await this.findOne(id);
        Object.assign(coupon, updateCouponDto);
        return await this.couponRepository.save(coupon);
    }
    async remove(id) {
        const coupon = await this.findOne(id);
        await this.couponRepository.remove(coupon);
        return { message: 'Cupón eliminado' };
    }
    async applyCoupon(name) {
        const coupon = await this.couponRepository.findOneBy({ name });
        if (!coupon) {
            throw new common_1.NotFoundException('El cupón no existe...');
        }
        const currentDate = new Date();
        const expirationDate = (0, date_fns_1.endOfDay)(coupon.expirationDate);
        if ((0, date_fns_1.isAfter)(currentDate, expirationDate)) {
            throw new common_1.UnprocessableEntityException('Cupón ya expirado');
        }
        return {
            message: 'Cupón válido',
            ...coupon
        };
    }
};
exports.CouponsService = CouponsService;
exports.CouponsService = CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coupon_entity_1.Coupon)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CouponsService);
//# sourceMappingURL=coupons.service.js.map