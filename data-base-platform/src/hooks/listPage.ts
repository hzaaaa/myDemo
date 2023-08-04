import { ref, reactive, computed, watch, onMounted, nextTick,onUnmounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useThrottleFn } from "./useThrottleFn";
import { useEventListener } from "@/hooks/useEventListener";
import { useDebounceFn } from "@/hooks/useDebounceFn";

export default (getListApi: Function, beanInfo: any, queryForm: any,getUseQueryParamsByForm?:Function) => {
  const pageParams = reactive({
    pageNum: 1,
    pageSize: 20,
    total: 0,
  });
  let useQueryParams =  {};
  
  const tableDataList = ref<any>([]);
  const tableLoading = ref<boolean>(false);
  let maxHeight = ref(0);
  const resizeMaxHeight = useDebounceFn(()=>{
    nextTick(() => {
      
      maxHeight.value = window.innerHeight - 350;
    });
  });
  useEventListener(window, "resize", resizeMaxHeight);
  onMounted(() => {
    resizeMaxHeight();
  });
  
  const handleCurrentPageChange = (pageNum: number) => {
    let params = {
      pageNum: pageNum,
      pageSize: pageParams.pageSize,
      ...useQueryParams,
    };
    tableLoading.value = true;
    getListApi(params)
      .then((res: any) => {
        // debugger
        tableDataList.value = res?.data?.list || [];
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
      pageSize: pageSize,
      ...useQueryParams,
    };
    tableLoading.value = true;
    getListApi(params).then((res: any) => {
      // debugger
      tableDataList.value = res?.data?.list || [];
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
    handleCurrentPageChange(pageParams.pageNum);
  };
  if(!getUseQueryParamsByForm){

    getUseQueryParamsByForm = (obj: any) => {
      
      return { ...obj };
    };
  }

  //#region 业务相关
  const userStore = useUserStore();
  const drawer = ref<any>(null);
  const employeeRow = ref<object>([]);

  // 新增
  const onAddDrawer = (type: string) => {
    // 打开抽屉 drawerMode调用组件 drawer 的v-model值
    drawer.value?.isOpen(type);
    employeeRow.value = JSON.parse(JSON.stringify(beanInfo));
    userStore.setBehavior("add");
  };

  // 编辑
  const onEditDrawer = (row: any) => {
    // 打开抽屉
    drawer.value?.isOpen(row);
    employeeRow.value = Object.assign(JSON.parse(JSON.stringify(beanInfo)), row);
    // debugger
    userStore.setBehavior("modify");
  };
  //搜索按钮
  const searchByQueryForm = () => {
    //修改 搜索条件query
    useQueryParams = getUseQueryParamsByForm&&getUseQueryParamsByForm(queryForm.value);
    //回到第一页
    resetPageToOne();
  };
  onMounted(() => {
    // resetPageToOne();
    
    searchByQueryForm();
    
  });
  // // 抽屉修改或新增事件完成后重新调用查询接口刷新父组件
  const subData = (val: any) => {
    searchByQueryForm();
  };

  //#endregion
  return {
    tableLoading,
    maxHeight,
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
    searchByQueryForm,
    subData,
  };
};
