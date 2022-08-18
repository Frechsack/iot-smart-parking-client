export class PaginationDto<E> {
  constructor(
    public readonly count: number,
    public readonly data: E[]
  ){
  }


  public static readonly EMPTY = new PaginationDto(0,[]);
}
