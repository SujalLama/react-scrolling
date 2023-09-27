import { useEffect } from 'react'

interface Option {
    root: null | HTMLElement;
    rootMargin: string;
    threshold: number | number[];
}

interface IObserver {
    target: HTMLDivElement | null, 
    options?: Option;
    className: string;
}

const initialOptions = {
    root: null,
  rootMargin: '0px',
  threshold: 0.2,
}

export default function useObserver(
    {
    target, 
    options = initialOptions,
    className
    }
    :IObserver) {


    useEffect(() => {
        const observer = new IntersectionObserver(intersectionCb, options);
        if(target) {
            observer.observe(target);
        }
      

      function intersectionCb (entries : IntersectionObserverEntry[]) {
          entries.forEach((entry) => {
            if(entry.isIntersecting) { 
              entry.target.className = className;
            }
            
          })
      }

    }, [target, options, className])



    
  return [target];
}
