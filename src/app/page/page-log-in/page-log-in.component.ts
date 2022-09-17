import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AccountService } from 'src/app/service/account.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-page-log-in',
  templateUrl: './page-log-in.component.html',
  styleUrls: ['./page-log-in.component.css']
})
export class PageLogInComponent implements OnInit {

  public readonly formGroup: FormGroup;

  constructor(
    readonly fb: FormBuilder,
    private readonly accountService: AccountService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {
    this.formGroup = fb.group({
      email: fb.control('',Validators.required),
      password: fb.control('',Validators.required),
    });
  }

  ngOnInit(): void {
  }

  public navigateTo(value: any) {
    this.router.navigate([value]);
  }

  public async cancel(){
    this.router.navigate(['home']);
  }

  public async login(){
    this.formGroup.markAllAsTouched();
    if(this.formGroup.invalid) return;

    const values = this.formGroup.value;

    try {
      await firstValueFrom(this.accountService.authenticate(
        values.email,
        values.password
      ));
      this.messageService.message('Account angemeldet');
      this.router.navigate(['home']);
    }
    catch (error: any) {
      if(error.error.message === undefined)
        this.messageService.error('E-Mail or password incorrect.');
      else
        this.messageService.error(error.error.message,error.error.status);

  }
    }
  }
