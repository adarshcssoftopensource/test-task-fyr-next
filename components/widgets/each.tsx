import { Children } from "react";

type EachProps<T> = {
  render: (item: T, index: number, array: T[]) => React.ReactNode;
  of: T[];
};

const Each = <T,>({ render, of }: EachProps<T>) =>
  Children.toArray(of.map((item, index) => render(item, index, of)));

export default Each;
