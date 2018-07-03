$(document).ready(() => {
  
      let artists = [];
      let images = [];
      let styles=[];
      let id;
      let tempimages = [];
      let stylelist;
  
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
				          artists[i].images[j].artistId=artists[i].artistId;
                  artists[i].images[j].biography=artists[i].biography;
                  images.push(artists[i].images[j]);     
                }            
              }
              
          },
          error: (err) => {
              console.log(err);
          }
       });


      $.ajax({
           method: "GET",
           //url:"styles.json",
           url:"http://www.json-generator.com/api/json/get/cfGLpyQOSq?indent=2",
           // dataType: "json",
           success: (data) => {
            
               styles = data;
          
          },           
          
          
             error: (err) => {
               console.log(err);
           }
      });

        $("#1").on("click", () => {
           id = 1;
           populateTable(id,images,artists,styles);
          
        });
	    	$("#2").on("click", () => {
           id = 2;
           populateTable(id,images,artists,styles);
          
        });
		    $("#3").on("click", () => {
           id = 4;
           populateTable(id,images,artists,styles);
          
        });
		    $("#4").on("click", () => {
           id = 5;
           populateTable(id,images,artists,styles);
          
        });

        $("#5").on("click", () => {
          id = 7;
          populateTable(id,images,artists,styles);
         
       });
        $("#6").on("click", () => {
          id = 9;
          populateTable(id,images,artists,styles);
         
       });
        $("#7").on("click", () => {
          id = 10;
          populateTable(id,images,artists,styles);
         
       });
        $("#8").on("click", () => {
          id = 11;
          populateTable(id,images,artists,styles);
         
       });
        $("#9").on("click", () => {
          id = 13;
          populateTable(id,images,artists,styles);
       });
       $("#10").on("click", () => {
          id = 14;
          populateTable(id,images,artists,styles);
       
       });
        $("#11").on("click", () => {
            id = 15;
            populateTable(id,images,artists,styles);
          
        });
        $("#12").on("click", () => {
            id = 16;
            populateTable(id,images,artists,styles);
          
        });
        $("#13").on("click", () => {
            id = 17;
            populateTable(id,images,artists,styles);
          
        });

        $("#14").on("click", () => {
          id = 18;
          populateTable(id,images,artists,styles);
          
        });
        $("#15").on("click", () => {
          id = 19;
          populateTable(id,images,artists,styles);
          
        });
        $("#16").on("click", () => {
          id = 20;
          populateTable(id,images,artists,styles);
          
        });
        $("#17").on("click", () => {
          id = 21;
          populateTable(id,images,artists,styles);
          
        });
        $("#18").on("click", () => {
          id = 22;
          populateTable(id,images,artists,styles);
        });
        $("#19").on("click", () => {
          id = 23;
          populateTable(id,images,artists,styles);
        
        });
        $("#20").on("click", () => {
            id = 24;
            populateTable(id,images,artists,styles);
          
        });
        $("#21").on("click", () => {
            id = 25;
            populateTable(id,images,artists,styles);
          
        });

        $("#22").on("click", () => {
          id = 26;
          populateTable(id,images,artists,styles);
          
        });
        $("#23").on("click", () => {
          id = 27;
          populateTable(id,images,artists,styles);
          
        });
        $("#24").on("click", () => {
          id = 28;
          populateTable(id,images,artists,styles);
          
        });
        $("#25").on("click", () => {
          id = 30;
          populateTable(id,images,artists,styles);
          
        });
        $("#26").on("click", () => {
          id = 31;
          populateTable(id,images,artists,styles);
        });
        $("#27").on("click", () => {
          id = 32;
          populateTable(id,images,artists,styles);
        
      });
      $("#28").on("click", () => {
          id = 33;
          populateTable(id,images,artists,styles);
        
      });

      $("#29").on("click", () => {
        id = 34;
        populateTable(id,images,artists,styles);
        
      });
      $("#30").on("click", () => {
        id = 35;
        populateTable(id,images,artists,styles);
        
      });
      $("#31").on("click", () => {
        id = 36;
        populateTable(id,images,artists,styles);
        
      });
      $("#32").on("click", () => {
        id = 37;
        populateTable(id,images,artists,styles);
        
      });
      $("#33").on("click", () => {
        id = 39;
        populateTable(id,images,artists,styles);
        
      });
      $("#34").on("click", () => {
        id = 40;
        populateTable(id,images,artists,styles);
        
      });
      $("#35").on("click", () => {
        id = 41;
        populateTable(id,images,artists,styles);
        
      });
      $("#36").on("click", () => {
        id = 42;
        populateTable(id,images,artists,styles);
        
      });

	 function populateTable(id,image,artist,style){
      
		let tempartist=[];
    let temp=0;

    $('#myStyle').hide();
    $('body > :not(#myDiv)').hide();
    $('#myDiv').show();
    $(".nav-top").hide();
    $("#myDiv").append(
                `
                <div class="artists" id=style${style[id-1].style} class="article" id="arm">
                    <div>
                        </br></br>
                        <h2>${style[id-1].style}</br>
                        </br>
                        <small><i>${style[id-1].period}</i></small>
                        </h2>
                        </br>
                        <p>${style[id-1].body}</p>
                        </br>
                        <p>
                          <i><strong>Representative Artists: ${style[id-1].representativeArtists}</strong></i>
                        </p>
                    </div>
                </div>
                `);
    for(let i=0;i < artist.length; i++) {
      temp =0;
      if(artist[i].famouseOld === true && artist[i].worldFamouse === true) {
        
        
            for(let j = 0; j < artist[i].images.length; j++){
            console.log(artist[i].name + artist[i].artistId);
            console.log(artist[i].images[j].styleId + ' ' + id);
      
      
      if(artist[i].images[j].styleId == id && temp == 0){
            
                $("#myDiv").append(
                  `
                  <div class="artists" id=art${artist[i].artistId}>
                    <div>
                        <img src="${artist[i].images[j].url}" width='800px' height='700px' />
                        </br><strong id="aim">${artist[i].name}</strong>
                    </div>
                    </br>
                        <button id="goBack${artists[i].artistId}">back to styles</button>

                  </div>
                  </br></br>
                  `  
              );
              temp=1;
        $("#goBack" + artists[i].artistId).on("click", () => {
        $('#myDiv').empty();
        $("#myStyle").show();
        $(".nav-top").show();
        $(".amg-floating-contacts").show();
        $( '.artists' ).remove();
        });

        }
    }
  }        
}
  
}

  function onclickstyle(style,image,artist){
        
      for(let i = 0; i  < artist.length; i++){
        for(let j = 0; j < artist[i].image.length; j++){
            if(artist[i].image[j].styleId == id){
                stylelist.push(artist[i].image[j]);
      
              for(let z = 0; z < style.length; z++){
                if(stylelist[i].styleId == style[z].styleId){
              
                  $("#myStyle").append(
                  `
			            <div class="${category}" id=${artist[i].image[j].imgId}>
                     <img id="image[i].imgId" src="${artist[i].image[j].thumbnailUrl}" />
                     <button id="readMore">read more...</button>
                      <div class="figcaption1${i}">
                      <h2>${artist[i].name}<h2>
                      <p><small><i>${artist[i].country}</i></small></p>
                      </div>
                      <div class="figcaption2${i}">
                      <h4>"${artist[i].image[j].title}",</br><small>year: ${artist[i].image[j].year}</small></h4>
                      <p><small>${artist[i].image[j].category}</small></p>
                      </div>
                      
                     <div>
                     ${artist[i].image[j].styleId[z].body}
                     </div>
                  </div>
                  `  
                );
                
                $(document).on('click','#'+style[i].styleId,onlclickstyle(style[i].styleId));   
          }
        }
      }
    }
                
  }

}  


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// - Noel Delgado | @pixelia_me

