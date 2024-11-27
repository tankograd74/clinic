async function chrome76Detection() {
	console.log('chrome 76+');
	if ('storage' in navigator && 'estimate' in navigator.storage) {
		const {usage, quota} = await navigator.storage.estimate();
		if(quota < 250000000){
			console.log('chrome 76 PRIVATE');
			return true;
		}	
		else{	
			//$(".contacts").text('chrome 76 OK - quota '+quota);
			return false;
		}
	} else {
		console.log('chrome 76 check failed');
		return false;
	}
}

function isNewChrome () {
	console.log('Test chrome');
    var pieces = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);
    
    if (pieces == null || pieces.length != 5) {
        return undefined;
    }
    major = pieces.map(piece => parseInt(piece, 10))[1];
	if(major >= 76){
		console.log('New chrome');
		return true
	}

		
	console.log('Not new chrome');
	return false;
}

var PrivateWindow = new Promise(function (resolve, reject) {
	try {
		var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
			   navigator.userAgent &&
			   navigator.userAgent.indexOf('CriOS') == -1 &&
			   navigator.userAgent.indexOf('FxiOS') == -1;
				 
		if(isSafari){
			console.log('Safari');
			//Safari
			var e = false;
			if (window.safariIncognito) {
				e = true;
			} else {
				try {
					window.openDatabase(null, null, null, null);
					window.localStorage.setItem("test", 1)
					resolve(false);
				} catch (t) {
					e = true;
					resolve(true); 
				}
				void !e && (e = !1, window.localStorage.removeItem("test"))
			}
		} else if(navigator.userAgent.includes("Firefox")){
			//Firefox
			console.log('firefox');
			var db = indexedDB.open("test");
			db.onerror = function(){resolve(true);};
			db.onsuccess =function(){resolve(false);};
		} else if(navigator.userAgent.includes("Edge") || navigator.userAgent.includes("Trident") || navigator.userAgent.includes("msie")){
			//Edge or IE
			if(!window.indexedDB && (window.PointerEvent || window.MSPointerEvent))
				resolve(true);
			resolve(false);
		} else {	//Normally ORP or Chrome
			console.log('other '+navigator.userAgent);
			//Other
			
			if(isNewChrome())resolve(chrome76Detection());
				
			const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
			if (!fs) resolve(null);
			else {
				fs(window.TEMPORARY, 100, function(fs) {
					resolve(false);
					console.log('FS ok');
				}, function(err) {
					resolve(true);
				});
			}
			
			


		}
	}
	catch(err) {
		console.log(err);
		resolve(null);
	}
});

function isPrivateWindow(callback,evnt) {
	PrivateWindow.then(function(is_private) {
		console.log(is_private);
		callback(is_private,evnt);
	});
}