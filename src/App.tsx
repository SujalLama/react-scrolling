


import './App.css'
import {Scrolling, ScrollAnimate} from "../";
import Parallax from './Parallax';

function App() {
  
  return (
    <div className='container'>
      <div id="left"></div>
      <div id="right"></div>
      <div id="top"></div>
      <div id="bottom"></div>

      {/* Scrolling  */}
      {/* <div>
        <Box color='red' text="fade"/>
        <Box color='red' text="fade"/>
        <Scrolling>
          <Box  color='red' text="fade"/>
        </Scrolling>
      
        <Scrolling animate="slide-up">
          <Box color='green' text="fade-down"/>
        </Scrolling>
    
        <Scrolling animate='fade-up' >
          <Box color='blue' text="fade-up" />
        </Scrolling>

        <Scrolling animate='fade-left' 
          transform={{translateBy : 100}} 
          transition={{easing: 'ease-in', delay: 10}} >
          <Box color='green' text="fade-left" />
        </Scrolling>

        <Scrolling animate='fade-right'>
          <Box  color='red' text="fade-right" />
        </Scrolling>
        
        <Scrolling animate='zoom-in'>
          <Box  color='red' text="zoom-in" />
        </Scrolling>

        <Scrolling animate='zoom-in-up'>
          <Box  color='red' text="zoom-in-up" />
        </Scrolling>

        <Scrolling animate='zoom-in-down'>
          <Box  color='red' text="zoom-in-down" />
        </Scrolling>

        <Scrolling animate='zoom-in-left'>
          <Box  color='red' text="zoom-in-left" />
        </Scrolling>

        <Scrolling animate='zoom-in-right'>
          <Box  color='red' text="zoom-in-right" />
        </Scrolling>

        <Scrolling animate='zoom-out'>
          <Box  color='red' text="zoom-out" />
        </Scrolling>

        <Scrolling animate='zoom-out-up'>
          <Box  color='red' text="zoom-out-up" />
        </Scrolling>

        <Scrolling animate='zoom-out-down'>
          <Box  color='red' text="zoom-out-down" />
        </Scrolling>

        <Scrolling animate='zoom-out-left'>
          <Box  color='red' text="zoom-out-left" />
        </Scrolling>

        <Scrolling animate='zoom-out-right'>
          <Box  color='red' text="zoom-out-right" />
        </Scrolling>

        <Scrolling animate='slide-up'>
          <Box  color='red' text="slide-up" />
        </Scrolling>

        <Scrolling animate='slide-down'>
          <Box  color='red' text="slide-down" />
        </Scrolling>

        <Scrolling animate='slide-left'>
          <Box  color='red' text="slide-left" />
        </Scrolling>

        <Scrolling animate='slide-right'>
          <Box  color='red' text="slide-right" />
        </Scrolling>

        <Box color='red' text="fade"/>
        <Box color='red' text="fade"/>
      </div> */}

      {/* Scroll Animate */}
      
      {/* <div>
        <ScrollAnimate>
          <Box  color='red' text="fade"/>
        </ScrollAnimate>
      
        <ScrollAnimate animate='fade-down'>
          <Box color='green' text="fade-down"/>
        </ScrollAnimate>
    
        <ScrollAnimate animate={['opacity', 'moveUp']} transform={{opacityFrom:0.5, translateBy:'100px'}} once={false}>
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
        </ScrollAnimate>
      </div> */}

      {/* Parallax */}

      

      <div style={{display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>

        
        <Parallax speed={400} animation='up'>
          <div style={{width: '100px', height: '100px', backgroundColor: 'green'}}></div>
        </Parallax>

        <Parallax speed={100} animation='down'>
          <div style={{width: '100px', height: '100px', backgroundColor: 'green'}}></div>
        </Parallax>
        <Parallax speed={100} animation='left'>
          <div style={{width: '100px', height: '100px', backgroundColor: 'green'}}></div>
        </Parallax>
        <Parallax speed={100} animation='right'>
          <div style={{width: '100px', height: '100px', backgroundColor: 'green'}}></div>
        </Parallax>

      </div>
      <div style={{height: '100vh'}}></div>

    </div>
  )
}

const Box = ({color, text} :{color: string, text: string}) => {
  return <div style={{height: '800px', width: '50vw', marginBottom: '30px', backgroundColor: color, fontSize: "2rem", padding: '100px',border: '100px solid green'}}>{text}</div>
};

export default App
