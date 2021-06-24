/**
 * @Description：isPowerOfTwo
 * @author：yigong4
 * @date：2021/5/19
 * @version：v1.0.0
 */
/**
 * 检查数字是否为 2 的幂
 * @param {number} number
 * @returns {boolean}
 */
export default function isPowerOfTwo(number: number) {
  if (number < 1) return false
  let dividedNumber = number
  while (dividedNumber !== 1) {
    if (dividedNumber % 2 !== 0) return false
    dividedNumber /= 2
  }
  return true
}