var counter = 6;
var arr = new Array();
arr.push(5);
$(function(){

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCsz6NVxyQQZTuWcBUXYYatvChGDkilzC4",
    authDomain: "bggram-1973d.firebaseapp.com",
    databaseURL: "https://bggram-1973d.firebaseio.com",
    storageBucket: "bggram-1973d.appspot.com",
    messagingSenderId: "364248549959"
  };
  var app = firebase.initializeApp(config);

var image;

var databaseCounter;
initialize();

var database = firebase.database(app);
var ref = database.ref("Message");
var start = true;
// Loading info from database
function loadMessages(){
	if(start){
		databaseCounter = counter;
	    ref.on('value', function (snapshot) {
	        snapshot.forEach(function (childSnapshot) {
	            // Key will be the UID
	            // This looks for photo in firebase database if they are from user and adds it to a set.
	            var message = childSnapshot.key;

	            console.log(message);
	            // var path = uid + "/";
	            // ChildData will be the actual contents of the child
	            if(start&&childSnapshot.key.match(/Message{1}\d+/gi)){
	                 $(".carousel-inner .item.createOne").before(childSnapshot.val());
	             }
	            else if(start&&childSnapshot.key.match(/Carousel{1}\d+/gi)){
	                $(".carousel-indicators .circle.createOne").before(childSnapshot.val());
	            }
	            else if(start&&childSnapshot.key.match(/Counter/gi)){
	                counter = childSnapshot.val();
	                arr = new Array();
	                arr.push(childSnapshot.val());
	            }
	        });
	        databaseCounter++;
	    });
	}

	counter = databaseCounter+1;
}
loadMessages();

// Click on Start button
	$("#start").click(function() {
		$("#mainHolder").hide();	
		$("#mainBox").show();
		$("#restart").show();
		startCarousel();
	});

// Click on Create button
	$("#createButton").click(function() {
		$("#mainBox").hide();	
		$("#mainHolder2").show();
	}); 

// Click on restart, initializes.
	$("#restart").click(function(){
		initialize();
	});

// Click on an image
	$('.img-').click(function() {
    	image = $(this)[0].alt; 
    	start = false;
    	var input = prompt("Please Enter a Message", " Message Here");
    	if(input!=null){
	    	var message = "<div class='item'><div class='info'>"+input+"</div><img src=" +image+ " alt='photo' width='100%' height='100%'></div>";
	    	var carouselUpdate = "<li class='circle' data-target='#myCarousel' data-slide-to="+ (++arr[0]) +"></li>";
	    	
	    	$("#mainHolder2").hide();
	    	$("#mainBox").show();

	    	// Save to Database
			ref.child("Message"+(arr[0])).set(message)
			ref.child("Carousel"+(arr[0])).set(carouselUpdate)
			ref.child("Counter").set((arr[0]))
			databaseCounter = arr.length;
			$(".carousel-inner .item.createOne").before(message);
			$(".carousel-indicators .circle.createOne").before(carouselUpdate);
	    startCarousel();
	    }
    });

// Initializes 
	function initialize() {
		$("#mainBox").hide();
		$("#mainHolder2").hide();
		$("#mainHolder").show();
		$("#restart").hide();
	}

// Downloading this html 
	// function save() {
	//   var html = [document.documentElement.innerHTML];
	//   var blob = new Blob(html, {type: "text/html"});
	//   var a = document.createElement("a");
	//   a.href = URL.createObjectURL(blob);
	//   a.download = "copy.html";
	//   a.hidden = true;
	//   document.body.appendChild(a);
	//   a.innerHTML = "";
	//   a.click();
	// }
function carouselNext(){
	if( $(".carousel-inner .active").next().length==0){
		$(".carousel-inner .active").removeClass("active");
		$(".carousel-inner .item:first").addClass("active");
		$(".carousel-indicators .active").removeClass("active");
		$(".carousel-indicators .circle:first").addClass("active");
	}
	else{
		var next = $(".carousel-inner .active").next();
		$(".carousel-inner .active").removeClass("active");
		next.addClass("active");

		next = $(".carousel-indicators .active").next();
		$(".carousel-indicators .active").removeClass("active");
		next.addClass("active");
	}
}
function carouselPrevious(){
	if( $(".carousel-inner .active").prev().length==0){
		$(".carousel-inner .active").removeClass("active");
		$(".carousel-inner .item:last").addClass("active");
		$(".carousel-indicators .active").removeClass("active");
		$(".carousel-indicators .circle:last").addClass("active");
	}
	else{
		var prev = $(".carousel-inner .active").prev();
		$(".carousel-inner .active").removeClass("active");
		prev.addClass("active");

		prev = $(".carousel-indicators .active").prev();
		$(".carousel-indicators .active").removeClass("active");
		prev.addClass("active");
	}
}
// Carousel
	function startCarousel() {
		// Activate Carousel
		
		var slide = setInterval(function(){carouselNext();},5000);
        $(".circle").click(function(){ 
        	clearInterval(slide);
        	console.log($(this).index());
        	var index = $(this).index();
        	$(".carousel-inner .active").removeClass("active");
        	var photo = $(".item")[index];
        	photo.classList.add("active");

        	$(".carousel-indicators .active").removeClass("active");
        	var circle = $(".circle")[index];
        	circle.classList.add("active")
        });
	    
	    // Enable Carousel Controls
	    $(".left").click(function(){
	    	clearInterval(slide);
	        carouselPrevious();
	    });
	    $(".right").click(function(){
	    	clearInterval(slide);
	        carouselNext();
	    });
	}

});