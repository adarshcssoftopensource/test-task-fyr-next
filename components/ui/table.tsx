import React, { FC, forwardRef, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Header: FC<IHeaderProps> = (props) => {
  const { children, className, ...rest } = props;
  const classes = cn("flex w-full border-b", className); // Using flexbox for header section
  return (
    <div data-component-name="Table/Header" className={classes} {...rest}>
      {children}
    </div>
  );
};

Header.displayName = "Header";

interface IBodyProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Body: FC<IBodyProps> = (props) => {
  const { children, className, ...rest } = props;
  const classes = cn("flex flex-col w-full", className); // Using flexbox for body section
  return (
    <div data-component-name="Table/Body" className={classes} {...rest}>
      {children}
    </div>
  );
};

Body.displayName = "Body";

interface IFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Footer: FC<IFooterProps> = (props) => {
  const { children, className, ...rest } = props;
  const classes = cn("flex w-full border-t", className); // Using flexbox for footer section
  return (
    <div data-component-name="Table/Footer" className={classes} {...rest}>
      {children}
    </div>
  );
};

Footer.displayName = "Footer";

interface IRowProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Row = forwardRef<HTMLDivElement, IRowProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const classes = cn("flex w-full", className); // Row will be a flex container to hold the cells
  return (
    <div
      data-component-name="Table/Row"
      className={classes}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});

Row.displayName = "Row";

interface IHeaderCellProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  isResizable?: boolean;
}

export const HeaderCell: FC<IHeaderCellProps> = (props) => {
  const { children, className, isResizable = false, ...rest } = props;
  const classes = cn(
    "p-4 bg-zinc-950/10 dark:bg-zinc-950/90 ",
    "flex text-left",
    "border-b",
    "group/[&:first-child]:rounded-tl-lg group/[&:last-child]:rounded-tr-lg", // Rounded corners for first/last cell
    { relative: isResizable },
    className
  );

  return (
    <div data-component-name="Table/HeaderCell" className={classes} {...rest}>
      {children}
    </div>
  );
};

HeaderCell.displayName = "HeaderCell";

interface IResizerProps extends HTMLAttributes<HTMLDivElement> {
  isResizing: boolean;
  className?: string;
  color?: string;
}

export const Resizer: FC<IResizerProps> = (props) => {
  const { isResizing, className, ...rest } = props;

  return (
    <div
      data-component-name="Table/Resizer"
      className={cn(
        "absolute -right-0.5 top-0 z-10 h-full w-0.5 cursor-col-resize",
        "rounded-full bg-[#C0C0C0] hover:bg-blue-500 ",
        { "bg-blue-500 opacity-100": isResizing },
        className
      )}
      {...rest}
    />
  );
};

Resizer.displayName = "Resizer";

interface ICellProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export const Cell: FC<ICellProps> = (props) => {
  const { children, className, ...rest } = props;
  const classes = cn(
    "flex truncate text-nowrap text-ellipsis overflow-hidden line-clamp-1	 p-2.5",
    "group-even:bg-zinc-500/5 group-hover:bg-zinc-500/10",
    "dark:group-even:bg-zinc-950/50 dark:group-hover:bg-zinc-950/90",
    "border-b", // Border for body cells
    className
  );

  return (
    <div data-component-name="Table/Cell" className={classes} {...rest}>
      {children}
    </div>
  );
};

Cell.displayName = "Cell";

interface ITableProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Table: FC<ITableProps> = (props) => {
  const { children, className, ...rest } = props;
  const classes = cn("w-full flex flex-col relative", className);
  return (
    <div data-component-name="Table" className={classes} {...rest}>
      {children}
    </div>
  );
};

Table.displayName = "Table";

export default Table;
