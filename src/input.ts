interface Mouse {
    x : number
    y : number
    left : boolean
}

interface Keys {
    shift : boolean
}

const mouse : Mouse = {
    x : -1, y : -1,
    left : false
}

const keys : Keys = {shift: false}

function registerEvents(canvas : HTMLCanvasElement) : void {
    window.addEventListener('mousemove', (event : MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        mouse.x = event.clientX - rect.left
        mouse.y = event.clientY - rect.top
        keys.shift = event.shiftKey
    })

    window.addEventListener('mousedown', (event : MouseEvent) => {
        mouse.left = true
    })
    window.addEventListener('mouseup', (event : MouseEvent) => {
        mouse.left = false
    })

    window.addEventListener('keydown', (event : KeyboardEvent) => {
        keys.shift = event.shiftKey
    })
    window.addEventListener('keyup', (event : KeyboardEvent) => {
        keys.shift = event.shiftKey
    })
}

export { mouse, keys, registerEvents }
