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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const task_schema_1 = require("./schemas/task.schema");
const mongoose_2 = require("mongoose");
let TasksController = class TasksController {
    constructor(_taskDB) {
        this._taskDB = _taskDB;
    }
    async getTasks(parentId) {
        if (!parentId) {
            return this._taskDB.find().exec();
        }
        return this._taskDB.find().exec();
    }
    async createTask(taskDto) {
        return new this._taskDB(taskDto).save();
    }
    async removeTask(id) {
        return await this._taskDB.collection.name;
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTasks", null);
__decorate([
    common_1.Post('add'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    common_1.Post('remove/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "removeTask", null);
TasksController = __decorate([
    common_1.Controller('tasks'),
    __param(0, mongoose_1.InjectModel(task_schema_1.TaskDb.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map