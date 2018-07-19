import moment from 'moment-es6'
import Color from './color'

const SQUARE_SIZE = 20 // Pixels
const GRID_WIDTH = 52
const GRID_HEIGHT = 7
const GRID_UNIT_MARGIN = 2

const COLOR_OFF = new Color(100, 100, 100)
const COLOR_ON = new Color(200, 200, 200)

const today = moment()
const FIRST_DAY : moment.Moment = today.subtract(today.weekday() + 52*7, 'days')

// Example ouput: Wed Jul 18 20:54:28 2018 -0700
const GIT_DATE_FORMAT = 'ddd MMM D HH:mm:ss Y ZZ'

export {
    SQUARE_SIZE, GRID_WIDTH, GRID_HEIGHT, GRID_UNIT_MARGIN,
    COLOR_OFF, COLOR_ON,
    FIRST_DAY, GIT_DATE_FORMAT,
}
