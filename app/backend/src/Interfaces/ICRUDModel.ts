export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: number): Promise<T | null>,
}

export type ICRUDModel<T> = ICRUDModelReader<T>;
