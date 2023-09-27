import { useEffect, useState} from "react";


export default function useScroll() {
    const [scrollPosition, setScrollPosition] = useState({scrollX: 0, scrollY: 0});


    function scrollHandler (this : Window) {
        setScrollPosition({scrollX: this.scrollX, scrollY: this.scrollY}) ;
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);
    }, [])

  return scrollPosition;
}
