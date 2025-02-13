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
  Register = 'Registration',
  Login = 'Login',
  Logout = 'Logout',
  RentBook = 'Book rental',
  ReturnBook = 'Book return',
  UserDeletion = 'User deletion',
  AddBook = 'Book addition',
  EditBook = 'Book editing',
  DeleteBook = 'Book deletion',
}

export enum LogActionError {
  Register = 'Failed registration',
  Login = 'Failed login',
  RentBook = 'Failed book rental',
  ReturnBook = 'Failed book return',
  DeleteBook = 'Book deletion',
  UserDeletion = 'Failed user deletion',
  AddBook = 'Failed book addition',
  EditBook = 'Failed book editing',
}
