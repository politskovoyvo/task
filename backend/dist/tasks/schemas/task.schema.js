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
exports.TaskSchema = exports.TaskDb = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let TaskDb = class TaskDb {
};
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], TaskDb.prototype, "id", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], TaskDb.prototype, "type", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], TaskDb.prototype, "color", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], TaskDb.prototype, "symbol", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Array)
], TaskDb.prototype, "priority", void 0);
__decorate([
    mongoose_1.Prop({ type: Object }),
    __metadata("design:type", Object)
], TaskDb.prototype, "assignee", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Array)
], TaskDb.prototype, "performers", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], TaskDb.prototype, "spendTime", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Array)
], TaskDb.prototype, "history", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", String)
], TaskDb.prototype, "info", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Array)
], TaskDb.prototype, "histories", void 0);
TaskDb = __decorate([
    mongoose_1.Schema()
], TaskDb);
exports.TaskDb = TaskDb;
exports.TaskSchema = mongoose_1.SchemaFactory.createForClass(TaskDb);
//# sourceMappingURL=task.schema.js.map