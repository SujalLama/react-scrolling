import { PropsWithChildren, useEffect, useRef, useState} from "react";
import { DefaultStyles, ITransition } from "../../utils/types";
import { customStyle } from "../../utils/styles";
import { useObserver, useScrollPosition } from "../../main";


const thresholds = Array(100).fill(1).map((_, index) => (index + 1) / 100);

interface ITransform {
    translateBy?: number;
    translateUnit?: string;
    scaleUpBy?: number;
    scaleDownBy?: number;
}

interface IScrollingProps {
    animate?: DefaultStyles;
    transform?: ITransform;
    transition?: ITransition;
    animateWhen?: TAnimateWhen;
}

type TGenerateStyle = IScrollingProps & {scrollRatio: number};


// Todo: 
// stagger animation
// pin feature
// horizontal scrolling
// disable at for small screen

// features:
// animate when -> entering the viewport or exiting the viewport or both

type TAnimateWhen = 'exit' | 'enter' | 'both';


export function Scrolling({
        children, 
        animate = 'fade',
        animateWhen = 'enter',  
        transform,
        transition
    }: PropsWithChildren<IScrollingProps>) {

    const divRef = useRef(null);
    const [divElement, setDivElement] = useState<HTMLDivElement | null>(null);
    const onceRef = useRef(0);
    const [scrollRatio, setScrollRatio] = useState(0);

    const {scrollDirection} = useScrollPosition();
    
    const [, intersectRatio,] = useObserver({target: divElement, trigger: thresholds, offset:'0px'});
    
    useEffect(() => {
        if(divRef.current) {
            setDivElement(divRef.current);
        }
    }, [])

    useEffect(() => {
        const interesectRaioInHundred = (Math.round((intersectRatio as number) * 100));

        if(animateWhen == 'enter') {
            if(!onceRef.current) {
                setScrollRatio(intersectRatio as number);
                if(interesectRaioInHundred == 100) {
                    onceRef.current = 1;
                }
            }
    
            
            if(onceRef.current == 1) {
                if(scrollDirection == 'up' && (interesectRaioInHundred == 100)) {
                    onceRef.current = 0;
                }
            }
        }

        if(animateWhen == 'exit') {
            if(!onceRef.current) {
                setScrollRatio(1);
                if(interesectRaioInHundred == 100) {
                    onceRef.current = 1;
                }
            }
    
            
            if(onceRef.current == 1) {
                setScrollRatio(intersectRatio as number);
                if(scrollDirection == 'up' && (interesectRaioInHundred == 100)) {
                    onceRef.current = 0;
                }
            }
        }

        if(animateWhen == 'both') {
            setScrollRatio(intersectRatio as number);
        }

    }, [intersectRatio, onceRef, scrollDirection, animateWhen])


    const appliedStyle = generateStyle({
        animate, 
        scrollRatio, 
        transform,
        transition,
        animateWhen,
    });

  return (
    <div ref={divRef}>
        <div style={appliedStyle}>{children}</div>
    </div>
  )
}

function generateStyle ({
    animate = 'fade', 
    scrollRatio, 
    transform = {
        translateBy : 500,
        translateUnit : 'px',
        scaleUpBy : 1.6,
        scaleDownBy : 0.4,
    },
    transition = {
        duration : 30,
        delay : 0,
        easing : 'ease'
    },
    animateWhen = 'enter'
    } : TGenerateStyle & {animateWhen : TAnimateWhen}) {

    const {duration, easing, delay, translateBy, translateUnit, scaleUpBy, scaleDownBy}  = checkValue(transform, transition);

    const scrollStyle : {[index: string] : string} = {
        transitionProperty: 'opacity, transform', 
        transitionDuration: `${duration}ms`, 
        trasitionTimingFunction: easing , 
        transitionDelay: `${delay}ms`
    };

    let moveRight  = ((scrollRatio as number) * translateBy) - translateBy;
    let moveLeft = (translateBy - (scrollRatio as number) * translateBy);
    let moveUp = (translateBy - (scrollRatio as number) * translateBy);
    let moveDown = ((scrollRatio as number) * translateBy) - translateBy;
    
    const scaleUpRatio = scrollRatio + scaleDownBy;
    const scaleDownRatio = scaleUpBy - (scrollRatio * scaleUpBy);

    let scaleUp = scaleUpRatio > 1 ? 1 : scaleUpRatio < scaleDownBy ? scaleDownBy : scaleUpRatio;
    let scaleDown = scaleDownRatio < 1 ? 1 : scaleDownRatio;

    if(animateWhen == 'exit') {
       moveRight = (translateBy - (scrollRatio as number) * translateBy);
        moveLeft = ((scrollRatio as number) * translateBy) - translateBy;
        moveUp = ((scrollRatio as number) * translateBy) - translateBy;
        moveDown = (translateBy - (scrollRatio as number) * translateBy);
        scaleUp = scaleDownRatio < 1 ? 1 : scaleDownRatio;
        scaleDown = scaleUpRatio > 1 ? 1 : scaleUpRatio < scaleDownBy ? scaleDownBy : scaleUpRatio;
    }

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

function checkValue(transform : ITransform, transition : ITransition) {
    const {duration, easing, delay} = transition;
    const { translateBy, translateUnit, scaleUpBy, scaleDownBy} = transform;
    
    const newData = {
        translateBy : translateBy ?? 500,
        translateUnit : translateUnit ?? 'px',
        scaleUpBy : scaleUpBy ?? 1.6,
        scaleDownBy : scaleDownBy ?? 0.4,
        duration : duration ?? 30,
        delay : delay ?? 0,
        easing : easing ?? 'ease'
    }
    
    return newData;
}

