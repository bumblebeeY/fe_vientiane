import DisjointSetItem, { KeyCallback } from '@/data-structures/disjoint-set/DisjointSetItem'

/**
 * @Description：DisjointSet
 * @author：yigong4
 * @date：2021/4/22
 * @version：v1.0.0
 */

export default class DisjointSet {
  items: Record<any, DisjointSetItem> = {}

  constructor(public keyCallback?: KeyCallback) {}

  /**
   * 添加一个新集合
   * @param value
   * @returns {this}
   */
  makeSet(value: any) {
    const disjointSetItem = new DisjointSetItem(value, this.keyCallback)
    if (!this.items[disjointSetItem.getKey()]) {
      this.items[disjointSetItem.getKey()] = disjointSetItem
    }
    return this
  }

  /**
   * 查找元素所在的集合 key
   * @param value
   * @returns {any}
   */
  find(value: any) {
    const tempDisjointSetItem = new DisjointSetItem(value, this.keyCallback)
    const requiredDisjointItem = this.items[tempDisjointSetItem.getKey()]

    if (!requiredDisjointItem) {
      return null
    }

    return requiredDisjointItem.getRoot()?.getKey()
  }

  /**
   * 联合两个集合
   * @param valueA
   * @param valueB
   * @returns {this}
   */
  union(valueA: any, valueB: any) {
    const rootKeyA = this.find(valueA)
    const rootKeyB = this.find(valueB)
    if (rootKeyA === null || rootKeyB === null) {
      throw new Error('some of values are not in sets')
    }
    if (rootKeyA === rootKeyB) return this
    const rootA = this.items[rootKeyA]
    const rootB = this.items[rootKeyB]
    if (rootA.getRank() < rootB.getRank()) {
      rootB.addChild(rootA)
      return this
    }
    rootA.addChild(rootB)
    return this
  }

  /**
   * 判断是否在同一个集合中
   * @param valueA
   * @param valueB
   * @returns {boolean}
   */
  inSameSet(valueA: any, valueB: any) {
    const rootKeyA = this.find(valueA)
    const rootKeyB = this.find(valueB)

    if (rootKeyA === null || rootKeyB === null) {
      throw new Error('One or two values are not in sets')
    }

    return rootKeyA === rootKeyB
  }
}
