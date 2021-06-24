/**
 * @Description：Search
 * @author：yigong4
 * @date：2021/4/9
 * @version：v1.0.0
 */
import Helper from '@/common/Helper'

export default class Search extends Helper {
  constructor(public originalArray: Array<any>, originalCallbacks?: { [key: string]: Function }) {
    super(originalCallbacks)
  }

  /**
   * 搜索
   */
  search(seekElement: number): number | number[] {
    throw new Error('search method must be implemented')
  }
}
