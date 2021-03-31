import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { CompanyEntity } from '../company/entities/company.entity';
import { UserEntity } from '../user/entities/user.entity';

@Table
export class LinkUserCompanyEntity extends Model<LinkUserCompanyEntity> {
    // @ForeignKey(() => UserEntity)
    // @Column
    // userId: number;
    //
    // @ForeignKey(() => CompanyEntity)
    // @Column
    // companyId: number;

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
}
