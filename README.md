# React Scrolling Library

## Overview

Welcome to React Scrolling Library! This library is a collection of powerful and customizable React components that make it easy to build scrolling animation for your component. This library is heavily influenced by aos(animate on scroll) library. You can animate component when it's visible in viewport. This library uses the IntersectionObserver api to do so.

## Table of Contents

- [Installation](#installation)
- [Examples](#examples)
- [Usage](#usage)
- [Components](#components)
- [Props/Options](#props)
- [Types/Interface](#types/interface)
- [License](#license)

## Installation

To install React Awesome Library, you can use npm or yarn:

```bash
npm install react-scrolling
# or
yarn add react-scrolling
```

## Examples



## Usage

ScrollAnimate usage:

```jsx
   <ScrollAnimate 
      animate={['opacity', 'moveUp']} 
      transform={{opacityFrom:0.5, translateBy:'100px'}} 
      once={false}>
          // your component
         <div color='blue' text="fade-up">Fade up</div>
   </ScrollAnimate>
```

Scrolling usage:

```jsx
   <Scrolling animate='fade-left' 
      transform={{translateBy : 100}} 
      transition={{easing: 'ease-in', delay: 10}} >
      // your component
      <div color='blue' text="fade-up">Fade up</div>
   </Scrolling>
```

## Components

This library includes two components that you can use to wrap your component that needs animation when visible in viewport.

1. Scrolling : This component allows us to add predetermined animation based on scroll position.
2. Scroll Animate : This component allows us to add predetermined animation based on element position in viewport.


## Props

ScrollAnimate props

| Props | Type | Default Value | Description |
| -------- | -------- | -------- | ---------  |
| animate | DefaultStyles or AcceptedStyle[] | fade | You can choose various predefined animate style |
| once | boolean | true | If true, the animation will be executed only once. |
| offset | string | 0px | This is similar to root margin in intersection observer. Check MDN for more detail.|
| trigger | number or number[] | 1 | 1 trigger animation when every pixel of the component is seen, 0 trigger animation when even 1 pixel is shown. This is similar to threshold in intersection observer. Check MDN for more detail.|
| transition | ITransition | {duration : 500,easing : 'ease-in-out',delay : 300,} | You can manipulate the duration, easing function and delay of animation.|
| transform | ITransform | {translateBy : '100px',opacityFrom : 0,scaleUpBy : 1.2,scaleDownBy : 0.6} | You can edit the transform property as per your preference. |


Scrolling props

| Props | Type | Default Value | Description |
| -------- | -------- | -------- | ---------  |
| animate | DefaultStyles or AcceptedStyle[] | fade | You can choose various predefined animate style |
| transition | ITransition | `{
        duration : 30,
        delay : 0,
        easing : 'ease'
}` | You can manipulate the duration, easing function and delay of animation.|
| transform | ITransform | `{
        translateBy : 500,
        translateUnit : 'px',
        scaleUpBy : 1.6,
        scaleDownBy : 0.4,}` | You can edit the transform property as per your preference. |
| animateWhen | TAnimateWhen | 'enter' | You can specify when to trigger animation.

## Types/Interface

-  DefaultStyles : It accepts string value that are predefined to represent various animation styles. Following are the values you can pass:
   -  "fade" 
   -  "fade-up"
   -  "fade-down" 
   -  "fade-left"
   -  "fade-right"
   -  "zoom-in"
   -  "zoom-in-up"
   -  "zoom-in-down"
   -  "zoom-in-left"
   -  "zoom-in-right"
   -  "zoom-out"
   -  "zoom-out-up"
   -  "zoom-out-down"
   -  "zoom-out-left"
   -  "zoom-out-right"
   -  "slide-up"
   -  "slide-down"
   -  "slide-left"
   -  "slide-right"


-  AcceptedStyle[] : It accepts array of string that are predefined. Following are the values that you can pass in an arrary
   -  'opacity'
   -  'moveRight'
   -  'moveLeft'
   -  'moveDown'
   -  'moveUp'
   -  'scaleUp'
   -  'scaleDown'


-  ITransition : It accepts object with following key. Every key is optional here.
   -  duration: It accepts number that represents the duration of animation.
	-  easing: It accepts string that represents the timing function of animation.
	-  delay: It accepts number that represents the delay of animation.

- TAnimateWhen : It accepts three values which represents when the start the animation.
   -  exit : when component is going out of viewport
   -  enter : when component is going in the viewport
   -  both : in both above case

ITransform for Scrolling component:

-  ITransform : It accepts object with following key. Every key is optional here.
   -  translateBy : It accepts string which represents how much to move your component. ex.: '200px'.
	-  opacityFrom : It accepts number which represents the starting opacity value.
	-  scaleUpBy : It accepts number which represents how much to scale up your component.
	-  scaleDownBy : It accepts number which represents how much to scale down your component.;

ITransform for ScrollAnimate component:

-  ITransform : It accepts object with following key. Every key is optional here.
   -  translateBy : It accepts number which represents how much to move your component.
	-  translateUnit : It accepts string which represents the unit e.g: px or em for translate value mentioned above.
	-  scaleUpBy : It accepts number which represents how much to scale up your component.
	-  scaleDownBy : It accepts number which represents how much to scale down your component.;

## License
React Scrolling Library is licensed under the MIT License - see the LICENSE file for details. Feel free to use, modify, and distribute the library according to the terms of the license.

Happy coding with React Awesome Library! 🚀