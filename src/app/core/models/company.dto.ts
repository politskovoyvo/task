import { Base } from '@share/models/base';

export interface CompanyDto extends Base {
    isSelected: boolean;
    userCount: number;
}
