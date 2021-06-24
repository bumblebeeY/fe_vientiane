/**
 * @Description：BinarySearchTree
 * @author：yigong4
 * @date：2021/4/25
 * @version：v1.0.0
 */
import { OriginalCallbacks } from '@/common/Callbacks'
import BinarySearchTreeNode from '@/data-structures/Tree/binary-search-tree/BinarySearchTreeNode'
import Comparator from '@/utils/Comparator'

export default class BinarySearchTree<T> {
  root: BinarySearchTreeNode<T>
  public nodeComparator: Comparator
  constructor(originalCallbacks?: OriginalCallbacks) {
    this.root = new BinarySearchTreeNode<T>(null, originalCallbacks)
    this.nodeComparator = this.root.nodeComparator
  }

  /**
   * 插入节点
   * @param value
   */
  insert(value: T): BinarySearchTreeNode<T> {
    return this.root.insert(value)
  }

  /**
   * 查找节点
   * @param value
   */
  find(value: T): BinarySearchTreeNode<T> | null {
    return this.root.find(value)
  }

  /**
   * 是否包含节点
   * @param value
   * @returns {boolean}
   */
  contains(value: T): boolean {
    return this.root.contains(value)
  }

  /**
   * 删除节点
   * @param value
   */
  remove(value: T) {
    return this.root.remove(value)
  }

  /**
   * convert  binary tree to array
   * @returns {any[]}
   */
  convertToArray() {
    return this.root.convertToArray()
  }

  /**
   * convert  binary tree to string
   * @param {(message: any) => void} callback
   * @returns {string}
   */
  convertToString(callback?: (message: any) => void): string {
    return this.root.convertToString()
  }
}
