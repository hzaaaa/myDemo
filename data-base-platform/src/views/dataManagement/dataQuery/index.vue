<template>
	<!-- <el-card shadow="hover"> -->
		<div class="common-layout-system"  v-loading="sqlLoading">

			<div class="table-list">
				<div   v-for="item_table in tableList">

					<div class="table-single flex-align-center" @dblclick="tableClick(item_table)" :class="currentSelectTable === item_table ? 'active' : ''">
						<el-icon class="mr4">
							<SvgIcon name="icon-biaoge" size="14px"></SvgIcon>
						</el-icon>
						{{ `${item_table.name}` }}{{item_table.comment?`（${item_table.comment}）`:''  }}</div>
					<div class="table-single pl25 flex-align-center" @dblclick="varClick(item_var)"
						:class="currentSelectVar === item_var ? 'active' : ''" v-show="currentSelectTable === item_table"
						v-for="item_var in currentSelectTable.column">
						<el-icon class="mr4">
							<SvgIcon name="icon-liebiao" size="14px"></SvgIcon>
						</el-icon>
						{{ item_var.name }}{{item_var.comment?`（${item_var.comment}）`:''  }}
					</div>
				</div>
			</div>
			<div class="sql-block">
				<div class="sql-input">

					<textarea  ref="textareaRef" v-model="stringInput" />
					<el-button class="query" @click="queryClick" size="default" type="primary">

						执行
					</el-button>
				</div>
				
				<div class="result-wrap">
					<div class="result-head">
						<div class="" style="flex: 1;">

							查询结果
						</div>
						<el-button class="export" @click="exportClick" size="default" type="primary">

							导出
						</el-button>
					</div>
					<div class="result-list" v-show="!sqlErr"  :class="result_data.length===0?'result-empty':''">
						<el-auto-resizer>
							<template #default="{ height, width }">
								<el-table-v2 :columns="columns" :data="result_data" :width="width" :height="height" fixed />
							</template>
						</el-auto-resizer>

					</div>
					<div class="err_result pl15" v-show="sqlErr" style="color:red" >
						{{ sqlErr }}
					</div>
				</div>
			</div>
			<div class="right-block" style="user-select: none;">
				<div class="comment-block">
					<div class="title-head">
						{{ commentName }}（{{ commentType }}）
					</div>
					<div class="comment-body">
						<el-form class="mt20 mr10" label-width="80px">
							<el-form-item label="原注释：">
								{{ oldComent }}
							</el-form-item>
							<el-form-item label="新注释：">
								<el-input v-model="newComment" />
							</el-form-item>
						</el-form>
						<el-button class="query"  @click="editCommentClick" size="default" type="primary">

							修改
						</el-button>
					</div>

				</div>
				<div class="history-block">
					<div class="title-head">
						查询历史记录
					</div>
					<div class="history-list">

						<div @dblclick="historyDblclick(item_table)" v-for="item_table in historyList">

							<div class="table-single" :class="currentHistorrySelectTable === item_table ? 'active' : ''">{{
								item_table.sql }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	<!-- </el-card> -->
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

import { executeApi, queryHistoryApi ,updateDatabaseCommentApi,updateTableCommentApi,updateColumnCommentApi} from "@/api/biz/sql"
import { getResourceCatalogApi} from "@/api/system/menu"
import { useDataBase } from '@/stores/dataBase'
import { useHistoryHook } from './historyHook'
import { useCommentHook } from './commentHook'
import { useTableListHook } from './tableListHook';
import { exportFile} from '@/utils/common'
import { ElMessage } from 'element-plus';


const exportClick =()=>{
	if(result_data.value.length===0){
		ElMessage.error('暂无数据')

	}else{

		exportFile(result_data.value,'sql_result')
	}
}
let route = useRoute();
let router = useRouter();
console.log('route', route)
let dataBaseStore = useDataBase();
let dataBase = dataBaseStore.getTablesByBaseName(route.name)
console.log('dataBase', dataBase)
let hintobj =<any>{}
dataBase.table.forEach((item:any)=>{
	let varList =<any>[];
	item.column.forEach((varItem:any)=>{
		varList.push(varItem.name);
	})
	hintobj[item.name]=varList
})
let stringInput = ref("");

let textareaRef = ref(null);
let editor = <any>null;
// const hintobj = (val: any) => {
// 	// 动态设置tables参数
// 	editor.setOption('hintOptions', {
// 		completeSingle: false,
// 		// 自定义提示选项
// 		tables: { 'user': ['name', 'sex', 'id'], 'student': ['b_id', 'name'] }
// 	})
// 	// return { 'user': ['name', 'sex', 'id'], 'student': ['b_id', 'name'] 
// }
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
			tables: hintobj  // sql类型下自定义提示选项使用tables
			// tables结构示例： {'user': ['name', 'sex', 'id'], 'student': ['b_id', 'name']}
		},
		lineWrapping: true // 是否应滚动或换行以显示长行
	})


})




