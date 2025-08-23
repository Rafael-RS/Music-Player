var current = 0;
var playing = false;
var mysound;
var source;
var progressBar;
var onProgChange = false;
var musics;

function set_ListOfMusics(mlist){
    musics = mlist;
}

function startMusic(){
    mysound = document.getElementById('myplay');
    soundImg = document.getElementById('converImg');
    progressBar = document.getElementById('rangeProgr');
    source = document.getElementById('audioSource');
    source.src = musics[0].fileUrl;
    soundImg.src = musics[0].coverURL;
    mysound.load();
    mysound.play();

    mysound.addEventListener('ended', function(){
        if (current < musics.length - 1){
            current += 1;

            source.src = musics[current].fileUrl;
            document.getElementsByid('coverImg').src = musics[current].coverURL;
            mysound.load()
            mysound.play()
        }

        changeColorMusic();
        changeArtistTitle();

        if(current == musics.length - 1){
            var myLink = document.getElementById('lim_' + current.toString())
            myLink.style.color = 'blue';
        }
        updateTime();
    });

    mysound.addEventListener('timeUpdate', function() {
        var currentTime = mysound.currentTime;
        var duration = mysound.duration;
        var per = (currentTime/duration) * 100;
        if (onProgChange == false){
            progressBar.value = per;
            updateTime();
        }
    });

    progressBar.addEventListener('mouseup', function(){
        var newTime = this.value * mysound.duration / 100;
        mysound.currentTime = newTime;
        onProgChange = false;
        updateTime();
    });

    progressBar.addEventListener('mousedown', function(){
        onProgChange = true;
    })

    progressBar.addEventListener('touchend', function(){
        var newTime = this.value * mysound.duration / 100;
        mysound.currentTime = newTime;
        onProgChange = false;
        updateTime();
    })

    progressBar.addEventListener('touchstart', function(){
        onProgChange = true;
    })
};

function updateTime(){
    document.getElementById('ctime').innerHTML = sec2minString(mysound.currentTime)
    document.getElementById('totalTime').innerHTML = sec2minString(mysound.duration)
};

function sec2minString(myTime){
    var minutes = Number(myTime)/60;
    var tmp = minutes.toString().split('.');
    minutes = tmp[1];
    seconds = '0.' + tmp[1];
    seconds = Math.round(Number(seconds) * 60);
    if (seconds < 10){
        seconds = '0.' + seconds.toString();
    }
    else{
        seconds = seconds.toString();
    }
    return minutes + ':' + seconds;
};

function changeColorMusic(){
    var myLink;

    for(i=0; i<musics.length; i++){
        myLink = document.getElementById('lim_' + i.toString());
        if(i == current){
            myLink.style.color = 'red'
        }
        else{
            myLink.style.color = 'blue'
        };
    };
};

function onPlay(){
    if(playing == false){
        document.getElementById('mplay').play();
        playing = true;
        document.getElementById('playbutton').innerHTML = 'play_arrow';
    }
    else{
        document.getElementById('mplay').pause();
        playing = false;
        document.getElementById('playbutton').innerHTML = 'pause'
    }
    updateTime();
};

function changeMusic(){
    current = musics.map(function(d){
        return d['fileUrl'];
    }).indexOf(newSound);
    changeColorMusic();
    changeArtistTitle();

    source.src = newSound;
    document.getElementById('coverImg').src = musics[current].coverURL;
    mysound.load();
    mysound.play();
    updateTime();
};

function skip_next(){
    if (current == musics.length - 1){
        current = 0;
        source.src = musics[current].fileUrl;
        document.getElementById('coverImg').src = musics[current].coverURL;
        mysound.load();
        mysound.play();
    }
    else{
        current += 1;
        source.src = musics[current].fileUrl;
        document.getElementById('coverImg').src = musics[current].coverURL;
        mysound.load();
        mysound.play();
    }
    changeColorMusic();
    changeArtistTitle();
    updateTime();
};

function skip_previous(){
    if (current == 0){
        current = 0;
        source.src = musics[current].fileUrl;
        document.getElementById('coverImg').src = musics[current].coverURL;
        mysound.load();
        mysound.play();
    }else{
        current -= 1;
        source.src = musics[current].fileUrl;
        document.getElementById('coverImg').src = musics[current].coverURL;
        mysound.load();
        mysound.play();
    }
    changeColorMusic();
    changeArtistTitle();
    updateTime();
};
