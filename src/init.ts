import {GRID_HEIGHT, GRID_WIDTH, SQUARE_SIZE} from './constants'
import beginRender from './render'

const init : EventListener = () : void => {
    let canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas')
    canvas.width = SQUARE_SIZE*GRID_WIDTH
    canvas.height = SQUARE_SIZE*GRID_HEIGHT
    beginRender(canvas)
}

export default init