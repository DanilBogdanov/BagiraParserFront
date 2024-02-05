export interface GoodMenu {
  id: number;
  name: string;
  children: GoodMenu[] | null;
}

export interface GoodMenuItem {
  id: number;
  name: string;
  path: string;
  key: string;
  label: string;
  children: GoodMenuItem[] | null;
}
