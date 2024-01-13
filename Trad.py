import json
import os
import re

class Trad:
    languages = {
        'en':0,
        'es':1,
        'fr':2
    }
    lang = 0
    words = {}

    def init(lang=0, chars='abcdefghijklmnopqrstuvwxyz'):
        Trad.setLanguage(lang)
        Trad.loadTraductions(chars)

    #values allowed 'es','en','fr', 0, 1, 2
    def setLanguage(lang):
        if lang in Trad.languages:
            Trad.lang = Trad.languages[lang]
        else:
            Trad.lang = lang
    
    # load json files, one letter (from 'all_files' string)
    # named and punctuation.json
    # from directory named 'traductions'
    def loadTraductions(all_files):
        path_base = os.getcwd()
        relative_path = os.path.join(path_base,'traductions')
        ext = '.json'
        #all_files = "abcdefghijklmnopqrstuvwxyz"
        file = ''
        path = ''

        for i in range(0, len(all_files)+1):
            if i == len(all_files): file = 'punctuation'
            else: file = all_files[i]

            path = os.path.join(relative_path, file+ext)

            with open(path, 'r') as json_file:
                Trad.words.update(json.load(json_file))

    def part(string):
        if string in Trad.words:
            return Trad.words[string][Trad.lang]
        elif string.lower() in Trad.words:
            return Trad.words[string.lower()][Trad.lang].capitalize()
        else:
            return string

    # · separation to replace by nothing
    # _ separation to replace by space
    # escape '·' and '_' if part of term to traduce
    # example: Trad.all('¡·I love_apple\_1·!)
    # try to traduce '¡', 'I love', 'apple_1' and '!'
    # and the traduction might be 'I love orb!
    def all(string):
        traduc = ""
        stringParsed = re.sub(r"\\·","¿d0t¡",string)
        stringParsed = re.sub(r"\\_","¿und3rsc0r¡",stringParsed)
        stringParsed = re.sub(r"_", "_ _", stringParsed)
        stringSplit = re.split(r"[·_]", stringParsed)
        
        for part in stringSplit:
            part = part.replace('¿d0t¡','·')
            part = part.replace('¿und3rsc0r¡','_')
            traduc += Trad.part(part)
        
        return traduc
