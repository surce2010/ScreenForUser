interface ChartItem {
  value: number | string | number[];
  name: string;
  type?: string;
  label?: any;
  [prop: string]: any;
}
