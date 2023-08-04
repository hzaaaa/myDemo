<template>
	<el-card shadow="hover">
		<div class="wrap">

			<div class="table-list">
				<div @dblclick="" @click="currentSelectTable = item_table" v-for="item_table in tableList">

					<div class="table-single" :class="currentSelectTable === item_table ? 'active' : ''">{{ item_table.name }}</div>
					<div class="table-single pl25" @click="currentSelectVar = item_var"
						:class="currentSelectVar === item_var ? 'active' : ''" v-show="currentSelectTable === item_table"
						v-for="item_var in currentSelectTable.column">{{ item_var.name }}</div>
				</div>
			</div>
			<div class="sql-block">
				<div class="sql-input">

					<textarea ref="textareaRef" v-model="stringInput" />
					<el-button class="query" @click="queryClick" size="default" type="primary">

						查询
					</el-button>
				</div>
				<div class="result-wrap">
					<div class="result-head">
						<div class="" style="flex: 1;">

							查询结果
						</div>
						<el-button class="export" size="default" type="primary">

							导出
						</el-button>
					</div>
					<div class="result-list">
						<el-auto-resizer>
							<template #default="{ height, width }">
								<el-table-v2 :columns="columns" :data="result_data" :width="width" :height="height" fixed />
							</template>
						</el-auto-resizer>

					</div>
				</div>
			</div>
			<div class="right-block">
				<div class="comment-block">
					<div class="title-head">
						{{ '注释' }}
					</div>
					<div class="comment-body">

					</div>

				</div>
				<div class="history-block">
					<div class="title-head">
						历史记录
					</div>
					<div class="history-list">

					</div>
				</div>
			</div>
		</div>
	</el-card>
</template>

<script setup  lang="ts">
// 引入全局实例
import CodeMirror from 'codemirror';

// 核心样式
import 'codemirror/lib/codemirror.css';
// 引入主题后还需要在 options 中指定主题才会生效
import 'codemirror/theme/blackboard.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/addon/display/fullscreen.css'; // 全屏显示编辑器
import 'codemirror/addon/display/fullscreen.js'; // 全屏显示编辑器

// 需要引入具体的语法高亮库才会有对应的语法高亮效果
// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/r/r.js';
import 'codemirror/mode/shell/shell.js';
import 'codemirror/mode/sql/sql.js';
import 'codemirror/mode/swift/swift.js';
import 'codemirror/mode/vue/vue.js';

// 引入代码自动提示插件
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/addon/hint/show-hint';

import { executeApi, queryHistoryApi } from "@/api/biz/sql"
import { useDataBase } from '@/stores/dataBase'

let dataBaseStore = useDataBase();
let route = useRoute();
console.log('route', route)
let stringInput = ref("");
let textareaRef = ref(null);
let editor = <any>null;
const hintobj = (val: any) => {
	// 动态设置tables参数
	editor.setOption('hintOptions', {
		completeSingle: false,
		// 自定义提示选项
		tables: { 'user': ['name', 'sex', 'id'], 'student': ['b_id', 'name'] }
	})
	// return { 'user': ['name', 'sex', 'id'], 'student': ['b_id', 'name'] 
}
onMounted(() => {
	// 对应按键下调用的自动提示方法
	function completeAfter(cm: any, pred: any) {
		if (!pred || pred()) {
			setTimeout(function () {
				if (!cm.state.completionActive) {
					cm.showHint({
						completeSingle: false
					})
				}
			}, 100)
		}
		return CodeMirror.Pass
	}
	editor = CodeMirror.fromTextArea(textareaRef.value, {
		mode: 'text/x-sql',
		theme: 'idea', // 用于设置编辑器样式的主题
		lineNumbers: true, // 是否在编辑器的左侧显示行号
		line: true,
		// readOnly: this.readOnly,
		autoCloseBrackets: true, // 在键入时自动关闭括号和引号
		smartIndent: true,
		extraKeys: {  // 自动补全的按键事件
			"'a'": completeAfter,
			"'b'": completeAfter,
			"'c'": completeAfter,
			"'d'": completeAfter,
			"'e'": completeAfter,
			"'f'": completeAfter,
			"'g'": completeAfter,
			"'h'": completeAfter,
			"'i'": completeAfter,
			"'j'": completeAfter,
			"'k'": completeAfter,
			"'l'": completeAfter,
			"'m'": completeAfter,
			"'n'": completeAfter,
			"'o'": completeAfter,
			"'p'": completeAfter,
			"'q'": completeAfter,
			"'r'": completeAfter,
			"'s'": completeAfter,
			"'t'": completeAfter,
			"'u'": completeAfter,
			"'v'": completeAfter,
			"'w'": completeAfter,
			"'x'": completeAfter,
			"'y'": completeAfter,
			"'z'": completeAfter,
			"'.'": completeAfter,
			'Ctrl-Enter': 'autocomplete'
		},
		hintOptions: {
			completeSingle: false,
			tables: { 'user': ['name', 'sex', 'id'], 'student': ['b_id', 'name'] }
			// tables: hintobj  // sql类型下自定义提示选项使用tables
			// tables结构示例： {'user': ['name', 'sex', 'id'], 'student': ['b_id', 'name']}
		},
		lineWrapping: true // 是否应滚动或换行以显示长行
	})


})
// getDatabaseApi({}).then((res:any)=>{
// 	console.log('res',res)
// })

