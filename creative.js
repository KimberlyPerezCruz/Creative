$(function(){

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCsz6NVxyQQZTuWcBUXYYatvChGDkilzC4",
    authDomain: "bggram-1973d.firebaseapp.com",
    databaseURL: "https://bggram-1973d.firebaseio.com",
    storageBucket: "bggram-1973d.appspot.com",
    messagingSenderId: "364248549959"
  };
  firebase.initializeApp(config);



var image;
var counter = 6;
initialize();


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
    	var input = prompt("Please Enter a Message", " Message Here");
    	if(input!=null){
	    	$(".carousel-inner").append("<div class='item'><div class='info'>"+input+"</div><img src=" +image+ " alt='photo' width='100%' height='100%'></div>");

	    	$(".carousel-indicators").append("<li class='circle' data-target='#myCarousel' data-slide-to="+ counter +"></li>");
	    	counter++;
	    	$("#mainHolder2").hide();
	    	$("#mainBox").show();
	    	startCarousel();
	    	save();
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
	function save() {
	  var html = [document.documentElement.innerHTML];
	  var blob = new Blob(html, {type: "text/html"});
	  var a = document.createElement("a");
	  a.href = URL.createObjectURL(blob);
	  a.download = "copy.html";
	  a.hidden = true;
	  document.body.appendChild(a);
	  a.innerHTML = "";
	  a.click();
	}

// Carousel
	function startCarousel() {
		// Activate Carousel
	    $("#myCarousel").carousel({interval: 10000});  
        $(".circle").click(function(){ 
        	$("#myCarousel").carousel($(this).index());
        });
	    
	    // Enable Carousel Controls
	    $(".left").click(function(){
	        $("#myCarousel").carousel("prev");
	    });
	    $(".right").click(function(){
	        $("#myCarousel").carousel("next");
	    });
	}

});