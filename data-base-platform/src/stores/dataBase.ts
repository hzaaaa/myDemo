import { defineStore } from "pinia";

// DataBase 
export const useDataBase = defineStore({
  // id: 必须，在所有 Stores 中唯一
  id: "DataBaseStore",
  state: (): any => ({
    dataBaseList: [],
  }),
  getters: {
    
  },
  actions: {
    setDataBaseList(list:any) {
      this.dataBaseList= list;
    },
    getTablesByBaseName(name:string){
      
      for(let i =0;i<this.dataBaseList.length;i++){
        let base = this.dataBaseList[i];
        if(base.name===name){
          return base
        }
      }
      return null
    }
  },
  persist: { key: "DataBaseStore", storage: localStorage },
});
