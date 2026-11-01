export interface CrudService<TCreateDto, TUpdateDto> {
  getAll(name?: string): unknown;
  generateRandom(size?: number): unknown;
  getOne(id: number): unknown;
  create(dto: TCreateDto): unknown;
  replace(id: number, dto: TCreateDto): unknown;
  update(id: number, dto: TUpdateDto): unknown;
  remove(id: number): unknown;
}
