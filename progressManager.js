class ProgressManager{
  constructor(){
    if (this.initCardProgress === undefined){
      throw new TypeError("Must override iniCardProgress");
    }
    else if (this.cardTested === undefined) {
      throw new TypeError("Must override cardTested");
    }
  }

  cardShowed(card){
    card.showNumber++;

    // protection from test ignoring
    if (card.showNumber > card.nextCheck){
      card.showNumber = card.checkpoint + 1;
    }
  }

  isTimeToTest(card){
    return card.showNumber == card.nextCheck;
  }
}


class TripleShowProgressManager extends ProgressManager{
  
  constructor(){
    super();
  }

  initCardProgress(card){
    card.checkpoint = 0;
    card.nextCheck  = 3;
  }

  cardTested(card, isGood){
    if (isGood){
      card.checkpoint = card.nextCheck;
      card.nextCheck += 3;
    }
    card.showNumber = card.checkpoint + 1;
  }

}
