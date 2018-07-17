import {GRID_HEIGHT, GRID_WIDTH, SQUARE_SIZE} from './constants'

let canvas : HTMLCanvasElement

const init : EventListener = () : void => {
    canvas = <HTMLCanvasElement> document.getElementById('canvas')
    canvas.width = SQUARE_SIZE*GRID_WIDTH
    canvas.height = SQUARE_SIZE*GRID_HEIGHT
}
window.addEventListener('DOMContentLoaded', init)
