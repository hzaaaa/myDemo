import { ElDrawer, ElMessage, ElMessageBox } from "element-plus";
import { getResourceCatalogApi} from "@/api/system/menu"
import { useDataBase } from '@/stores/dataBase'
import router from "@/routers";
export const useCommentHook = (dataBase: any,updateDatabaseCommentApi:any,router:any) => {
  const commentName = <any>ref('');
  const commentId= <any>ref(null);
  const commentType = <any>ref('库');
  commentName.value = dataBase.name;
  commentId.value = dataBase.id;
  const newComment = <any>ref('');
  const oldComent = <any>ref('');
  const editCommentapi = <any>ref(null);
  editCommentapi.value = updateDatabaseCommentApi;
  oldComent.value = dataBase.comment;
  const editCommentClick = () => {
    
    let fd = new FormData();
    fd.append('id',commentId.value)
    fd.append('comment',newComment.value)
    editCommentapi.value(fd).then((res:any)=>{
      console.log('editCommentapi',editCommentapi)
      
        ElMessage.success('更新成功')
        router.go(0);
        
      
    })
  }
  return {
    commentName,
    commentType,
    oldComent,
    newComment,
    editCommentClick,
    editCommentapi,
    commentId
  }
}