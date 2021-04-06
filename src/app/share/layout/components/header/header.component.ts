import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';
import { Router } from '@angular/router';
import { ESettingsRoutes } from '@modules/user-info/settings.routes';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
    constructor(
        private readonly _authService: AuthService,
        private readonly _router: Router
    ) {}

    ngOnInit(): void {}

    logout() {
        this._authService.logout();
    }

    redirectToOptionsPage() {
        this._router.navigate([ESettingsRoutes.global]).then();
    }
}
