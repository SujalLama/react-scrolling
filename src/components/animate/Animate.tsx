import { PropsWithChildren, useEffect, useRef, useState} from 'react'
import useObserver from '../../hooks/useObserver';

type Animate = "fade" | "fade-up" | "fade-down" | "fade-left" | "fade-right";
type ClassName = string;

interface IAnimateProps {
    animate?: Animate | ClassName;
    once?: boolean;
    duration?: number;
    easing?: string;
    delay?: number;
    offset?: number;
}

export default function Animate({
    children, 
    animate = "fade",
    duration = 300,
    once = false,
    easing = 'ease-in',
    delay = 300,
    offset = 40,
  }: PropsWithChildren<IAnimateProps>) {

  const element = useRef<HTMLDivElement>(null);
  const [item, setItem] = useState<HTMLDivElement | null>(null);
  const className = `from-${animate}`;

  // styling
	// const initialStyle : {[index: string] : string}  = {
	// 	'fade': `translate(0)`,
	// 	'fade-up' : `translateY(${offset}px)`,
	// 	'fade-down' : `translateY(-${offset}px)`,
	// 	'fade-left' : `translateX(${offset}px)`,
	// 	'fade-right': `translateX(-${offset}px)`,
	// }

	
	const commonTransitionStyle = {
		transitionDuration: `${duration}ms`,
		transitionTimingFunction: easing,
		transitionDelay: `${delay}ms`,
	};

	const initStyle : {[index: string] : {[index: string] : string}} = {
		'fade': {opacity: '0',transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		'fade-up': {opacity: '0',transform: `translateY(${offset}px)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		'fade-down': {opacity: '0',transform: `translateY(-${offset}px)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		'fade-left': {opacity: '0',transform: `translateX(${offset}px)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		'fade-right': {opacity: '0',transform: `translateX(-${offset}px)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
	}

	const transformedStyle : {[index: string] : string} = {
		'fade': `opacity: 1;transition: opacity ${duration}ms ${easing} ${delay}ms`,
		'fade-up': `opacity: 1;transform: translateY(0);transition: opacity,transform, ${duration}ms ${easing} ${delay}ms`,
		'fade-down': `opacity: 1;transform: translateY(0);transition: opacity,transform, ${duration}ms ${easing} ${delay}ms`,
		'fade-left': `opacity: 1;transform: translateX(0);transition: opacity,transform, ${duration}ms ${easing} ${delay}ms`,
		'fade-right': `opacity: 1;transform: translateX(0);transition: opacity,transform, ${duration}ms ${easing} ${delay}ms`,
	}

	const initStyleString : {[index: string] : string} = {
		'fade': `opacity: 0;transition: opacity ${duration}ms ${easing} ${delay}ms`,
		'fade-up': `opacity: 0;transform: translateY(${offset}px);transition: opacity,transform, ${duration}ms ${easing} ${delay}ms`,
		'fade-down': `opacity: 0;transform: translateY(-${offset});transition: opacity,transform, ${duration}ms ${easing} ${delay}ms`,
		'fade-left': `opacity: 0;transform: translateX(${offset});transition: opacity,transform, ${duration}ms ${easing} ${delay}ms`,
		'fade-right': `opacity: 0;transform: translateX(-${offset});transition: opacity,transform, ${duration}ms ${easing} ${delay}ms`,
	}


  useEffect(() => {
    if(element.current) {
      setItem(element.current);
    }
  }, [])

  useObserver({
    target : item || null, 
    initialStyle: initStyleString[animate],
		transformedStyle: transformedStyle[animate], 
    once
  });
  
  return (
    <div 
        ref={element}
				style={{...initStyle[animate]}}
    >
        {children}
    </div>
  )
}
