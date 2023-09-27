
import { useRef, forwardRef, PropsWithRef, useEffect, useState} from 'react';
import './App.css'
import useObserver from './hooks/useObserver';

function App() {

  return (
    <div className='container'>
    
      <Box  className='red'/>
    
      <Box className='rotate'/>
  
      <Box className='translate'/>
    
    
      <Box className='scale'/>
    </div>
  )
}

const Box = ({className} :{className: string}) => {
  const element = useRef<HTMLDivElement>(null);
  const [item, setItem] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if(element.current) {
      setItem(element.current);
    }
  }, [])

  useObserver({target : item || null, className: className});
  

  return <div className='blue' ref={element} style={{height: '100vh', width: '50vw', marginBottom: '30px', backgroundColor: 'blue'}}></div>
};

export default App
