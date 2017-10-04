
	var picbox = document.getElementsByClassName('o-box')[0];
	var nodeList;
	var timer = 0;
	var rot = {//方块旋转角度
		x:0,
		y:0,
		z:0
	};

	
	function bindClickAction(){
		nodeList = document.querySelectorAll('.o-box>div');
		Array.prototype.forEach.call(nodeList,function(node,index){

			node.addEventListener("click",function(){
				stop();
				moveTo(index+1);

			});
		});
	}

	var doRotate = function(obj,str){
		var oStr = obj.style.transform;
		if(str.indexOf("rotateX(")!=-1&&oStr.indexOf("rotateX(")!=-1){
			oStr = oStr.replace(/rotateX\(\-?[0-9]{1,}deg\)/,str);
		}else if(str.indexOf("rotateY(")!=-1&&oStr.indexOf("rotateY(")!=-1){
			oStr = oStr.replace(/rotateY\(\-?[0-9]{1,}deg\)/,str);
		}else if(str.indexOf("rotateZ(")!=-1&&oStr.indexOf("rotateZ(")!=-1){
			oStr = oStr.replace(/rotateZ\(\-?[0-9]{1,}deg\)/,str);
		}else{
			oStr = str;
		}
		obj.style.transform = oStr;
	}

	function removeClass(node,classname){
		var regxp = RegExp('(\\s|^)*'+classname);//匹配正则表达式 /(\s|^)*className/
		node.className = node.className.replace(regxp,'');
	}

	function addClass(node,classname){
		node.className += ' ' + classname;
	}

	function hasClass(node,classname){
		return (node.className.indexOf(classname)!=-1);
	}		

	function moveTo(index){			
		if(hasClass(nodeList[index-1],'selected1')==false){
			if(index<=8){//中部
				rot.x = 0;
				rot.y = 45*(index-1);
			}else if(index>10 && index<= 14){//上部
				rot.y = 90*(index-11);
				rot.x = -45;
			}else if(index>14 && index<=18){//下部
				rot.y = 90*(index-15)+45;
				rot.x = 45;
			}else if(index==9){//顶部
				rot.x = -90;
				rot.y = 0;
			}else if(index==10){//底部
				rot.x = 90;
				rot.y = -135;
			}
			[].forEach.call(nodeList,function(node){
				if(hasClass(node,'selected1'))
					removeClass(node,'selected1');					
			});
			addClass(nodeList[index-1],'selected1');
			picbox.style.transform = "rotateX("+rot.x+"deg) rotateY("+rot.y+"deg) rotateZ("+rot.z+"deg)";
		}
	}

	function doReset(){
		rot.x = 0;
		rot.y = 0;
		rot.z = 0;
		[].forEach.call(nodeList,function(node){
			if(hasClass(node,'selected1'))
				removeClass(node,'selected1');					
		});
		addClass(nodeList[0],'selected1');
		picbox.style.transform = "rotateX("+rot.x+"deg) rotateY("+rot.y+"deg) rotateZ("+rot.z+"deg)";
	}

	function autoPlay(){
		var cur;
		console.log(timer);
		[].forEach.call(nodeList,function(node,i){
			if(hasClass(node,'selected1'))
				cur = i;				
		});
		timer = timer||setInterval(function(){
			cur += 1;
			cur %= 18;
			moveTo(cur+1);
		},2000);
	}
	function stop(){
		clearInterval(timer);
		timer = 0;
	}

	document.onkeydown = function(e){//按↑↓↔键转动方块
		if(e.keyCode == 37){
			rot.y -= 1;
			doRotate(picbox,'rotateY('+rot.y+'deg)');
		}
		else if(e.keyCode == 38){
			rot.x += 1;
			doRotate(picbox,'rotateX('+rot.x+'deg)');
		}
		else if(e.keyCode == 39){
			rot.y += 1;
			doRotate(picbox,'rotateY('+rot.y+'deg)');
		}
		else if(e.keyCode == 40){
			rot.x -= 1;
			doRotate(picbox,'rotateX('+rot.x+'deg)');
		}
	}