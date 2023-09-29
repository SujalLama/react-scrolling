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

function generateStyle ({easing, duration, offset, delay} : IAnimateProps) {
	const commonTransitionStyle = {
		transitionDuration: `${duration}ms`,
		transitionTimingFunction: `${easing}`,
		transitionDelay: `${delay}ms`,
	};

	const initStyle : {[property: string] : {[index: string] : string}} = {
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

	// const commonToStyleForFade = `opacity: 1;transform: translate(0,0);transition: opacity,transform, ${duration}ms ${easing} ${delay}ms`
	// const toStyle : {[index: string] : string} = {
	// 	'fade': commonToStyleForFade,
	// 	'fade-up': commonToStyleForFade,
	// 	'fade-down': commonToStyleForFade,
	// 	'fade-left': commonToStyleForFade,
	// 	'fade-right': commonToStyleForFade,
	// }


	const commonFromStyleForFade = `opacity: 0;transition: opacity,transform, ${duration}ms ${easing} ${delay}ms;`;
	const fromStyle : {[index: string] : string} = {
		'fade': commonFromStyleForFade,
		'fade-up': `transform: translateY(100px);${commonFromStyleForFade}`,
		'fade-down': `transform: translateY(-100px);${commonFromStyleForFade}`,
		'fade-left': `transform: translateX(100px);${commonFromStyleForFade}`,
		'fade-right': `transform: translateX(-100px);${commonFromStyleForFade}`,
	}

	return [initStyle, fromStyle, toStyle];
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


	const [initStyle, fromStyle, toStyle] = generateStyle({easing,delay, duration, offset});


  useEffect(() => {
    if(element.current) {
      setItem(element.current);
    }
  }, [])

	const init = initStyle[animate] as IClassName;
	const from = fromStyle[animate];
	const to = toStyle[animate] as IClassName;

  const [isIntersecting, intersectRatio] = useObserver({
    target : item || null, 
    fromStyle: 'from as string',
		toStyle: 'to as string', 
    once,
		trigger,
		offset
  });

	console.log(isIntersecting);
	console.log(intersectRatio);
  
  return (
    <div 
        ref={element}
				style={isIntersecting ? to : init}
    >
        {children}
    </div>
  )
}
