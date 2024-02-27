export interface GoodMenu {
  id: number;
  name: string;
  path: string;
  children: GoodMenu[] | null;
}
