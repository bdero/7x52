import {FIRST_DAY, GIT_DATE_FORMAT} from './constants'
import {grid} from './grid'

type OutputFormat = 'json' | 'bash'

function generateOutput(formatType : OutputFormat) : string {
    return formatType
}

export {generateOutput, OutputFormat}
