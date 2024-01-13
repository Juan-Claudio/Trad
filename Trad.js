export default class Trad
{
    constructor()
    {
        if(this.constructor==Trad)
        {
            throw new Error("Trad is not instantiable class.");
        }
    }

    static choosen_language = 0;
    static number_of_lang = 3;
    static to_lang_id = {en:0,es:1,fr:2};
    static traductions = {};

    static load_trads(traductions){  this.traductions = traductions;  }
    
    static set_language(lang_identifier=undefined)
    {
        /*
        * IF   => lang undefined
        * AND  => no language variable in url
        * THEN => lang = navigator language
        */
        if(lang_identifier==undefined)
        {
            let url = document.location.href;
            if(!/\?/.test(url) || !/[\?&]l=/.test(url))
            {
                lang_identifier = (window.navigator.userLanguage || window.navigator.language).substring(0,2);
            }
            else
            {
                lang_identifier = url.match(/l=\d+/)[0].substring(2);
            }
        }

        //if the language identifier contains letters
        if(/[a-zA-Z]/.test(lang_identifier))
        {
            if(this.to_lang_id[lang_identifier]!=undefined)
            {
                this.choosen_language = this.to_lang_id[lang_identifier];
                return;
            }
        }
        else if(/[0-9]/.test(lang_identifier))
        {
            lang_identifier = parseInt(lang_identifier);
        }
        
        if(typeof(lang_identifier)=='number')
        {
            let is_default_lang = false;
            lang_identifier = Math.floor(lang_identifier);
            is_default_lang = lang_identifier < 0;
            is_default_lang |= lang_identifier >= this.number_of_lang;
            if(!is_default_lang)
            {
                this.choosen_language = lang_identifier;
                return;
            }
        }

        this.choosen_language = 0;
    }

    static sentence(words)
    {
        let res = "";
        let sentence = words.split("+");
        for(let i = 0; i<sentence.length; i++)
        {
            res += this.word(sentence[i],this.choosen_language);
        }
        return res;
    }

    static word(word)
    {
        if(this.traductions[word]==undefined)
        {
            let words_low = word.toLowerCase();
            let trad = "";
            //if the same word but in lowercase match
            if(this.traductions[words_low]!=undefined)
            {
                trad = this.word(words_low,this.choosen_language);
                //only first letter to upperCase
                return trad.charAt(0).toUpperCase() + trad.slice(1,trad.length);
            }
            return word;
        }
        else
        {
            return this.traductions[word][this.choosen_language];
        }
    }
}
