type lesson = { date: string; content: string };
type account = { bank: string; accountNumber: string };
type homework = { _id: string; text: string; complete: number };

export interface Summary {
  data: lesson[];
  account: account;
  fee: number;
  name: string;
  cycle: number;
}

export interface Calendar {
  _id: string;
  date: Date;
  count: number;
}

export interface Lesson {
  _id: string;
  content: string;
  homework: homework[];
  calendarId: string;
  studentId: string;
}
