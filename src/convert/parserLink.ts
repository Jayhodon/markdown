import { parserTag } from './parserTag'
import { parserRules } from '../utils/parserRules'

export class parserlink implements parserTag {
    //匹配超链接
    parser(parserStr: string): string {
        let regRes: RegExpExecArray | null
       try {
        while (regRes = parserRules.link.exec(parserStr)) {
            if (regRes[0].substr(0, 1) === '!') {
                parserStr = parserStr.replace(regRes[0], '<img src="' + regRes[2] + '" alt="' + regRes[1] + '" title="' + regRes[1] + '" />');
            } else {
                parserStr = parserStr.replace(regRes[0], '<a ' + 'href="' + regRes[2] + '">' + regRes[1] + '</a>');
            }
        }
       } catch (error) {
           console.log(error);
           
       }
        return parserStr
    }
}