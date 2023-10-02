import { AcceptedStyle } from "./types";

export const customStyle : {[index: string] : AcceptedStyle[]} = {
    'fade' : ['opacity'],
    'fade-up' : ['opacity', 'moveUp'],
    'fade-down' : ['opacity', 'moveDown'],
    'fade-left' : ['opacity', 'moveLeft'],
    'fade-right' : ['opacity', 'moveRight'],
    "zoom-in"  : ['scaleUp'],
    "zoom-in-up"  : ['scaleUp', 'moveUp'],
    "zoom-in-down"  : ['scaleUp', 'moveDown'],
    "zoom-in-left"  : ['scaleUp', 'moveLeft'],
    "zoom-in-right"  : ['scaleUp', 'moveRight'],
    "zoom-out"  : ['scaleDown'],
    "zoom-out-up"  : ['scaleDown', 'moveUp'],
    "zoom-out-down"  : ['scaleDown', 'moveDown'],
    "zoom-out-left"  : ['scaleDown', 'moveLeft'],
    "zoom-out-right"  : ['scaleDown', 'moveRight'],
    "slide-up"  : ['moveUp'],
    "slide-down"  : ['moveDown'],
    "slide-left"  : ['moveLeft'],
    "slide-right"  : ['moveRight'],
}