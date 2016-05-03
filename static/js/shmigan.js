// The shmigan syllabary, maps syllables to symbols in shmigan.
var SYLLABARY = [];
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
SYLLABARY[ "th*" ] = "(\\~";
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

// Converts the given text to its shmigan representation, to be rendered in the
// shmigan font.
function toShmigan(text) {
    var i=0;
    var outstring = "";
    var syllable = "";
    while (i < text.length) {
        syllable = "";
        if (PUNCT[text.charAt(i)] == null) {
            while (VOWELS[text.charAt(i)] == null) {
                if (i >= text.length) return outstring;
                syllable += text.charAt(i);
                i++;
            }
            outstring = outstring + VOWELS[text.charAt(i)] + SYLLABARY[syllable];
        } else {
            outstring = outstring + PUNCT[text.charAt(i)];
        }

        i++;
    }
    return outstring;
}

//Render all shmigan classes in proper shmigan.
$(".shmigan").each(function(index){
    $(this).text(toShmigan($(this).text()));
});
