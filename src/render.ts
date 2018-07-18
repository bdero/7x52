import {
    GRID_HEIGHT, GRID_WIDTH, SQUARE_SIZE, GRID_UNIT_MARGIN,
    COLOR_OFF, COLOR_ON
} from './constants'
import Color from './color'
import {grid, GridUnit} from './grid'
import {mouse} from './input'


let context : CanvasRenderingContext2D

function drawGridSquare(x : number, y : number, color : Color, margin : number = 0) {
    const xloc = x*SQUARE_SIZE
    const yloc = y*SQUARE_SIZE
    context.fillStyle = color.toString()
    context.fillRect(
        xloc + margin,
        yloc + margin,
        SQUARE_SIZE - margin*2,
        SQUARE_SIZE - margin*2
    )
}

const render : FrameRequestCallback = () : void => {
    // Background color
    context.fillStyle = 'red'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)

    // Grid Selection
    const selectX = Math.floor(mouse.x/SQUARE_SIZE)
    const selectY = Math.floor(mouse.y/SQUARE_SIZE)
    if (selectX >= 0 && selectY >= 0 && selectX < GRID_WIDTH && selectY < GRID_HEIGHT) {
        drawGridSquare(
            selectX, selectY,
            new Color(255, 255, 255)
        )
    }

    // Grid cells
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            const unit = grid.getUnit(x, y)
            drawGridSquare(
                x, y,
                Color.lerp(COLOR_OFF, COLOR_ON, unit.saturation),
                GRID_UNIT_MARGIN
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
