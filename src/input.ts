interface Mouse {
    x : number
    y : number
    left : boolean
    right : boolean
}

interface Keys {
    shift : boolean
}

const mouse : Mouse = {
    x : -1, y : -1,
    left : false,
    right : false
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
        if (event.button == 2) {
            mouse.right = true
        } else {
            mouse.left = true
        }
    })
    window.addEventListener('mouseup', (event : MouseEvent) => {
        if (event.button == 2) {
            mouse.right = false
        } else {
            mouse.left = false
        }
    })

    canvas.addEventListener("contextmenu", (event : Event) => {
        // Absorb secondary clicks on the canvas (since we use it for erasing)
        event.preventDefault()
    })

    window.addEventListener('keydown', (event : KeyboardEvent) => {
        keys.shift = event.shiftKey
    })
    window.addEventListener('keyup', (event : KeyboardEvent) => {
        keys.shift = event.shiftKey
    })
}

export { mouse, keys, registerEvents }
