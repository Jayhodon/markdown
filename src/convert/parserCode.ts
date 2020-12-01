import { parserTag } from './parserTag'
import { parserRules } from '../utils/parserRules'


export class parsercode implements parserTag {

    //字符转码
    encode(parserStr: string): string {
        // console.log(parserStr);

        // let regRes: RegExpExecArray | null
        // let reg = /((?<=``` )[\s\S]*?(?=```))/g
        // let match = parserStr.match(reg) 
        // console.log(match);

        // let regHeader = /[a-zA-Z]+?(?=\n)/g
        // let regContent = /(?<=[a-zA-Z]+?\n)[\s\S]*/g
        // let arr = match?.map((item)=>{
        //         return {
        //             type: item.match(regHeader)![0],
        //             content: item.match(regContent)![0]
        //         }

        // })
        // console.log(arr);

        let regRes: RegExpExecArray | null
        while (regRes = parserRules.code.exec(parserStr)) {
            console.log(regRes);

            let codeStr = encodeURIComponent(regRes[0]);
            parserStr = parserStr.replace(regRes[0], codeStr.replace(/\*/g, 'asterisk').replace(/_/g, 'underscore').replace(/%3C/mg, '&lt;').replace(/%3E/mg, '&gt;').replace(/~/g, 'del'))
            // .replace(/%C2%B7/g,'semicolon').replace(/%60/g,'semicolon');
            // parserStr = parserStr.replace(regRes[3], codeStr.replace(/\*/g, 'asterisk').replace(/_/g, 'underscore')).replace(/%3C/mg, '&lt;').replace(/%3E/mg, '&gt;')
            //                                                 .replace(/%C2%B7/g,'semicolon').replace(/%60/g,'semicolon');
        }
        return parserStr;
    }

    decode(converStr: string): string {
        converStr = decodeURIComponent(converStr);
        converStr = converStr.replace(/asterisk/g, '*').replace(/underscore/g, '_').replace(/del/g, "~");
        return converStr;
    }

    parser(parserStr: string): string {
        try {
            let regRes: RegExpExecArray | null
            while (regRes = /(%60%60%60%20)(.+?%0A)(.*?)(%60%60%60)/g.exec(parserStr)) {
                parserStr = parserStr.replace(regRes[0], '<pre>' + '<code ' + 'class="' + this.decode(regRes[2]) + '">' + this.decode(regRes[3]) + '</code>' + '</pre>').trim();
                console.log(this.decode(regRes[2]))

                // let regRes: RegExpExecArray | null
                // while (regRes = parserRules.code.exec(parserStr)) {
                //     regRes[3] = this.decode(regRes[3]);
                //     parserStr = parserStr.replace(regRes[0], '<pre>' + '<code ' + 'class="' + regRes[2] + '">' + regRes[3].trim() + '</code>' + '</pre>').trim();
                //     console.log(regRes)

            }
        } catch (error) {
            console.log(error)
        }


        return parserStr;
    }
}