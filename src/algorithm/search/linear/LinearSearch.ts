/**
 * @Description：LinerSearch
 * @author：yigong4
 * @date：2021/4/9
 * @version：v1.0.0
 */

import Search from '@/algorithm/search/Search'

export default class LinearSearch extends Search {
  /**
   * 线性搜索 时间复杂度O(n)
   * @param seekElement
   * @return {number[]}
   * @constructor
   */
  search(seekElement: number): number | number[] {
    const foundIndices: number[] = []
    this.originalArray.forEach((element: any, index) => {
      if (this.comparator.equal(element, seekElement)) {
        foundIndices.push(index)
      }
    })
    return foundIndices
  }
}