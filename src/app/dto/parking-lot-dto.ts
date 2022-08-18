export class ParkingLotDto {
  constructor(
    public readonly nr: number,
    public readonly isAvailable: boolean
  ){}

  public static from(type: any) {
    return new ParkingLotDto(
      type.nr,
      type.isAvailable
    );
  }
}
