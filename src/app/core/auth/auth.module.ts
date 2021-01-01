import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthCoreService } from './services/auth-core.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthCoreService,
    AuthService
  ]
})
export class AuthModule { }
