let context : CanvasRenderingContext2D

const render : FrameRequestCallback = () : void => {
    context.fillStyle = 'red'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
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
