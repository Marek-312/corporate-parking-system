import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  protected readonly auth = inject(AuthService);
  protected readonly me$ = this.auth.me();
}