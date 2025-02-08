export interface LogsEntity {
  id: string;
  userEmail: string;
  type: LogType;
  typeAction: LogActionInfo | LogActionError;
  message: string;
  actionDate: string;
}

export interface PaginatedLogsEntity {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: LogsEntity[];
}

export enum LogType {
  Info = 'info',
  Error = 'error',
}

export enum LogActionInfo {
  Register = 'Rejestracja',
  Login = 'Logowanie',
  Logout = 'Wylogowanie',
  RentBook = 'Wypożyczenie książki',
  ReturnBook = 'Zwrócenie książki',
  UserDeletion = 'Usunięcie użytkownika',
}

export enum LogActionError {
  Register = 'Nieudana rejestracja',
  Login = 'Nieudane logowanie',
  RentBook = 'Nieudane wypożyczenie książki',
  ReturnBook = 'Nieudane zwrócenie książki',
  DeleteBook = 'Usuwanie książki',
  UserDeletion = 'Nieudane usunięcie użytkownika',
}
