/**
 * @Description：AvlTree
 * @author：yigong4
 * @date：2021/4/25
 * @version：v1.0.0
 */
import BinarySearchTree from '@/data-structures/Tree/binary-search-tree/BinarySearchTree'
import BinarySearchTreeNode from '@/data-structures/Tree/binary-search-tree/BinarySearchTreeNode'

/**
 * 平衡二叉搜索树：特殊的二叉搜索树
 *    特征：对于每一个节点，其左子树深度和右子树深度之差的绝对值不大于1，每一个子树也是一个平衡二叉树
 */
export default class AvlTree<T> extends BinarySearchTree<T> {
  /**
   * 插入节点
   * @param value
   * @returns {BinarySearchTreeNode}
   */
  insert(value: any): BinarySearchTreeNode<T> {
    const insertNode = super.insert(value)
    let currentNode = this.root.find(value)
    while (currentNode) {
      this.balance(currentNode)
      currentNode = currentNode.parent
    }
    return insertNode
  }

  /**
   * 平衡函数
   * @param {BinarySearchTreeNode<T>} node
   */
  balance(node: BinarySearchTreeNode<T>) {
    if (node.getBalanceFactor() > 1) {
      if (!node.left) return
      // Right Rotation
      if (node.left.getBalanceFactor() > 0) {
        // Right-Right Rotation
        this.rotateRightRight(node)
      } else if (node.left.getBalanceFactor() < 0) {
        // Left-Right rotation.
        this.rotateLeftRight(node)
      }
    } else if (node.getBalanceFactor() < -1) {
      if (!node.right) return
      // Left rotation.
      if (node.right.getBalanceFactor() < 0) {
        // Left-Left rotation
        this.rotateLeftLeft(node)
      } else if (node.right.getBalanceFactor() > 0) {
        // Right-Left rotation.
        this.rotateRightLeft(node)
      }
    }
  }

  /**
   * 向左左旋转
   * @param {BinarySearchTreeNode<T>} rootNode
   */
  rotateLeftLeft(rootNode: BinarySearchTreeNode<T>) {
    const rightNode = rootNode.right as BinarySearchTreeNode<T>
    rootNode.setRight(null)
    if (rootNode.parent) {
      rootNode.parent.setRight(rightNode)
    } else if (rootNode === this.root) {
      this.root = rightNode
    }
    if (rightNode.left) {
      rootNode.setRight(rightNode.left)
    }
    rightNode.setLeft(rootNode)
  }

  /**
   *先左后右右旋转
   * @param {BinarySearchTreeNode<T>} rootNode
   */
  rotateLeftRight(rootNode: BinarySearchTreeNode<T>) {
    const leftNode = rootNode.left as BinarySearchTreeNode<T>
    rootNode.setLeft(null)
    const leftRightNode = leftNode.right as BinarySearchTreeNode<T>
    leftNode.setRight(null)

    if (leftRightNode.left) {
      leftNode.setRight(leftRightNode.left)
      leftRightNode.setLeft(null)
    }
    rootNode.setLeft(leftRightNode)

    leftRightNode.setLeft(leftNode)

    this.rotateRightRight(rootNode)
  }

  /**
   *   A               B
   *  B     转化为    C    A
   * C
   * 或者
   *    A                B
   *  B   E 转化为       C  A
   * C F               D  F E
   *D
   * 向右右方向旋转
   * @param {BinarySearchTreeNode<T>} rootNode
   */
  rotateRightRight(rootNode: BinarySearchTreeNode<T>) {
    const leftNode = rootNode.left as BinarySearchTreeNode<T>
    rootNode.setLeft(null)
    if (rootNode.parent) {
      rootNode.parent.setLeft(leftNode)
    } else if (rootNode === this.root) {
      this.root = leftNode
    }
    if (leftNode.right) {
      rootNode.setLeft(leftNode.right)
    }
    leftNode.setRight(rootNode)
  }

  /**
   * 先右后左左旋转
   * @param {BinarySearchTreeNode<T>} rootNode
   */
  rotateRightLeft(rootNode: BinarySearchTreeNode<T>) {
    const rightNode = rootNode.right as BinarySearchTreeNode<T>
    rootNode.setRight(null)
    const rightLeftNode = rightNode.left as BinarySearchTreeNode<T>
    rightNode.setLeft(null)

    if (rightLeftNode.right) {
      rightNode.setLeft(rightLeftNode.right)
      rightLeftNode.setRight(null)
    }
    rootNode.setRight(rightLeftNode)

    rightLeftNode.setRight(rightNode)

    this.rotateLeftLeft(rootNode)
  }
}
