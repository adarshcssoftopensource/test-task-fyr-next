"use client";
import React, { useState } from "react";
import { Progress } from "./ui/progress";
import { DuoFlower2 } from "@/assets/icons/duotone";
import { Button } from "./ui/button";
import { MinusIcon } from "@heroicons/react/16/solid";

export default function ProgressModal() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="border border-gray-200 flex relative items-center flex-col max-w-[404px] w-full ml-auto p-[19px_15px_35px] mt-auto mb-[40px] mr-[22px] rounded">
      <Button
        variant={"ghost"}
        className="absolute right-0 top-0"
        onClick={handleClose}
      >
        <MinusIcon />
      </Button>
      <div className="max-w-[274px]">
        <DuoFlower2 className="size-7 ml-auto mr-auto" />
        <p className="text-[10px] text-[#5D82EE] mt-[19px] mb-4">
          Clear your mind, take some deep breaths...
        </p>
        <div className="flex items-center text-[10px] font-bold gap-2">
          <Progress className="max-w-[274px] w-full bg-[#F2F2F2]" value={90} />{" "}
          75%
        </div>
        <span className="text-[10px] text-[#000]">
          Estimated time remaining... 1 min
        </span>
      </div>
    </div>
  );
}
