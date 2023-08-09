export const useTableListHook = (dataBase: any) => {
const tableDbClick=()=>{

}
const tableClick=(item_table:any)=>{
  currentSelectTable.value =item_table
}
const currentSelectTable = <any>ref({
	column: []
});
const tableList = <any>ref([]);
tableList.value = dataBase.table;
onMounted(()=>{
  
  // nextTick(()=>{
  
  //   tableList.value.forEach((item:any)=>{
  //     item.isOpen=true;
  //   })
  // })
})
console.log('tableList.value',tableList.value)
const varClick=(item_var:any)=>{
  currentSelectVar.value =item_var
}
const currentSelectVar = <any>ref({
	// column:[]
});
  return {
    tableDbClick,
    tableClick,
    currentSelectTable,
    tableList,
    currentSelectVar,
    varClick
  }
}