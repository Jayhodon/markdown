import { parserTag } from './parserTag'
import { parserRules } from '../utils/parserRules'
export class parserboldItalic implements parserTag {
    parser(parserStr: string): string {
        let regRes: RegExpExecArray | null
        //匹配粗斜体
        try {
            while ((regRes = parserRules.boldItalic.exec(parserStr)) !== null) {
                let repstr: string = ''
                switch (regRes[1].length) {
                    case 1:
                        repstr += `<em>${regRes[2]}</em>`
                        break;
                    case 2:
                        repstr += `<strong>${regRes[2]}</strong>`
                        break;
                    case 3:
                        repstr += `<strong><em>${regRes[2]}</em></strong>`
                        break;
                    default:
                        repstr += ''
                        break;
                }
                parserStr = parserStr.replace(regRes[0], repstr)
            }
        } catch (error) {
            console.log(error);
            
        }
        return parserStr
    }
}