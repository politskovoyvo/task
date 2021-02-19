import { Base } from '../tasks/dto/task.dto';
export declare class CompanyController {
    getCompanies(): Promise<void>;
    addEmployee(companyId: number, employee: Base): Promise<void>;
}
