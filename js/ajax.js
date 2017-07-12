function ajax(option){
  var type=option.type;
  var url=option.url;
  var async=option.async;
  var success=option.success;
  var xml = null;
  if(window.XMLHttpRequest){
     xml = new XMLHttpRequest();
  }else {
     xml = new ActiveXObject("Microsoft.XMLHttp");
  }

  xml.open(type,url,async);
  xml.send();

  xml.onreadystatechange = function (){
    if(xml.readyState == 4){
      if (xml.status==200) {
       // var body=JSON.parse(xml.responseText);//转化为对象类型
         success&&success(JSON.parse(xml.responseText));
      }
    }
  }
}
