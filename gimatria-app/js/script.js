const inputext = document.getElementById("inputext");
const butt = document.getElementById("butt");
const contentGim = document.getElementById("contentGim");
const amount = document.getElementById("amount");

let splitText;
contentGim.innerHTML = "";
let arrAmount = [];
const arrLaterGim = [{
        later: "א",
        gim: 1
    },
    {
        later: "ב",
        gim: 2
    },
    {
        later: "ג",
        gim: 3
    },
    {
        later: "ד",
        gim: 4
    },
    {
        later: "ה",
        gim: 5
    },
    {
        later: "ו",
        gim: 6
    },
    {
        later: "ז",
        gim: 7
    },
    {
        later: "ח",
        gim: 8
    },
    {
        later: "ט",
        gim: 9
    },
    {
        later: "י",
        gim: 10
    },
    {
        later: "כ",
        gim: 20
    },
    {
        later: "ך",
        gim: 20
    },
    {
        later: "ל",
        gim: 30
    },
    {
        later: "מ",
        gim: 40
    },
    {
        later: "ם",
        gim: 40
    },
    {
        later: "נ",
        gim: 50
    },

    {
        later: "ן",
        gim: 50
    },
    {
        later: "ס",
        gim: 60
    },
    {
        later: "ע",
        gim: 70
    },
    {
        later: "פ",
        gim: 80
    },
    {
        later: "ף",
        gim: 80
    },
    {
        later: "צ",
        gim: 90
    },
    {
        later: "ץ",
        gim: 90
    },
    {
        later: "ק",
        gim: 100
    },
    {
        later: "ר",
        gim: 200
    },
    {
        later: "ש",
        gim: 300
    },
    {
        later: "ת",
        gim: 400
    },
    {
        later: "-",
        gim: "-"
    }
];

butt.addEventListener('click', textToArray);
amount.addEventListener('click', amountGim);
buttoncopy.addEventListener('click', copyText);
inputext.addEventListener('focus', cleatInputs);

function textToArray() {
    const toM = inputext.value.replace(/ /g, "-");
    splitText = toM.split("");

    convertTextToNumbers()
};

function convertTextToNumbers() {
    for (let x = 0; x < splitText.length; x++) {
        for (let y = 0; y < arrLaterGim.length; y++) {
            if (splitText[x] == arrLaterGim[y].later) {
                contentGim.innerHTML += arrLaterGim[y].gim + '|';
                if (arrLaterGim[y].gim != "-") {
                    arrAmount.push(arrLaterGim[y].gim);
                }
            }
        }
    }
    inputext.value = ""
};

function amountGim() {
    let am = 0;
    for (let x = 0; x < arrAmount.length; x++) {
        am += arrAmount[x];
    }
    amount.innerHTML = am;
}

function copyText() {
    if (contentGim.innerHTML != "") {
        const range = document.createRange();
        const selection = window.getSelection();

        // Clear selection from any previous data.
        selection.removeAllRanges();

        // Make the range select the entire content of the contentHolder paragraph.
        range.selectNodeContents(contentGim);

        // Add that range to the selection.
        selection.addRange(range);

        // Copy the selection to clipboard.
        document.execCommand('copy');

        // Clear selection if you want to.
        selection.removeAllRanges();

        // copy++;
        buttoncopy.innerHTML = "הטקסט הועתק"
    }
}

function cleatInputs() {
    contentGim.innerHTML = "";
    arrAmount = [];
    amount.innerHTML = 'סכום גימטריה';
    buttoncopy.innerHTML = "העתק טקסט"
}