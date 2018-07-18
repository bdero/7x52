interface Mouse {
    x : number
    y : number
    left : boolean
}

const mouse : Mouse = {
    x : -1, y : -1,
    left : false
}

function registerEvents(canvas : HTMLCanvasElement) : void {
    window.addEventListener('mousemove', (event : MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        mouse.x = event.clientX - rect.left
        mouse.y = event.clientY - rect.top
    })

    window.addEventListener('mousedown', (event : MouseEvent) => {
        mouse.left = true
    })

    window.addEventListener('mouseup', (event : MouseEvent) => {
        mouse.left = false
    })
}

export { mouse, registerEvents }
