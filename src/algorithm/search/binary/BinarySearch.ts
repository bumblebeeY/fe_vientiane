/**
 * @Description：BinarySearch
 * @author：yigong4
 * @date：2021/4/9
 * @version：v1.0.0
 */
import Search from '@/algorithm/search/Search'

export default class BinarySearch extends Search {
  /**
   * 二分查找 时间复杂度O(logN)
   * @param {number} seekElement
   * @return {number | number[]}
   */
  search(seekElement: number): number | number[] {
    return this.iterationSearch(this.originalArray, seekElement)
  }

  /**
   * 搜索迭代函数
   * @param originalArray
   * @param {number} seekElement
   * @param {number} start
   * @param {number} end
   * @return {number}
   */
  iterationSearch(originalArray: Array<any>, seekElement: number, start?: number, end?: number): number {
    start = start ?? 0
    end = end ?? originalArray.length - 1
    if (start > end) return -1
    const middleIndex = Math.floor((start + end) / 2)
    if (this.comparator.equal(originalArray[middleIndex], seekElement)) {
      return middleIndex
    }
    if (this.comparator.lessThan(originalArray[middleIndex], seekElement)) {
      return this.iterationSearch(originalArray, seekElement, middleIndex + 1, end)
    } else {
      return this.iterationSearch(originalArray, seekElement, start, middleIndex - 1)
    }
  }
}
