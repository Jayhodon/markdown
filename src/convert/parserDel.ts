import {parserTag} from './parserTag'
import {parserRules} from '../utils/parserRules'
export class parserdel implements parserTag{
    parser(parserStr:string):string{
        let regRes: RegExpExecArray | null
          // 匹配删除线
          try {
            while ((regRes = parserRules.del.exec(parserStr)) !== null) {
                parserStr = parserStr.replace(regRes[0], `<del>${regRes[2]}</del>`)
            }
          } catch (error) {
              console.log(error);
              
          }
         
        return parserStr
    }
}