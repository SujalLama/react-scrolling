import { useEffect } from 'react'

interface Option {
    root: null | HTMLElement;
    rootMargin: string;
    threshold: number | number[];
}

interface IObserver {
    target: HTMLDivElement | null, 
    options?: Option;
    className?: string;
    initClassName?: string;
    initialStyle: string;
    transformedStyle: string;
    once?: boolean;
}

const initialOptions = {
  root: null,
  rootMargin: '0px',
  threshold: [0.9, 0.1],
}

export default function useObserver(
    {
    target, 
    options = initialOptions,
    className,
    initialStyle,
    transformedStyle,
    once = true
    }
    :IObserver) {


    useEffect(() => {
        const observer = new IntersectionObserver(intersectionCb, options);

        if(!target) {
          return;
        }
        
      observer.observe(target);

      function intersectionCb (entries : IntersectionObserverEntry[]) {
          entries.forEach((entry) => {
            const target = entry.target as HTMLElement;
            if(once) {
              if(entry.isIntersecting) { 
                target.style.cssText = transformedStyle;
              }

            } else {

              if(entry.isIntersecting) { 
                
                target.style.cssText = transformedStyle;
              } else {
                target.style.cssText = initialStyle;
              }

            }
            
          })
      }

      return () => observer.unobserve(target);

    }, [target, options, className, initialStyle, transformedStyle, once])



    
  return [target];
}
