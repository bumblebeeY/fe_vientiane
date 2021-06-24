/**
 * @Description：Callbacks
 * @author：yigong4
 * @date：2021/4/9
 * @version：v1.0.0
 */

export interface OriginalCallbacks {
  compareCallback: Function // 采用比较的函数
  visitingCallback: Function //如果提供，它将在每次排序时被调用
  [key: string]: Function
}
export function emptyFunction() {}
