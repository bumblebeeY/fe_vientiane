/**
 * @Description：InterpolationSearch
 * @author：yigong4
 * @date：2021/4/9
 * @version：v1.0.0
 */
import Search from '@/algorithm/search/Search'

export default class InterpolationSearch extends Search {
  /**
   * 插值搜索
   * @param {number} seekElement
   * @return {number | number[]}
   */
  search(seekElement: number): number | number[] {
    return this.iterationSearch(this.originalArray, seekElement)
  }

  iterationSearch(originalArray: Array<any>, seekElement: number, start?: number, end?: number): number {
    start = start ?? 0
    end = end ?? originalArray.length - 1

    if (start > end) return -1
    const middleIndex =
      start +
      Math.floor(((seekElement - originalArray[start]) / (originalArray[end] - originalArray[start])) * (end - start))
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
