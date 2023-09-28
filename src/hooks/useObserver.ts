import { useEffect } from 'react'

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
    trigger?: number;
}

export default function useObserver(
    {
    target, 
    fromStyle,
    toStyle,
    once = true,
    trigger = 0.9
    }
    :IObserver) {

      
      useEffect(() => {
        const initialOptions = {
          root: null,
          rootMargin: '0px',
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

    }, [target, fromStyle, toStyle, once, trigger])



    
  return [target];
}
