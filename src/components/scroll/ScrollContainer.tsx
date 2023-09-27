import { PropsWithChildren, useContext } from "react";
import ScrollProvider, { ScrollContext } from "./ScrollProvider";

export default function ScrollContainer({children} : PropsWithChildren) {
    const {scrollX, scrollY} = useContext(ScrollContext);
  return (
    <ScrollProvider>
        {children}
    </ScrollProvider>
  )
}
