import ILeaderboard from './ILeaderboard';

export interface ICRUDMatchModelReader<T> {
  findAll(): Promise<T[]>,
  findById(id: number): Promise<T | null>,
}

export interface ICRUDMatchModelDeleter {
  finishMatch(id: number): Promise<void>,
  updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>,
}

export interface ICRUDMatchModelCreator<T> {
  createMatch(data: Partial<T>): Promise<T>
}

export interface ICRUDMatchModelGetLeaderboard {
  getLeaderboard(): Promise<ILeaderboard[]>
}

export interface ICRUDMatchModel<T>
  extends ICRUDMatchModelReader<T>,
  ICRUDMatchModelCreator<T>,
  ICRUDMatchModelGetLeaderboard,
  ICRUDMatchModelDeleter { }
