//单文件结构
function fileConstruct(fileData){
	var str = `
		<div class="item" data-file-id="${fileData.id}">
            <lable class="checkbox"></lable>
            <div class="file-img">
                <i></i>
            </div>
            <p class="file-title-box">
                <span class="file-title">${fileData.title}</span>
                <span class="file-edtor">
                    <input class="edtor" value="${fileData.title}" type="text"/>
                </span>
            </p>
        </div>
	`;
	return str;
}

//file-list
function filesHtml(fileData){
	var fileHtml = `
		<div class="file-item">
			${fileConstruct(fileData)}
		</div>
	`;
	return fileHtml;
}

//返回指定id下所有子数据的html结构
function createFilesHtml(datas,renderId){
	var childs = dataControl.getChildById(datas,renderId);
	var html = "";
	childs.forEach(function(item){
		html += filesHtml(item);
	})
	return html;
}
//准备树形菜单的html结构
function treeHtml(data,treeId){
	var childs = dataControl.getChildById(data,treeId);
	var html="<ul>";
	childs.forEach(function(item){
		var level = dataControl.getLevelById(data,item.id);
		var hasChild = dataControl.hasChilds(data,item.id);
		var classNames = hasChild ? "tree-contro" : "tree-contro-none";
		html +=`
			 <li>
                <div class="tree-title ${classNames}" data-file-id="${item.id}" style="padding-left:${level*14}px">
                    <span>
                        <strong class="ellipsis">${item.title}</strong>
                        <i class="ico"></i>
                    </span>
                </div>
                ${treeHtml(data,item.id)}
            </li>
		`
	})
	
	html +="</ul>"
	return html;
}

// 通过id定位到树形菜单添加class
function positionById(positionId){
	var ele = document.querySelector(".tree-title[data-file-id='"+positionId+"']");
	tools.addClass(ele,"tree-nav");
}

function createPathNavHtml(datas,fileId){
	
	//找到指定id所有的父数据
	var parents = dataControl.getParents(datas,fileId).reverse();
	var pathNavHtml = "";
	var len = parents.length;
	parents.forEach(function(item,index){
		if(index === parents.length-1) return;
		pathNavHtml += `
					<a href="javascript:;" style="z-index:${len--}" data-file-id="${item.id}">
						${item.title}
					</a>
				`
	});
	pathNavHtml += `
				<span class="current-path" style="z-index:${len--}" data-file-id="0">
					${parents[parents.length-1].title}
				</span>
			`
	return pathNavHtml;
}