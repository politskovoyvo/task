"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const common_1 = require("@nestjs/common");
const tasks_controller_1 = require("./tasks.controller");
const mongoose_1 = require("@nestjs/mongoose");
const tasks_service_1 = require("./tasks.service");
const task_schema_1 = require("./schemas/task.schema");
let TaskModule = class TaskModule {
};
TaskModule = __decorate([
    common_1.Module({
        controllers: [tasks_controller_1.TasksController],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: task_schema_1.TaskEntity.name,
                    schema: task_schema_1.TaskSchema,
                },
            ]),
        ],
        providers: [tasks_service_1.TasksService],
    })
], TaskModule);
exports.TaskModule = TaskModule;
//# sourceMappingURL=task.module.js.map