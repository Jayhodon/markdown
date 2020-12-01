import { parserTag } from "./parserTag";
import { parserRules } from "../utils/parserRules";
import katex from "katex";

export class parserblockkatex implements parserTag {
  //字符转码
  encode(parserStr: string): string {
    let regRes: RegExpExecArray | null;
    while ((regRes = parserRules.blockKatex.exec(parserStr))) {
      let codeStr = encodeURIComponent(regRes[0].replace(/\*/g, "asterisk").replace(/_/g,'underscore'));
      parserStr = parserStr.replace(regRes[0], codeStr);
      console.log(1)
    }
    return parserStr;
  }
  //转码恢复
  decode(convertStr: string): string {
    convertStr = decodeURIComponent(convertStr);
    convertStr = convertStr.replace(/asterisk/g, "*").replace(/underscore/g,'_');
    return convertStr;
  }
  //匹配块级Katex
  parser(parserStr: string): string {
    try {
      let regRes: RegExpExecArray | null;
      while ((regRes = /(%24%24)(.*?)\1/.exec(parserStr))) {
        var html = katex.renderToString(String.raw`${this.decode(regRes[2])}`, {
          throwOnError: false,
          output:'html',
        });
        console.log(2)
        parserStr = parserStr.replace(regRes[0], `<p>${html}</p>`);
      }
     
    } catch (error) {
      console.log(error);
    }
    return parserStr;
  }
}
