import { ref, reactive, computed, watch, onMounted,nextTick } from "vue";
import { ElDrawer, ElMessage, ElMessageBox } from "element-plus";
// 此hook 业务相关
export default (props: any, openCallBack: any, validFormInfoList: any, transRules: any) => {
  // 默认关闭抽屉
  const showDrawer = ref(false);
  let timer: any;
  const loading = ref(false);

  const queryFormRef = ref<any>();
  const handleClose = (done: () => void) => {
    done();
    // ElMessageBox.confirm('确定关闭?')
    //     .then(() => {
    //         done();
    //     })
    //     .catch(() => {
    //         // catch error
    //     });
  };
  const isOpen = () => {
    showDrawer.value = true;
    openCallBack();
  };
  const isClose = () => {
    showDrawer.value = false;
    loading.value = false;
    clearTimeout(timer);
    

    props.employeeRow.value = {};
    queryFormRef.value.clearValidate();
    
  };

  const validOfBeforeSubmit = (requestTempt: any) => {
    for (let i = 0; i < validFormInfoList.length; i++) {
      let { name, comparelist } = validFormInfoList[i];
      let value = requestTempt[name];
      // debugger
      for (let j = 0; j < comparelist.length; j++) {
        let isError = !comparelist[j].compare(value);
        if (isError) {
          //error info
          ElMessage.error(comparelist[j].errorInfo);
          return false;
        }
      }
    }
    return true;
  };
  const form2RequestParams = (formInfo: any) => {
    let requestParams = { ...formInfo };

    for (let i = 0; i < transRules.length; i++) {
      transRules[i](requestParams, formInfo);
    }
    return requestParams;
  };

  return {
    handleClose,
    showDrawer,
    timer,
    loading,
    queryFormRef,
    isOpen,
    isClose,
    validOfBeforeSubmit,
    form2RequestParams,
  };
};
