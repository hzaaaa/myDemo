
export const useHistoryHook = (editor: any, queryHistoryApi: any) => {
  const currentHistorrySelectTable = <any>ref({
    column: []
  });
  const historyList = <any>ref([]);
  const queryHistory = () => {

    queryHistoryApi({}).then((res: any) => {
      console.log('queryHistoryApi', res);
      historyList.value = res.data || [];

    })
  }
  queryHistory();
  
  return {
    historyList,
    currentHistorrySelectTable,
    
    queryHistory,
  }
}