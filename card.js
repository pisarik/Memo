class Card{
  constructor(word, translation){
    this.id = guid();

    this.word = word;
    this.translation = translation;

    // this members managed by CardScheduler
    this.showDate = null; // in ms from epoch (as Date.getTime())
    this.period   = null; // minimal time period in sec for show card

    /* this members managed by ProgressManager
     * checkpoint - is the number of show, on which test will be conducted
     */
    this.showNumber = 1;  // current number of card appearances (also used as level of knowledge of the card)
    this.checkpoint = 0;  // checkpoint for progress
    this.nextCheck  = 0;  // next checkpoint for progress


  }

  equalsById(card){
    return this.id === card.id;
  }

  equals(card){
    return this.word === card.word && 
           this.translation === card.translation;
  }

  toString(){
    return "id: " + this.id + "\nword: " + this.word + "\ntranslation: " + this.translation;
  } 
}