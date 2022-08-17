import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AccountService } from 'src/app/service/account.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {

  public readonly formGroup: FormGroup ;

  constructor(
    readonly fb: FormBuilder,
    private readonly accountService: AccountService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {
    this.formGroup = fb.group({
      email: fb.control('',Validators.required),
      password: fb.control('',Validators.required),
      firstname: fb.control('',Validators.required),
      lastname: fb.control('',Validators.required),
      street: fb.control('',Validators.required),
      streetNr: fb.control('',Validators.required),
      zip: fb.control('',Validators.required),
    })
  }

  ngOnInit(): void {
  }

  public async register(){
    this.formGroup.markAllAsTouched();
    if(this.formGroup.invalid) return;

    const values = this.formGroup.value;

    try {
      await firstValueFrom(this.accountService.registerAccount(
        values.email,
        values.password,
        values.firstname,
        values.lastname,
        values.zip,
        values.street,
        values.streetNr,
      ));
      this.messageService.message('Account erstellt');
      // TODO: Authtoken erstellen
      await firstValueFrom(this.accountService.authenticate(values.email,values.password));

      this.router.navigate(['']);
    }
    catch (error: any) {
       this.messageService.error(error.error.message,error.error.status);
    }
  }

  public async cancel(){
    this.router.navigate(['']);
  }

}
