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
	// console.log('insideSpanWrap: '+word);
	var onSuccess = function(data){
		// console.log(data)
		var link = data.list[0].permalink;
		// varword = data.list[0].word;
		if(data.result_type === 'exact'){
			config.ifFound(word,link);
		}
	};
	$.ajax({
		url:"https://mashape-community-urban-dictionary.p.mashape.com/define?term="+word,
		headers:{"X-Mashape-Key":"2g94OmfCpqmsh4KJHOCcXU4XwrI2p1ofUWnjsnV9AsUj3162Pj"}
	}).done(onSuccess);
}

var urbanDic = function(node){
	var string = node.text();
	var sentence = node.text().split(' ');
	// console.log(sentence);
	for(var i=0;i<sentence.length;i++){
		(function(i){	
			if(sentence[i].length>6){
				checkUrbanForWord({
					word: sentence[i], 
					ifFound: function(word,link) {
						sentence[i] = '<a href="'+link+'">'+word+'</a>'
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


$(document).ready(function(){
	var word = 'tomato'
	$.ajax({
		url:"https://mashape-community-urban-dictionary.p.mashape.com/define?term="+word,
		headers:{"X-Mashape-Key":"2g94OmfCpqmsh4KJHOCcXU4XwrI2p1ofUWnjsnV9AsUj3162Pj"}
	}).done(function(data){
		// console.log(data.result_type==='exact');
	})
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
