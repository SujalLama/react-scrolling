import { PropsWithChildren, useEffect, useRef, useState} from 'react'
import useObserver from '../../hooks/useObserver';
import { customStyle } from '../../utils/styles';
import { AcceptedStyle, DefaultStyles } from '../../utils/types';

interface IClassName {
	[property : string] : string;
}


interface IScrollAnimateProps {
	animate?: DefaultStyles | AcceptedStyle[];
	once?: boolean;
	duration?: number;
	easing?: string;
	delay?: number;
	offset?: string;
	trigger?: number | number[];
	translateBy?: string;
	opacityFrom?: number;
	scaleBy?: [number, number];
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
		translateBy = '100px',
		opacityFrom = 0,
		scaleBy = [0.6, 1.2],

  }: PropsWithChildren<IScrollAnimateProps>) {

  const element = useRef<HTMLDivElement>(null);
  const [item, setItem] = useState<HTMLDivElement | null>(null);


  const [startStyle, endStyle] = generateStyle({
		animate, 
		easing, 
		delay, 
		duration, 
		translateBy, 
		opacityFrom, 
		scaleBy
	});


  useEffect(() => {
    if(element.current) {
      setItem(element.current);
    }
  }, [])

	const start = startStyle as IClassName;
	const end = endStyle as IClassName;

  const [isIntersecting] = useObserver({
    target : item || null, 
		trigger,
		offset,
		once
	});
  
  return (
    <div 
			ref={element}
    >
			<div style={isIntersecting ? end : start}>
      {children}
			</div>
    </div>
  )
}

function generateStyle ({
	animate = 'fade', 
	easing, 
	duration, 
	delay, 
	translateBy = '100px', 
	opacityFrom = 0, 
	scaleBy = [0.6, 1.2]} : IScrollAnimateProps) {

	const commonTransitionStyle : {[key: string] : string} = {
		transitionDuration: `${duration}ms`,
		transitionTimingFunction: `${easing}`,
		transitionDelay: `${delay}ms`,
	};

	const animateArray = (typeof animate === 'string') ? customStyle[animate] : animate;
	return generateStartEndStyle(animateArray, commonTransitionStyle, translateBy, opacityFrom, scaleBy);
}

function generateStartEndStyle (
	animateStyle : AcceptedStyle[], 
	commonTransitionStyle : {[key: string] : string}, 
	translateBy : string, 
	opacityFrom : number, 
	scaleBy : [number, number]) {

	const startStyle : {[index: string] :string} = {...commonTransitionStyle, transitionProperty: `opacity, transform`};
	const endStyle : {[index: string] :string} = {...commonTransitionStyle, transitionProperty: `opacity, transform`};

	// generate start style
	animateStyle.forEach(style => {
        switch(style) {
            case 'opacity':
                startStyle['opacity'] = `${opacityFrom}`;
                break;

            case 'moveRight':
                if('transform' in startStyle) {
                    startStyle['transform'] = `${startStyle['transform']} translateX(-${translateBy})`
                } else {
                    startStyle['transform'] = `translateX(-${translateBy})`
                }
                break;

            case 'moveLeft':
                if('transform' in startStyle) {
                    startStyle['transform'] = `${startStyle['transform']} translateX(${translateBy})`
                } else {
                    startStyle['transform'] = `translateX(${translateBy})`
                }
                
                break;

            case 'moveDown':
                if('transform' in startStyle) {
                    startStyle['transform'] = `${startStyle['transform']} translateY(-${translateBy})`
                } else {
                    startStyle['transform'] = `translateY(-${translateBy})`
                }
                break;

            case 'moveUp':
                if('transform' in startStyle) {
                    startStyle['transform'] = `${startStyle['transform']} translateY(${translateBy})`
                } else {
                    startStyle['transform'] = `translateY(${translateBy})`
                }
                break;

            case 'scaleUp':
                if('transform' in startStyle) {
                    startStyle['transform'] = `${startStyle['transform']} scale(${scaleBy[0]})`
                } else {
                    startStyle['transform'] = `scale(${scaleBy[0]})`
                }
                break;

            case 'scaleDown':
                if('transform' in startStyle) {
                    startStyle['transform'] = `${startStyle['transform']} scale(${scaleBy[1]})`
                } else {
                    startStyle['transform'] = `scale(${scaleBy[1]})`
                }
                break;

            default:
                break;
        }
    });

	// generate end style
	for(const key in startStyle) {
		if(key === 'opacity') {
			endStyle['opacity'] = '1';
		}

		if(key === 'transform') {
			endStyle['transform'] = 'translate(0,0) scale(1)';
		}
	}

	return [startStyle, endStyle];
	
}