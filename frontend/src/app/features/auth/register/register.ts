import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { sign } from 'crypto';


@Component({
  
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
  imports:[ReactiveFormsModule,RouterLink]
})
export class Register {
  private readonly fb =inject(FormBuilder);
  private readonly auth=inject(AuthService);
  private readonly router=inject(Router);


  readonly error=signal(``);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    companyName: ['', Validators.required],
    taxNumber: ['', Validators.required],
  });

  submit():void{
    this.auth.register(this.form.getRawValue()).subscribe({
      next:()=>this.router.navigate(['/login']),
      error:(err)=>this.error.set(err.error?.message?? 'Registration failed');
      
    })
  }
  
  
}
