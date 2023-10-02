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
      const [targetBound, setTargetBound] = useState<DOMRectReadOnly | null>(null);
      const [rootBound, setRootBound] = useState<DOMRectReadOnly | null>(null);

      
      useEffect(() => {
        const initialOptions = {
          root: root,
          rootMargin: offset,
          threshold: trigger,
        }

        const observer = new IntersectionObserver(intersectionCb, initialOptions);

        if(!target) {
          return;
        }
        
        observer.observe(target);

        function intersectionCb (entries : IntersectionObserverEntry[]) {
          
          entries.forEach(entry => {

            setIntersectRatio(entry.intersectionRatio);
            setTargetBound(entry.boundingClientRect);
            setRootBound(entry.rootBounds);

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
    
  return [isIntersecting, intersectRatio, targetBound, rootBound];
}
