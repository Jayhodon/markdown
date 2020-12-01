import {parserTag} from './parserTag'
import {parserRules} from '../utils/parserRules'
export class parsertitle implements parserTag{
    parser(parserStr:string):string{
        let regRes: RegExpExecArray | null
       try {
        while (regRes = parserRules.title.exec(parserStr)) {
            let count: number = regRes[1].length
            parserStr = parserStr.replace(regRes[0], '<h' + count + '>' + regRes[2].trim() + '</h' + count + '>').trim();
        }   
       } catch (error) {
           console.log(error);
           
       }
        return parserStr
    }
}