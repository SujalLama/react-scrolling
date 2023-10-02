import {useEffect, useRef, useState} from "react"
import useObserver from "../../hooks/useObserver"
const thresholds = Array(100).fill(1).map((_, index) => (index + 1) / 100);
export default function ScrollContainer1() {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} style={{width: '100vw', height: '100vh'}}>
        <ScrollItem rootRef={containerRef.current} />
    </div>
  )
}

const ScrollItem  = ({rootRef} : {rootRef: HTMLDivElement | null}) => {
    const childRef = useRef(null);
    const [child, setChild] = useState<HTMLDivElement | null>(null);
    const [parent, setParent] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        if(rootRef || childRef.current) {
            setParent(rootRef);
            setChild(childRef.current)
        }
    }, [rootRef])

    const [,intersectRatio,,] = useObserver({target: child, root: parent, trigger: thresholds});

    console.log(intersectRatio);

    return <div ref={childRef} style={{width: '100px', height: '100px', backgroundColor: 'red'}}></div>
}