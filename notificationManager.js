class NotificationManager{
  constructor(){
    if (this.notify === undefined) {
      throw new TypeError("Must override notify");
    }
  }
}

class SimpleNotificator extends NotificationManager{
  constructor(){
    super();
  }

  notify(card){
    let options = {
      type: "basic",
      iconUrl: "images/icon_48.png"
    };

    let isTimeToReverse = card.showNumber % 2 == 0;
    if (memoProgresser.isTimeToTest(card)){
      options.title = 'Do you know the translation?';
      options.message = isTimeToReverse? card.translation : card.word;
      options.buttons = [{title: "I know"}, {title: "Not sure"}];
      options.requireInteraction = true;
    }
    else{ //is time for just show
      options.title = 'Did you know, that...';
      options.message = isTimeToReverse? card.translation + " - " + card.word 
                                        :card.word + " - " + card.translation;
    }

    chrome.notifications.create(card.id, options);
  }
}

function testResultListener(id, buttonIndex){
  StorageManager.getCardById(id, function(card){
    let isGood = buttonIndex == 0;

    if (isGood){
      memoProgresser.cardTested(card, isGood);
      memoScheduler.schedule(card);

      //also we should update alarm
      chrome.alarms.clear(id);
      chrome.alarms.create(id, { "when": card.showDate})

      StorageManager.updateCardById(id, card);
    }
  
    // should be cleared, otherwise requireInteraction cannot be cleared, 
    // unless user closes notification
    chrome.notifications.clear(id);

    //show right answer
    let options = {
        type: "basic",
        iconUrl: "images/icon_48.png",
        title: "Right answer",
        message: card.word + " - " + card.translation,
        requireInteraction: false
      };
    chrome.notifications.create(id, options);
  });
}

chrome.notifications.onButtonClicked.addListener(testResultListener);

chrome.notifications.onClosed.addListener(function(id, byUser){
  console.log("CLOSED " + byUser);
});