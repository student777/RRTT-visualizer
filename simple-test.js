var data =
{
	"PackageDeclaration" : {  
		"AnnotationList" : [ ],
		"IdentifierList" : [ "io", "jaylim", "test" ]
		},
	"ImportDeclarationList" : [ ]
};




var expected_result =
{
	"name": "noname",
	"children": 
		[
			{
				"name": "PackageDeclaration",
			    "children":
				    [
				        {"name": "AnnotationList"},
				        {"name": "IdentifierList", "children": [{"name": "io"}, {"name": "jaylim"}, {"name": "test"} ]},
				        {"name": "AnnotationList"}
				    ]
			},
			{"name": "ImportDeclarationList"},
		]
    
}


var get_children = function(json){
	result = [];
	for(var key in json){
		var input = {};
		input['name']=key;
		input['children']=json[key];
		result.push(input);
	}
	return result;
};

var output = {};
output['name']='root';
output['children']=get_children(data);




var traverse = function(data){
	for(var key in data){
		value = data[key];
		if(Object.keys(value).length==0){
			//console.log(key);
			continue;
		}
		//console.log(key);
		traverse(value);
	}
}






var data =
{
	"PackageDeclaration" : {  
		"AnnotationList" : [ ],
		"IdentifierList" : [ "io", "jaylim", "test" ]
		},
	"ImportDeclarationList" : [ ]
};

var get_name = function(json){
	var result = [];
	for(var key in json){
		var input = {};
		input['name']=key;
		result.push(input);
	}
	return result;
};

var key_list = get_name(data);
for(var key in key_list){
	var item = get_name(data[key_list[key].name]);
	key_list[key] = item;
}

// $.each(json.children, function(i, child){
// 	traverse(child.children);
// });
'================================================================================================='


var data_1 = 
{
	'children': [
				{'name': 'PackageDeclaration', 
				 'children': {"AnnotationList" : {}, "IdentifierList" : [ "io", "jaylim", "test" ]}
				},
				{'name': 'ImportDeclarationList', 'children': {} }
	]
}

var data_2 = 
{
	'children': [
				{'name': 'PackageDeclaration', 
				 'children':[
				 			{"name": "AnnotationList": "children": [ {} ]},
				 			{"name": "IdentifierList", "children": [[ "io", "jaylim", "test" ]] }
				 ] 
				}
				{'name': 'ImportDeclarationList', 'children': [] }
	]
}



var data =
{
	"PackageDeclaration" : {  
		"AnnotationList" : {},
		"IdentifierList" : [ "io", "jaylim", "test" ]
		},
	"ImportDeclarationList" : {}
};


var init_process = function(json){
	children = [];
	for(var key in json){
		var child = {};
		child['name'] = key;
		child['children'] = json[key];
 		children.push(child);
 	}
 	var name = json['name'];
	for(var key in json){
		delete json[key];
	}
	json['name'] = 'root';
	json['children'] = children;
}

var process = function(json){
	children = [];
	for(var key in json.children){
		var child = {};
		child['name'] = key;
		child['children'] = json.children[key];
 		children.push(child);
 	}
 	var name = json['name'];
	for(var key in json){
		delete json[key];
	}
	json['name'] = name;
	json['children'] = children;
}


var traverse = function(json){
	for(var i = 0; i < json.children.length; i++){
		process(json.children[i]);
	}
}



init_process(data);
for(var i = 0; i < data.children.length; i++){
		process(data.children[i]);
}

JSON.stringify(data, null, 2);


"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%"
var data = {
  "PackageDeclaration" : {
    "IdentifierList" : [ "codit", "ast", "pojos", "packages" ]
  },
  "ImportDeclarationList" : [ {
    "TypeName" : {
      "identifier" : "JsonProperty",
      "prev" : {
        "identifier" : "annotation",
        "prev" : {
          "identifier" : "jackson",
          "prev" : {
            "identifier" : "fasterxml",
            "prev" : {
              "identifier" : "com"
            }
          }
        }
      }
    }
  }
  ]
};
var init_process = function(json){
	var temp = JSON.parse(JSON.stringify(json));
	for(var key in json){
		delete json[key];
	}
	json['name'] = 'root';
	json['children'] = temp;
}
var process = function(json){
	var new_children = [];
	var children = json.children;
	if(Array.isArray(children)){
		//빈 array 인 경우(?) 
		if(children.length==0){
			return;
		}
		//
		else if(typeof children[0] !="object"){
			for(var i = 0; i < children.length; i++){
				var child = {};
				child['name'] = children[i];
				new_children.push(child);
			}
		}
		//json array 일 경우 recursion
		else{
			for(var i = 0; i < children.length; i++){
				process(children[i])
			}	
		}	
		var child = {};
		child['name']=children;
		new_children.push(child);
	}
	else if(typeof children =="object"){
		for(var key in children){
			var child = {};
			child['name'] = key;
			child['children'] = children[key];
	 		new_children.push(child);
	 	}
	}
	//boolean, numeric, string
	else{
		var child = {};
		child['name']=children;
		new_children.push(child);
	}


 	var name = json['name'];
	for(var key in json){
		delete json[key];
	}
	json['name'] = name;
	json['children'] = new_children;
}
init_process(data);

var traverse = function(data){
	process(data);
	if(true){
		for(var i = 0; i < data.children.length; i++){
		process(data.children[i]);
		}		
	}
}
traverse(data)

JSON.stringify(data, null, 2);