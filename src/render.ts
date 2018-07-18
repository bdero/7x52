import {GRID_HEIGHT, GRID_WIDTH, SQUARE_SIZE} from './constants'
import Color from './color'
import grid from './grid'

const COLOR_OFF = new Color(100, 100, 100)
const COLOR_ON = new Color(200, 200, 200)

let context : CanvasRenderingContext2D

const render : FrameRequestCallback = () : void => {
    context.fillStyle = 'red'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            const unit = grid.getUnit(x, y)
            const xloc = x*SQUARE_SIZE
            const yloc = y*SQUARE_SIZE
            context.fillStyle = Color.lerp(COLOR_OFF, COLOR_ON, unit.saturation).toString()
            context.fillRect(
                xloc, yloc,
                xloc + SQUARE_SIZE, yloc + SQUARE_SIZE
            )
        }
    }
    window.requestAnimationFrame(render)
}

function beginRender(canvas : HTMLCanvasElement) : void {
    const ctx = canvas.getContext("2d")
    if (ctx == null) {
        window.alert("The HTML5 canvas could not be initialized. :(")
        return
    }
    context = ctx

    window.requestAnimationFrame(render)
}

export default beginRender