const tableList = <any>ref([]);
const currentSelectTable = <any>ref({
	column: []
});
const currentSelectVar = <any>ref({
	// column:[]
});


let dataBase = dataBaseStore.getTablesByBaseName(route.name)
console.log('dataBase', dataBase)
tableList.value = dataBase.table;


const columns = <any>ref([]);
const result_data = <any>ref([]);


const queryClick = () => {
	// debugger
	// let save = editor.save();
	// let value = editor.getValue();
	// console.log(' save', save)
	// console.log(' value', value)
	// console.log(' stringInput.value', stringInput.value)
	// console.log(' editor', editor)

	// console.log(' editor', editor.getTextArea())
	// return
	executeApi({ sql: editor.getValue(), database: route.name }).then((res: any) => {
		// executeApi({ sql: 'select * from  t1;', database: route.name }).then((res: any) => {
		// debugger
		console.log('executeApi', res)
		let data = res.data;
		let obj = data[0] || {};

		columns.value = [];
		for (let name in obj) {

			columns.value.push({
				key: name,
				dataKey: name,
				title: name,
				width: 150,
			})
		}

		data.forEach((item: any, index: number) => {
			item.id = index;
			item.parentId = null;
		})
		result_data.value = data || [];

	})
}


queryHistoryApi({}).then((res: any) => {
	console.log('queryHistoryApi', res);
})
</script>

<style lang="scss" scoped>
:deep(.el-table-v2__row-cell) {
	flex-grow: 1 !important;
}

:deep(.el-table-v2__header-cell) {
	flex-grow: 1 !important;
}

:deep(.el-card__body) {
	width: 100%;
	height: 100%;
}

.wrap {
	width: 100%;
	height: 100%;
	display: flex;
}

.table-list {
	width: 300px;
	height: 100%;
	overflow: auto;
	border: 1px solid #e3e3e3;

	.table-single {
		height: 40px;
		line-height: 40px;
		color: #303133;
		cursor: pointer;
		padding-left: 10px;
	}

	.table-single.active {
		background-color: #eefffe;
		color: var(--el-menu-active-color);
	}

	.table-single:hover {
		background-color: var(--el-menu-hover-bg-color);
	}

}

.sql-block {
	flex: 1;
	display: flex;
	flex-direction: column;

	.sql-input {
		border: 1px solid #e3e3e3;
		position: relative;

		.query {
			position: absolute;
			right: 15px;
			bottom: 10px;
		}
	}

	.result-wrap {
		// background: red;
		flex: 1;
		border: 1px solid #e3e3e3;
		display: flex;
		flex-direction: column;

		.result-head {
			height: 50px;
			line-height: 50px;
			// background: red;
			padding-left: 15px;
			position: relative;
			display: flex;
			align-items: center;

			// background-color: ;
			.export {
				margin-right: 15px;

			}
		}

		.result-list {
			flex: 1;


		}
	}
}

.right-block {
	width: 350px;
	height: 100%;
	display: flex;
	flex-direction: column;

	.comment-block {
		border: 1px solid #e3e3e3;
		height: 302px;
	}

	.history-block {
		flex: 1;
		border: 1px solid #e3e3e3;
		display: flex;
		flex-direction: column;

		.history-list {}
	}
}

:deep(.CodeMirror) {
	// border: 1px solid #e3e3e3;
}

.title-head {
	height: 50px;
	line-height: 50px;
	// background: red;
	padding-left: 15px;
	position: relative;
	display: flex;
	align-items: center;
	.comment-body{
		flex: 1;
	}

}</style>
