
let array = [

"КХЕРА", "КХОКХА", "КХОР", "СА", "ТЕЙП", "ИСТОЛ", 

"ХЬОНК","КОАРТОЛ","АЬРЗИ","КlАЬНКА","МОТТ","ХА",

"ША","БlАРГ","ЧА","БАХЬАН","БИЙСА","БАШХАЛО","БУТТ",

"БОАДО","БЕЗАМ","ЦlА","БОРЗ","ГУЙРЕ","lА","ВИР","ВАЛАР",

"ВАХАР","СЕДКЪА","ГУРГАЛ","АХКА","ОАЛХАЗАР","ПОЛОНИ","ПХА"
 

];


let aL;


const ususus = array.length;


let random;


let word0;


let length;


let word1;


if (sessionStorage.getItem('aL') == null) {
    aL = ususus;
    random = Math.floor(Math.random() * aL);
    word0 = array[random];
    length = word0.length;
    word1 = "";
}

if (sessionStorage.getItem('aL') > 0) {
    aL = sessionStorage.getItem('aL');
    for (i = 0; i < aL; i++) {
        array[i] = sessionStorage['arr[' + i + ']'];
    }
    random = Math.floor(Math.random() * aL);
    word0 = array[random];
    length = word0.length;
    word1 = "";
}

if (sessionStorage.getItem('aL') == 0) {
    aL = ususus;
    random = Math.floor(Math.random() * aL);
    word0 = array[random];
    length = word0.length;
    word1 = "";
}

for (i = 0; i < length; i++) {
    if (word0.charAt(i) == " ") {
        word1 = word1 + " ";
    } else {
        word1 = word1 + "-";
    }
}


const soundYes = new Audio("sound/sound_yes.wav");


const soundNo = new Audio("sound/sound_no.wav");


var letters = ["А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О",
    "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я", "l"
];


let count = 0;


let correctCount;

if (sessionStorage.getItem('correctCount') == null) {
    correctCount = 0;
}

if (sessionStorage.getItem('correctCount') > 0) {
    correctCount = sessionStorage.getItem('correctCount');
}

if (sessionStorage.getItem('correctCount') == ususus) {
    correctCount = 0;
}

function printLetter() {
    document.getElementById("block").innerHTML = word1;
};


window.onload = start;


function start() {
    var content = "";
    for (i = 0; i <= 33; i++) {
        var element = "let" + i;
        content = content + '<div class="letter" onclick="check(' + i + ')" id="' + element + '">' + letters[i] + '</div>';
        if ((i + 1) % 6 == 0) {
            content = content + '<div style="clear:both;"></div>';
        }
    }
    document.getElementById("alphabet").innerHTML = content;
    printLetter();
};


String.prototype.contains = function (a, b) {
    if (a > this.length - 1) {
        return this.toString();
    } else {
        return this.substr(0, a) + b + this.substr(a + 1);
    }
}


function removeByIndex(array, index) {
    return array.filter(function (_element, _index) {
        return index != _index;
    });
}


function check(y) {
    var correct = false;
    for (i = 0; i < length; i++) {
        if (word0.charAt(i) == letters[y]) {
            word1 = word1.contains(i, letters[y]);
            correct = true;
        }
    }
  if (correct == true) {
        soundYes.play();
        var element = "let" + y;
        document.getElementById(element).style.background = "#000000";
        document.getElementById(element).style.color = "#00FF00";
        document.getElementById(element).style.border = "5px solid #00FF00";
        document.getElementById(element).style.cursor = "default";
        printLetter();
        if (count == 0) {
            var img = "picture_after/picture_0.png";
            document.getElementById("gallows").innerHTML = '<img src="' + img + '" height="450" width="400" />';
        }
        if (count == 1) {
            var img = "picture_after/picture_1.png";
            document.getElementById("gallows").innerHTML = '<img src="' + img + '" height="450" width="400" />';
        }
        if (count == 2) {
            var img = "picture_after/picture_2.png";
            document.getElementById("gallows").innerHTML = '<img src="' + img + '" height="450" width="400" />';
        }
        if (count == 3) {
            var img = "picture_after/picture_3.png";
            document.getElementById("gallows").innerHTML = '<img src="' + img + '" height="450" width="400" />';
        }
        if (count == 5) {
            var img = "picture_after/picture_4.png";
            document.getElementById("gallows").innerHTML = '<img src="' + img + '" height="450" width="400" />';
        }
    } else {
        soundNo.play();
        var element = "let" + y;
        document.getElementById(element).style.background = "#000000";
        document.getElementById(element).style.color = "#FF0000";
        document.getElementById(element).style.border = "5px solid #FF0000";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");
        count++;
        var img = "picture_befor/picture_" + count + ".png";
        document.getElementById("gallows").innerHTML = '<img src="' + img + '" height="450" width="400" />';
    }
    if (word0 == word1) {
        correctCount++;
        sessionStorage.setItem('correctCount', correctCount);

        aL--;
        sessionStorage.setItem('aL', aL);

        array.splice(array.indexOf(word0), 1);
        for (i = 0; i < aL; i++) {
            sessionStorage['arr[' + i + ']'] = array[i];
        }

        if (correctCount == ususus) {
            document.getElementById("alphabet").innerHTML = "ДЕРРИГА ДЕШАШ ХАЙРА ХЬОНА" + '<p>КХАЙЛАДАЬКХА ДОШ: ' + word0 + '</p>' +
                '<p>ХАЙНА ДЕШАШ: ' + correctCount + ' ДЕРРИГА ДЕШАШ: ' + ususus + '</p>' +
                '<p><a href="start.html" class="reset">КЕРТЕРА МЕНЮ!</a></p>';
        } else {
            document.getElementById("alphabet").innerHTML = "КОРТАВАЬЛАР ХЬО" + '<p>КХАЙЛАДАЬКХА ДОШ: ' + word0 + '</p>' +
                '<p>ХАЙНА ДЕШАШ: ' + correctCount + ' ДЕРРИГА ДЕШАШ: ' + ususus + '</p>' +
                '<p><span class="reset" onclick="location.reload();">ЮХА ЛОВЗА</span></p>';
        }
    }
    if (count >= 6) {
        document.getElementById("alphabet").innerHTML = "ИЙШАР ХЬО" + '<p>КХАЙЛАДАЬКХА ДОШ: ' + word0 + '</p>' +
            '<p>ХАЙНА ДЕШАШ: ' + correctCount + ' ДЕРРИГА ДЕШАШ: ' + ususus + '</p>' +
            '<p><span class="reset" onclick="location.reload();">ЮХА ЛОВЗА</span></p>';
    }
};
