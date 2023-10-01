import { PropsWithChildren, useEffect, useRef, useState} from "react";
import useScrollPosition from "../../hooks/useScrollPosition";
import useObserver from "../../hooks/useObserver";
import { DefaultStyles } from "../../utils/types";
import { customStyle } from "../../utils/styles";


const thresholds = Array(100).fill(1).map((_, index) => (index + 1) / 100);

interface IScrollingProps {
    animate?: DefaultStyles;
	once?: boolean;
    translateBy?: number;
    translateUnit?: string;
    scaleBy?: [number, number];
}

type TGenerateStyle = IScrollingProps & {scrollRatio: number};


// Todo: 
// once is not working properly


export default function Scrolling({
        children, 
        animate = 'fade', 
        // once = false,
        translateBy = 500,
        translateUnit = 'px',
		scaleBy = [0.4, 1.6],
    }: PropsWithChildren<IScrollingProps>) {

    const divRef = useRef(null);
    const onceRef = useRef(0);
    const [scrollRatio, setScrollRatio] = useState(0);
    
    const scrollPos = useScrollPosition();
    const [, intersectRatio, targetBound ] = useObserver({target: divRef.current, trigger: thresholds, offset:'0px'});


    useEffect(() => {
        if(!targetBound) {
            return;
        }

        if(!onceRef.current) {
            setScrollRatio(intersectRatio as number);
            if(intersectRatio == 1) {
                onceRef.current = 1;
            }
        }

        if(onceRef.current == 1 && (targetBound as DOMRectReadOnly).bottom > scrollPos.scrollY) {
            onceRef.current = 0;
        }

    }, [intersectRatio, scrollPos, targetBound])

    const appliedStyle = generateStyle({animate, scrollRatio, translateBy, scaleBy, translateUnit});

  return (
    <div ref={divRef} >
        <div style={appliedStyle}>{children}</div>
    </div>
  )
}

function generateStyle ({animate = 'fade', scrollRatio, scaleBy = [0.4, 1.6], translateBy = 500, translateUnit = 'px'} : TGenerateStyle) {
    const scrollStyle : {[index: string] : string} = {transition: 'opacity, transform, 10ms ease'};

    const moveRight  = ((scrollRatio as number) * translateBy) - translateBy;
    const moveLeft = (translateBy - (scrollRatio as number) * translateBy);
    const moveUp = (translateBy - (scrollRatio as number) * translateBy);
    const moveDown = ((scrollRatio as number) * translateBy) - translateBy;
    
    const scaleUpRatio = scrollRatio + scaleBy[0];
    const scaleDownRatio = scaleBy[1] - (scrollRatio * scaleBy[1]);
    const scaleUp = scaleUpRatio > 1 ? 1 : scaleUpRatio < scaleBy[0]? scaleBy[0] : scaleUpRatio;
    const scaleDown = scaleDownRatio < 1 ? 1 : scaleDownRatio;

    customStyle[animate].forEach(style => {
        switch(style) {
            case 'opacity':
                scrollStyle['opacity'] = `${scrollRatio}`;
                break;

            case 'moveRight':
                if('transform' in scrollStyle) {
                    scrollStyle['transform'] = `${scrollStyle['transform']} translateX(${moveRight + translateUnit})`
                } else {
                    scrollStyle['transform'] = `translateX(${moveRight + translateUnit})`
                }
                break;

            case 'moveLeft':
                if('transform' in scrollStyle) {
                    scrollStyle['transform'] = `${scrollStyle['transform']} translateX(${moveLeft + translateUnit})`
                } else {
                    scrollStyle['transform'] = `translateX(${moveLeft + translateUnit})`
                }
                
                break;

            case 'moveDown':
                if('transform' in scrollStyle) {
                    scrollStyle['transform'] = `${scrollStyle['transform']} translateY(${moveDown + translateUnit})`
                } else {
                    scrollStyle['transform'] = `translateY(${moveDown + translateUnit})`
                }
                break;

            case 'moveUp':
                if('transform' in scrollStyle) {
                    scrollStyle['transform'] = `${scrollStyle['transform']} translateY(${moveUp + translateUnit})`
                } else {
                    scrollStyle['transform'] = `translateY(${moveUp + translateUnit})`
                }
                break;

            case 'scaleUp':
                if('transform' in scrollStyle) {
                    scrollStyle['transform'] = `${scrollStyle['transform']} scale(${scaleUp})`
                } else {
                    scrollStyle['transform'] = `scale(${scaleUp})`
                }
                break;
            case 'scaleDown':
                if('transform' in scrollStyle) {
                    scrollStyle['transform'] = `${scrollStyle['transform']} scale(${scaleDown})`
                } else {
                    scrollStyle['transform'] = `scale(${scaleDown})`
                }
                break;
            default:
                break;
        }
    });

    return scrollStyle;
}

