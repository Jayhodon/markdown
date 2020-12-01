export class parserRules {
  /**
   * 块级标签
   */
  public static ul: RegExp = /^(( *(\*|\-|\+) [^\n]+)\n)+/gm; //无序列表
  public static ol: RegExp = /^(( *(\d\.) [^\n]+)\n)+/gm; //有序列表
  public static title: RegExp = /^(\#{1,6})\s([^\#\n\s][^\#\n]*)$/m; //标题
  public static table: RegExp = /(([^\n]+ *\| *)+([^\n]+))\n([\t ]*(\|? *:? *\-[-| ]* *:? *\|)+( *:? *\-+ *:? *)*\n)((([^\n]+ *\| *)+([^\n]+)\n?)+)/gm; //表格
  public static blockKatex: RegExp = /(\$\$)([^\$]*\n?)\1/g; //块级Katex
  public static code: RegExp = /^(``` )([\w\+#]+\s*[\w\+#]+)\n([\w\s{}*/\u4E00-\u9FA5“”=~!?^#@_·$%().:|\[\]<g>=\-\+\\&,'";]+)(\s*```)$/gm;//代码块

  /**
   * 内联标签
   */
  public static link: RegExp = /!?\[([^\]<>]+)\]\(([^ \)<>]+)( "[^\(\)\"]+")?\)/g;//超链接
  public static boldItalic: RegExp = /(?:([\*_]{1,3}))([^\*_\n]*[^\*_\s])\1/g; //粗斜体
  public static del: RegExp = /(?:(~{2}))(.*)\1/g;  //删除线
  public static inlineKatex:RegExp=/\$([^\n\$]+?)\$/g   //内联Katax公式
}
