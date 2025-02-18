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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCouponDto = void 0;
const class_validator_1 = require("class-validator");
class CreateCouponDto {
}
exports.CreateCouponDto = CreateCouponDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre del cupón es obligatorio' }),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El descuento no puede ir vacio' }),
    (0, class_validator_1.IsInt)({ message: 'El descuento debe ser entre 1 y 100' }),
    (0, class_validator_1.Max)(100, { message: 'El descuento máximo es de 100' }),
    (0, class_validator_1.Min)(1, { message: 'El descuento mínimo es de 1' }),
    __metadata("design:type", Number)
], CreateCouponDto.prototype, "percentage", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La fecha no puede ir vacia' }),
    (0, class_validator_1.IsDateString)({}, { message: 'Fecha no válida' }),
    __metadata("design:type", Date)
], CreateCouponDto.prototype, "expirationDate", void 0);
//# sourceMappingURL=create-coupon.dto.js.map