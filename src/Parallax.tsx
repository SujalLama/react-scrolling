import { PropsWithChildren, useEffect, useRef, useState } from "react";


const thresholds = Array(100).fill(1).map((_, index) => (index + 1) / 100);

// Todo: Getting the progress of element in relation to viewport
// how much an element is visible

type ParallaxType = {
    speed: number;
    animation: string;
}

export default function Parallax({children, speed, animation}: PropsWithChildren<ParallaxType>) {
    
    const {divRef, entry, isIntersecting} = useObserver({trigger: thresholds, offset:'0px'});
    const scrollY  = useScrollPosition();
    const [progress, setProgress] = useState(0)
    const onceRef = useRef<{top: number | undefined; rootHeight: number | undefined} | undefined>();

    useEffect(() => {
        
        if(!onceRef.current?.top) {
            onceRef.current = {top: entry?.boundingClientRect.top, rootHeight: entry?.rootBounds?.height};
        }
        
        const elmTop = onceRef.current?.top;
        const rootHeight = onceRef.current?.rootHeight;
        console.log(onceRef.current);
        
        if(isIntersecting && elmTop && rootHeight) { 

            const elmPostRelativeToView = (elmTop + scrollY) / rootHeight;
            
            console.log(elmPostRelativeToView);

            if(elmPostRelativeToView < 0) {
                setProgress(0);
                return;
            }

            if(elmPostRelativeToView > 1) {
                setProgress(1);
                return;
            }

            setProgress(parseFloat(elmPostRelativeToView.toFixed(3)));
            
        }

    }, [isIntersecting, scrollY, onceRef, entry])
    
    console.log(progress);
    const translateBy = 100;

    const moveRight  = ((progress as number) * translateBy) - translateBy;
    const moveLeft = (translateBy - (progress as number) * translateBy);
    const moveUp = (translateBy - (progress as number) * translateBy);
    const moveDown = ((progress as number) * translateBy) - translateBy;

    const transformStyle = animation === 'up' 
            ? `translateY(${moveUp}px)` 
            : animation === 'down' 
            ? `translateY(${moveDown}px)`
            : animation === 'left'
            ? `translateX(${moveLeft}px)`
            : `translateX(${moveRight}px)`
    
  return (
    <div ref={divRef} style={{transform: transformStyle, willChange: 'transform'}}>{children}</div>
  )
}

function useObserver(
    {
    trigger = 1,
    offset = '100px',
    once,
    root= null
    }
    : {trigger: number | number[], offset: string; once?: boolean; root?: null;}) {

      const [isIntersecting, setIsIntersecting] = useState(false);
      const[entry, setEntry] = useState<IntersectionObserverEntry>();

      const divRef = useRef<HTMLDivElement | null>(null);
      
      useEffect(() => {

        const initialOptions = {
          root: root,
          rootMargin: offset,
          threshold: 0,
        }

        function intersectionCb (entries : IntersectionObserverEntry[]) {
          
            entries.forEach(entry => {
  
              setIsIntersecting(entry.isIntersecting);
  
              if(entry.isIntersecting) {
                  setEntry(entry);
              }
  
            })
  
        }

        const observer = new IntersectionObserver(intersectionCb, initialOptions);

        const target = divRef.current;

        if(!target) {
          return;
        }
        
        observer.observe(target);

        return () => observer.unobserve(target)

      }, [trigger, offset, once, root]);
    
  return {divRef, entry, isIntersecting};
}


function useScrollPosition() {
    const [scrollYPosition, setScrollYPosition] = useState(0);
    
    
    useEffect(() => {

        function scrollHandler (this : Window) {
            setScrollYPosition(this.window.scrollY);
        }

        window.addEventListener('scroll', scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);
    }, [])

  return scrollYPosition;
}
