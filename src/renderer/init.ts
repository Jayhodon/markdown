// import { setElement } from './utils/index'
import { Debounce } from "./utils/debounce";
import { Render } from "./render";

export class pageInit {
  private editorCode = document.querySelector(".editor-code") as HTMLDivElement;
  private codeMirrorGutters = document.querySelector(
    ".CodeMirror-gutters"
  ) as HTMLDivElement;
  private top: number = 0; //记录editor-line的offsetTop

  init(): void {
    this.windowInit();
    this.StyleChange();
  }
  windowInit(): void {
    const _this = this;
    window.onload = function (): void {
      _this.listener();
    };
    window.onresize = function () {
      for (let i = 0; i < _this.editorCode?.children.length; i++) {
        //记录当前元素的offsetTop
        let childrenElement = _this.editorCode?.children[i] as HTMLDivElement;
        _this.top = childrenElement.offsetTop;
        _this.codeMirrorGutters?.children[i].setAttribute(
          "style",
          `top:${_this.top - 3}px`
        );
      }
    };
  }
  listener(): void {
    //设置内容变化监听
    const render = new Render()
    // const debounce: Debounce = new Debounce();
    // const fn = debounce.debounce(render.pasterRender, 100, false);


    this.editorCode?.addEventListener("input", (event: Event) => render.pasterRender(event));

    //设置复制监听，将复之内容转换为纯文本
    this.editorCode?.addEventListener(
      "paste",
      (event: ClipboardEvent): void => {
        event?.preventDefault();
        if (event != null) {
          let text = event?.clipboardData?.getData("text/plain");
          document.execCommand("insertText", false, text);
        }
      }
    );
  }

  StyleChange(): void {

    var sel = <HTMLSelectElement>document.getElementById("sel")!;
    sel.onchange = function changeStyle() {

      var head = document.head;
      var link = head.getElementsByTagName("link")
      var style = link[0];
      var codeStyle = link[1];
      console.log(style);
      console.log(codeStyle);
      style.setAttribute("href", "./asset/styles/" + sel.options[sel.selectedIndex].text + ".css");

      switch (sel.options[sel.selectedIndex].text) {
        case "github":
          codeStyle.setAttribute("href", "./asset/hljs_styles/foundation.css");
          break;
        case "newsprint":
          codeStyle.setAttribute("href", "./asset/hljs_styles/atelier-lakeside-light.css");
          break;
        case "night":
          codeStyle.setAttribute("href", "./asset/hljs_styles/atelier-cave-dark.css");
          break;
        case "pixyll":
          codeStyle.setAttribute("href", "./asset/hljs_styles/atelier-heath-light.css");
          break;
        case "whitey":
          codeStyle.setAttribute("href", "./asset/hljs_styles/paraiso-light.css");
          break;
        case "default":
          codeStyle.setAttribute("href", "./asset/hljs_styles/atelier-cave-light.css");
          break;
        default:
          console.log(" .css not found ");
      }
    }
  }

}
