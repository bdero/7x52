import {GRID_HEIGHT, GRID_WIDTH} from './constants'

interface GridUnit {
    x : number
    y : number
    saturation : number // Between 0 and 1
}

class Grid {
    private units : GridUnit[]

    public constructor() {
        this.units = []
        for (let i = 0; i < GRID_HEIGHT*GRID_WIDTH; i++) {
            this.units[i] = {
                x: i%GRID_WIDTH,
                y: Math.floor(i/GRID_WIDTH),
                saturation: 0
            }
        }
    }

    public getUnit(x : number, y : number) : GridUnit {
        return this.units[y*GRID_WIDTH + x]
    }
}

const gridInstance = new Grid()

export default gridInstance
