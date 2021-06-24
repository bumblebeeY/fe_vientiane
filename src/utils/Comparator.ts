/**
 * @Description：Comparator
 * @author：yigong4
 * @date：2021/4/7
 * @version：v1.0.0
 */
export default class Comparator {
  private compare: Function

  /**
   * 比较构造函数
   * @param {Function} compareFunction
   */
  constructor(compareFunction?: Function) {
    this.compare = compareFunction || Comparator.defaultCompareFunction
  }

  /**
   * 默认比较函数
   * @param a
   * @param b
   * @return {number}
   */
  static defaultCompareFunction(a: any, b: any): number {
    if (a === b) {
      return 0
    }
    return a < b ? -1 : 1
  }

  /**
   * 判断两个数是否相等
   * @param a
   * @param b
   * @return {boolean}
   */
  equal(a: any, b: any): boolean {
    return this.compare(a, b) === 0
  }

  /**
   * 判断 a是否小于 b
   * @param a
   * @param b
   * @return {boolean}
   */
  lessThan(a: any, b: any): boolean {
    return this.compare(a, b) < 0
  }

  /**
   * 判断a是否大于b
   * @param a
   * @param b
   * @return {boolean}
   */
  greaterThan(a: any, b: any): boolean {
    return this.compare(a, b) > 0
  }

  /**
   * 判断a是否小于等b
   * @param a
   * @param b
   * @return {boolean}
   */
  lessThanOrEqual(a: any, b: any): boolean {
    return this.lessThan(a, b) || this.equal(a, b)
  }

  /**
   * 判断a 是否大于等于 b
   * @param a
   * @param b
   * @return {boolean}
   */
  greaterThanOrEqual(a: any, b: any): boolean {
    return this.greaterThan(a, b) || this.equal(a, b)
  }

  /**
   * 颠倒比较顺序
   */
  reverse() {
    const compareOriginal = this.compare
    this.compare = (a: any, b: any): number => compareOriginal(b, a)
  }
}
