import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthModule } from '@core/auth/auth.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { BoardCoreService } from '@core/services/board-core.service';
import { TaskCoreService } from '@core/services/task-core.service';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '@core/stores/app.redusers';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from '@core/stores/task/task.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from 'src/environments/environment.prod';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { WebsocketService } from '@core/services/transportation/websocket.service';

registerLocaleData(en);

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NzIconModule,
        NzModalModule,
        AuthModule,
        NzDrawerModule,
        ReactiveFormsModule,
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot([TaskEffects]),
        StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
        environment.production ? StoreDevtoolsModule.instrument() : [],
    ],
    providers: [
        { provide: NZ_I18N, useValue: en_US },
        BoardCoreService,
        TaskCoreService,
        WebsocketService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