const columns = <any>ref([]);
const result_data = <any>ref([]);

const sqlLoading = ref(false);
const sqlErr = ref('');
const queryClick = () => {
	let selected_str =window.getSelection()?.toString(); 
	console.log('selected_str',selected_str)
	// return
	sqlLoading.value=true;
	executeApi({ sql: selected_str||editor.getValue(), database: route.name }).then((res: any) => {
	// executeApi({ sql: editor.getValue(), database: route.name }).then((res: any) => {
		
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

		
		result_data.value = data || [];
		sqlErr.value=''
		queryHistory();

	}).catch((err:any)=>{
		result_data.value=[];
		columns.value = [];
		sqlErr.value=err.msg;
	}).finally(()=>{

		sqlLoading.value=false;
	})
	
}

let {
	currentSelectTable,
	tableList,
	currentSelectVar,
	
} = useTableListHook(dataBase);
const tableClick=(item_table:any)=>{
  currentSelectTable.value =item_table;
	editor.setValue(`select * from ${item_table.name}`);
	commentName.value=item_table.name;
	commentType.value='表';
	oldComent.value=item_table.comment;
	newComment.value='';
	console.log('item_table',item_table)
	//api 修改
	editCommentapi.value=updateTableCommentApi;
	commentId.value= item_table.id;
}
const varClick=(item_var:any)=>{
	
  currentSelectVar.value =item_var
	editor.setValue(`select ${item_var.name} from ${currentSelectTable.value.name}`);
	commentName.value=item_var.name;
	commentType.value='字段';
	oldComent.value=item_var.comment;
	newComment.value='';
	console.log('item_var',item_var)
	//api 修改
	editCommentapi.value= updateColumnCommentApi;
	commentId.value= item_var.id;
}
let {
	commentName,
	commentType,
	oldComent,
	newComment,
	editCommentClick,
	editCommentapi,
	commentId,
} = useCommentHook(dataBase,updateDatabaseCommentApi,router)

let {
	historyList,
	currentHistorrySelectTable,
	queryHistory,
} = useHistoryHook(editor, queryHistoryApi);
const historyDblclick = (item_table: any) => {
	currentHistorrySelectTable.value = item_table;
	editor.setValue(item_table.sql)
}
</script>

<style lang="scss" scoped>
.common-layout-system {
  display: flex;
  // flex-direction: column;
  flex: 1;
  padding-left: 35px;
  padding-right: 28px;
  padding-top: 22px;
  padding-bottom: 22px;
  border-radius: 10px;

  // display: flex;
  // height: fit-content;
  height: calc(100% - 20px);
  background: #fff;
}
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
	user-select:none

}

.table-single {
	height: 40px;
	line-height: 40px;
	color: #303133;
	cursor: pointer;
	padding-left: 10px;
	width: 100%;
	@extend .text-no-wrap;
}

.table-single.active {
	background-color: #eefffe;
	color: var(--el-menu-active-color);
}

.table-single:hover {
	background-color: var(--el-menu-hover-bg-color);
}


.sql-block {
	flex: 1;
	height: 100%;
	display: flex;
	flex-direction: column;

	.sql-input {
		border: 1px solid #e3e3e3;
		position: relative;
		height: 0;
    flex: 1;
		min-height: 200px;

		.query {
			position: absolute;
			right: 15px;
			bottom: 10px;
		}
	}

	.result-wrap {
		// background: red;
		flex: 2;
		
		height: 0;
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
			overflow: auto;

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
		// height: 302px;
		height:0;
		min-height: 200px;
		flex:1;
		position: relative;

		.comment-body {

			.query {
				position: absolute;
				right: 10px;
				bottom: 10px;
			}
		}

	}

	.history-block {
		flex: 2;
		height: 0;
		border: 1px solid #e3e3e3;
		display: flex;
		flex-direction: column;

		.history-list {
			flex: 1;
			height: 0;
			overflow: auto;
		}
	}
}



.title-head {
	height: 50px;
	line-height: 50px;
	// background: red;
	padding-left: 15px;
	position: relative;
	display: flex;
	align-items: center;

	.comment-body {
		flex: 1;
	}

}
:deep(.CodeMirror){
	height:100% !important;
}
.result-empty{

	:deep(.el-table-v2__header-row){
		border-bottom:0;
	}
}
</style>
