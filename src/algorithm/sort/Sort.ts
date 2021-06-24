/**
 * @Description：Sort
 * @author：yigong4
 * @date：2021/4/7
 * @version：v1.0.0
 */
import Helper from '@/common/Helper'

export default class Sort<node> extends Helper {
  constructor(public originalArray: Array<node>, originalCallbacks?: { [key: string]: Function }) {
    super(originalCallbacks)
  }

  /**
   * 排序
   */
  sort(): Array<node> {
    throw new Error('sort method must be implemented')
  }
}
