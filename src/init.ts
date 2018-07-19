import {GRID_HEIGHT, GRID_WIDTH, SQUARE_SIZE} from './constants'
import {beginRender, clearGrid} from './render'
import {registerInputEvents} from './input'
import {generateOutput, OutputFormat} from './outputgen'

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

    const genButton = <HTMLButtonElement> select('#genbutton')
    genButton.onclick = () => {
        const formatSelect = <HTMLSelectElement> select('#format')
        const amountSlider = <HTMLInputElement> select('#amountslider')
        const result = generateOutput(
            <OutputFormat> formatSelect.value,
            amountSlider.valueAsNumber
        )

        const outputTextarea = <HTMLTextAreaElement> select('#output')
        outputTextarea.textContent = result
    }

    registerInputEvents(canvas)
    beginRender(canvas)
}

export default init
