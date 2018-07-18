import {GRID_HEIGHT, GRID_WIDTH, SQUARE_SIZE} from './constants'
import {beginRender, clearGrid} from './render'
import {registerInputEvents} from './input'

function select(id : string) : HTMLElement | null {
    return document.querySelector(id)
}

const init : EventListener = () : void => {
    const canvas = <HTMLCanvasElement> select('#gridcanvas')
    canvas.width = SQUARE_SIZE*GRID_WIDTH
    canvas.height = SQUARE_SIZE*GRID_HEIGHT

    const clearButton = <HTMLButtonElement> select('#clearbutton')
    clearButton.onclick = () => {
        clearGrid()
    }

    registerInputEvents(canvas)
    beginRender(canvas)
}

export default init
