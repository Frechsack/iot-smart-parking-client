export class PaymentDto {

  constructor(
    public readonly from: Date,
    public readonly to: Date,
    public readonly price: number
  ){
  }

  public static from(type: any): PaymentDto {
    return new PaymentDto(
      type.from,
      type.to,
      type.price
    )
  }

}
