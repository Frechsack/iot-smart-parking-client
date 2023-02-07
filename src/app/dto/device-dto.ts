export enum DeviceTypeName {
  LAMP='LAMP',
  PARKING_GUIDE_LAMP='PARKING_GUIDE_LAMP',
  CWO_SENSOR='CWO_SENSOR',
  SERVO='SERVO',
  MOTION_SENSOR='MOTION_SENSOR'
}

export class DeviceDto {
  constructor(
    public readonly mac: string,
    public readonly type: DeviceTypeName,
    public readonly parkingLotNr?: number,
  ){
  }

  public static from(type: any): DeviceDto {
    return new DeviceDto(
      type.mac,
      type.type,
      type.parkingLotNr,
    );
  }

}
