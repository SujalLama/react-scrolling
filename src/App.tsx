

import { useEffect, useRef, useState } from 'react';
import './App.css'
import Animate from './components/animate/Animate';
import useObserver from './hooks/useObserver';

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

      <Animate>
        <Box  color='red' text="fade"/>
      </Animate>
    
      <Animate animate='fade-down'>
        <Box color='green' text="fade-down"/>
      </Animate>
  
      <Animate animate='fade-up'>
        <Box color='blue' text="fade-up" />
      </Animate>

      <Animate animate='fade-left'>
        <Box color='green' text="fade-left" />
      </Animate>

      <Animate animate='fade-right'>
        <Box  color='red' text="fade-right" />
      </Animate>
      
      <Animate animate='zoom-in'>
        <Box  color='red' text="zoom-in" />
      </Animate>

      <Animate animate='zoom-in-up'>
        <Box  color='red' text="zoom-in-up" />
      </Animate>

      <Animate animate='zoom-in-down'>
        <Box  color='red' text="zoom-in-down" />
      </Animate>

      <Animate animate='zoom-in-left'>
        <Box  color='red' text="zoom-in-left" />
      </Animate>

      <Animate animate='zoom-in-right'>
        <Box  color='red' text="zoom-in-right" />
      </Animate>

      <Animate animate='zoom-out'>
        <Box  color='red' text="zoom-out" />
      </Animate>

      <Animate animate='zoom-out-up'>
        <Box  color='red' text="zoom-out-up" />
      </Animate>

      <Animate animate='zoom-out-down'>
        <Box  color='red' text="zoom-out-down" />
      </Animate>

      <Animate animate='zoom-out-left'>
        <Box  color='red' text="zoom-out-left" />
      </Animate>

      <Animate animate='zoom-out-right'>
        <Box  color='red' text="zoom-out-right" />
      </Animate>

      <Animate animate='slide-up'>
        <Box  color='red' text="slide-up" />
      </Animate>

      <Animate animate='slide-down'>
        <Box  color='red' text="slide-down" />
      </Animate>

      <Animate animate='slide-left'>
        <Box  color='red' text="slide-left" />
      </Animate>
      
      <Animate animate='slide-right'>
        <Box  color='red' text="slide-right" />
      </Animate>
    </div>
  )
}

const Box = ({color, text} :{color: string, text: string}) => {
  return <div style={{height: '50vh', width: '50vw', marginBottom: '30px', backgroundColor: color, fontSize: "2rem"}}>{text}</div>
};

export default App
