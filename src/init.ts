import {GRID_HEIGHT, GRID_WIDTH, SQUARE_SIZE} from './constants'
import beginRender from './render'
import {mouse} from './input'

const init : EventListener = () : void => {
    let canvas : HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas')
    canvas.width = SQUARE_SIZE*GRID_WIDTH
    canvas.height = SQUARE_SIZE*GRID_HEIGHT

    window.addEventListener('mousemove', (event : MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        mouse.x = event.clientX - rect.left
        mouse.y = event.clientY - rect.top
    })
    
    beginRender(canvas)
}

export default init
