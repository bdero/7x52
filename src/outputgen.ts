import moment from 'moment-es6'
import {
    FIRST_DAY, GIT_DATE_FORMAT,
    GRID_WIDTH, GRID_HEIGHT,
} from './constants'
import {grid, GridUnit} from './grid'

type OutputFormat = 'json' | 'bash'

interface GridMoment {
    unit : GridUnit
    time : moment.Moment
    lastItem : boolean
}

class StringBuilder {
    private resultString : string

    constructor() {
        this.resultString = ''
    }

    public add(...strs : string[]) {
        let append = ''
        for (const str of strs) {
            append += str
        }
        this.resultString += append
    }

    public addLine(...strs : string[]) {
        strs.push('\n')
        this.add(...strs)
    }

    public toString() : string {
        return this.resultString
    }
}

function* unitIter() : IterableIterator<GridMoment> {
    let current_day = FIRST_DAY.clone()
    for (let x = 0; x < GRID_WIDTH; x++) {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            yield {
                unit: grid.getUnit(x, y),
                time: current_day.clone(),
                lastItem: x + y == GRID_WIDTH + GRID_HEIGHT - 2,
            }
            current_day.add(1, 'day')
        }
    }
}

function generateOutput(formatType : OutputFormat, maxOutput : number) : string {
    const output = new StringBuilder()

    switch(formatType) {
        case 'json':
        output.addLine('{')
        for (const gridMoment of unitIter()) {
            const count : number = Math.floor(gridMoment.unit.saturation*maxOutput)
            if (count > 0) {
                output.addLine(
                    '  "', gridMoment.time.format(GIT_DATE_FORMAT), '": ',
                    count.toString(), gridMoment.lastItem ? '' : ','
                )
            }
        }
        output.addLine('}')
    }

    return output.toString()
}

export {generateOutput, OutputFormat}
