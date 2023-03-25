import { CompletionContext, snippetCompletion } from '@codemirror/autocomplete';
import { HintPathType } from '../interface'

export const hintPlugin = (hintPaths: HintPathType[]) => {
  return (context: CompletionContext) => {
    // 匹配当前输入前面的所有非空字符
    const word = context.matchBefore(/\S*/);

    // 判断如果为空，则返回null
    if (!word || (word.from == word.to && !context.explicit)) return null;

    // 获取最后一个字符
    const latestChar = word.text[word.text.length - 1];

    // 获取当前输入行所有文本
    const curLineText = context.state.doc.lineAt(context.pos).text;

    let path: string = '';

    // 从当前字符往前遍历，直到遇到空格或前面没有字符了，把遍历的字符串存起来
    for (let i = word.to; i >= 0; i -= 1) {
      if (i === 0) {
        path = curLineText.slice(i, word.to);
        break;
      }
      if (curLineText[i] === ' ') {
        // 这里加1，是为了把前面的空格去掉
        path = curLineText.slice(i + 1, word.to);
        break;
      }
    }

    if (!path) return null;

    // 下面返回提示的数组一共有三种情况

    // 第一种：得到的字符串中没有.，并且最后一个输入的字符不是点。
    //       直接把定义提示数组的所有根节点返回

    // 第二种：字符串有.，并且最后一个输入的字符不是点。
    //       首先用.分割字符串得到字符串数组，把最后一个数组元素删除，然后遍历数组，根据路径获取当前对象的children，然后格式化返回。
    //       这里返回值里面的from字段有个坑，form其实就是你当前需要匹配字段的开始位置，假设你输入user.na,实际上这个form是n的位置，
    //       to是a的位置，所以我这里给form处理了一下

    // 第三种：最后一个输入的字符是点
    //       和第二种情况处理方法差不多，区别就是不用删除数组最后一个元素，并且格式化的时候，需要给label前面补上.,然后才能匹配上。

    if (!path.includes('.') && latestChar !== '.') {
      return {
        from: word.from,
        options: hintPaths?.map?.((item: any) => (
          snippetCompletion(`${item.label}`, {
            label: `${item.label}`,
            detail: item.detail,
            type: item.type,
          })
        )) || [],
      };
    } else if (path.includes('.') && latestChar !== '.') {
      const paths = path.split('.').filter(o => o);
      const cur = paths.pop() || '';

      let temp: any = hintPaths;
      paths.forEach(p => {
        temp = temp.find((o: any) => o.label === p)?.children || [];
      });

      return {
        from: word.to - cur.length,
        to: word.to,
        options: temp?.map?.((item: any) => (
          snippetCompletion(`${item.label}`, {
            label: `${item.label}`,
            detail: item.detail,
            type: item.type,
          })
        )) || [],
      };
    } else if (latestChar === '.') {
      const paths = path.split('.').filter(o => o);
      if (!paths.length) return null;

      let temp: any = hintPaths;
      paths.forEach(p => {
        temp = temp.find((o: any) => o.label === p)?.children || [];
      });

      return {
        from: word.to - 1,
        to: word.to,
        options: temp?.map?.((item: any) => (
          snippetCompletion(`.${item.label}`, {
            label: `.${item.label}`,
            detail: item.detail,
            type: item.type,
          })
        )) || [],
      };
    }
    return null;
  };
}
