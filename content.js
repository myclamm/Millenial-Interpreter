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
			word.splice(middleLetter-1,0,'<span style="font-weight: bold; color:#339933">');
			word.splice(middleLetter+1,0,'</span>');
		}else {
			var middleLetter = Math.round(string.length/2);
			word.splice(middleLetter-1,0,'<span style="font-weight: bold; color:#339933">');
			word.splice(middleLetter+1,0,'</span>');
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

var comicSansify = function(node){
	node.css({"font-family":"Comic Sans MS"});
}

var checkUrbanForWord = function(config){
	if(!config.ifFound) { throw new Error('needs an ifFound property'); }
	var word = config['word'];
	if(punctuationCheck(word)){
		var newWord = word.split('');
		var punc = newWord.pop();
		newWord = newWord.join('');
	} else {
		newWord = word;
	}
	var onSuccess = function(data){
		console.log('checking...'+config.word+"..."+data.result_type,data)

		// varword = data.list[0].word;
		if(data.result_type === 'exact'){
			var link = data.list[0].permalink;
			config.ifFound(word,link);
		}
	};
	$.ajax({
		url:"https://mashape-community-urban-dictionary.p.mashape.com/define?term="+newWord,
		headers:{"X-Mashape-Key":"2g94OmfCpqmsh4KJHOCcXU4XwrI2p1ofUWnjsnV9AsUj3162Pj"}
	}).done(onSuccess);
}

var punctuationCheck = function(string){
	if(string.length>2){	
		if(string[string.length-1].match(/[,.?!]+/)){
			return true;
		}else {
			return false;
		}
	};
}

var urbanDic = function(node){
	var string = node.text();
	var sentence = node.text().split(' ');
	// console.log(sentence);
	// for(var i = 0; i<sentence.length;i++){
	// 	if(punctuationCheck(sentence[i])){
	// 		var newWord = sentence[i].split('')
	// 		var punc = newWord.pop();
	// 		sentence[i] = newWord.join('');
	// 		sentence.splice(i+1,0,punc);
	// 	}

	// }
	for(var i=0;i<sentence.length;i++){
		(function(i){	
			if(sentence[i].length>6){
				// console.log('checking...'+sentence[i])
				checkUrbanForWord({
					word: sentence[i], 
					ifFound: function(word,link) {
						if(punctuationCheck(word)){
							var newWord = word.split('');
							var punc = newWord.pop();
							word = newWord.join('');
							sentence[i] = '<a href="'+link+'" style="color: green; text-decoration: none">'+word+'</a>'+punc;
						}else {
							sentence[i] = '<a href="'+link+'" style="color: green; text-decoration: none">'+word+'</a>';
						}
						// sentence[i] = '<span style="font-family: Comic Sans MS; color: green">'+word+'</span>';
						node.html(sentence.join(' '));
						// console.log('sentence: '+sentence);
					}
				})
				// console.log(sentence[i]);
			}
		})(i)
	}
	// console.log(sentence);
	// node.html(sentence.join(' '));
	
}

//Ajax API tester:

// console.log('hi');
// var word = 'Delaware'
// $.ajax({
// 	url:"https://mashape-community-urban-dictionary.p.mashape.com/define?term="+word,
// 	headers:{"X-Mashape-Key":"2g94OmfCpqmsh4KJHOCcXU4XwrI2p1ofUWnjsnV9AsUj3162Pj"}
// }).done(function(data){
// 	console.log('delaware...'+data.result_type);
// 	console.log(data);
// })


$(document).ready(function(){
	var elements = $('html');
	var recurse = function(node,callback){
		if(node.children().length===0){
			// console.log(node);
			// node.html(roboEye(node.text())) -->this was before callbacks
			callback(node);
		} else {
			for(var i = 0; i <node.children().length;i++){
				recurse($(node.children()[i]),callback);
			}
		}
	}
	recurse($('html'),urbanDic);

})

