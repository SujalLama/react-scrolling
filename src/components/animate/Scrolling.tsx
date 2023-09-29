import { PropsWithChildren, useEffect, useRef, useState } from "react";
import useScrollPosition from "../../hooks/useScrollPosition";
import useObserver from "../../hooks/useObserver";

export default function Scrolling({children}: PropsWithChildren) {
    const scrollPos = useScrollPosition();
    const divRef = useRef(null);
    const [scrollRatio, setScrollRatio] = useState(0);

    const [isIntersecting, targetBound ] = useObserver({target: divRef.current});
// console.log(isIntersecting);

useEffect(() => {
    if(targetBound) {
        const clientRect = targetBound as DOMRectReadOnly;
    
        const start = clientRect.top;
        const end = clientRect.bottom;

        // console.log(scrollPos.scrollY >= clientRect.top)
        // console.log(clientRect.top)
        if(scrollPos.scrollY >= clientRect.top) {

            if((scrollPos.scrollY / end) < 1) {
                setScrollRatio(scrollPos.scrollY / (end - start));
            }

        }

    }
}, [scrollPos, targetBound])

console.log(scrollRatio);
    
  return (
    <div ref={divRef} style={{opacity: scrollRatio}}>{children}</div>
  )
}
