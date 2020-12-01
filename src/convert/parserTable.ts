import { parserTag } from './parserTag'
import { parserRules } from '../utils/parserRules'
export class parsertable implements parserTag {
    parser(parserStr: string): string {
        let regRes: RegExpExecArray | null
        // //匹配表格
      try {
        while ((regRes = parserRules.table.exec(parserStr))) {
            let repstr = '<table>';
            //表格头
            let helper = regRes[1].split('|');
            //表格单元样式
            let calign = regRes[4].split('|');
            //表格数据
            let tableRowData = regRes[7].split('\n')
            let tableCeilData = tableRowData.map(element => {
                return element.split('|').filter((element) => {
                    return element !== "" && !/^\s+$/.test(element)
                }).map(elememt => {
                    return elememt.trim()
                })
            })
            //过滤空白元素和去除首尾空格
            helper = helper.filter((element) => {
                return element !== "" && !/^\s+$/.test(element)
            }).map(elememt => {
                return elememt.trim()
            })
            calign = calign.filter((element) => {
                return element !== "" && !/^\s+$/.test(element)
            }).map(elememt => {
                return elememt.trim()
            })
            for (let i = 0; i < helper.length; i++) {

            }
            repstr += "<thead><tr>"
            //存储当前表格单元的样式
            let thisTableCel: string[] = []
            for (let i = 0; i < calign.length; i++) {
                //记录 ':'的位置，确定表格单元左对齐，右对齐，居中对齐
                let first = calign[i].indexOf(':')
                let last = calign[i].lastIndexOf(':')
                if (first !== -1) {
                    if (first === last && first !== -1) {
                        first === 0 ? thisTableCel.push('style="text-align:left"') : thisTableCel.push('style="text-align:right"')
                    } else {
                        thisTableCel.push('style="text-align:center"')
                    }
                } else {
                    thisTableCel.push('')
                }
            }

            //设置表头
            for (let i = 0; i < helper.length; i++) {
                // let ceilCSS=thisTableCel[i]??'<th>'
                repstr += '<th ' + (thisTableCel[i] ?? '') + '>' + helper[i].trim() + '</th>'
            }
            repstr += '</tr></thead><tbody>';
            for (let i = 0; i < tableRowData.length; i++) {
                repstr += '<tr>'
                for (let j = 0; j < tableCeilData[i].length; j++) {
                    repstr += '<td ' + (thisTableCel[j] ?? '') + '>' + tableCeilData[i][j] + '</td>'
                }
                repstr += '</tr>'
            }
            repstr += '</tbody></table>';
            parserStr = parserStr.replace(regRes[0], repstr + '\n')
        }
      } catch (error) {
          console.log(error);
          
      }
        return parserStr
    }
}