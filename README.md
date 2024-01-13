# Trad
## Class to traduce expresions using json files of traductions
## Clase para traducir expresiones usando archivos json de traducciones

Trad.py
  Need to using Trad.init(language:string, jsonFilesList:string)
  It set language and load all traduction json files

Trad.js
  1) Need to load json files first and convert them to js object
  2) Use Trad.load_trads(traductions:object)
  3) Trad.set_language(lang_identifier) if lang_identifier is undefined Trad use the navigator language
