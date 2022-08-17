export class DeviceInstructionDto {
  constructor(
    public readonly deviceMac: string,
    public readonly instruction: string,
    public readonly date: Date
  ){
  }

  public static from(type: any): DeviceInstructionDto{
    return new DeviceInstructionDto(
      type.deviceMac,
      type.instruction,
      type.date
    );
  }
}
