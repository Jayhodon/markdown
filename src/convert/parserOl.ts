import { parserTag } from './parserTag'
import { parserRules } from '../utils/parserRules'
import { listObj } from './utils/index'
export class parserol implements parserTag {
    parser(parserStr: string): string {
        let regRes: RegExpExecArray | null
        //匹配有序列表
      try {
        while ((regRes = parserRules.ol.exec(parserStr))) {
            console.log(123);
            
            let repstr: string = `<ol>`
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
                //^(((\*|\-|\+) [^\n]+)\n)+
                let fristStra = /^\d\. +([^\n]+)/mg.exec(jiexi[i])
                if (fristStra) {
                    parentNode = fristStra[1]
                    listArr.push({
                        name: parentNode,
                        childList: []
                    })
                }
                let secondStra = /^ +\d\. +([^\n]+)/mg.exec(jiexi[i])
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
                        repstr += '<ol>'
                        ele.childList.forEach(e => {
                            repstr += `<li>${e}</li>`
                        })
                        repstr += '</ol>'
                    }
                    repstr += `</li>`
                }
            })
            repstr += '</ol>'
            parserStr = parserStr.replace(regRes[0], repstr)
            console.log(regRes[0]);
            
        }
      } catch (error) {
          console.log(error);
          
      }
        return parserStr
    }
}