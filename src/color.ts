import {lerp} from './math'

class Color {
    r : number
    g : number
    b : number
    a? : number

    constructor(r : number, g : number, b : number, a? : number) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    public toString() : string {
        if (this.a == undefined) {
            return `rgb(${this.r},${this.g},${this.b})`
        }
        return `rgba(${this.r},${this.g},${this.b},${this.a})`
    }

    public static lerp(a : Color, b : Color, alpha : number) : Color {
        return new Color(
            lerp(a.r, b.r, alpha),
            lerp(a.g, b.g, alpha),
            lerp(a.b, b.b, alpha),
            a.a != undefined && b.a != undefined ? lerp(a.a, b.a, alpha) : undefined,
        )
    }

    public static random(alpha : boolean = false) : Color {
        return new Color(
            Math.random()*255, Math.random()*255, Math.random()*255,
            alpha ? Math.random()*255 : undefined
        )
    }
}

export default Color
