export type Parking = {
  id: string;
  name: string;
  code: string;
  location: string;
  feePerHour: number;
  slots?: { id: string }[];
};