window.onload=function(){
	
	var oS_btn=document.getElementById("S_btn");
	var oInp=document.getElementById("inp");
	
	oS_btn.onclick=function(){

		ajax({
			type:'get',
			url:'https://api.imjad.cn/cloudmusic/?type=search&s='+oInp.value,
			async:true,
			success:function(data){
				var oUl=document.getElementById("list");
				oUl.innerHTML='';
				
				for(var i=0;i<data.result.songs.length-1;i++){
				 	var nLi=document.createElement("li");
				 	
				 	var nImg=document.createElement("img");
				 	nImg.setAttribute('src',data.result.songs[i].al.picUrl);
				 	nImg.setAttribute('title',data.result.songs[i].mv);
				 	nLi.appendChild(nImg);
				 	
				 	var nP=document.createElement("p");
				 	nP.innerText=data.result.songs[i].name;	
				 	nP.setAttribute('title',data.result.songs[i].id);
				 	nLi.appendChild(nP);
				 		 	
				 	oUl.appendChild(nLi);
				}
      }
		})
		var oUl=document.getElementById("list");
		
		oUl.onclick=function(){
			 var e=e||window.event;
			var itarget=e.srcElement||e.target;
      
			if(itarget.nodeName='P'){
				ajax({
					type:'get',
					url:'https://api.imjad.cn/cloudmusic/?type=song&id='+itarget.getAttribute('title'),
					async:true,
					success:function(data){
					  var oAudio=document.getElementsByTagName('audio')[0];
            oAudio.setAttribute('src',data.data[0].url);
					}
				})
			var oUl=document.getElementById("list");
			if(itarget.getAttribute('title')==0){
						alert('没有资源');
						return false;
					}
			var e=e||window.event;
			var itarget=e.srcElement||e.target;
			var arr_times=[];
			 if(itarget.nodeName='IMG'){
				ajax({
					type:'get',
					url:'https://api.imjad.cn/cloudmusic/?type=mv&id='+itarget.getAttribute('title'),
					async:true,
					success:function(data){
						var oVideo=document.getElementsByTagName('video')[0];
            oVideo.setAttribute('src',data.data.brs["240"]);
					}
				})
				ajax({
					type:'get',
					url:'https://api.imjad.cn/cloudmusic/?type=lyric&id='+itarget.getAttribute('title'),
					async:true,
					success:function(data){
						 var str = data.lrc.lyric;
					  //将时间从歌词中提取出来的正则表达式；
						var reg=/\[\d{2}\:\d{2}\.\d{1,3}\]/g;
						//将时间从中括号中提出并变成数组的正则表达式；
						var reg1 = /\d+/g;
					  //提取出歌词
						var str_lyric=str.replace(reg,'');
						//将提取出来的歌词变成数组
						str_lyric=str_lyric.split('\n');
						// document.write(str_lyric);
						// alert(Array.isArray(str_lyric));

					 //将时间从歌词里面提取出来；
						var str_time=str.match(reg);
						// document.write(str_time);
					  //获取歌词位置的div的dom节点；
						var oAside_song=document.getElementById('aside_song');
						oAside_song.innerHTML='';
						for(var i=0;i<str_time.length;i++){
							//将时间变成数组
							var arr_time=str_time[i].match(reg1)
							//将时间变成秒
							var seconds=parseInt(arr_time[0])*60 + parseInt(arr_time[1]) +parseInt(arr_time[2]/1000);
								// document.write(seconds);
							//将秒变成数组
							arr_times[i]=seconds;
						}
						//console.log 时间；
						console.log(arr_times);
            //console.log 歌词；
						console.log(str_lyric);
            
						//新创建一个p元素将歌词放在上面；
						var nP=document.createElement('p');
						oAside_song.appendChild(nP);

						var oP=document.getElementsByTagName('p')[0];
						oP.style.color='white';

            var oAudio=document.getElementsByTagName('audio')[0];
            var oVideo=document.getElementsByTagName('video')[0];
            //判断当audio开始时歌词出现;

            var time=setInterval(function(){
            	if (oAudio.paused) {
            		return false;
            	}
            	for (var i = 0; i <arr_times.length; i++) {
	            	if (oAudio.play) {
	            		var curr = oAudio.currentTime;
	            		if (curr>arr_times[i]) {
	            			nP.innerText=str_lyric[i]
	            		}
	            	}	
            	}
            }, 10)
				  }
				})
			}	
		}
	}
}
}

