			function go() {
				let pwLength = document.getElementById('chars').value;

				//flags array used as markers - 0-lower, 1-caps, 2-nums, 3-special
				let flags = new Array(4);
				flags[0] = document.getElementById('lowe').checked;
				flags[1] = document.getElementById('caps').checked;
				flags[2] = document.getElementById('nums').checked;
				flags[3] = document.getElementById('spec').checked;
				console.log(flags);
				if(!flags[0] && !flags[1] && !flags[2] && !flags[3]) {
					document.getElementById('output').innerHTML = '<h3>Please select at least one checkbox</h3>';
				}else {
					generatePw(pwLength, flags);
				}
			}
			
    		function generatePw(pwLength, flags = [1]) {
    			//constants for ansi reference
	    		const INDEX_LOWER = 'a'.charCodeAt(0); //97
	    		const INDEX_LOWER_TOP = 'z'.charCodeAt(0); //122
	    		const INDEX_SPECIAL = '!'.charCodeAt(0); //33
	    		const INDEX_SPECIAL_TOP = '/'.charCodeAt(0); //47
	    		const INDEX_NUM = '0'.charCodeAt(0); //48
	    		const INDEX_NUM_TOP = '9'.charCodeAt(0); //57

	    		let currentChar;
	    		let output = [];
	    		let pwLengthTemp = pwLength;
	    		let lengthPerFlag = [0, 0, 0, 0];
				let iRnd;
				let outputToHTML = document.getElementById('output');

	    		//get random length for each character type
	    		while(pwLengthTemp > 0) {
	    			iRnd = Math.floor(Math.random() * (flags.length));
	    			if(flags[iRnd] == true) {
		    			lengthPerFlag[iRnd]++;
		    			pwLengthTemp--;
		    		}
	    		}
	    		console.log('random lengths ' + lengthPerFlag);

	    		//GENERATE RANDOMS

	    		//lower case
	    		if(flags[0]) {
		    		for(let i = 0; i < lengthPerFlag[0]; i++) {
						currentChar = Math.floor(Math.random() * (INDEX_LOWER_TOP - INDEX_LOWER + 1));
						currentChar += INDEX_LOWER;
						output.push(String.fromCharCode(currentChar));	    			
		    		}
		    	}

		    	//caps
	    		if(flags[1]) {
		    		for(let i = 0; i < lengthPerFlag[1]; i++) {
						currentChar = Math.floor(Math.random() * (INDEX_LOWER_TOP - INDEX_LOWER + 1));
						currentChar += INDEX_LOWER;
						output.push(String.fromCharCode(currentChar).toUpperCase());	    			
		    		}
		    	}

	    		//numbers
	    		if(flags[2]) {
		    		for(let i = 0; i < lengthPerFlag[2]; i++) {
						currentChar = Math.floor(Math.random() * (INDEX_NUM_TOP - INDEX_NUM + 1));
						currentChar += INDEX_NUM;
						output.push(String.fromCharCode(currentChar));
		    		}
		    	}

	    		//special
	    		if(flags[3]) {
		    		for(let i = 0; i < lengthPerFlag[3]; i++) {
						currentChar = Math.floor(Math.random() * (INDEX_SPECIAL_TOP - INDEX_SPECIAL + 1));
						currentChar += INDEX_SPECIAL;
						output.push(String.fromCharCode(currentChar));	    			
		    		}
		    	}

		    	//shuffle
		    	let temp;
		    	let elementsRemaining = output.length;
		    	while(elementsRemaining > 0) {
		    		iRnd = Math.floor(Math.random() * elementsRemaining);
		    		temp = output[iRnd];
		    		output[iRnd] = output[elementsRemaining - 1]
		    		output[elementsRemaining -1] = temp;
		    		elementsRemaining--;
		    	}

	    		outputToHTML.innerHTML = '<br><h3>Your new password is</h3><br><h2>' + output.join('') + '</h2>';
	    	}