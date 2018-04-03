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
	var getPidInput = tools.$("#getPidInput");
	
	filesList.innerHTML = createFilesHtml(datas,0);
	
	//渲染菜单区域
	var treeMenu = tools.$(".tree-menu")[0];
	treeMenu.innerHTML = treeHtml(datas,-1)
	
}())