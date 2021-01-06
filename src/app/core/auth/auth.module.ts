import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCoreService } from './services/auth-core.service';
import { AuthService } from './services/auth.service';
import { AppInit } from './services/auth-init.service';
export function loadConfig(config: AppInit) {
  return (): Promise<any> => {
    return config.load();
  };
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AuthCoreService,
    AuthService,
    AppInit,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [AppInit],
      multi: true,
    },
  ],
})
export class AuthModule {}
