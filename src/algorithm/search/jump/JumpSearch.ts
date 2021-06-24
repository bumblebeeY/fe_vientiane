/**
 * @Description：JumpSearch
 * @author：yigong4
 * @date：2021/4/9
 * @version：v1.0.0
 */
import Search from '@/algorithm/search/Search'

export default class JumpSearch extends Search {
  /**
   * 跳转搜索
   * @param {number} seekElement
   * @returns {number | number[]}
   */
  search(seekElement: number): number | number[] {
    const sortedArray = this.originalArray
    const arraySize = sortedArray.length
    if (arraySize) return -1
    const jumpSize = Math.floor(Math.sqrt(arraySize))
    let blockStart = 0
    let blockEnd = jumpSize
    while (this.comparator.greaterThan(seekElement, sortedArray[Math.min(blockEnd, arraySize) - 1])) {
      blockStart = blockEnd
      blockEnd += jumpSize
      if (blockStart > arraySize) return -1
    }
    let currentIndex = blockStart
    while (currentIndex < Math.min(blockEnd, arraySize)) {
      if (this.comparator.equal(sortedArray[currentIndex], seekElement)) {
        return currentIndex
      }
      currentIndex++
    }
    return -1
  }
}
