import { PropsWithChildren, useEffect, useRef, useState} from 'react'
import useObserver from '../../hooks/useObserver';

type DefaultStyles = "fade" | "fade-up" | "fade-down" 
										|	"fade-left" | "fade-right"
										| "zoom-in" | "zoom-in-up" | "zoom-in-down"
										| "zoom-in-left" | "zoom-in-right" | "zoom-out"
										| "zoom-out-up" | "zoom-out-down" | "zoom-out-left"
										| "zoom-out-right"
										| "slide-up" | "slide-down" | "slide-left"
										| "slide-right";


interface IClassName {
	[property : string] : string;
}


interface IAnimateProps {
    animate?: DefaultStyles;
    once?: boolean;
    duration?: number;
    easing?: string;
    delay?: number;
    offset?: string;
	trigger?: number | number[];
}

function generateStyle ({animate, easing, duration, delay} : IAnimateProps) {

	if(!animate) {
		animate = 'fade';
	}

	const commonTransitionStyle = {
		transitionDuration: `${duration}ms`,
		transitionTimingFunction: `${easing}`,
		transitionDelay: `${delay}ms`,
	};

	const fromStyle : {[property: string] : {[index: string] : string}} = {
		'fade': {opacity: '0',transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		'fade-up': {opacity: '0',transform: `translateY(100px)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		'fade-down': {opacity: '0',transform: `translateY(-100px)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		'fade-left': {opacity: '0',transform: `translateX(100px)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		'fade-right': {opacity: '0',transform: `translateX(-100px)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		"zoom-in" : {opacity: '0',transform: `scale(0.6)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"zoom-in-up" : {opacity: '0',transform: `translateY(100px) scale(0.6)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"zoom-in-down" : {opacity: '0',transform: `translateY(-100px) scale(0.6)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"zoom-in-left" : {opacity: '0',transform: `translateX(100px) scale(0.6)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"zoom-in-right" : {opacity: '0',transform: `translateX(-100px) scale(0.6)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"zoom-out" : {opacity: '0',transform: `scale(1.2)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"zoom-out-up" : {opacity: '0',transform: `translateY(100px) scale(1.2)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"zoom-out-down" : {opacity: '0',transform: `translateY(-100px) scale(1.2)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		"zoom-out-left" : {opacity: '0',transform: `translateX(100px) scale(1.2)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"zoom-out-right" : {opacity: '0',transform: `translateX(-100px) scale(1.2)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"slide-up" : {transform: `translateY(100%)`,transitionProperty: `transform`, ...commonTransitionStyle}, 
		"slide-down" : {transform: `translateY(-100%)`,transitionProperty: `transform`, ...commonTransitionStyle}, 
		"slide-left" : {transform: `translateX(100%)`,transitionProperty: `transform`, ...commonTransitionStyle}, 
		"slide-right" : {transform: `translateX(-100%)`,transitionProperty: `transform`, ...commonTransitionStyle},
	}

	const toStyle : {[property: string] : {[index: string] : string}} = {
		'fade': {opacity: '1',transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		'fade-up': {opacity: '1',transform: `translateY(0)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		'fade-down': {opacity: '1',transform: `translateY(0)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		'fade-left': {opacity: '1',transform: `translateX(0)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		'fade-right': {opacity: '1',transform: `translateX(0)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		"zoom-in" : {opacity: '1',transform: `scale(1)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"zoom-in-up" : {opacity: '1',transform: `translateY(0) scale(1)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"zoom-in-down" : {opacity: '1',transform: `translateY(0) scale(1)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"zoom-in-left" : {opacity: '1',transform: `translateX(0) scale(1)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"zoom-in-right" : {opacity: '1',transform: `translateX(0) scale(1)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"zoom-out" : {opacity: '1',transform: `scale(1)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"zoom-out-up" : {opacity: '1',transform: `translateY(0) scale(1)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"zoom-out-down" : {opacity: '1',transform: `translateY(0) scale(1)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		"zoom-out-left" : {opacity: '1',transform: `translateX(0) scale(1)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"zoom-out-right" : {opacity: '1',transform: `translateX(0) scale(1)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle}, 
		"slide-up" : {transform: `translateY(0)`,transitionProperty: `transform`, ...commonTransitionStyle}, 
		"slide-down" : {transform: `translateY(0)`,transitionProperty: `transform`, ...commonTransitionStyle}, 
		"slide-left" : {transform: `translateX(0)`,transitionProperty: `transform`, ...commonTransitionStyle}, 
		"slide-right" : {transform: `translateX(0)`,transitionProperty: `transform`, ...commonTransitionStyle},
	}

	return [fromStyle[animate], toStyle[animate]];
}

export default function ScrollAnimate({
    children, 
    animate = 'fade',
    duration = 500,
    once = true,
    easing = 'ease-in-out',
    delay = 300,
    offset = `0px`,
	trigger = 0.1,
  }: PropsWithChildren<IAnimateProps>) {

  const element = useRef<HTMLDivElement>(null);
  const [item, setItem] = useState<HTMLDivElement | null>(null);


	const [initStyle, toStyle] = generateStyle({animate, easing, delay, duration, offset});


  useEffect(() => {
    if(element.current) {
      setItem(element.current);
    }
  }, [])

	const from = initStyle as IClassName;
	const to = toStyle as IClassName;

  const [isIntersecting] = useObserver({
    target : item || null, 
	trigger,
	offset,
	once
  });
  
  return (
    <div 
		ref={element}
		style={isIntersecting ? to : from}
    >
      {children}
    </div>
  )
}
