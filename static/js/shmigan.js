// The shmigan syllabary, maps syllables to symbols in shmigan.
var SYLLABARY = [];
SYLLABARY[ "" ] = "";
SYLLABARY[ "t" ] = "/^";
SYLLABARY[ "d" ] = "\\^";
SYLLABARY[ "m" ] = "\\/^";
SYLLABARY[ "p" ] = ")/^";
SYLLABARY[ "b" ] = "(\\^";
SYLLABARY[ "n" ] = "()\\/^";
SYLLABARY[ "k" ] = "]/^";
SYLLABARY[ "g" ] = "[\\^";
SYLLABARY[ "h" ] = "[]\\/^";
SYLLABARY[ "f" ] = "/~";
SYLLABARY[ "v" ] = "\\~";
SYLLABARY[ "l" ] = "\\/~";
SYLLABARY[ "th" ] = ")/~";
SYLLABARY[ "ch" ] = "(\\~";
SYLLABARY[ "r" ] = "()\\/~";
SYLLABARY[ "sh" ] = "]/~";
SYLLABARY[ "zh" ] = "[\\~";
SYLLABARY[ "w" ] = "[]\\/~";
SYLLABARY[ "st" ] = "/*";
SYLLABARY[ "sp" ] = "\\*";
SYLLABARY[ "sk" ] = "\\/*";
SYLLABARY[ "sl" ] = ")/*";
SYLLABARY[ "sm" ] = "(\\*";
SYLLABARY[ "sn" ] = "()\\/*";
SYLLABARY[ "ssh" ] = "]/*";
SYLLABARY[ "sth" ] = "[\\*";
SYLLABARY[ "sw" ] = "[]\\/*";
SYLLABARY[ "y" ] = "^";
SYLLABARY[ "x" ] = "~";
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

//Render all shmigan classes in proper shmigan.
$(".shmigan").each(function(index){
    $(this).text(toShmigan($(this).text()));
});
