/**
 * @Description：RedBlackTree
 * @author：yigong4
 * @date：2021/6/18
 * @version：v1.0.0
 */
import BinarySearchTree from '@/data-structures/Tree/binary-search-tree/BinarySearchTree'
import { OriginalCallbacks } from '@/common/Callbacks'
import BinarySearchTreeNode from '@/data-structures/Tree/binary-search-tree/BinarySearchTreeNode'

enum RedBlackTreeColors {
  Black = 'black',
  Red = 'red'
}

const COLOR_PROP_NAME = 'color'
/**
 * 红黑树除了拥有BST的特性外，还具备以下特点:
   1.每个节点都有一个颜色，红色或者黑色
   2.根节点是黑色的
   3.每个叶子结点（NIL节点）都是黑色的
   4.如果一个节点是红色，那么它的子节点必须是黑色
   5.任意一个节点到该节点的叶子节点的所有路径上包含相同数目的黑节点
 */
export default class RedBlackTree<T> extends BinarySearchTree<T> {
  constructor(originalCallbacks?: OriginalCallbacks) {
    super(originalCallbacks)
  }

  /**
   * 插入节点
   * @param {T} value
   * @returns {BinarySearchTreeNode<T>}
   */
  insert(value: T): BinarySearchTreeNode<T> {
    const insertedNode = super.insert(value)
    if (this.nodeComparator.equal(insertedNode, this.root)) {
      this.makeNodeBlack(insertedNode)
    } else {
      this.makeNodeRed(insertedNode)
    }
    this.balance(insertedNode)
    return insertedNode
  }

  /**
   * 从给定节点开始平衡红黑树
   * @param {BinarySearchTreeNode<T>} node
   */
  balance(node: BinarySearchTreeNode<T>) {
    // 如果是根节点则无须做平衡处理
    if (this.nodeComparator.equal(node, this.root)) return
    // 如果节点的父节点为黑色则无须做平衡处理
    const parent = node.parent as BinarySearchTreeNode<T>
    if (this.isNodeBlack(parent)) return
    const grandParent = parent.parent as BinarySearchTreeNode<T>
    const uncle = node.getUncle() as BinarySearchTreeNode<T>
    // 如果父节点兄弟节点存在并且为红色
    if (uncle && this.isNodeRed(uncle)) {
      this.makeNodeBlack(uncle)
      this.makeNodeBlack(parent)
      if (!this.nodeComparator.equal(grandParent, this.root)) {
        this.makeNodeRed(grandParent)
      } else {
        return
      }
      this.balance(grandParent)
    } else if (!uncle || this.isNodeBlack(uncle)) {
      // 如果父节点兄弟节点不存在或者为黑色，则做旋转操作至平衡（参见平衡二叉树）
      if (grandParent) {
        let newGrandParent
        if (this.nodeComparator.equal(grandParent.left, node.parent)) {
          // 左侧失衡
          if (this.nodeComparator.equal(parent.left, node)) {
            // 左左失衡情况 执行右右旋转操作
            newGrandParent = this.rotateRightRight(grandParent)
          } else {
            // 左右失衡情况 执行先左后右旋转操作
            newGrandParent = this.rotateLeftRight(grandParent)
          }
        } else {
          // 右侧失衡
          if (this.nodeComparator.equal(parent.right, node)) {
            // 右右失衡情况 执行左左旋转操作
            newGrandParent = this.rotateLeftLeft(grandParent)
          } else {
            // 右左失衡情况 执行先右后左旋转操作
            newGrandParent = this.rotateRightLeft(grandParent)
          }
        }
        // 如果新的祖父节点无父节点说明为根节点
        if (newGrandParent && newGrandParent.parent === null) {
          this.root = newGrandParent
          this.makeNodeBlack(this.root)
        }
        // 迭代平衡新的祖父节点
        this.balance(newGrandParent)
      }
    }
  }

  /**
   * 向左左方向旋转
   * @param {BinarySearchTreeNode<T>} grandParentNode
   * @returns {BinarySearchTreeNode<T>}
   */
  rotateLeftLeft(grandParentNode: BinarySearchTreeNode<T>) {
    const grandParentParent = grandParentNode.parent
    let grandParentNodeIsLeft
    if (grandParentParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(grandParentParent.left, grandParentNode)
    }
    const parentNode = grandParentNode.right as BinarySearchTreeNode<T>
    const leftChildNode = parentNode.left
    parentNode.setLeft(grandParentNode)
    grandParentNode.setRight(leftChildNode)
    if (grandParentParent) {
      if (grandParentNodeIsLeft) {
        grandParentParent.setLeft(parentNode)
      } else {
        grandParentParent.setRight(parentNode)
      }
    } else {
      parentNode.parent = null
    }
    this.swapNodeColors(parentNode, grandParentNode)
    return parentNode
  }

