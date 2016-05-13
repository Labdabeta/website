// The shmigan syllabary, maps syllables to symbols in shmigan.
var SYLLABARY = [];
SYLLABARY[ "" ] = "";
//Simples
SYLLABARY[ "t" ] = "/^";
SYLLABARY[ "k" ] = "\\^";
SYLLABARY[ "q" ] = "\\/^"; // glottal stop, no character in english
SYLLABARY[ "th"] = "/)^";
SYLLABARY[ "sh"] = "\\(^";
SYLLABARY[ "x" ] = "\\/()^";
SYLLABARY[ "r" ] = "/]^";
SYLLABARY[ "l" ] = "\\[^";
SYLLABARY[ "n" ] = "\\/[]^";
//s-additions
SYLLABARY[ "st"] = "/~";
SYLLABARY[ "sk"] = "\\~";
SYLLABARY[ "s" ] = "\\/~";
SYLLABARY["sth"] = "/)~";
SYLLABARY["ssh"] = "\\(~";
SYLLABARY["sx" ] = "\\/()~";
SYLLABARY["sl" ] = "/]~";
SYLLABARY["sr" ] = "\\[~";
SYLLABARY["sn" ] = "\\/[]~";
//compounds
SYLLABARY["str"] = "/*";
SYLLABARY["skr"] = "\\*";
SYLLABARY[ "h" ] = "\\/*"; 
SYLLABARY["thr"] = "/)*";
SYLLABARY["shr"] = "\\(*";
SYLLABARY[ "xr"] = "\\/()*";
SYLLABARY["thl"] = "/]*";
SYLLABARY["shl"] = "\\[*";
SYLLABARY[ "xl"] = "\\/[]*";
//s-addition codas
SYLLABARY[ "ts"] = "/~";
SYLLABARY[ "ks"] = "\\~";
SYLLABARY["ths"] = "/)~";
SYLLABARY["shs"] = "\\(~";
SYLLABARY["xs" ] = "\\/()~";
SYLLABARY["ls" ] = "/]~";
SYLLABARY["rs" ] = "\\[~";
SYLLABARY["ns" ] = "\\/[]~";
//compound codas
SYLLABARY["rts"] = "/*";
SYLLABARY["rks"] = "\\*";
SYLLABARY[ "ch"] = "\\/*"; 
SYLLABARY["rth"] = "/)*";
SYLLABARY["rsh"] = "\\(*";
SYLLABARY[ "rx"] = "\\/()*";
SYLLABARY["lth"] = "/]*";
SYLLABARY["lsh"] = "\\[*";
SYLLABARY[ "lx"] = "\\/[]*";


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

//Render all shmigan classes in proper shmigan.
$(".shmigan").each(function(index){
    $(this).text(toShmigan($(this).text()));
});
