export interface GoodMenu {
  id: number;
  name: string;
  children: GoodMenu[] | null;
}
