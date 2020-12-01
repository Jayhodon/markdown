interface attrObj{
    [index:string]:string
}

export function setElement(TagName: string, options?: attrObj, className?: string):HTMLElement {
    let element=document.createElement(TagName) as HTMLElement
    if(options){
        let attrStr = ''
        for (const key in options) {
            attrStr += `${key}:${options[key]};`
        }
        element.setAttribute('style', attrStr)
    }
    if (className) {
        element.setAttribute('class', className) 
    }
    return element
}