var nodes = [].slice.call(document.querySelectorAll('li'), 0);
var directions = { 0: 'top', 1: 'right', 2: 'bottom', 3: 'left' };
var classNames = ['in', 'out'].map(function (p) {
  return Object.values(directions).map(function (d) {
    return p + '-' + d;
  });
}).reduce(function (a, b) {
  return a.concat(b);
});

var getDirectionKey = function getDirectionKey(ev, node) {
  var _node$getBoundingClie = node.getBoundingClientRect(),
      width = _node$getBoundingClie.width,
      height = _node$getBoundingClie.height,
      top = _node$getBoundingClie.top,
      left = _node$getBoundingClie.left;

  var l = ev.pageX - (left + window.pageXOffset);
  var t = ev.pageY - (top + window.pageYOffset);
  var x = l - width / 2 * (width > height ? height / width : 1);
  var y = t - height / 2 * (height > width ? width / height : 1);
  return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
};

var Item = function () {
  function Item(element) {
    var _this = this;

    _classCallCheck(this, Item);

    this.element = element;
    this.element.addEventListener('mouseover', function (ev) {
      return _this.update(ev, 'in');
    });
    this.element.addEventListener('mouseout', function (ev) {
      return _this.update(ev, 'out');
    });
  }

  _createClass(Item, [{
    key: 'update',
    value: function update(ev, prefix) {
      var _element$classList;

      (_element$classList = this.element.classList).remove.apply(_element$classList, _toConsumableArray(classNames));
      this.element.classList.add(prefix + '-' + directions[getDirectionKey(ev, this.element)]);
    }
  }]);

  return Item;
}();

nodes.forEach(function (node) {
  return new Item(node);
});


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

});
