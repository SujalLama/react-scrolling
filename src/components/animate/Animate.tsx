import { PropsWithChildren, useEffect, useRef, useState} from 'react'
import useObserver from '../../hooks/useObserver';

type DefaultStyles = "fade" | "fade-up" | "fade-down" 
										|"fade-left" | "fade-right";


interface IClassName {
	[property : string] : string;
}

interface IAnimate {
	from: IClassName,
	to: IClassName,
}

interface IAnimateProps {
    animate?: DefaultStyles;
		animateStyle?: IAnimate;
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
	}

	const toStyle : {[property: string] : {[index: string] : string}} = {
		'fade': {opacity: '1',transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		'fade-up': {opacity: '1',transform: `translateY(0)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		'fade-down': {opacity: '1',transform: `translateY(0)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		'fade-left': {opacity: '1',transform: `translateX(0)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
		'fade-right': {opacity: '1',transform: `translateX(0)`,transitionProperty: `opacity, transform`, ...commonTransitionStyle},
	}

	return [fromStyle[animate], toStyle[animate]];
}

export default function Animate({
    children, 
    animate = 'fade',
    duration = 3000,
    once = false,
    easing = 'ease-in',
    delay = 300,
    offset = `0px 0px 100px 0px`,
		trigger = [0.9],
  }: PropsWithChildren<IAnimateProps>) {

  const element = useRef<HTMLDivElement>(null);
  const [item, setItem] = useState<HTMLDivElement | null>(null);


	const [initStyle, toStyle] = generateStyle({animate, easing,delay, duration, offset});


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
