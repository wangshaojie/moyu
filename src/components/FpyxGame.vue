<template>
	<div class="container">
		<div class="matrix grid-container">
			<div v-for="(row, idx) in matrix" :key="row" class="grid-item" @click="toggle(idx)">
				<div :class="{ card: true, checked: activeIndexs.includes(idx) }">
					<div class="front">
					</div>
					<div class="back">{{ row }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const matrix = ref<number[]>([])

const generateRandomPairs = (n: number) => {
  const numbers = [];

  for (let i = 1; i <= n; i++) {
    numbers.push(i, i);
  }

  // Fisher-Yates 洗牌算法
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers;
}

matrix.value = generateRandomPairs(5)
console.log(matrix.value);

const prevIndex = ref() // 前一个的索引

const activeIndexs = ref<number[]>([])
const toggle = (index: number) => {
  let timer: NodeJS.Timeout[] = []

  // 保存前一个点击的索引
  prevIndex.value = activeIndexs.value[activeIndexs.value.length - 1]
  
  if (activeIndexs.value.includes(index)) {
    alert(1)
    activeIndexs.value = activeIndexs.value.filter(i => i !== index)

  } else {
    activeIndexs.value.push(index)

    timer[index] = setTimeout(() => {
      activeIndexs.value = activeIndexs.value.filter(i => i !== index)
    }, 1000);
  }

  
}
</script>

<style lang="scss" scoped>
.container {
	height: 100vh;
	background-color: #f17563;
	display: flex;
	justify-content: center;
	align-items: center;
}
.matrix {
	display: flex;
}

.grid-container {
	display: grid;
  
	grid-template-columns: repeat(5, 68px); /* 创建 3 列 */
	grid-template-rows: repeat(5, 100px); /* 创建 3 行 */
	gap: 0px; /* 格子之间的间隙 */
}

.grid-item {
	background-color: #f0f0f0; /* 格子的背景色 */
	border: 1px solid #000; /* 格子的边框样式 */
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 20px;
  height: 100px;
	cursor: pointer;

	.card {
		position: relative;
		height: 100%;
		width: 100%;
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
		-webkit-transition: all 600ms;
		transition: all 600ms;
		z-index: 20;

		div {
			position: absolute;
			height: 100%;
			width: 100%;
			color: #f17563;
			text-align: center;
			line-height: 40px;
			-webkit-backface-visibility: hidden;
			backface-visibility: hidden;
			border-radius: 2px;
		}

		.back {
			background: #222;
			color: #fff;
			-webkit-transform: rotateY(180deg);
			transform: rotateY(180deg);
		}
	}

  .front {
    // width: 50px;
    // height: 100px;
    background-image: url('../assets/preview.png');
    background-size: contain;
  }

	.checked {
		transform: rotateY(180deg);
		-webkit-transform: rotateY(180deg);
		box-shadow: 0 20px 20px rgba(255, 255, 255, 0.2);
	}
}
</style>
