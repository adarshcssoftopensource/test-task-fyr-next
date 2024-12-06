import { CustomFile } from "@/types/filedata.type";

const filterData = (data: CustomFile[], searchQuery: string) => {
  const query = searchQuery.toLowerCase();
  const searchableFields = [
    "title",
    "author",
    "name",
    "type",
    "size",
    "status",
    "tags",
  ];

  return data.filter((item) =>
    searchableFields.some((field) => {
      if (field === "tags" && Array.isArray(item[field])) {
        return (item[field] as string[]).some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        );
      }

      const value = item[field as keyof CustomFile];
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(query.toLowerCase())
      );
    })
  );
};

export default filterData;
