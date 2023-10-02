import { useEffect, useState} from "react";


export function useScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState({scrollX: 0, scrollY: 0, scrollDirection: 'idle'});
    
    
    useEffect(() => {
      let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

        function scrollHandler (this : Window) {
            const scrollTopPosition = window.scrollY || document.documentElement.scrollTop;
            
            if (scrollTopPosition > lastScrollTop) {
                setScrollPosition({scrollX: this.scrollY, scrollY: this.scrollY, scrollDirection: 'down'}) ;
            } else if (scrollTopPosition < lastScrollTop) {
                setScrollPosition({scrollX: this.scrollY, scrollY: this.scrollY, scrollDirection: 'up'}) ;
            }
            lastScrollTop =
            scrollTopPosition <= 0 ? 0 : scrollTopPosition;
        }
        window.addEventListener('scroll', scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);
    }, [])

  return scrollPosition;
}
