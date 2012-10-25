/// <reference path="../../../reference.js" />
var MusicManager = new function () {

    var _musicList = {};
    var _mouseOverCount = 0;
    var _song = {};

    this.currentTime = 0;
    this.duration = 0;
    this.playedPercentage = 0;

    this.level = 0;
    this.deltaLevel = 0;

    var _lyrics = [
        ["00:17.94", "00:22.39", "When I have once or twice"],
        ["00:23.93", "00:30.52", "Thought I lived my life .. for"],
        ["00:40.74", "00:47.38", "Oh oh I'll wake up in a thousand years"],
        ["00:48.40", "00:52.06", "With every ghost I'm looking through"],
        ["00:53.33", "00:57.80", "I was a cold, cold boy"],
        ["00:59.52", "01:03.00", "Hey! Oh when I lie with you"],
        ["01:05.15", "01:15.49", "But when I go back through I ......... I"],

        ["01:25.98", "01:30.55", "When it's gone and you hope"],
        ["01:32.12", "01:37.12", "That your mind's made up"],
        ["01:38.62", "01:43.99", "Oh I wake up twenty thousand years"],
        ["01:45.27", "01:48.35", "With every ghost of what I knew"],

        ["01:49.49", "01:53.97", "I was a cold, cold boy"],
        ["01:55.69", "02:00.52", "Hey! oh when I lie with you"],
        ["02:01.99", "02:11.54", "But when I go back you I .......... I"],

        ["02:36.23", "02:40.68", "I was a cold, cold boy"],
        ["02:42.89", "02:47.04", "Hey! Oh when I say to you"],
        ["02:48.80", "02:58.48", "When I go back through I ...... I"]
    ]
    var _lyricsId = 0;

    /* special effect */

    var _effectsId = 0;
    this.isEffect1Used = true;
    this.isEffect2Used = true;
    var _effects = [
        ["00:06.00", 1],
        ["00:30.50", 1],
        ["00:42.50", 1],
        ["00:54.50", 2],
        ["00:57.00", 1],
        ["01:06.50", 1],
        ["01:15.50", 2],
        ["01:27.00", 1],
        ["01:33.00", 1],
        ["01:38.00", 1],
        ["01:51.00", 1],
        ["01:56.30", 2],
        ["02:03.00", 2],
        ["02:08.00", 1],
        ["02:38.00", 2],
        ["02:44.00", 1],
        ["02:50.00", 2]
    ]

    /* frequency of the blue and red balls */
    var _frequencies = [
        ["00:19.00", 1],
        ["00:17.94", 2],
        ["00:53.33", 3],
        ["01:15.49", 1],
        ["01:25.98", 2],
        ["01:49.49", 3],
        ["02:11.54", 2],
        ["02:36.23", 4],
        ["02:58.48", 1]
    ]
    var _frequencyId = 0;

    /* bonus: none = 0, guitar = 1, violin = 2, drum = 3 */
    var _bonuses = [
        ["00:00.00", 3],
        ["00:08.00", 0],
        ["00:30.52", 1],
        ["00:40.74", 0],
        ["00:52.06", 3],
        ["00:56.00", 0],
        ["00:58.00", 2],
        ["01:06.50", 0],
        ["01:15.49", 2],
        ["01:25.98", 0],
        ["01:39.50", 3],
        ["01:52.50", 0],
        ["01:54.00", 2],
        ["02:03.00", 0],
        ["02:23.00", 1],
        ["02:35.00", 0],
        ["02:36.00", 3],
        ["02:40.00", 0],
        ["02:41.50", 2],
        ["02:50.00", 0],
        ["02:58.48", 2]
    ]
    var _bonusId = 0;

    var _parseTime = function () {
        /* lyrics */
        for (var i = 0; i < _lyrics.length; i++) {
            _lyrics[i][0] = _timeStr2Sec(_lyrics[i][0]);
            _lyrics[i][1] = _timeStr2Sec(_lyrics[i][1]);
        }
        /* effects */
        for (var i = 0; i < _effects.length; i++) {
            _effects[i][0] = _timeStr2Sec(_effects[i][0]);
        }
        /* frequencies */
        for (var i = 0; i < _frequencies.length; i++) {
            _frequencies[i][0] = _timeStr2Sec(_frequencies[i][0]);
        }
        /* bonus */
        for (var i = 0; i < _bonuses.length; i++) {
            _bonuses[i][0] = _timeStr2Sec(_bonuses[i][0]);
        }
    }

    var _timeStr2Sec = function (str) {
        var arr = str.split(":");
        return parseInt(arr[0]) * 60 + parseFloat(arr[1]);
    }

    this.play = function () {
        _song.currentTime = 0;
        _song.play();
        _song.volume = 1;
    }
    this.pause = function () {
        _song.pause();
        _song.volume = 0;
    }
    this.resume = function () {
        _song.play();
        _song.volume = 1;
    }

    this.init = function () {
        var buttons = document.getElementsByName("btn");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("mouseover", _onBtnMouseOver, false);
        }
    }



    this.playMouseOver = function () {
        _musicList["mouseover_" + ((_mouseOverCount++) % 2)].play();
    }

    var _onBtnMouseOver = function (e) {
        e.target.style.opacity = .8;

        e.target.removeEventListener("mouseover", _onBtnMouseOver, false);
        e.target.addEventListener("mouseout", _onBtnMouseOut, false);
    }
    var _onBtnMouseOut = function (e) {
        e.target.style.opacity = 1;
        MusicManager.playMouseOver();
        e.target.removeEventListener("mouseout", _onBtnMouseOut, false);
        e.target.addEventListener("mouseover", _onBtnMouseOver, false);
    }


    this.load = function (imagePath, musicPath, songPath) {
        var ext = StageReference.isFF ? ".ogg" : ".mp3";

        EKLoader.add(imagePath + "data.png", _onVolumeDataLoaded);
        EKLoader.add(songPath + "Ra_Ra_Riot_Boy" + ext, _onSongLoaded, null, null, null, 30);
        //EKLoader.add(songPath + "Ra_Ra_Riot_Boy_short" + ext, _onSongLoaded, null, null, null, 30);
        EKLoader.add(musicPath + "mouseover_0" + ext, this.addToMusicList, null, null, { id: "mouseover_0" });
        EKLoader.add(musicPath + "mouseover_1" + ext, this.addToMusicList, null, null, { id: "mouseover_1" });
    };

    var _onVolumeDataLoaded = function (imageSource) {
        SpectrumManager.init(imageSource.source, 0);
    }

    var _onSongLoaded = function (audioSource) {
        _song = audioSource.source;
        MusicManager.duration = _song.duration;
        _song.addEventListener('timeupdate', _onTimeUpdate, false);
        //_song.addEventListener('pause', , false);
        _song.addEventListener('ended', _onComplete, false);

    };

    this.addToMusicList = function (audioSource) {
        _musicList[audioSource.data.id] = audioSource.source;
    };


    var _onTimeUpdate = function () {
        var t = MusicManager.currentTime = _song.currentTime;
        MusicManager.playedPercentage = t / MusicManager.duration;

        MusicManager.level = SpectrumManager.getLevel(t);
        MusicManager.deltaLevel = SpectrumManager.getLevel(t - 1 / 60) - MusicManager.level;

        for (var i = _lyricsId; i < _lyrics.length; i++) {
            if (MusicManager.currentTime < _lyrics[i][0]) break;
            if (MusicManager.currentTime < _lyrics[i][1]) {
                SubtitleManager.changeSubtitle(_lyrics[i][2]);
            } else {
                SubtitleManager.changeSubtitle("");
                _lyricsId++;
            }
        }
        for (var i = _effectsId; i < _effects.length; i++) {
            if (MusicManager.currentTime < _effects[i][0]) break;
            MusicManager.isEffect1Used = false;
            MusicManager.isEffect2Used = !_effects[i][1] == 2;
            _effectsId++;
        }
        for (var i = _frequencyId; i < _frequencies.length; i++) {
            if (MusicManager.currentTime < _frequencies[i][0]) break;
            Game.frequency = _frequencies[i][1];
            _frequencyId++;
        }


    }

    this.reset = function () {
        _frequencyId = 0;
        _lyricsId = 0;
        _effectsId = 0;
        _bonusId = 0;
    }

    var _onComplete = function () {
        Game.endGame();
    }

    _parseTime();
}
