import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import { LoginRoutingModule } from './login-routing.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LogInComponent],
  imports: [CommonModule, LoginRoutingModule, FormsModule, NzInputModule, NzButtonModule, ReactiveFormsModule],
})
export class LoginModule {}
