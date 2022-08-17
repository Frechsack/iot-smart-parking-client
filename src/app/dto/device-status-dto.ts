export class DeviceStatusDto {
  constructor(
    public readonly deviceMac: string,
    public readonly status: string,
    public readonly date: Date
  ){
  }

  public static from(type: any): DeviceStatusDto{
    return new DeviceStatusDto(
      type.deviceMac,
      type.status,
      type.date
    );
  }

}
