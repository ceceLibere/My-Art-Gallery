$(document).ready(() => {
  
      let artists = [];
      let images = [];
      let styles=[];
      let category;
      let lastCategory;
      let tempimages = [];

  
      $.ajax({
          method: "GET",
          //url:"artists.json",
          url: "http://www.json-generator.com/api/json/get/cfYPuZMVyW?indent=2",
          // dataType: "json",
          success: (data) => {
              artists = data;
              
              for(let i = 0; i  < artists.length; i++){
                for(let j = 0; j < artists[i].images.length; j++){
                  artists[i].images[j].country=artists[i].country;
                  artists[i].images[j].name=artists[i].name;
                  artists[i].images[j].biography=artists[i].biography;
                  images.push(artists[i].images[j]);     
                }            
              }
    
          },
          error: (err) => {
              console.log(err);
          }
       });
 
      $("#painting").on("click", () => {
          category = "painting";
          populateTable(category,images,artists);
          
       });
       $("#sculpture").on("click", () => {
        category = "sculpture";
        populateTable(category,images,artists);
        
      });

      $("#drawing").on("click", () => {
          category = "drawing";
          populateTable(category,images,artists);
          
       });
       $("#photography").on("click", () => {
        category = "photography";
        populateTable(category,images,artists);
        
      });
      $("#digital_arts").on("click", () => {
        category = "digital_arts";
        populateTable(category,images,artists);
        
      });

        $("#street_art").on("click", () => {
          category = "street_art";
          populateTable(category,images,artists);
          
      });

      $("#installation").on("click", () => {
        category = "installation";
        populateTable(category,images,artists);
        
      });

      $("#land_art").on("click", () => {
        category = "land_art";
        populateTable(category,images,artists);
        
     });


     function populateTable(category,image,artist){
      $('#myCategory').hide();
			$('body > :not(#myDiv)').hide();
			$('.' + category).show();
      $('#myDiv').show();
      
            for(let i = 0; i < image.length; i++){
                
              if(image[i].category == category){
                 tempimages.push(image[i]);
              
                  $("#myDiv").append(
                    `
                    <div class="${category}" id=${image[i].imgId}>
                      <img id="image[i].imgId" src="${image[i].thumbnailUrl}" width="200" height="200" />
                      <button id="readMore">read more...</button>
                      <div class="figcaption1${i}">
                        <h2>${image[i].name}</h2>
                        <h3><i>"${image[i].title}"</i></br>
                        category: ${image[i].category}</h3>    
                      </div>
                    </div>
                  `  
                );
                $("#"+image[i].imgId).click(function(){
                  viewPicture(image[i].imgId,artist);
                });
          }
                
      }
    
		    $("#myDiv").append(
            `
            <div class="${category}">
                  <button id="goBack${category}" class="back">back to categories</button>
            </div>
            `  
        );
        $("#goBack" + category).on("click", () => {
            $('#myDiv').hide();
            $('#imageInfo').hide();
            $("#myCategory").show();
            $(".nav-top").show();
            $(".amg-floating-contacts").show();
            $("footer").show();
            $( '.images' ).remove();
            $( '.' + category ).remove();
        });	  
  }


  function viewPicture(id,artist) {
   
      let currentimage;
      let currentartist;
    
       for(let i = 0; i  < artist.length; i++){
         for(let j = 0; j < artist[i].images.length; j++){
           if((artist[i].images[j].imgId)==id) {
             currentartist = i;
             currentimage = j;
             break;
           }
         }            
       }
        $('body > :not(#myDiv)').hide();
			  $('#myDiv').hide();
        $('#imageInfo').show();
		
	    	if(document.getElementById('img' + id) == null){
            $("#imageInfo").append(
                `
                <div class="images" id=img${id}>
                  <div class="figcaption1">
                  <img src="${artist[currentartist].images[currentimage].url}" id="image-frame" width="600" height="600" />
                  </div>
                  <div class="figcaption2">
                    <h3>Artist Name: ${artist[currentartist].name}<br>
                    <br><i>Country: ${artist[currentartist].country}</i><br>
                    <br><i>Title: "${artist[currentartist].images[currentimage].title}"</i><br>
                    <br>Year: ${artist[currentartist].images[currentimage].year}<br>
                    <br>Category: ${artist[currentartist].images[currentimage].category}<br>
                    <br>Style: ${artist[currentartist].images[currentimage].style}</h3>
                  </div>
                </div>
                <div id="btn_back${id}" class="figcaption3">
                  <button>Go Back 
                  </button>
                </div>
                `  
        );
        } else {
          $('#btn_back'+id).show();
          }
          $('#img'+id).show();
            $("#btn_back"+id).click(function(){
              
              $('body > :not(#myDiv)').hide();
              $('#img'+id).hide();
              $('#btn_back'+id).hide();
                   
                    $('#myDiv').show();
                    $('.lastCategory').show();
                    $('#imageInfo').hide();
               
            });  
   
    }


// Floating Contact Widget Trigger
$(".amg-floating-icon").on("mouseenter", function(){
  $(this).closest(".amg-floating-contact-wrap").addClass("hover")
});
$(".amg-floating-contact-wrap").on("mouseleave", function(){
  $(this).removeClass("hover");
});

$(".logo").click(function(){
  if ($(".nav-top").hasClass("open")) {
    $(".nav-top").removeClass("open");
  } else {
    $(".nav-top").addClass("open");
  }
});

  $('.footer-links-holder h3').click(function () {
    $(this).parent().toggleClass('active');
});


});


