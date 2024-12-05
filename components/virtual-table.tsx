"use client";
import React, { HTMLProps, useCallback, useRef } from "react";
import {
  ColumnDef,
  ColumnResizeMode,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import Table, {
  TBody,
  Td,
  TFoot,
  Th,
  THead,
  ThResizer,
  Tr,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  ArrowDownIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUpIcon,
  EllipsisHorizontalIcon,
  FolderIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Toolbar } from "./toolbar";
import { AtSymbolIcon } from "@heroicons/react/16/solid";
import {
  DuoDoubleCheck,
  DuoFolderError,
  DuoWaiting,
} from "@/assets/icons/duotone";
import useDomRect from "@/hooks/use-dom-rect";

type Status = "Indexed" | "Processing" | "FileError";

interface CustomFile extends Pick<File, "name" | "type"> {
  title: string;
  author: string;
  createdAt: string;
  uploadedAt: string;
  status: Status;
  tags: string[];
  size: string;
}

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  return date
    .toLocaleDateString("en-US", options)
    .toUpperCase()
    .replace(/ ,/g, "-"); // Replace spaces with hyphens
};

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

const defaultData: CustomFile[] = [
  {
    title: "Burns’ Pediatric Primary Care",
    author: "Linsley",
    name: "Burns",
    type: "PDF",
    size: "41",
    createdAt: formatDate(new Date()),
    uploadedAt: formatDate(new Date()),
    status: "Indexed",
    tags: ["tag1", "tag2", "tag3"],
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
  },
];

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={
        className +
        " cursor-pointer relative top-[3px] mr-[10px] w-[17px] h-[17px] border border-[#E6E6E6]"
      }
      {...rest}
    />
  );
}
const defaultColumns: ColumnDef<CustomFile>[] = [
  {
    accessorKey: "title",
    header: "Title",
    enableResizing: true,
    cell: ({ row }) => (
      <div
        className="overflow-hidden whitespace-nowrap text-ellipsis"
        style={{ width: "100px" }}
      >
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
        {row.original.title}
      </div>
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
    enableResizing: false,
  },
  {
    accessorKey: "name",
    header: () => (
      <div className="flex gap- items-center">
        <AtSymbolIcon className="size-[20px]" />
        Name
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "File Type",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "uploadedAt",
    header: "Uploaded At",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row: { original } }) => {
      const iconClassName = "size-[20px]";
      const renderStatusIcon = (status: Status) => {
        switch (status) {
          case "Indexed":
            return <DuoDoubleCheck className={iconClassName} />;
          case "Processing":
            return <DuoWaiting className={iconClassName} />;
          case "FileError":
            return <DuoFolderError className={iconClassName} />;
          default:
            return null;
        }
      };

      return (
        <div className="flex items-center space-x-2">
          {renderStatusIcon(original.status)}
          <span>{original.status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => (
      <div className="flex flex-wrap items-center bg-[#5D82EE]/20 rounded-md justify-center gap-0.5 p-1">
        {row.original.tags.map((tag) => {
          return (
            <div className="text-[#5D82EE] text-xs" key={tag}>
              {tag}
            </div>
          );
        })}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="">
            <Button
              variant="ghost"
              className="h-8 w-full p-0  flex justify-end pr-4  focus-visible:ring-0"
            >
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <PencilSquareIcon />
                <span>Rename</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AtSymbolIcon />
                <span>Add @Name</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArrowTopRightOnSquareIcon />
                <span>View File</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <FolderIcon />
                  <span>Manage Collection</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <span>Remove from collection</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Move to</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const VirtualTable = () => {
  const [data, setData] = React.useState<CustomFile[]>(() => [...defaultData]);
  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnResizeMode] = React.useState<ColumnResizeMode>("onChange");
  const table = useReactTable({
    data: filterData(data, searchQuery),
    columns,
    defaultColumn: {
      minSize: 0,
      maxSize: 800,
    },
    columnResizeMode,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });
  const deleteSelectedRows = () => {
    const selectedRowIds = Object.keys(rowSelection);
    if (selectedRowIds.length > 0) {
      const newData = data.filter(
        (_, index) => !selectedRowIds.includes(index.toString())
      );
      setData(newData);
      setRowSelection({}); // Reset row selection
    }
  };

  const clearSelection = () => {
    setRowSelection({});
  };

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const fileData = {
          name: file.name,
          size:
            file.size > 1024 * 1024
              ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
              : `${(file.size / 1024).toFixed(2)} KB`,
          type: file.type,
        };

        const data = {
          ...fileData,
          title: "Burns’ Pediatric Primary Care",
          author: "Linsley",
          createdAt: formatDate(new Date()),
          uploadedAt: formatDate(new Date()),
          status: "Indexed" as Status,
          tags: ["tag1", "tag2", "tag3"],
        };

        setData((prev) => [...prev, data]);
      }
    },
    []
  );
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const divRef = useRef<HTMLDivElement>(null);
  const [domRect] = useDomRect(divRef);

  return (
    <div
      ref={divRef}
      className="flex flex-col gap-4 max-h-[700px] overflow-y-auto"
    >
      <Toolbar
        deleteSelectedRows={deleteSelectedRows}
        clearSelection={clearSelection}
        handleFileChange={handleFileChange}
        handleSearchChange={handleSearchChange}
      />
      <Table
        {...{
          style: {
            width: domRect?.width || table.getCenterTotalSize(),
          },
        }}
      >
        <THead className="text-[#101010]  sticky top-0 z-10 bg-white ">
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id} className=" rounded-lg">
              {headerGroup.headers.map((header) => (
                <Th
                  isResizable
                  key={header.id}
                  {...{
                    colSpan: header.colSpan,
                    style: {
                      width: header.getSize(),
                    },
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none flex items-center justify-center"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className="ml-2">
                        {
                          {
                            asc: <ArrowUpIcon className=" w-4 h-4" />,
                            desc: <ArrowDownIcon className=" w-4 h-4" />,
                          }[header.column.getIsSorted() as string]
                        }
                      </span>
                    </div>
                  )}
                  {header.column.columnDef.enableResizing && (
                    <ThResizer
                      isResizing={header.column.getIsResizing()}
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                      }}
                    />
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </THead>
        <TBody className="text-[#636262] text-base font-normal">
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td
                  key={cell.id}
                  {...{
                    style: {
                      width: cell.column.getSize(),
                    },
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </TBody>
        <TFoot>
          {table.getFooterGroups().map((footerGroup) => (
            <Tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <Th key={header.id} className="text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </TFoot>
      </Table>
    </div>
  );
};

export default VirtualTable;
