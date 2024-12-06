export type Status = "Indexed" | "Processing" | "FileError" | null;

export interface CustomFile extends Pick<File, "name" | "type"> {
  title: string;
  author: string;
  createdAt: string;
  uploadedAt: string;
  status: Status;
  tags: string[];
  size: string;
  data?: Array<CustomFile>;
  isCollection: boolean;
}
