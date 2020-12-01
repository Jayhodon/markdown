export class Debounce {
    debounce(fn: Function, delay: number, immediate:boolean): Function {
        let timer: number | undefined
        return (...args: any) => {
            if (immediate) {
                fn.apply(this, args) // 确保引用函数的指向正确，并且函数的参数也不变
                immediate = false
                return
            }
            clearTimeout(timer)
            timer = window.setTimeout(() => {
                fn.apply(this, args)
            }, delay)
        }
    }
}