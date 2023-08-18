<template>
	<div class="matrix">
		<div v-for="(row, rowIndex) in matrix" :key="rowIndex">
        <div v-for="(num, columnIndex) in row" :key="columnIndex" class="cell">{{ num }}</div>
      </div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const matrix = ref([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
])

/**
 * 生成成对数字的二维数组
 * @param rows 行数
 * @param columns 列数
 * @param min 随机数的最小值
 * @param max 随机数的最大值
 * @return {number[][]} - 生成的二维数组。
 */
const generatePairedMatrix = (rows: number, columns: number, min: number, max: number): number[][] => {
  // 计算矩阵中总数字个数
  const totalNumbers = rows * columns;
  // 计算总数字个数的一半
  const halfTotalNumbers = totalNumbers / 2;
  // 生成包含一半数字的数组
  const numbers = Array.from({ length: halfTotalNumbers }, (_, index) => index + min);
  // 将数字数组复制一遍，并进行随机打乱
  const shuffledNumbers = shuffleArray(numbers.concat(numbers));
  
  // 创建一个空矩阵
  const matrix: number[][] = [];
  let count = 0;
  // 逐行生成矩阵
  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    // 逐列生成矩阵元素，并使用已打乱的数字填充
    for (let j = 0; j < columns; j++) {
      row.push(shuffledNumbers[count]);
      count++;
    }
    
    // 将行添加到矩阵中
    matrix.push(row);
  }
  
  // 返回生成的矩阵
  return matrix;
}

/**
 * shuffleArray 函数用来打乱一个数组的元素顺序。
 *
 * @param {T[]} array - 需要打乱的数组。
 * @return {T[]} - 打乱顺序后的新数组。
 *
 * 实现思路:
 * 1. 先复制一份原数组，以避免修改原数组。
 * 2. 从新数组的最后一个元素开始，逐一与前面任意一个（包括自己）的元素交换位置。
 * 3. 这样可以保证每个元素都有可能出现在任何位置，实现了打乱顺序的效果。
 */
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = array.slice();
  
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  
  return shuffledArray;
}

// 示例用法
const pairedMatrix: number[][] = generatePairedMatrix(3, 4, 1, 6);
matrix.value = pairedMatrix

</script>

<style lang="scss" scoped>
.matrix {
  display: flex;
  flex-wrap: wrap;
}
.cell {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -1px 0 0 -1px;
}
</style>
