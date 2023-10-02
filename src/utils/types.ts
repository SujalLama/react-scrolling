export type DefaultStyles = "fade" | "fade-up" | "fade-down" 
					|	"fade-left" | "fade-right"
					| "zoom-in" | "zoom-in-up" | "zoom-in-down"
					| "zoom-in-left" | "zoom-in-right" | "zoom-out"
					| "zoom-out-up" | "zoom-out-down" | "zoom-out-left"
					| "zoom-out-right"
					| "slide-up" | "slide-down" | "slide-left"
					| "slide-right";
					
export type AcceptedStyle = 'opacity' | 'moveRight' | 'moveLeft' 
					| 'moveDown' | 'moveUp' | 'scaleUp' | 'scaleDown';

export	interface ITransition {
		duration?: number;
		easing?: string;
		delay?: number;
	}
					
export interface ITransform {
		translateBy ?: string;
		opacityFrom ?: number;
		scaleUpBy ?: number;
		scaleDownBy ?: number;
	}