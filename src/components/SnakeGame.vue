<template>
	<p>分数: {{ score }}</p>
	<div id="container" ref="stageContainer"></div>

	<div class="btn-group">
		<button @click="startGame">开始游戏</button>
		<button @click="stopGame">停止游戏</button>
		<button @click="restartGame">重新开始</button>
	</div>

	<div>
		<label for="difficulty">难度:</label>
		<select id="difficulty" v-model="difficulty">
			<option value="1">简单</option>
			<option value="2">中等</option>
			<option value="3">困难</option>
		</select>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Konva from 'konva'

type SnakeBody = { x: number; y: number }
type Snake = {
	body: SnakeBody[]
	direction: 'up' | 'down' | 'left' | 'right'
}

// 初始化游戏元素和状态
const stageContainer = ref(null)
let stage: { destroy: () => void; add: (arg0: any) => void },
	layer: {
		removeChildren: () => void
		add: (arg0: any) => void
		draw: () => void
	},
	snake: Snake,
	gameInterval: number | undefined,
	food: SnakeBody
const score = ref(0) // 计分
const difficulty = ref(1) // 难度

const startGame = () => {
	// 清除可能存在的游戏循环
	if (gameInterval) clearInterval(gameInterval)

	// 销毁可能存在的舞台
	if (stage) stage.destroy()

	// 创建新的舞台和图层
	stage = new Konva.Stage({
		container: stageContainer.value,
		width: 500,
		height: 500,
	})

	layer = new Konva.Layer()
	stage.add(layer)

	// 初始化蛇的状态,body是蛇身体的位置和初始块，分为3个
	// right是蛇移动的方向
	snake = {
		body: [
			{ x: 2, y: 0 },
			{ x: 1, y: 0 },
			{ x: 0, y: 0 },
		],
		direction: 'right',
	}

	// 随机生成食物的位置
	food = {
		x: Math.floor(Math.random() * 25),
		y: Math.floor(Math.random() * 25),
	}

	// 重置得分
	score.value = 0

	// 根据难度设置游戏更新的间隔时间，并启动游戏循环
	const interval = 200 / difficulty.value
	gameInterval = setInterval(() => {
		updateGame()
	}, interval)
}

const restartGame = () => {
	if (gameInterval) clearInterval(gameInterval)
	startGame()
}

const stopGame = () => {
	if (gameInterval) clearInterval(gameInterval)
}

const updateGame = () => {
	// 复制蛇头的位置
	const head = Object.assign({}, snake.body[0])

	switch (snake.direction) {
		case 'up':
			head.y -= 1
			break
		case 'down':
			head.y += 1
			break
		case 'left':
			head.x -= 1
			break
		case 'right':
			head.x += 1
			break
	}

	// 检查是否发生碰撞
	if (checkCollision(head)) {
		clearInterval(gameInterval)
		alert('游戏结束')
		return
	}

	// 将新的蛇头添加到蛇身的前端
	snake.body.unshift(head)

	// 如果蛇头的位置和食物的位置相同，那么得分增加，否则移除蛇身的最后一部分
	if (food.x === head.x && food.y === head.y) {
		food = {
			x: Math.floor(Math.random() * 25),
			y: Math.floor(Math.random() * 25),
		}
		score.value += 1
	} else {
		snake.body.pop()
	}

	// 重新绘制游戏区域
	drawGame()
}

// 检查碰撞函数
const checkCollision = (head: { x: number; y: number }) => {
	return (
		head.x < 0 ||
		head.y < 0 ||
		head.x >= 25 ||
		head.y >= 25 ||
		snake.body.some(
			(dot: { x: any; y: any }) => dot.x === head.x && dot.y === head.y
		)
	)
}

// 绘制游戏区域函数
const drawGame = () => {
	// 清除图层上的所有元素
	layer.removeChildren()

	// 绘制蛇的身体
	snake.body.forEach((dot: { x: number; y: number }) => {
		const rect = new Konva.Rect({
			x: dot.x * 20,
			y: dot.y * 20,
			width: 20,
			height: 20,
			fill: 'green',
		})
		layer.add(rect)
	})

	// 绘制食物
	const foodRect = new Konva.Rect({
		x: food.x * 20,
		y: food.y * 20,
		width: 20,
		height: 20,
		fill: 'red',
	})
	layer.add(foodRect)

	// 重新绘制图层
	layer.draw()
}

onMounted(() => {
	window.addEventListener('keydown', (e) => {
		switch (e.key) {
			case 'ArrowUp':
				if (snake.direction !== 'down') snake.direction = 'up'
				e.preventDefault()
				break
			case 'ArrowDown':
				if (snake.direction !== 'up') snake.direction = 'down'
				e.preventDefault()
				break
			case 'ArrowLeft':
				if (snake.direction !== 'right') snake.direction = 'left'
				e.preventDefault()
				break
			case 'ArrowRight':
				if (snake.direction !== 'left') snake.direction = 'right'
				e.preventDefault()
				break
		}
	})
})
</script>

<style>
#container {
	width: 500px;
	height: 500px;
	background-color: #f0f0f0;
	margin: 0 auto;

	background-size: 20px 20px;
	background-image: linear-gradient(to right, grey 1px, transparent 1px),
		linear-gradient(to bottom, grey 1px, transparent 1px);
}

.btn-group {
	margin-top: 15px;
}
</style>
