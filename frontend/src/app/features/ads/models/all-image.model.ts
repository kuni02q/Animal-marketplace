export type AllImage =
  | {
  type: 'existing';
  id: number;
  url: string;
  key: string;
}
  | {
  type: 'new';
  preview: string;
  file: File;
  key: string;
};
