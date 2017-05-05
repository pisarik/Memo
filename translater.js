class Translater{

  constructor(){
    if (this.translate === undefined) {
      throw new TypeError("Must override translate");
    }
  }

}

class GoogleTranslater extends Translater{

  constructor(){
    super();
    this.base_url = "https://translate.googleapis.com/translate_a/single";
  }

  buildRequest(sourceText, sourceLang, targetLang){
    return this.base_url + "?"
           + "client=gtx"
           + "&sl=" + sourceLang
           + "&tl=" + targetLang
           + "&dt=t" + "&q=" + encodeURI(sourceText);
  }

  translate(word, from = "en", to = "ru", callback = function(translation){
                                                        console.log(translation);
                                                      }){

    let request = this.buildRequest(word, from, to);
    let xhr = new XMLHttpRequest();

    xhr.onload = function(){
      let translation = JSON.parse(xhr.responseText)[0][0][0];
      callback(translation);
    };

    xhr.open("GET", request, true); //async
    xhr.send();

  }

}