import { PropsWithChildren, useEffect, useRef, useState} from 'react'
import useObserver from '../../hooks/useObserver';
import { customStyle } from '../../utils/styles';
import { AcceptedStyle, DefaultStyles, ITransform, ITransition } from '../../utils/types';

interface IClassName {
	[property : string] : string;
}


interface IScrollAnimateProps {
	animate?: DefaultStyles | AcceptedStyle[];
	once?: boolean;
	offset?: string;
	trigger?: number | number[];
	transition?: ITransition
	transform?: ITransform;
}

export default function ScrollAnimate({
    children, 
    animate = 'fade',
    once = true,
    transition ,
		transform,
    offset = `0px`,
		trigger = 0.1,
  }: PropsWithChildren<IScrollAnimateProps>) {

  const element = useRef<HTMLDivElement>(null);
  const [item, setItem] = useState<HTMLDivElement | null>(null);


  const [startStyle, endStyle] = generateStyle({
		animate, 
		transition,
		transform
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
	transition = {
		duration : 500,
		easing : 'ease-in-out',
		delay : 300,
	},
	transform = {
		translateBy : '100px',
		opacityFrom : 0,
		scaleUpBy : 1.2,
		scaleDownBy : 0.6
	},
	} : IScrollAnimateProps) {


	const {duration, easing, delay, translateBy, opacityFrom, scaleUpBy, scaleDownBy}  = checkValue(transform, transition);

	const commonTransitionStyle : {[key: string] : string} = {
		transitionDuration: `${duration}ms`,
		transitionTimingFunction: `${easing}`,
		transitionDelay: `${delay}ms`,
	};

	const animateArray = (typeof animate === 'string') ? customStyle[animate] : animate;
	return generateStartEndStyle(animateArray, commonTransitionStyle, translateBy, opacityFrom, scaleUpBy, scaleDownBy);
}

function checkValue(transform : ITransform, transition : ITransition) {

		const {duration, easing, delay} = transition;
    const { translateBy, opacityFrom, scaleUpBy, scaleDownBy} = transform;
    
    const newData = {
        translateBy : translateBy ?? '100px',
        opacityFrom : opacityFrom ?? 0,
        scaleUpBy : scaleUpBy ?? 1.2,
        scaleDownBy : scaleDownBy ?? 0.6,
        duration : duration ?? 500,
        delay : delay ?? 300,
        easing : easing ?? 'ease-in-out'
    }
    
    return newData;
}

function generateStartEndStyle (
	animateStyle : AcceptedStyle[], 
	commonTransitionStyle : {[key: string] : string}, 
	translateBy : string, 
	opacityFrom : number, 
	scaleUpBy : number,
	scaleDownBy : number,
	) {

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
                    startStyle['transform'] = `${startStyle['transform']} scale(${scaleUpBy})`
                } else {
                    startStyle['transform'] = `scale(${scaleUpBy})`
                }
                break;

            case 'scaleDown':
                if('transform' in startStyle) {
                    startStyle['transform'] = `${startStyle['transform']} scale(${scaleDownBy})`
                } else {
                    startStyle['transform'] = `scale(${scaleDownBy})`
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