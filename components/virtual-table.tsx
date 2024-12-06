"use client";
import React, { useCallback, useMemo, useState } from "react";
import {
  CellContext,
  ColumnDef,
  ColumnResizeMode,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import Table, {
  Header,
  Body,
  Row,
  HeaderCell,
  Resizer,
} from "@/components/ui/table";

import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { Toolbar } from "./toolbar";
import { AtSymbolIcon } from "@heroicons/react/16/solid";
import {
  DuoDoubleCheck,
  DuoFolderError,
  DuoGroupFolders,
  DuoWaiting,
} from "@/assets/icons/duotone";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Each from "./widgets/each";
import DraggableRow from "./draggable-row";
import { CustomFile, Status } from "@/types/filedata.type";
import formatDate from "@/utils/format-date";
import defaultData from "@/default/data";
import filterData from "@/utils/filter-data";
import IndeterminateCheckbox from "./indeterminate-checkbox";
import TableMenu from "./table-menu";

const TableCell = ({
  getValue,
  row,
  column,
  table,
  editableId,
}: CellContext<CustomFile, unknown> & { editableId: string }) => {
  const initialValue = getValue<string>();
  const [value, setValue] = React.useState(initialValue);
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const onBlur = () => {
    const meta = table.options.meta as unknown as {
      updateData: (idx: number, id: string, value: string) => void;
    };
    meta?.updateData(row.index, column.id, value);
  };

  return (
    <>
      {editableId === initialValue && !row.original.isCollection ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      ) : (
        <span>{value}</span>
      )}
    </>
  );
};

const VirtualTable = () => {
  const [data, setData] = React.useState<CustomFile[]>(() => [...defaultData]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnResizeMode] = React.useState<ColumnResizeMode>("onChange");
  const [collection, setCollection] = React.useState<CustomFile[]>([]);
  const [editableId, setEditableId] = useState("");

  const handleEditClick = useCallback((id: string) => {
    setEditableId(id);
    console.log(id);
  }, []);

  const handleDrop = useCallback(
    (id: string) => {
      const droppedItem = data.find((item) => item.title === id);
      if (droppedItem) {
        setCollection((prev) => [...prev, droppedItem]);
        setData((prev) => prev.filter((item) => item.title !== id));
      }
    },
    [data]
  );

  const defaultColumns: ColumnDef<CustomFile>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: () => <div className="text-center">Title</div>,
        enableResizing: true,
        size: 200,
        cell: ({ row }) => (
          <div className="flex items-center  gap-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
            {row.original.isCollection ? (
              <DuoGroupFolders className="size-5" />
            ) : null}
            <span className=" truncate w-full max-w-[800px]">
              {row.original.title}{" "}
              {row.original.isCollection ? collection?.length : null}
            </span>
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
          <div className="flex gap-1 items-center">
            <AtSymbolIcon className="size-[20px]" />
            Name
          </div>
        ),
        cell: (props) => <TableCell {...props} editableId={editableId} />,
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
          <>
            {row.original.tags.length ? (
              <div className="flex flex-wrap items-center bg-[#5D82EE]/20 rounded-md justify-center gap-0.5 p-1">
                {row.original.tags.map((tag) => {
                  return (
                    <div className="text-[#5D82EE] text-xs" key={tag}>
                      {tag}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </>
        ),
      },
      {
        id: "actions",
        enableHiding: false,
        enableSorting: false,
        cell: ({ row: { original } }) => (
          <TableMenu row={original} handleEditClick={handleEditClick} />
        ),
      },
    ],
    [collection?.length, editableId, handleEditClick]
  );
  const updatedData = useMemo(
    () => filterData(data, searchQuery),
    [data, searchQuery]
  );
  const table = useReactTable({
    data: updatedData,
    columns: defaultColumns,
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

    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  const deleteSelectedRows = useCallback(() => {
    const selectedRowIds = Object.keys(rowSelection);
    if (selectedRowIds.length > 0) {
      const newData = data.filter(
        (_, index) => !selectedRowIds.includes(index.toString())
      );
      setData(newData);
      setRowSelection({}); // Reset row selection
    }
  }, [data, rowSelection]);

  const clearSelection = useCallback(() => {
    setRowSelection({});
  }, []);

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
          isCollection: false,
        };

        setData((prev) => [...prev, data]);
      }
    },
    []
  );
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  return (
    <div className="flex flex-col gap-4 max-h-[700px] overflow-x-auto">
      <Toolbar
        deleteSelectedRows={deleteSelectedRows}
        clearSelection={clearSelection}
        handleFileChange={handleFileChange}
        handleSearchChange={handleSearchChange}
      />
      <Table
        {...{
          style: {
            width: table.getTotalSize(),
          },
        }}
      >
        <Header className="text-[#101010]  sticky top-0 z-10 bg-white">
          <Each
            of={table.getHeaderGroups()}
            render={(headerGroup) => (
              <Row key={headerGroup.id} className=" rounded-lg">
                {headerGroup.headers.map((header) => (
                  <HeaderCell
                    className="text-nowrap"
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
                        {header.column.getCanSort() && (
                          <span className="ml-2 flex items-center">
                            <ArrowUpIcon
                              className={`w-4 h-4 ${
                                header.column.getIsSorted() === "asc"
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </span>
                        )}
                      </div>
                    )}
                    {header.column.columnDef.enableResizing && (
                      <Resizer
                        isResizing={header.column.getIsResizing()}
                        {...{
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                        }}
                      />
                    )}
                  </HeaderCell>
                ))}
              </Row>
            )}
          />
        </Header>
        <DndProvider backend={HTML5Backend}>
          <Body className="text-[#636262] text-base font-normal">
            <Each
              of={table.getRowModel().rows}
              render={(row) => {
                return <DraggableRow row={row} handleDrop={handleDrop} />;
              }}
            />
          </Body>
        </DndProvider>
      </Table>
    </div>
  );
};

export default VirtualTable;
