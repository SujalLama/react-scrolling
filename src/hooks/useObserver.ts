import { useEffect, useState } from 'react'

interface Option {
    root: null | HTMLElement;
    rootMargin: string;
    threshold: number;
}

interface IObserver {
    target: HTMLDivElement | null, 
    options?: Option;
    fromStyle: string;
    toStyle: string;
    once?: boolean;
    trigger?: number | number[];
    offset?: string;
}

export default function useObserver(
    {
    target, 
    fromStyle,
    toStyle,
    once = true,
    trigger = 1,
    offset,
    }
    :IObserver) {

      const [isIntersecting, setIsIntersecting] = useState(false);

      
      useEffect(() => {
        const initialOptions = {
          root: null,
          rootMargin: offset,
          threshold: trigger,
        }

        const observer = new IntersectionObserver(intersectionCb, initialOptions);

        if(!target) {
          return;
        }
        
      observer.observe(target);

      function intersectionCb (entries : IntersectionObserverEntry[]) {
          entries.forEach((entry) => {
            const target = entry.target as HTMLElement;
            // setIsIntersecting(entry.isIntersecting);
            
            if(once) {
              if(entry.isIntersecting) { 
                target.style.cssText = toStyle;
              }

            } else {

              if(entry.isIntersecting) { 
                
                target.style.cssText = toStyle;
              } else {
                target.style.cssText = fromStyle;
              }

            }
            
          })
      }

      return () => observer.unobserve(target);

    }, [target, fromStyle, toStyle, once, trigger, offset])



    
  return [isIntersecting];
}
