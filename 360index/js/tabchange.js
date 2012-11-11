//tab js
function setTab(name,cursel,n){
 for(i=1;i<=n;i++){
  var menu=document.getElementById(name+i);
  var con=document.getElementById("cont_"+name+"_"+i);
  if(menu!=null)
  	menu.className=(i==cursel?"hoverLi":"");
    con.style.display=(i==cursel?"block":"none");
 }}