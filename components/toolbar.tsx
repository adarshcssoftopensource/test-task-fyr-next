"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import React from "react";
import {
  DuoFolderPlus,
  DuoPrice1,
  DuoThunderMove,
  DuoTrash,
  DuoUpdate,
  DuoUploadedFile,
} from "@/assets/icons/duotone";

export function Toolbar({
  deleteSelectedRows,
  clearSelection,
  handleFileChange,
  handleSearchChange,
}: {
  deleteSelectedRows: () => void;
  clearSelection: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const tabs = [
    {
      value: "doc-search",
      label: "Doc Search",
      icon: DuoThunderMove,
      onClick: deleteSelectedRows,
    },

    {
      value: "upload",
      label: "Upload",
      icon: DuoUploadedFile,
      onClick: handleUploadClick,
    },
    {
      value: "collection",
      label: "Collection",
      icon: DuoFolderPlus,
      onClick: deleteSelectedRows,
    },
    {
      value: "delete",
      label: "Delete",
      icon: DuoTrash,
      onClick: deleteSelectedRows,
    },
    ,
    {
      value: "clear-selected",
      label: "Clear Selected",
      icon: DuoUpdate,
      onClick: clearSelection,
    },

    { value: "tag", label: "Tag", icon: DuoPrice1, onClick: clearSelection },
  ];

  return (
    <div className="flex items-center gap-[25px]">
      <div className="flex items-center gap-[30px]">
        <ArrowLeftIcon className="size-[21px]" />
        <ArrowRightIcon className="size-[21px]" />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 h-auto border border-[#E4E4E4] rounded bg-gray-50 divide-x divide-slate-200">
        {tabs.map((tab) => {
          if (!tab) return null;
          const Icon = tab.icon;

          return (
            <React.Fragment key={tab?.value}>
              <Button
                variant={"ghost"}
                onClick={tab?.onClick}
                className="flex items-center gap-2 min-h-[52px] text-base font-medium text-[#101010] rounded-none"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{tab?.label}</span>
              </Button>
            </React.Fragment>
          );
        })}
      </div>
      <div className="ml-auto pr-[83px]">
        <Input
          icon={<Search className="size-4" />}
          position="left"
          className="w-auto bg-[#f9fafb]"
          placeholder="Search..."
          onChange={handleSearchChange}
        />
      </div>

      {/* Only show the file input when the upload tab is clicked */}
      <input
        ref={fileInputRef}
        id="file-upload"
        type="file"
        accept="*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
