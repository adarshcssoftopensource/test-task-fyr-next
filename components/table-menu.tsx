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
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
  FolderIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

import { AtSymbolIcon } from "@heroicons/react/16/solid";
import { memo } from "react";
import { CustomFile } from "@/types/filedata.type";
interface TableMenuProps {
  row: CustomFile;
  handleEditClick: (id: string) => void;
}
function TableMenu({ row, handleEditClick }: TableMenuProps) {
  console.log(row);

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
          <DropdownMenuItem onClick={() => handleEditClick(row.name)}>
            <PencilSquareIcon className="w-4 h-4 mr-2" />
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
}

export default memo(TableMenu);
