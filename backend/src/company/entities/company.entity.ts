import {
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    DefaultScope,
    HasMany,
    Model,
    Scopes,
    Table,
} from 'sequelize-typescript';
import { UserEntity } from '../../user/entities/user.entity';
import { UserCompanyEntity } from '../../links/user-company/user-company.entity';
import { ApiProperty } from '@nestjs/swagger';

// @Scopes(() => ({
//     full: {
//         include: ['users'],
//     },
// }))
@Table
export class CompanyEntity extends Model<CompanyEntity> {
    @ApiProperty({ example: 'Yandex', description: 'Название компании' })
    @Column({ allowNull: false })
    name: string;

    @ApiProperty({ example: '1212313122', description: 'ИНН компании' })
    @Column({ allowNull: false })
    inn: string;

    @ApiProperty({ example: 'ya@yandex.ru', description: 'Электронный адрес' })
    @Column({ allowNull: false })
    email: string;

    @BelongsToMany(() => UserEntity, () => UserCompanyEntity)
    users: UserEntity[];

    isSelected: boolean;
}
