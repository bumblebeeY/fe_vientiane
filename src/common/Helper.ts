import { emptyFunction, OriginalCallbacks } from '@/common/Callbacks'
import Comparator from '@/utils/Comparator'

/**
 * @Description：Helper
 * @author：yigong4
 * @date：2021/4/16
 * @version：v1.0.0
 */
/**
 * 公共辅助类
 */
export default class Helper {
  protected callbacks: OriginalCallbacks
  protected comparator: Comparator

  constructor(originalCallbacks?: { [key: string]: Function }) {
    this.callbacks = Helper.initCallbacks(originalCallbacks)
    this.comparator = new Comparator(this.callbacks.compareCallback)
  }

  /**
   * 初始化回调函数
   * @param {OriginalCallbacks} originalCallbacks
   * @return {OriginalCallbacks}
   */
  static initCallbacks(originalCallbacks?: { [key: string]: Function }) {
    const callbacks = originalCallbacks || {}

    callbacks.compareCallback = callbacks.compareCallback || undefined
    callbacks.visitingCallback = callbacks.visitingCallback || emptyFunction
    return {
      compareCallback: callbacks.compareCallback,
      visitingCallback: callbacks.visitingCallback,
      ...callbacks
    }
  }
}
