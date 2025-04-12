type lesson = { date: string; content: string };
type account = { bank: string; accountNumber: string };

export interface Summary {
  data: lesson[];
  account: account;
  fee: number;
  name: string;
  cycle: number;
}

export interface Calendar {
  id: string;
  date: Date;
  count: number;
}
