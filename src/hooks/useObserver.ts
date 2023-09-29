import { useEffect, useState } from 'react'

interface Option {
    root: null | HTMLElement;
    rootMargin: string;
    threshold: number;
}

interface IObserver {
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
    :IObserver) {

      const [isIntersecting, setIsIntersecting] = useState(false);
      const [rootBound, setRootBound] = useState<DOMRectReadOnly | null>(null);
      const [targetBound, setTargetBound] = useState<DOMRectReadOnly | null>(null);

      
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
        setRootBound(entries[0].rootBounds);
        setTargetBound(entries[0].boundingClientRect);
        if(once) {
          setIsIntersecting(entries[0].isIntersecting);
        } else {
          if(entries[0].isIntersecting) {
            setIsIntersecting(true);
          }
        }
      }

      return () => observer.unobserve(target);

    }, [target, trigger, offset, once, root])



    
  return [isIntersecting, rootBound, targetBound];
}
