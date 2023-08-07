import { ref, reactive, computed, watch, onMounted, nextTick } from "vue";
import { useUserStoreSessionStorage } from "@/stores/user";

export default (getListApi: Function, beanInfo: any, queryFormRaw: any, getUseQueryParamsByForm?: Function) => {
	const queryForm = ref(JSON.parse(JSON.stringify(queryFormRaw)));

	const pageParams = reactive({
		pageNum: 1,
		pageSize: 10,
		total: 0,
		pageSizesList: [10],
	});
	let useQueryParams = {};

	const tableDataList = ref<any>([]);
	const tableLoading = ref<boolean>(false);
	let tableMaxHeight = ref(0); //已废弃使用
	onMounted(() => {
		nextTick(() => {
			tableMaxHeight.value = window.innerHeight - 80 - 24 * 2 - 20 - 52 - 82 - 50;
			// head- contentPadding- bgTopPadding- addButton - 分页高度 - search
		});
	});
	const handleCurrentPageChange = (pageNum: number) => {
		let params = {
			pageNum: pageNum,
			currentPage: pageNum,
			pageSize: pageParams.pageSize,
			...useQueryParams,
		};
		tableLoading.value = true;
		console.log("params", params);
		getListApi(params)
			.then((res: any) => {
				tableDataList.value = res?.data?.records || res?.data?.list || [];
				pageParams.total = res.data.total;
				pageParams.pageNum = pageNum;
				tableLoading.value = false;
        
			})
			.catch((err: any) => {
				tableLoading.value = false;
			});
	};
	const handleSizeChange = (pageSize: number) => {
		let params = {
			pageNum: 1,
			currentPage: 1,
			pageSize: pageSize,
			...useQueryParams,
		};
		tableLoading.value = true;
		console.log("params", params);
		getListApi(params)
			.then((res: any) => {
				// debugger
				tableDataList.value = res?.data?.records || res?.data?.list || [];
				pageParams.total = res.data.total;
				pageParams.pageSize = pageSize;
				pageParams.pageNum = 1;
				tableLoading.value = false;
			})
			.catch((err: any) => {
				tableLoading.value = false;
			});
	};

	const resetPageToOne = () => {
		handleCurrentPageChange(1);
	};
	const refreshData = () => {
		useQueryParams = getUseQueryParamsByForm && getUseQueryParamsByForm(queryForm.value);
		handleCurrentPageChange(pageParams.pageNum);
	};
	if (!getUseQueryParamsByForm) {
		getUseQueryParamsByForm = (obj: any) => {
			return { ...obj };
		};
	}

	//#region 业务相关
	const userStore = useUserStoreSessionStorage();
	const drawer = ref<any>(null);
	const employeeRow = ref<object>([]);

	// 新增
	const onAddDrawer = (type: string) => {
		// 打开抽屉 or dialog
		drawer.value?.isOpen(type);
		employeeRow.value = JSON.parse(JSON.stringify(beanInfo));
		userStore.setBehavior("add");
	};

	// 编辑
	const onEditDrawer = (row: any) => {
		// 打开抽屉
		drawer.value?.isOpen();
		employeeRow.value = Object.assign(JSON.parse(JSON.stringify(beanInfo)), row);
		userStore.setBehavior("modify");
	};

	// 新增 at Page
	const onOpenAddPage = (router: any, pathName: any) => {
		employeeRow.value = JSON.parse(JSON.stringify(beanInfo));
		userStore.setBehavior("add");
		// debugger
		router.push({
			name: pathName,
			state: {
				params: { ...employeeRow.value },
			},
		});
	};

	// 编辑 at Page
	const onOpenEditPage = (router: any, pathName: any, row: any) => {
		employeeRow.value = Object.assign(JSON.parse(JSON.stringify(beanInfo)), row);
		userStore.setBehavior("modify");

		router.push({
			name: pathName,
			state: {
				params: { ...employeeRow.value },
			},
		});
	};
	const onOpenDetailsPage = (router: any, pathName: any, row: any) => {
		employeeRow.value = Object.assign(JSON.parse(JSON.stringify(beanInfo)), row);

		router.push({
			name: pathName,
			state: {
				params: { ...employeeRow.value },
			},
		});
	};
	// 重置搜索表单按钮
	const doReset = () => {
		queryForm.value = JSON.parse(JSON.stringify(queryFormRaw));
	};
	//搜索按钮
	const searchByQueryForm = () => {
		//修改 搜索条件query
		useQueryParams = getUseQueryParamsByForm && getUseQueryParamsByForm(queryForm.value);
		//回到第一页
		resetPageToOne();
	};
	onMounted(() => {
		resetPageToOne();
		// if (!Object.prototype.hasOwnProperty.call(queryForm.value, "organizationId")) {
		// 	searchByQueryForm();
		// } else if (Object.prototype.hasOwnProperty.call(queryForm.value, "organizationId") && queryForm.value.organizationId !== "") {
		// 	searchByQueryForm();
		// }
	});
	// // 抽屉修改或新增事件完成后重新调用查询接口刷新父组件
	const subData = (val: any) => {
		searchByQueryForm();
	};

	//#endregion
	return {
		tableLoading,
		tableMaxHeight,
		pageParams,
		tableDataList,
		handleCurrentPageChange,
		handleSizeChange,
		resetPageToOne,
		refreshData,
		getUseQueryParamsByForm,

		drawer,
		employeeRow,
		onAddDrawer,
		onEditDrawer,
		onOpenAddPage,
		onOpenEditPage,
		onOpenDetailsPage,
		searchByQueryForm,
		subData,

		queryForm,
		doReset,
	};
};
