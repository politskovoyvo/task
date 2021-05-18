import { ChangeDetectionStrategy, Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';
import { Router } from '@angular/router';
import { ESettingsRoutes } from '@modules/user-info/settings.routes';
import { HeaderService } from '@share/layout/components/header/header.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
    templateRef: Observable<TemplateRef<any>>;

    constructor(
        private readonly _authService: AuthService,
        private readonly _router: Router,
        private readonly _headerService: HeaderService
    ) {}

    ngOnInit(): void {
        this.templateRef = this._headerService.templateRef;
    }

    logout() {
        this._authService.logout();
    }

    redirectToOptionsPage() {
        this._router.navigate([ESettingsRoutes.global]).then();
    }
}
