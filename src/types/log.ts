export enum LogType {
  Info = 'info',
  Error = 'error',
}

export enum LogActionInfo {
  Register = 'Rejestracja',
  Login = 'Logowanie',
  Logout = 'Wylogowanie',
  RentBook = 'Wypożyczenie książki',
  ReturnBook = 'Zwrócenie książkę',
}

export enum LogActionError {
  Register = 'Nieudana rejestracja',
  Login = 'Nieudane logowanie',
  RentBook = 'Nieudane wypożyczenie książki',
  ReturnBook = 'Nieudane zwrócenie książki',
}
