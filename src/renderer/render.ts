import {
  parsertitle,
  parserlink,
  parserdel,
  parserboldItalic,
  parserol,
  parsertable,
  parserul,
  parserblockkatex,
  parserinlinekatex,
  parsercode
} from "../convert/index";
import hljs from 'highlight.js'

import { windowSelection } from "./index";

export class Render {
  //记录浏览区文档区域的高度
  private clientY: number = document.documentElement.clientHeight;
  private preview = document.querySelector(".preview") as HTMLDivElement;
  private editorCode = document.querySelector(".editor-code") as HTMLDivElement;
  private codeMirrorGutters = document.querySelector(
    ".CodeMirror-gutters"
  ) as HTMLDivElement;
  //记录codeline的计数
  private lineCount: number = 0;
  //记录preview的滚动高度
  private previewScrollTop: number = 0

  pasterRender(event: Event): void {
    windowSelection.range = window.getSelection()?.getRangeAt(0)
    this.previewScrollTop = this.preview.scrollTop
    this.inputRender(event);
    this.previewRender()
    this.preview.scrollTop = this.previewScrollTop
  }
  inputRender(event: Event): void {
    //记录editorcode的offsetTop
    let editorCodeY: number = 0;
    let _this = event.target as HTMLDivElement;
    let html = _this.innerHTML;
    html = html
      .replace(/<div class="editor-line">/g, "")
      .replace(/(<\/div>)/g, "\n")
      .trim();

    this.preview.innerHTML = html;

    //创建代码行数标识
    if (this.lineCount !== _this.children.length) {
      //清空之前所有孩子节点
      this.codeMirrorGutters.innerHTML = "";
      //代码行数计数
      let count = 1;
      //创建codeNumberFragement片段
      let codeNumberFragement = document.createDocumentFragment() as DocumentFragment;
      for (let i = 0; i < _this.children.length; i++) {
        let childNode = _this.children[i] as HTMLDivElement;
        //记录当前元素的offsetTop
        let top: number = childNode.offsetTop;
        let codeMirrorGutterWrapper = document.createElement("div");
        codeMirrorGutterWrapper.setAttribute(
          "class",
          "CodeMirror-gutter-wrapper"
        );
        codeMirrorGutterWrapper.setAttribute("style", `top:${top - 3}px`);
        var codeMirrorLinenumber = document.createElement("div");
        codeMirrorLinenumber.setAttribute("class", "CodeMirror-linenumber");
        codeMirrorLinenumber.innerHTML = `${count++}`;
        codeMirrorGutterWrapper.appendChild(codeMirrorLinenumber);
        codeNumberFragement.appendChild(codeMirrorGutterWrapper);
        editorCodeY +=
          parseInt(
            window
              .getComputedStyle(_this.children[i])
              .getPropertyValue("height")
              .replace("px", "")
          ) + 4;
      }
      this.codeMirrorGutters.appendChild(codeNumberFragement);

      this.lineCount = _this.children.length;

      //设置高度
      this.codeMirrorGutters.setAttribute(
        "style",
        `height:${editorCodeY}px;min-height:${this.clientY - 42}px`
      );
      this.editorCode.setAttribute(
        "style",
        `height:${editorCodeY}px;min-height:${this.clientY - 42}px`
      );
    }

    if (this.editorCode.children.length === 0) {
      this.editorCode.innerHTML = `<div class="editor-line"></div>`;
      this.codeMirrorGutters.innerHTML = `
        <div class="CodeMirror-gutter-wrapper" style="top:-2px">
          <div class="CodeMirror-linenumber">1</div>
        </div>`;
      this.editorCode.focus();
    }
  }
  previewRender(): void {
    let replaceStr = this.editorCode?.innerText as string;
    if (replaceStr !== undefined) {
      replaceStr = new parsercode().encode(replaceStr);
      replaceStr = new parserblockkatex().encode(replaceStr);
      replaceStr = new parserinlinekatex().encode(replaceStr);
      //标题
      replaceStr = new parsertitle().parser(replaceStr);
      //超链接
      replaceStr = new parserlink().parser(replaceStr);
      //删除线
      replaceStr = new parserdel().parser(replaceStr);
      //粗斜体
      replaceStr = new parserboldItalic().parser(replaceStr);
      //表格
      replaceStr = new parsertable().parser(replaceStr);
      //无序列表
      replaceStr = new parserul().parser(replaceStr);
      //有序列表
      replaceStr = new parserol().parser(replaceStr);
      //

      replaceStr = replaceStr
        .split("\n")
        .map((element) => {
          return element === "" ? `<p></p>` : element;
        })
        .map((ele) => {
          if (
            /[^\n]*< *(b|em|sup|del|strong|i|sub|u(?!l)|br|a|img).*\/ *\1 ?>/gm.test(
              ele
            ) ||
            /^[^<].*[^>]$/gm.test(ele)
          ) {
            ele = `<p>${ele}</p>`;
          }
          return ele;
        })
        .join("\n");
      //代码块
      replaceStr = new parsercode().parser(replaceStr);
      replaceStr = new parserblockkatex().parser(replaceStr);
      replaceStr = new parserinlinekatex().parser(replaceStr);

      this.preview ? (this.preview.innerHTML = replaceStr) : "";

      let codeElement = document.querySelectorAll("code")
      if (codeElement) {
        for (var i = 0; i < codeElement.length; i++) {
          hljs.highlightBlock(codeElement[i])
        }
      }

    }


  }
}
