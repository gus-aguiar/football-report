export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: number): Promise<T | null>,
}

export interface ICRUDModelDeleter {
  finishMatch(id: number): Promise<void>,
}

export interface ICRUDModel<T>
  extends ICRUDModelReader<T>,
  ICRUDModelDeleter { }
