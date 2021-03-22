import { BehaviorSubject } from 'rxjs';

enum EPermission {
    owner = 'owner',
    guest = 'guest',
    editTask = 'create_task',
    createBoard = 'create_board',
    editBoard = 'edit_board',
    removeBoard = 'edit_board',
    inviteUser = 'invite_user',
    removeUser = 'remove_user',
    editCompanyInfo = 'edit_company_info',
}

interface IPermissions {
    [companyId: string]: string[];
}

export class Permission {
    private _permissions$ = new BehaviorSubject<IPermissions>(null);

    get get() {
        return this._permissions$.value;
    }

    set set(permission: IPermissions) {
        this._permissions$.next(permission);
    }

    isEditTask(companyId: number) {
        return (
            this._permissions$.value[companyId]?.includes(EPermission.editTask) || false
        );
    }

    isEditCompanyInfo(companyId: number) {
        return (
            this._permissions$.value[companyId]?.includes(EPermission.editCompanyInfo) ||
            false
        );
    }
}
