export default defineNuxtRouteMiddleware((to, from) => {
  return
  // isAuthenticated() is an example method verifying if a user is authenticated
  if(to.path==='/staticImage')return
  if (isAuthenticated(to.path) === false) {
    return navigateTo('/staticImage')
  }
})
const isAuthenticated =(path:string)=>{
  console.log('path',path)
  if(path==='/about'){

    return true
  }else{
    return false
  }
}
