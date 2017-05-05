if (typeof NotificationManager !== 'undefined'){
	var memoNotificator = new SimpleNotificator();
}

if (typeof CardScheduler !== 'undefined'){
	var memoScheduler = new DumbCardScheduler();
}

if (typeof Translater !== 'undefined'){
	var memoTranslater = new GoogleTranslater();
}

if (typeof ProgressManager !== 'undefined'){
	var memoProgresser = new TripleShowProgressManager();
}