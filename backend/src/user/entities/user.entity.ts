import {
    BelongsToMany,
    Column,
    DataType,
    HasMany,
    Model,
    Scopes,
    Table,
} from 'sequelize-typescript';
import { CompanyEntity } from '../../company/entities/company.entity';
import { UserCompanyEntity } from '../../links/user-company/user-company.entity';
import { LinkUserBoardEntity } from '../../links/link-user-board.entity';
import { BoardEntity } from '../../board/entities/board.entity';

@Table
export class UserEntity extends Model<UserEntity> {
    @Column({ allowNull: false })
    firstName: string;

    @Column({ allowNull: false })
    lastName: string;

    @Column({ allowNull: false })
    middleName: string;

    @Column({ allowNull: false })
    email: string;

    @BelongsToMany(() => CompanyEntity, () => UserCompanyEntity)
    companies: CompanyEntity[];

    @BelongsToMany(() => BoardEntity, () => LinkUserBoardEntity)
    boards: BoardEntity[];
}
