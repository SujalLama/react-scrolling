

import { useEffect, useRef, useState } from 'react';
import './App.css'
import ScrollAnimate from './components/animate/ScrollAnimate';
import useObserver from './hooks/useObserver';
import Scrolling from './components/animate/Scrolling';

function App() {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const childRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRef(childRef.current)
  }, [])

  // const [isIntersecting, intersectRatio] = useObserver({target: ref, once: false, offset: '0px 0px 40px 0px'});
  // console.log(intersectRatio);

  // console.log(isIntersecting);
  return (
    <div className='container'>
      <div id="left"></div>
      <div id="right"></div>
      <div id="top"></div>
      <div id="bottom"></div>

      {/* 
        <div ref={childRef} style={{width: '100vw', height: '100vh', backgroundColor: 'gray', position: 'relative'}}>
          <div  style={{width: '100px', height: '100px', backgroundColor: 'red', top:0, zIndex: 1, position: (isIntersecting) ? 'sticky' : 'relative'}}>
            absd
          </div>
        </div> 
      */}

      <Box color='red' text="fade"/>
      <Scrolling>
        <Box color='red' text="fade"/>
      </Scrolling>

        <Box color='red' text="fade"/>
        <Box color='red' text="fade"/>
        <Box color='red' text="fade"/>
        <Box color='red' text="fade"/>

      {/* <ScrollAnimate>
        <Box  color='red' text="fade"/>
      </ScrollAnimate>
    
      <ScrollAnimate animate='fade-down'>
        <Box color='green' text="fade-down"/>
      </ScrollAnimate>
  
      <ScrollAnimate animate='fade-up'>
        <Box color='blue' text="fade-up" />
      </ScrollAnimate>

      <ScrollAnimate animate='fade-left'>
        <Box color='green' text="fade-left" />
      </ScrollAnimate>

      <ScrollAnimate animate='fade-right'>
        <Box  color='red' text="fade-right" />
      </ScrollAnimate>
      
      <ScrollAnimate animate='zoom-in'>
        <Box  color='red' text="zoom-in" />
      </ScrollAnimate>

      <ScrollAnimate animate='zoom-in-up'>
        <Box  color='red' text="zoom-in-up" />
      </ScrollAnimate>

      <ScrollAnimate animate='zoom-in-down'>
        <Box  color='red' text="zoom-in-down" />
      </ScrollAnimate>

      <ScrollAnimate animate='zoom-in-left'>
        <Box  color='red' text="zoom-in-left" />
      </ScrollAnimate>

      <ScrollAnimate animate='zoom-in-right'>
        <Box  color='red' text="zoom-in-right" />
      </ScrollAnimate>

      <ScrollAnimate animate='zoom-out'>
        <Box  color='red' text="zoom-out" />
      </ScrollAnimate>

      <ScrollAnimate animate='zoom-out-up'>
        <Box  color='red' text="zoom-out-up" />
      </ScrollAnimate>

      <ScrollAnimate animate='zoom-out-down'>
        <Box  color='red' text="zoom-out-down" />
      </ScrollAnimate>

      <ScrollAnimate animate='zoom-out-left'>
        <Box  color='red' text="zoom-out-left" />
      </ScrollAnimate>

      <ScrollAnimate animate='zoom-out-right'>
        <Box  color='red' text="zoom-out-right" />
      </ScrollAnimate>

      <ScrollAnimate animate='slide-up'>
        <Box  color='red' text="slide-up" />
      </ScrollAnimate>

      <ScrollAnimate animate='slide-down'>
        <Box  color='red' text="slide-down" />
      </ScrollAnimate>

      <ScrollAnimate animate='slide-left'>
        <Box  color='red' text="slide-left" />
      </ScrollAnimate>

      <ScrollAnimate animate='slide-right'>
        <Box  color='red' text="slide-right" />
      </ScrollAnimate> */}
    </div>
  )
}

const Box = ({color, text} :{color: string, text: string}) => {
  return <div style={{height: '50vh', width: '50vw', marginBottom: '30px', backgroundColor: color, fontSize: "2rem"}}>{text}</div>
};

export default App
