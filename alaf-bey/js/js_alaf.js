function init() {
    latt = ["א", "בּ", "ב", "גּ", "ג", "דּ", "ד", "ה", "ו", "ז", "ח", "ט", "י", "כּ", "כ", "ך", "ל", "מ", "ם", "נ", "ן", "ס", "ע", "פּ", "פ", "ף", "צ", "ץ", "ק", "ר", "שׁ", "שֹ", "תּ", "ת"];
    auareey = ["audio/1.wav", "audio/2.wav", "audio/3.wav", "audio/4.wav", "audio/5.wav", "audio/6.wav", "audio/7.wav", "audio/8.wav", "audio/9.wav", "audio/10.wav", "audio/11.wav", "audio/12.wav", "audio/13.wav", "audio/14.wav", "audio/15.wav", "audio/16.wav", "audio/17.wav", "audio/18.wav", "audio/19.wav", "audio/20.wav", "audio/21.wav", "audio/22.wav", "audio/23.wav", "audio/24.wav", "audio/25.wav", "audio/26.wav", "audio/27.wav", "audio/28.wav", "audio/29.wav", "audio/30.wav", "audio/31.wav", "audio/32.wav", "audio/33.wav", "audio/34.wav"];
    auareey1 = ["audio/1.wav", "audio/2.wav", "audio/3.wav", "audio/4.wav", "audio/5.wav", "audio/6.wav", "audio/7.wav", "audio/8.wav", "audio/9.wav", "audio/10.wav", "audio/11.wav", "audio/12.wav", "audio/13.wav", "audio/14.wav", "audio/15.wav", "audio/16.wav", "audio/17.wav", "audio/18.wav", "audio/19.wav", "audio/20.wav", "audio/21.wav", "audio/22.wav", "audio/23.wav", "audio/24.wav", "audio/25.wav", "audio/26.wav", "audio/27.wav", "audio/28.wav", "audio/29.wav", "audio/30.wav", "audio/31.wav", "audio/32.wav", "audio/33.wav", "audio/34.wav"];
    latt1 = 0;

    shone = 6;
    shone1 = 12;
    shone2 = 0;
    shone3 = 0;
    namrand = [, 1, 2, 5, 4, 3, ];

    console.log(latt);
}


function chengscreen() {
    openapp.style = "display: none";
    menuapp.style = "display: block";
}


function chenglater() {
    menuapp.style = "display: none";
    in_learne.style = "display: none";
    learn_latterid.style = "display: block";
    manu_learn_latter1.style.backgroundColor = "#ffc884";
    manu_learn_latter3.style.backgroundColor = "bisque";
    alafbey_audio()
}


function alafbey_audio() {
    learen_alafbey.style = "display: block";
    in_learne.style = "display: none";
    alaf.onclick = alafbey_audio;


    if (latt1 < latt.length) {
        alaf.innerHTML = latt[latt1];
        audio_alaf.src = auareey[latt1];
        latt1++;

    } 
    if (latt1 == 34){
        latt1 = 0;
    }
    
    console.log(latt);
    console.log(latt1);
    audio_alaf.play();
    manu_learn_latter1.style.backgroundColor = "#ffc884";
    manu_learn_latter3.style.backgroundColor = "bisque";
    manu_learn_latter2.style.backgroundColor = "bisque";
    _beck_me.style = "display: block";
}


function alafbey_random() {
    learen_alafbey.style = "display: block";
    in_learne.style = "display: none";
    alaf.onclick = alafbey_random;
    var alafrnd = Math.random() * 33;
    alafrnd = Math.ceil(alafrnd);
    alaf.innerHTML = latt[alafrnd];
    audio_alaf.src = auareey1[alafrnd];
    audio_alaf.play();
    manu_learn_latter3.style.backgroundColor = "#ffc884";
    manu_learn_latter1.style.backgroundColor = "bisque";
    manu_learn_latter2.style.backgroundColor = "bisque";
}


function che_beck() {
    learen_alafbey.style = "display: none";
    in_learne.style = "display: block";
    manu_learn_latter2.style.backgroundColor = "#ffc884";
    manu_learn_latter3.style.backgroundColor = "bisque";
    manu_learn_latter1.style.backgroundColor = "bisque";
    shone3 = 0;
    shone2 = 0;
    am.innerHTML = latt[shone3];
    audio_in_learne.play();
    setTimeout(alaf_were, 900);

}


function alaf_were() {
    if (shone2 < auareey.length) {
        audio_alaf.src = auareey[shone2];
    } else {
        shone2 = 0
    }
    audio_alaf.src = auareey[shone2];

    audio_alaf.play();
    shone2++;
}


function goodall() {
    good.play();
    setTimeout(up_latter, 1000);
}


function up_latter() {
    if (shone3 < latt.length - 1) {
        am.innerHTML = latt[shone3];
        shone3++;
    } else {
        shone3 = 0
    }
    am.innerHTML = latt[shone3];

    if (shone < latt.length - 1) {
        bm.innerHTML = latt[shone];
        shone++;
    } else {
        shone = 0
    }
    bm.innerHTML = latt[shone];

    if (shone1 < latt.length - 1) {
        cm.innerHTML = latt[shone1];
        shone1++;
    } else {
        shone1 = 0
    }
    cm.innerHTML = latt[shone1];

    var alafrnd = Math.random() * 5;
    alafrnd = Math.ceil(alafrnd);
    am.style.order = namrand[alafrnd];
    audio_in_learne.play();
    setTimeout(alaf_were, 900);
}



function no_good() {
    nogood.play();
}


function beck_me() {
    menuapp.style = "display: block";
    learn_latterid.style = "display: none";
    latt1 = 0;
    shone2 = 0;
    shone3 = 0;
    _beck_me.style = "display: none";
}
