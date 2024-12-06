import React, { HTMLProps } from "react";
import { Input } from "./ui/input";

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
    <Input
      containerClassName="w-auto"
      type="checkbox"
      ref={ref}
      className={
        className +
        "cursor-pointer relative w-auto mr-[10px]  h-[17px] border border-[#E6E6E6]"
      }
      {...rest}
    />
  );
}

export default IndeterminateCheckbox;
