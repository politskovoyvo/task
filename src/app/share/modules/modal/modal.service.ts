import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    Injectable,
    Injector,
    ViewContainerRef,
} from '@angular/core';
import { IModalConfigs } from '@share/modules/modal/models/modal-configs.interface';
import { ModalComponent } from '@share/modules/modal/modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modals: any[] = [];

    constructor(
        private readonly _componentFactoryResolver: ComponentFactoryResolver,
        private readonly _injector: Injector,
        private readonly _appRef: ApplicationRef
    ) {}

    add(modal: any) {
        this.modals.push(modal);
    }

    hasModal(id: string) {
        return !!this.modals.find((i) => i.id === id);
    }

    remove(id: string) {
        this.modals = this.modals.filter((x) => x.id !== id);
    }

    create(configs: IModalConfigs): ComponentRef<any> {
        document.body?.scrollIntoView(false);
        const factory = this._componentFactoryResolver.resolveComponentFactory(
            ModalComponent
        );
        const appInstance = this._appRef.components[0].instance;
        const appViewContainerRef = appInstance.viewContainerRef as ViewContainerRef;

        if (!appViewContainerRef) {
            const appName = this._appRef.componentTypes[0].name;
            throw new Error(
                `Missing 'viewContainerRef' declaration in ${appName} constructor`
            );
        }

        appViewContainerRef.clear();
        const component: ComponentRef<any> = appViewContainerRef.createComponent<ModalComponent>(
            factory
        );
        component.instance.id = configs.id;
        component.instance.create(configs);
        return component;
    }

    close(id: string) {
        const modal = this.modals.find((x) => x.id === id);
        modal.close();
    }

    closeAll() {
        this.modals?.forEach((m) => m.close());
    }
}
