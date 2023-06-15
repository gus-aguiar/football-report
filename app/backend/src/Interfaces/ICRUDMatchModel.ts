export interface ICRUDMatchModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: number): Promise<T | null>,
}

export interface ICRUDMatchModelDeleter {
  finishMatch(id: number): Promise<void>,
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>,
}

export interface ICRUDMatchModel<T>
  extends ICRUDMatchModelReader<T>,
  ICRUDMatchModelDeleter { }
