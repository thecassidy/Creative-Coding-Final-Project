var colors = [];  
var yoff = 0.0;     
var amplitude;
var song;
var w;
var h;
var fft;

function preload(){
	 miami = loadSound("bensound-tenderness.mp3");
	// car = loadSound("James_Blake_-_If_The_Car_Beside_You_Moves_Ahead_Official_video.mp3");
	// dog = loadSound("boy_pablo_-_Everytime.mp3");
	// mr = loadSound("Father_John_Misty_-_Mr__Tillman_Official_Audio.mp3");
	// done = loadSound("Whats_Done_is_Done.mp3");
	
}


function setup() {
  createCanvas(windowWidth, windowHeight);
	amplitude = new p5.Amplitude();
	amplitude.setInput(miami);
	song = miami;
	song.play();
	w = windowWidth/2;
	h = windowHeight/2;
  fft = new p5.FFT();
  fft.setInput(song);

	
 

//   button = createButton('Play - James Blake');
//   button.position(20,20, 65);
//   button.mousePressed(change_song_car);
	
// 	button2 = createButton('Play - Kali Uchis');
//   button2.position(20,60, 65);
//   button2.mousePressed(change_song_miami);
	
// 	button2 = createButton('Play - boy pablo');
//   button2.position(20,100, 65);
//   button2.mousePressed(change_song_everytime);
	
// 	button2 = createButton('Play - Father John Misty');
//   button2.position(20,140, 65);
//   button2.mousePressed(change_song_mr);
	
// 		button2 = createButton('Play - Jack White');
//   button2.position(20,180, 65);
//   button2.mousePressed(change_song_done);
}

function draw() {
	background(color(25,52,70,20));
  fill(color(200,160,160,1));
	stroke(196,212,224);

  // Perlin noise wave
  beginShape(); 
  var xoff = 0;      
  
  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 5) {    
  var y = map(noise(xoff, yoff), 0, 1, windowHeight/2-100,windowHeight/2 + 200);
	y = y - amplitude.getLevel()*100;		
  vertex(x, y); 
		
  // Move to the right for noise
  xoff += 0.02;
  }
	
  // increment y dimension for noise
  yoff += 0.0085;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
	
	push();
	diamond();
	pop();
	
	var spectrum = fft.analyze();
	push();
	stroke("#e9c77b");
	angle = 10 + spectrum[spectrum.length/2]/50;
	translate(w,h-30);
	branch(amplitude.getLevel()*200);
	branch2(amplitude.getLevel()*200);
	pop();
	
}

function diamond(){
	fill("#e2b49a");
	quad(w, h-320, w+220, h, w, h+320, w-220,h);
	stroke(255);
	strokeWeight(5);	
	fill("#9aabb9");
	quad(w, h-300, w+200,h, w, h+300, w-200,h);
	
}

// function change_song_car(){
// 	amplitude.setInput(car);
// 	fft.setInput(car);
// 	song.stop();
// 	song = car;
// 	song.play();
// }
// function change_song_miami(){
// 	amplitude.setInput(miami);
// 	fft.setInput(miami);
// 	song.stop();
// 	song = miami;
// 	song.play();
// }
	
// function change_song_everytime(){
// 	amplitude.setInput(dog);
// 	fft.setInput(dog);
// 	song.stop();
// 	song = dog;
// 	song.play();
// }

// function change_song_mr(){
// 	amplitude.setInput(mr);
//   fft.setInput(mr);
// 	song.stop();
// 	song = mr;
// 	song.play();
// }

// function change_song_done(){
// 	amplitude.setInput(done);
// 	song.stop();
// 	song = done;
// 	song.play();
// }

function branch(len) {
  line(0, 0, 0, len);
  translate(0, len);
  var fraction = 2/3;
  if(len > 4) {
    push();
    rotate(angle);
    branch(len*fraction); 
    pop();
    push();
    rotate(-angle);
    branch(len*fraction);
    pop();
	}
}
	function branch2(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  var fraction = 2/3;
  if(len > 4) {
    push();
    rotate(angle);
    branch2(len*fraction); 
    pop();
    push();
    rotate(-angle);
    branch2(len*fraction);
    pop();
	}
}