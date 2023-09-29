

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

  const [isIntersecting, rootBound, targetBound] = useObserver({target: ref, once: false});
  console.log(rootBound);
  console.log(targetBound);

  console.log(isIntersecting);
  return (
    <div className='container'>
      <div id="left"></div>
      <div id="right"></div>
      <div id="top"></div>
      <div id="bottom"></div>

      <div style={{width: '100vw', height: '100vh', backgroundColor: 'gray', position: 'relative'}}>
        <div ref={childRef} style={{width: '100px', height: '100px', backgroundColor: 'red', position: isIntersecting ? 'fixed' : 'relative'}}>
          absd
        </div>
      </div>
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
    </div>
  )
}

const Box = ({color, text} :{color: string, text: string}) => {
  return <div style={{height: '50vh', width: '50vw', marginBottom: '30px', backgroundColor: color, fontSize: "2rem"}}>{text}</div>
};

export default App
