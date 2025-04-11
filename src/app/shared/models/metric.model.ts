export interface Metric {
  title: string;
  value: number;
  change: number;
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  isCurrency?: boolean;
}