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
    count : number
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

function* unitIter(maxOutput : number) : IterableIterator<GridMoment> {
    let current_day = FIRST_DAY.clone()
    for (let x = 0; x < GRID_WIDTH; x++) {
        for (let y = 0; y < GRID_HEIGHT; y++) {
            const unit = grid.getUnit(x, y)
            yield {
                unit: unit,
                time: current_day.clone(),
                count: Math.floor(unit.saturation*maxOutput)
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
        let firstItem = true
        for (const gridMoment of unitIter(maxOutput)) {
            if (gridMoment.count > 0) {
                if (firstItem) {
                    firstItem = false
                } else {
                    output.addLine(',')
                }
                output.add(
                    '  "', gridMoment.time.format(GIT_DATE_FORMAT), '": ',
                    gridMoment.count.toString(),
                )
            }
        }
        output.addLine()
        output.addLine('}')
        break;

        case 'bash':
        output.addLine(`#!/bin/bash
function commit_7x52 {
  for i in $(seq 1 $1)
  do
    git commit -m "7x52" --allow-empty --date="$2"
  done
}`)
        for (const gridMoment of unitIter(maxOutput)) {
            if (gridMoment.count > 0) {
                output.addLine(
                    'commit_7x52 ', gridMoment.count.toString(),
                    ' "', gridMoment.time.format(GIT_DATE_FORMAT), '"'
                )
            }
        }
    }

    return output.toString()
}

export {generateOutput, OutputFormat}
