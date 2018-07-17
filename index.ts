const SQUARE_SIZE = 10 // Pixels
const GRID_WIDTH = 52
const GRID_HEIGHT = 7

let canvas : HTMLCanvasElement

const init : EventListener = () : void => {
    canvas = <HTMLCanvasElement> document.getElementById("canvas")
    canvas.width = SQUARE_SIZE*GRID_WIDTH
    canvas.height = SQUARE_SIZE*GRID_HEIGHT
}
window.addEventListener('DOMContentLoaded', init)
