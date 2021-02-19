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
exports.TaskSchema = exports.TaskEntity = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let TaskEntity = class TaskEntity {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], TaskEntity.prototype, "id", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], TaskEntity.prototype, "type", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], TaskEntity.prototype, "color", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], TaskEntity.prototype, "symbol", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Array)
], TaskEntity.prototype, "priority", void 0);
__decorate([
    mongoose_1.Prop({ type: Object }),
    __metadata("design:type", Object)
], TaskEntity.prototype, "assignee", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Array)
], TaskEntity.prototype, "performers", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], TaskEntity.prototype, "spendTime", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Array)
], TaskEntity.prototype, "history", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], TaskEntity.prototype, "info", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Array)
], TaskEntity.prototype, "histories", void 0);
TaskEntity = __decorate([
    mongoose_1.Schema()
], TaskEntity);
exports.TaskEntity = TaskEntity;
exports.TaskSchema = mongoose_1.SchemaFactory.createForClass(TaskEntity);
//# sourceMappingURL=task.schema.js.map