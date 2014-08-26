//traverse each html element, inject a uniq class ID (a number that increments up)
//grab the text from the element, store it in a storage object as a key value pair, the key
//being the uniq class ID
//iterate over every key value pair in the storage object and make the middle letter bold red
//jquery for the uniq id and insert the text in

//[$el,$el,$el]

//button for changing to comic sans
var findMiddleLetter = function(string){
	var word = string.split('')
	if(word.length >2){
		//experiment with only highlighting vowels
		if(word.length %2 === 0){
			var middleLetter = (string.length/2);
			word.splice(middleLetter-1,0,'<b style="font-weight:bold">');
			word.splice(middleLetter+1,0,'</b>');
		}else {
			var middleLetter = Math.round(string.length/2);
			word.splice(middleLetter-1,0,'<b style="font-weight:bold">');
			word.splice(middleLetter+1,0,'</b>');
		}
	}
	var answer = word.join('');
	return answer;
}

var roboEye = function(node){
	var string = node.text();
	var sentence = string.split(' ');
	for(var i = 0; i<sentence.length; i++){
		sentence[i] = findMiddleLetter(sentence[i])
	}

	node.html(sentence.join(' '));
}




$(document).ready(function(){
	var elements = $('html');
	var recurse = function(node,callback){
		if(node.children().length===0){
			// node.html(roboEye(node.text())) -->this was before callbacks
			callback(node);
		} else {
			for(var i = 0; i <node.children().length;i++){
				console.log(node.children()[i])
				recurse($(node.children()[i]),callback);
			}
		}
	}
	recurse($('html'),roboEye);

})
