export class AccountDto {

  constructor(
    public readonly email: string,
    public readonly licensePlates: string[]
  ){
  }

  public static from(type: any): AccountDto {
    return new AccountDto(
      type.email,
      type.licensePlates
    );
  }
}
