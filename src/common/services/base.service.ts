import { BaseEntity } from '../interfaces/base-entry.interface.js';

export class BaseService<
  T extends BaseEntity,
  TCreateDto extends Omit<T, 'id'>,
  TUpdateDto extends Partial<Omit<T, 'id'>>,
> {
  constructor(
    protected readonly entries: T[],
    private readonly createEntity: (id: number, dto: TCreateDto) => T,
  ) {}

  getAll(name: string = '') {
    return this.entries.filter((entry) =>
      entry.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  getOne(id: number) {
    return this.entries.find((entry) => entry.id === id);
  }

  create(dto: TCreateDto) {
    const id = Math.max(0, ...this.entries.map((entry) => entry.id)) + 1;
    const newEntry = this.createEntity(id, dto);

    return newEntry;
  }

  replace(id: number, dto: TCreateDto) {
    const index = this.entries.findIndex((entry) => entry.id === id);

    if (index === -1) return undefined;

    const newEntry = { id, dto };

    return newEntry;
  }

  update(id: number, dto: TUpdateDto) {
    const index = this.entries.findIndex((entry) => entry.id === id);

    if (index === -1) return undefined;

    const updatedEntry = { ...this.entries[index], ...dto } as T;
    this.entries[index] = updatedEntry;

    return updatedEntry;
  }

  remove(id: number) {
    const index = this.entries.findIndex((entry) => entry.id === id);

    if (index === -1) return undefined;

    return this.entries.splice(index, 1)[0];
  }
}
