var canvas = document.getElementById('fft');
var canvas2 = document.getElementById('fft2');
var ctx = canvas.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var channels;
var rate;
var frameBufferLength;
var fft;
var audio = document.getElementById('player');
var $peak= new Float32Array(513);
var bd = new BeatDetektor(60, 90);
var vu = new BeatDetektor.modules.vis.VU();
var m_BeatCounter = 0;
var m_BeatTimer = 0;
var fade = 255;
var oldBeat = 0;
var ftimer = 0;
function clearfft(){
	var canvas = document.getElementById('fft');
	var canvas2 = document.getElementById('fft2');
	var ctx = canvas.getContext('2d');
	var ctx2 = canvas2.getContext('2d');
	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx2.clearRect(0,0, canvas2.width, canvas2.height);
}
function prefft(i){
	if(($fftstyle==1)&&(i==0)){
				ctx.beginPath();
				ctx.moveTo(0, canvas.height);
	}
	if(($fftstyle==2)&&(i==0)){
				ctx.beginPath();
				ctx.moveTo(0, canvas.height);
	}
	if(($fftstyle==3)&&(i==0)){
				ctx.beginPath();
	}
	if(($fftstyle==4)&&(i==0)){
				ctx.beginPath();
	}
}
function drawfft(i,$ta){
	if($fftstyle==0){
		ctx.fillStyle = $thems_bg ;
		ctx.fillRect(i * 4, canvas.height, 3,$ta);
		var tb="rgba("+$thems_bg.colorRgb()+",0.3)";
		ctx2.fillStyle = tb;
		ctx2.fillRect(i * 4, canvas2.height*0.5, 3, -$ta*0.3);
	}else if($fftstyle==1){
		ctx.strokeStyle = $thems_bg ;
		ctx.lineWidth = 3;
		var $cc=$ta+(canvas.height-10);
		if($cc<=3){
			$cc=3;
		}
		ctx.lineTo(i * 4, $cc);
		
	}else if($fftstyle==2){
		var tb="rgba("+$thems_bg.colorRgb()+",0.3)";
		ctx.fillStyle = tb;
		ctx.strokeStyle = tb ;
		ctx.lineWidth = 3;
		var $cc=$ta+(canvas.height-10);
		if($cc<=3){
			$cc=3;
		}
		ctx.lineTo(i * 4, $cc);
		
	}else if($fftstyle==3){
		ctx.strokeStyle = $thems_bg ;
		ctx.lineWidth = 3;
		var $cc=$ta+(canvas.height-10);
		if($cc<=3){
			$cc=3;
		}
		ctx.moveTo(i * 4, canvas.height/2 - $ta/2);
		ctx.lineTo(i * 4, canvas.height/2 + $ta/2);
	}else if($fftstyle==4){
		ctx.fillStyle = $thems_bg ;
		ctx.fillRect(i * 4, canvas.height, 3,$ta);
		var tb="rgba("+$thems_bg.colorRgb()+",0.3)";
		ctx2.fillStyle = tb;
		ctx2.fillRect(i * 4, canvas2.height*0.5, 3, -$ta*0.3);
	}
}
function postfft(i,fftm){
	if(($fftstyle==1)&&(i==(fftm-1))){
				ctx.stroke();
				ctx.closePath();
	}
	if(($fftstyle==2)&&(i==(fftm-1))){
				ctx.lineTo(i * 4,canvas.height);
				ctx.lineTo(0, canvas.height);
				ctx.stroke();
				ctx.closePath();
				ctx.fill();
	}
	if(($fftstyle==3)&&(i==(fftm-1))){
				ctx.stroke();
				ctx.closePath();
	}
	if(($fftstyle==4)&&(i==(fftm-1))){
				ctx.fill();
	}
}
function beateffect(){
	if ( oldBeat != bd.win_bpm_int_lo ) {
    	document.getElementById('header_info_frameb').innerHTML=bd.win_bpm_int_lo+" BPM ";
  	}
	oldBeat = bd.win_bpm_int_lo;
}
      function loadedMetadata() {
        channels          = audio.mozChannels;
        rate              = audio.mozSampleRate;
        frameBufferLength = audio.mozFrameBufferLength;
		document.getElementById('header_info_rate').innerHTML=roundFun((rate/1000),1)+"KHz ";
		document.getElementById('header_info_chanel').innerHTML=channels+" 声道";
		document.getElementById('header_info_frameb').innerHTML="检测中";
        fft = new FFT(frameBufferLength / channels, rate);
      }

      function audioAvailable(event) {
        var fb = event.frameBuffer,
            t  = event.time, /* unused, but it's there */
            signal = new Float32Array(fb.length / channels),
            magnitude;
			bd.process( t, fft.spectrum );
		 
        for (var i = 0, fbl = frameBufferLength / 2; i < fbl; i++ ) {
          // Assuming interlaced stereo channels,
          // need to split and merge into a stero-mix mono signal
          signal[i] = (fb[2*i] + fb[2*i+1]) / 2;
        }

        fft.forward(signal);

        // Clear the canvas before drawing spectrum
        clearfft();
		/*for($j=0;$j<512;$j++){
			var ta=-fft.spectrum[$j] * 4000;
			
			if($peak[$j]>=ta){
				$peak[$j]=ta;
			}else{
				$peak[$j]*=0.99;
			}
		}*/
        for (var i = 0; i < fft.spectrum.length; i++ ) {
			prefft(i);
			
          // multiply spectrum by a zoom value
          magnitude = fft.spectrum[i] * 4000;

          // Draw rectangle bars for each frequency bin
          var $ta=-magnitude;
		  drawfft(i,$ta);
		  postfft(i,fft.spectrum.length);
		  beateffect();
        }
      }
	  if('mozWriteAudio' in new Audio()){
		  audio.addEventListener('MozAudioAvailable', audioAvailable, false);
     	  audio.addEventListener('loadedmetadata', loadedMetadata, false);
	  }
	  
	  //if(window.webkitAudioContext){
		//  window.addEventListener('load', webkitreadaudio, false);
		  //webkitreadaudio();
	  //}
	  if(window.webkitAudioContext){
		  var context = new webkitAudioContext();
		  var analyser = context.createAnalyser();
	  }
	  function rafCallback(time) {
		  clearfft();
		   window.webkitRequestAnimationFrame(rafCallback, canvas);
			var OFFSET = 100;
			var freqByteData = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(freqByteData); //analyser.getByteTimeDomainData(freqByteData);
			bd.process( audio.currentTime, freqByteData );
			for (var i = 0; i < 512; i++ ) {
				prefft(i);
				var j=i+64;
          		magnitude = 0.6*((freqByteData[j*2] + freqByteData[(j+1)*2])/2); 
				//console.log(magnitude);
          		var $ta=-magnitude;
		  		drawfft(i,$ta);
		  		postfft(i,512);
		  		beateffect();
       		}
        	
		}
		
      // FFT from dsp.js, see below
      var FFT = function(bufferSize, sampleRate) {
        this.bufferSize   = bufferSize;
        this.sampleRate   = sampleRate;
        this.spectrum     = new Float32Array(bufferSize/2);
        this.real         = new Float32Array(bufferSize);
        this.imag         = new Float32Array(bufferSize);
        this.reverseTable = new Uint32Array(bufferSize);
        this.sinTable     = new Float32Array(bufferSize);
        this.cosTable     = new Float32Array(bufferSize);

        var limit = 1,
            bit = bufferSize >> 1;

        while ( limit < bufferSize ) {
          for ( var i = 0; i < limit; i++ ) {
            this.reverseTable[i + limit] = this.reverseTable[i] + bit;
          }

          limit = limit << 1;
          bit = bit >> 1;
        }

        for ( var i = 0; i < bufferSize; i++ ) {
          this.sinTable[i] = Math.sin(-Math.PI/i);
          this.cosTable[i] = Math.cos(-Math.PI/i);
        }
      };

      FFT.prototype.forward = function(buffer) {
        var bufferSize   = this.bufferSize,
            cosTable     = this.cosTable,
            sinTable     = this.sinTable,
            reverseTable = this.reverseTable,
            real         = this.real,
            imag         = this.imag,
            spectrum     = this.spectrum;

        if ( bufferSize !== buffer.length ) {
          throw "Supplied buffer is not the same size as defined FFT. FFT Size: " + bufferSize + " Buffer Size: " + buffer.length;
        }

        for ( var i = 0; i < bufferSize; i++ ) {
          real[i] = buffer[reverseTable[i]];
          imag[i] = 0;
        }

        var halfSize = 1,
            phaseShiftStepReal,	
            phaseShiftStepImag,
            currentPhaseShiftReal,
            currentPhaseShiftImag,
            off,
            tr,
            ti,
            tmpReal,	
            i;

        while ( halfSize < bufferSize ) {
          phaseShiftStepReal = cosTable[halfSize];
          phaseShiftStepImag = sinTable[halfSize];
          currentPhaseShiftReal = 1.0;
          currentPhaseShiftImag = 0.0;

          for ( var fftStep = 0; fftStep < halfSize; fftStep++ ) {
            i = fftStep;

            while ( i < bufferSize ) {
              off = i + halfSize;
              tr = (currentPhaseShiftReal * real[off]) - (currentPhaseShiftImag * imag[off]);
              ti = (currentPhaseShiftReal * imag[off]) + (currentPhaseShiftImag * real[off]);

              real[off] = real[i] - tr;
              imag[off] = imag[i] - ti;
              real[i] += tr;
              imag[i] += ti;

              i += halfSize << 1;
            }

            tmpReal = currentPhaseShiftReal;
            currentPhaseShiftReal = (tmpReal * phaseShiftStepReal) - (currentPhaseShiftImag * phaseShiftStepImag);
            currentPhaseShiftImag = (tmpReal * phaseShiftStepImag) + (currentPhaseShiftImag * phaseShiftStepReal);
          }

          halfSize = halfSize << 1;
	}

        i = bufferSize/2;
        while(i--) {
          spectrum[i] = 2 * Math.sqrt(real[i] * real[i] + imag[i] * imag[i]) / bufferSize;
	}
      };
	  
function webkitreadaudio(){
	source.connect(analyser);
	analyser.connect(context.destination);
	rafCallback();
}