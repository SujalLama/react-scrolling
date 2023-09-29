import { useEffect, useState } from 'react'

export interface Option {
    root: null | HTMLElement;
    rootMargin: string;
    threshold: number;
}

export interface IObserver {
    target: HTMLDivElement | null, 
    options?: Option;
    once?: boolean;
    trigger?: number | number[];
    offset?: string;
    root?: HTMLDivElement | null
}

// const thresholds = Array(50).fill(1).map((_, index) => (index + 1) / 100);

export default function useObserver(
    {
    target,
    trigger = 1,
    offset = '0px',
    once,
    root= null
    }
    : IObserver) {

      const [isIntersecting, setIsIntersecting] = useState(false);
      const [intersectRatio, setIntersectRatio] = useState<number>(0);

      
      useEffect(() => {
        const initialOptions = {
          root: root,
          rootMargin: offset,
          threshold: [0.0],
        }

        const observer = new IntersectionObserver(intersectionCb, initialOptions);

        if(!target) {
          return;
        }
        
        observer.observe(target);

        function intersectionCb (entries : IntersectionObserverEntry[]) {
          
          entries.forEach(entry => {

            setIntersectRatio(Math.round(entry.intersectionRatio * 100));

            if(!once) {
              setIsIntersecting(entry.isIntersecting);
            } else {

              if(entry.isIntersecting) {
                setIsIntersecting(true);
              }

            }
          })

        }

        return () => observer.unobserve(target);

      }, [target, trigger, offset, once, root]);
    
  return [isIntersecting, intersectRatio];
}
