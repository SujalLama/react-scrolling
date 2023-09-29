import { PropsWithChildren, createContext } from "react";
import useScroll from "../../hooks/useScrollPosition";

const INITIAL_SCROLL_VALUE = {
    scrollX: 0,
    scrollY: 0,
};

export const ScrollContext = createContext(INITIAL_SCROLL_VALUE);

export default function ScrollProvider ({children}:PropsWithChildren) {
    const {scrollX, scrollY} = useScroll();

    return (<ScrollContext.Provider value={{scrollX, scrollY}}>
        {children}
    </ScrollContext.Provider>)
}