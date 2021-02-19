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
exports.PrioritySchema = exports.PriorityEntity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let PriorityEntity = class PriorityEntity {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], PriorityEntity.prototype, "id", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], PriorityEntity.prototype, "name", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], PriorityEntity.prototype, "color", void 0);
PriorityEntity = __decorate([
    mongoose_1.Schema()
], PriorityEntity);
exports.PriorityEntity = PriorityEntity;
exports.PrioritySchema = mongoose_1.SchemaFactory.createForClass(PriorityEntity);
//# sourceMappingURL=prioritySchema.js.map