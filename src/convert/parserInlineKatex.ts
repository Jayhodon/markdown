import { parserTag } from "./parserTag";
import { parserRules } from "../utils/parserRules";
import katex from "katex";

export class parserinlinekatex implements parserTag {
  //字符转码
  encode(parserStr: string): string {
    let regRes: RegExpExecArray | null;
    while ((regRes = parserRules.inlineKatex.exec(parserStr))) {
      let codeStr = encodeURIComponent(
        regRes[0].replace(/\*/g, "asterisk").replace(/_/g, "underscore")
      );
      parserStr = parserStr.replace(regRes[0], codeStr);
    }
    return parserStr;
  }
  //转码恢复
  decode(convertStr: string): string {
    convertStr = decodeURIComponent(convertStr);
    convertStr = convertStr
      .replace(/asterisk/g, "*")
      .replace(/underscore/g, "_");
    return convertStr;
  }
  //匹配块级Katex
  parser(parserStr: string): string {
    let regRes: RegExpExecArray | null;
   try {
    while ((regRes = /(%24)(.*?)\1/.exec(parserStr))) {
        var html = katex.renderToString(String.raw`${this.decode(regRes[2])}`, {
          throwOnError: false,
          output: "html",
        });
        parserStr = parserStr.replace(regRes[0], `${html}`);
      }
   } catch (error) {
       console.log(error);
   }
    return parserStr;
  }
}
