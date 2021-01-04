import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/auth/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  form: FormGroup;
  error = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  login() {
    this.authService
      .auth(
        this.form.get('login').value,
        this.form.get('password').value
      )
      .pipe(
        untilDestroyed(this),
        catchError((err) => {
          this.error = err;
          return of({});
        })
      )
      .subscribe();
  }

  private formInit() {
    this.form = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
