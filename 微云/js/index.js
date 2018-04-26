(function(){
	//让下面的区域自适应
	var header = tools.$(".header")[0];
	var weiyunContent = tools.$(".weiyun-content")[0];

	var headerH = header.offsetHeight;
	changeHeight();
	function changeHeight(){
		var view = document.documentElement.clientHeight;
		weiyunContent.style.height = view - headerH + "px";
	}
	window.onresize = changeHeight;

	//要准备的数据
	var datas = data.files;
	//渲染文件区域
	var renderId = 0;
	
	var filesList = tools.$(".file-list")[0];
	//渲染指定id下所有子数据构成html结构
	filesList.innerHTML = createFilesHtml(datas,0);

	//利用时间委托，点击每一个文件夹
	tools.addEvent(filesList,"click",function(ev){
		var target = ev.target;
		if(tools.parents(target,".item")){
			target = tools.parents(target,".item");
			//找到文件的id
			var fileId = target.dataset.fileId;
			rederNavFilesTree(fileId);
		}
	});
	
	var getPidInput = tools.$("#getPidInput");
	var pathNav = tools.$(".path-nav")[0];//文件导航容器
	
	
	//渲染菜单区域
	var empty = tools.$(".g-empty")[0];
	var treeMenu = tools.$(".tree-menu")[0];
	treeMenu.innerHTML = treeHtml(datas,-1);

	positionById(0);	//定位到属性菜单上
	// 渲染文件导航
	pathNav.innerHTML = createPathNavHtml(datas,0);

	// 渲染文件导航区域点击，利用时间委托
	tools.addEvent(pathNav,"click",function(ev){
		var target = ev.target;
		if(tools.parents(target,"a")){
			//找到div身上的id
			var fileId = target.dataset.fileId;
			
			rederNavFilesTree(fileId);
		}
	});
	
	//利用时间委托，点击树形菜单的区域，找到事件源
	tools.addEvent(treeMenu,"click",function(ev){
		var target = ev.target;
		if(tools.parents(target,".tree-title")){
			target = tools.parents(target,".tree-title");
			//找到div身上的id
			var fileId = target.dataset.fileId;
			rederNavFilesTree(fileId);
		}
	});
	//通过指定的id渲染文件区域，文件导航区域，树形菜单
	function rederNavFilesTree(fileId){
		pathNav.innerHTML = createPathNavHtml(datas,fileId);
		//如果指定id没有数据，提醒
		var hasChild = dataControl.hasChilds(datas,fileId);
		if(hasChild){
			//找到当前这个id下所有数据渲染在文件区域中
			empty.style.display = "none";
			filesList.innerHTML = createFilesHtml(datas,fileId);
		}else{
			empty.style.display = "block";
		}
		//点击的div添加样式
		var treeNav = tools.$(".tree-nav",treeMenu)[0];
		tools.removeClass(treeNav,"tree-nav");
		positionById(fileId);
	}
}())