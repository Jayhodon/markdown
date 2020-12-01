import {parserTag} from './parserTag'
import {parserRules} from '../utils/parserRules'
import {listObj} from './utils/index'
export class parserul implements parserTag{
    parser(parserStr:string):string{
        let regRes: RegExpExecArray | null
        //无序列表 
        try {
            while ((regRes = parserRules.ul.exec(parserStr))) {
                console.log(2);
                
                let repstr: string = `<ul>`
                let jiexi = regRes[0].split('\n').filter((element) => {
                    return element !== "" && !/^\s+$/.test(element)
                })
    
                //列表对象  name：一级列表 childrenlist
                /**
                 * {
                 *      name:一级列表
                 *      childrenlist：二级列表
                 * }
                 */
                let listArr: listObj[] = [{
                    name: 'root',
                    childList: []
                }]
                //记录当前一级列表
                let parentNode: string = 'root'
                for (let i = 0; i < jiexi.length; i++) {
                    let fristStra = /^[\-|\*|\+] +([^\n]+)/mg.exec(jiexi[i])
                    if (fristStra) {
                        parentNode = fristStra[1]
                        listArr.push({
                            name: parentNode,
                            childList: []
                        })
                    }
                    let secondStra = /^ +[\-|\+|\*] +([^\n]+)/mg.exec(jiexi[i])
                    if (secondStra) {
                        for (let i = 0; i < listArr.length; i++) {
                            if (listArr[i].name === parentNode) {
                                listArr[i].childList?.push(secondStra[1])
                            }
                        }
                    }
                }
                listArr.forEach(ele => {
                    if (ele.name === 'root') {
                        if (ele.childList) {
                            ele.childList.forEach(e => {
                                repstr += `<li>${e}</li>`
                            })
                        }
                    } else {
                        repstr += `<li>${ele.name}`
                        if (ele.childList?.length) {
                            repstr += '<ul>'
                            ele.childList.forEach(e => {
                                repstr += `<li>${e}</li>`
                            })
                            repstr += '</ul>'
                        }
                        repstr += `</li>`
                    }
                })
                repstr += '</ul>'
                parserStr = parserStr.replace(regRes[0], repstr + '\n')
            }
        } catch (error) {
            console.log(error);
            
        }
        return parserStr
    }
}