type time = { day: string; range: { start: string; end: string } };
type account = { bank: string; accountNumber: string };

export interface Student {
  _id: string;
  name: string;
  schoolName: string;
  schoolLevel: string;
  grade: string;
  address: string;
  time: time[];
  frequency: number;
  fee: number;
  account: account;
  startDate: Date;
  code: string;
  count: number;
}
