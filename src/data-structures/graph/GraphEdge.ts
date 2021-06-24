/**
 * @Description：GraphEdge
 * @author：yigong4
 * @date：2021/6/23
 * @version：v1.0.0
 */
import GraphVertex from '@/data-structures/graph/GraphVertex'

export default class GraphEdge {
  public startVertex: GraphVertex
  public endVertex: GraphVertex
  public weight: number
  constructor(startVertex: GraphVertex, endVertex: GraphVertex, weight = 0) {
    this.startVertex = startVertex
    this.endVertex = endVertex
    this.weight = weight
  }

  /**
   * 获取图边的key值
   * @returns {string}
   */
  getKey() {
    const startVertexKey = this.startVertex.getKey()
    const endVertexKey = this.endVertex.getKey()
    return `${startVertexKey}_${endVertexKey}`
  }

  /**
   * 翻转边
   */
  reverse() {
    const temp = this.startVertex
    this.startVertex = this.endVertex
    this.endVertex = temp
  }

  /**
   * 转为string
   * @returns {string}
   */
  convertToString() {
    return this.getKey()
  }
}