  /**
   * 向右右方向旋转
   * @param {BinarySearchTreeNode<T>} grandParentNode
   * @returns {BinarySearchTreeNode<T>}
   */
  rotateRightRight(grandParentNode: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> {
    const grandParentParent = grandParentNode.parent
    let grandParentNodeIsLeft
    if (grandParentParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(grandParentParent.left, grandParentNode)
    }
    const parentNode = grandParentNode.left as BinarySearchTreeNode<T>
    const rightChildNode = parentNode.right
    parentNode.setRight(grandParentNode)
    grandParentNode.setLeft(rightChildNode)
    if (grandParentParent) {
      if (grandParentNodeIsLeft) {
        grandParentParent.setLeft(parentNode)
      } else {
        grandParentParent.setRight(parentNode)
      }
    } else {
      parentNode.parent = null
    }
    this.swapNodeColors(parentNode, grandParentNode)
    return parentNode
  }

  /**
   * 先向左后向右右旋转
   * @param {BinarySearchTreeNode<T>} grandParentNode
   * @returns {BinarySearchTreeNode<T>}
   */
  rotateLeftRight(grandParentNode: BinarySearchTreeNode<T>) {
    const parentNode = grandParentNode.left as BinarySearchTreeNode<T>
    const rightChildNode = parentNode.right as BinarySearchTreeNode<T>
    const rightChildLeftNode = rightChildNode.left
    rightChildNode.setLeft(parentNode)
    parentNode.setRight(rightChildLeftNode)
    grandParentNode.setLeft(rightChildNode)

    return this.rotateRightRight(grandParentNode)
  }

  /**
   * 先向右后向左左旋转
   * @param {BinarySearchTreeNode<T>} grandParentNode
   * @returns {BinarySearchTreeNode<T>}
   */
  rotateRightLeft(grandParentNode: BinarySearchTreeNode<T>) {
    const parentNode = grandParentNode.right as BinarySearchTreeNode<T>
    const leftChildNode = parentNode.left as BinarySearchTreeNode<T>
    const leftChildRightNode = leftChildNode.right
    leftChildNode.setRight(parentNode)
    parentNode.setLeft(leftChildRightNode)
    grandParentNode.setRight(leftChildNode)

    return this.rotateLeftLeft(grandParentNode)
  }

  /**
   * 将节点置为黑色
   * @param {BinarySearchTreeNode<T>} node
   * @returns {BinarySearchTreeNode<T>}
   */
  makeNodeBlack(node: BinarySearchTreeNode<T>) {
    node.meta.set(COLOR_PROP_NAME, RedBlackTreeColors.Black)
    return node
  }

  /**
   * 将节点置为红色
   * @param {BinarySearchTreeNode<T>} node
   * @returns {BinarySearchTreeNode<T>}
   */
  makeNodeRed(node: BinarySearchTreeNode<T>) {
    node.meta.set(COLOR_PROP_NAME, RedBlackTreeColors.Red)
    return node
  }

  /**
   * 交换两个节点的颜色
   * @param {BinarySearchTreeNode<T>} firstNode
   * @param {BinarySearchTreeNode<T>} secondNode
   */
  swapNodeColors(firstNode: BinarySearchTreeNode<T>, secondNode: BinarySearchTreeNode<T>) {
    const firstColor = firstNode.meta.get(COLOR_PROP_NAME)
    const secondColor = secondNode.meta.get(COLOR_PROP_NAME)
    firstNode.meta.set(COLOR_PROP_NAME, secondColor)
    secondNode.meta.set(COLOR_PROP_NAME, firstNode)
  }

  /**
   * 删除节点
   * @param {T} value
   * @returns {boolean}
   */
  remove(value: T) {
    return true
  }

  /**
   * 判断节点是否是黑色
   * @param {BinarySearchTreeNode<T>} node
   * @returns {boolean}
   */
  isNodeBlack(node: BinarySearchTreeNode<T>): boolean {
    return node.meta.get(COLOR_PROP_NAME) === RedBlackTreeColors.Black
  }

  /**
   * 判断节点是否是红色
   * @param {BinarySearchTreeNode<T>} node
   * @returns {boolean}
   */
  isNodeRed(node: BinarySearchTreeNode<T>): boolean {
    return node.meta.get(COLOR_PROP_NAME) === RedBlackTreeColors.Red
  }

  /**
   * 判断节点是否已设置颜色
   * @param {BinarySearchTreeNode<T>} node
   * @returns {boolean}
   */
  isNodeColored(node: BinarySearchTreeNode<T>): boolean {
    return this.isNodeRed(node) || this.isNodeBlack(node)
  }
}
