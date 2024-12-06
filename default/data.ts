import { CustomFile } from "@/types/filedata.type";
import formatDate from "@/utils/format-date";

const defaultData: CustomFile[] = [
  {
    title: "Burns’ ",
    author: "Linsley",
    name: "Burns",
    type: "PDF",
    size: "41",
    createdAt: formatDate(new Date()),
    uploadedAt: formatDate(new Date()),
    status: "Indexed",
    tags: ["tag1", "tag2", "tag3"],
    isCollection: false,
  },
  {
    title: "Alice",
    author: "Johnson",
    name: "Doe",
    type: "Word Document",
    size: "15",
    createdAt: formatDate(new Date()),
    uploadedAt: formatDate(new Date()),
    status: "Processing",
    tags: ["work", "important"],
    isCollection: false,
  },
  {
    title: "Bob",
    author: "Smith",
    name: "Foster",
    type: "Image",
    size: "5",
    createdAt: formatDate(new Date()),
    uploadedAt: formatDate(new Date()),
    status: "Processing",
    tags: ["photo", "nature"],
    isCollection: false,
  },
  {
    title: "Emily",
    author: "Davis",
    name: "Grant",
    type: "Spreadsheet",
    size: "25",
    createdAt: formatDate(new Date()),
    uploadedAt: formatDate(new Date()),
    status: "FileError",
    tags: ["finance", "report"],
    isCollection: false,
  },
  {
    title: "Collection",
    author: "",
    name: "",
    type: "",
    size: "",
    data: [],
    createdAt: "",
    uploadedAt: "",
    status: null,
    tags: [],
    isCollection: true,
  },
];

export default defaultData;
