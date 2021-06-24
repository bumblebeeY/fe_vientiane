/**
 * @Description：DisjointSetItem
 * @author：yigong4
 * @date：2021/4/22
 * @version：v1.0.0
 */
export interface KeyCallback {
  (message: any): void
}

/**
 * 并查集元素类
 * TODO 优化：合并后平衡性优化
 */
export default class DisjointSetItem {
  parent: DisjointSetItem | null = null
  children: Record<any, DisjointSetItem> = {}

  constructor(public value: any, public keyCallback?: KeyCallback) {}

  /**
   * 获取元素的key值
   * @returns {any}
   */
  getKey() {
    if (this.keyCallback) {
      return this.keyCallback(this.value)
    }
    return this.value
  }

  /**
   * 获取元素的根元素
   * @returns {DisjointSetItem | null}
   */
  getRoot(): DisjointSetItem | null {
    return this.isRoot() ? this : this.parent ? this.parent.getRoot() : null
  }

  /**
   * 获取元素的排名
   * @returns {number}
   */
  getRank(): number {
    const children = this.getChildren()
    let rank = 0
    if (children.length === 0) return 0
    children.forEach((child: DisjointSetItem) => {
      rank += 1
      rank += child.getRank()
    })
    return rank
  }

  /**
   * 获取元素的子元素
   * @returns {any[]}
   */
  getChildren(): any[] {
    return Object.values(this.children)
  }

  /**
   * 设置父元素
   * @param {DisjointSetItem} parentItem
   * @param {boolean} force
   * @returns {this}
   */
  setParent(parentItem: DisjointSetItem, force = true) {
    this.parent = parentItem
    if (force) {
      parentItem.addChild(this)
    }
    return this
  }

  /**
   * 添加子元素
   * @param {DisjointSetItem} children
   */
  addChild(children: DisjointSetItem) {
    this.children[children.getKey()] = children
    children.setParent(this, false)
    return this
  }

  /**
   * 判断元素是否是根元素
   * @returns {boolean}
   */
  isRoot(): boolean {
    return this.parent === null
  }

}
