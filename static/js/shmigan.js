// The shmigan syllabary, maps syllables to symbols in shmigan.
var SYLLABARY = [];
SYLLABARY[ "" ] = "";
//Simples
SYLLABARY[ "t" ] = "/^";
SYLLABARY[ "k" ] = "\\^";
SYLLABARY[ "p" ] = "\\/^";
SYLLABARY[ "th"] = "/)^";
SYLLABARY[ "sh"] = "\\(^";
SYLLABARY[ "x" ] = "\\/()^";
SYLLABARY[ "r" ] = "/]^";
SYLLABARY[ "l" ] = "\\[^";
SYLLABARY[ "n" ] = "\\/[]^";
//s-additions
SYLLABARY[ "st"] = "/~";
SYLLABARY[ "sk"] = "\\~";
SYLLABARY[ "sp" ] = "\\/~";
SYLLABARY[ "sth"] = "/)~";
SYLLABARY[ "ssh"] = "\\(~";
SYLLABARY[ "sx" ] = "\\/()~";
SYLLABARY[ "sr" ] = "/]~";
SYLLABARY[ "sl" ] = "\\[~";
SYLLABARY[ "sn" ] = "\\/[]~";
//compounds
SYLLABARY[ "str"] = "/*";
SYLLABARY[ "skr"] = "\\*";
SYLLABARY[ "spr"] = "\\/*";
SYLLABARY[ "thr"] = "/)*";
SYLLABARY[ "shr"] = "\\(*";
SYLLABARY[  "xr"] = "\\/()*";
SYLLABARY[ "thl"] = "/]*";
SYLLABARY[ "shl"] = "\\[*";
SYLLABARY[ "xl"] = "\\/[]*";
//s-addition codas
SYLLABARY[ "ts"] = "/~";
SYLLABARY[ "ks"] = "\\~";
SYLLABARY[ "ths"] = "/)~";
SYLLABARY[ "shs"] = "\\(~";
SYLLABARY[ "xs" ] = "\\/()~";
SYLLABARY[ "ls" ] = "/]~";
SYLLABARY[ "rs" ] = "\\[~";
SYLLABARY[ "ns" ] = "\\/[]~";
//compound codas
SYLLABARY[ "rts"] = "/*";
SYLLABARY[ "rks"] = "\\*";
SYLLABARY[ "rps"] = "\\/*";
SYLLABARY[ "rth"] = "/)*";
SYLLABARY[ "rsh"] = "\\(*";
SYLLABARY[ "rx"] = "\\/()*";
SYLLABARY[ "lth"] = "/]*";
SYLLABARY[ "lsh"] = "\\[*";
SYLLABARY[ "lx"] = "\\/[]*";
//special case 's'
SYLLABARY[ "s" ] = "*";


// The 'vowels' recognized by shmigan
var VOWELS = [];
VOWELS[ "a" ] = "-";
VOWELS[ "e" ] = "\"";
VOWELS[ "i" ] = "'";
VOWELS[ "o" ] = "-\"";
VOWELS[ "u" ] = "-'";
VOWELS[ "'" ] = "";

// The punctuation marks
var PUNCT = [];
PUNCT[ " " ] = " ";
PUNCT[ "<" ] = "<\\^";
PUNCT[ ">" ] = ">/^";
PUNCT[ "." ] = "><\\/^";
PUNCT[ "[" ] = "<\\~";
PUNCT[ "]" ] = ">/~";
PUNCT[ "?" ] = "><\\/~";
PUNCT[ "(" ] = "<\\*";
PUNCT[ ")" ] = ">/*";
PUNCT[ "!" ] = "><\\/*";

function syllOf(text) {
    if (SYLLABARY[text] == null) return "?";
    return SYLLABARY[text];
}
// Converts the given text to its shmigan representation, to be rendered in the
// shmigan font.
function toShmigan(text) {
    var i=0;
    var outstring = "";
    var syllable = "";
    while (i < text.length) {
        if (PUNCT[text.charAt(i)] != null) {
            outstring = outstring.concat( syllOf(syllable) + PUNCT[text.charAt(i)] );
            syllable = "";
        } else if (text.charAt(i).toLowerCase() != text.charAt(i).toUpperCase() || text.charAt(i) == "'") {
            if (VOWELS[text.charAt(i).toLowerCase()] == null) {
                syllable = syllable.concat(text.charAt(i).toLowerCase());
            } else {
                outstring = outstring.concat( VOWELS[text.charAt(i).toLowerCase()] + syllOf(syllable) );
                syllable = "";
            }
        } else {
            outstring = outstring.concat(text.charAt(i));
        }
        i++;
    }
    if (syllable.length > 0) outstring = outstring.concat(syllOf(syllable));
    return outstring;
}

function toIPA(text) {
    return text.replace(new RegExp("sh", 'g'),"&#643;")
               .replace(new RegExp("th", 'g'),"&theta;")
               .replace(new RegExp("'", 'g')," ")
               .replace(new RegExp("r", 'g'),"&#633;");
}



//Render all shmigan classes in proper shmigan.
$(".shmigan").each(function(index){
    var txt = $(this).text();
    $(this).text("");
    $(this).append("<span class=\"ipa\">" + toIPA(txt) + "</span>");
    $(this).append("<span class=\"real_shmigan\">" + toShmigan(txt) + "</span>");
});
