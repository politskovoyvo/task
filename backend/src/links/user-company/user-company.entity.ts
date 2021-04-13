import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { CompanyEntity } from '../../company/entities/company.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Table
export class UserCompanyEntity extends Model<UserCompanyEntity> {
    @BelongsTo(() => UserEntity)
    user: UserEntity;

    @ForeignKey(() => UserEntity)
    @PrimaryKey
    @Column
    userId: number;

    @BelongsTo(() => CompanyEntity)
    company: CompanyEntity;

    @ForeignKey(() => CompanyEntity)
    @PrimaryKey
    @Column
    companyId: number;

    @Column(DataType.JSON)
    history: {
        isWork: boolean;
        reason: string;
        dt: string;
    }[];

    @Column(DataType.BOOLEAN)
    isWork?: boolean;
}
