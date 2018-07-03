(function($) {

    // Global initialisation flag
    var initialized = false;

    // For detecting browser prefix and capabilities
    var el = document.createElement( 'div' );
    var re = /^(Moz|(w|W)ebkit|O|ms)(?=[A-Z])/;

    // Establish vendor prefix and CSS 3D support
    var vendor = (function() { for ( var p in el.style ) if( re.test(p) ) return p.match(re)[0]; })() || '';
    var canRun = vendor + 'Perspective' in el.style;
    var prefix = '-' + vendor.toLowerCase() + '-';

    var $this, $root, $base, $kids, $node, $item, $over, $back;
    var wait, anim, last;

    // Public API
    var api = {

        // Toggle open / closed
        toggle: function() {

            $this = $( this );
            $this.myLists( $this.hasClass( 'open' ) ? 'close' : 'open' );
        },

        // Trigger the unfold animation
        open: function( speed, overlap, easing ) {

            // Cache DOM references
            $this = $(this);
            $root = $this.find( '.root' );
            $kids = $this.find( '.node' ).not( $root );

            // Establish values or fallbacks
            speed = utils.resolve( $this, 'speed', speed );
            easing = utils.resolve( $this, 'easing', easing );
            overlap = utils.resolve( $this, 'overlap', overlap );

            $kids.each( function( index, el ) {

                // Establish settings for this iteration
                anim = 'unfold' + ( !index ? '-first' : '' );
                last = index === $kids.length - 1;
                time = speed * ( 1 - overlap );
                wait = index * time;

                // Cache DOM references
                $item = $( el );
                $over = $item.find( '.over' );

                // Element animation
                $item.css(utils.prefix({
                    'transform': 'rotateX(180deg)',
                    'animation': anim + ' ' + speed + 's ' + easing + ' ' + wait + 's 1 normal forwards'
                }));

                // Shading animation happens when the next item starts
                if ( !last ) wait = ( index + 1 ) * time;

                // Shading animation
                $over.css(utils.prefix({
                    'animation': 'unfold-over ' + (speed * 0.45) + 's ' + easing + ' ' + wait + 's 1 normal forwards'
                }));
            });

            // Add momentum to the container
            $root.css(utils.prefix({
                'animation': 'swing-out ' + ( $kids.length * time * 1.4 ) + 's ease-in-out 0s 1 normal forwards'
            }));

            $this.addClass( 'open' );
        },

        // Trigger the fold animation
        close: function( speed, overlap, easing ) {

            // Cache DOM references
            $this = $(this);
            $root = $this.find( '.root' );
            $kids = $this.find( '.node' ).not( $root );

            // Establish values or fallbacks
            speed = utils.resolve( $this, 'speed', speed ) * 0.66;
            easing = utils.resolve( $this, 'easing', easing );
            overlap = utils.resolve( $this, 'overlap', overlap );

            $kids.each( function( index, el ) {

                // Establish settings for this iteration
                anim = 'fold' + ( !index ? '-first' : '' );
                last = index === 0;
                time = speed * ( 1 - overlap );
                wait = ( $kids.length - index - 1 ) * time;

                // Cache DOM references
                $item = $( el );
                $over = $item.find( '.over' );

                // Element animation
                $item.css(utils.prefix({
                    'transform': 'rotateX(0deg)',
                    'animation': anim + ' ' + speed + 's ' + easing + ' ' + wait + 's 1 normal forwards'
                }));

                // Adjust delay for shading
                if ( !last ) wait = ( ( $kids.length - index - 2 ) * time ) + ( speed * 0.35 );

                // Shading animation
                $over.css(utils.prefix({
                    'animation': 'fold-over ' + (speed * 0.45) + 's ' + easing + ' ' + wait + 's 1 normal forwards'
                }));
            });

            // Add momentum to the container
            $root.css(utils.prefix({
                'animation': 'swing-in ' + ( $kids.length * time * 1.0 ) + 's ease-in-out 0s 1 normal forwards'
            }));

            $this.removeClass( 'open' );
        }
    };

    // Utils
    var utils = {

        // Resolves argument values to defaults
        resolve: function( $el, key, val ) {
            return typeof val === 'undefined' ? $el.data( key ) : val;
        },

        // Prefixes a hash of styles with the current vendor
        prefix: function( style ) {
            
            for ( var key in style ) {
                style[ prefix + key ] = style[ key ];
            }

            return style;
        },

        // Inserts rules into the document styles
        inject: function( rule ) {

            try {

                var style = document.createElement( 'style' );
                style.innerHTML = rule;
                document.getElementsByTagName( 'head' )[0].appendChild( style );

            } catch ( error ) {}
        }
    };

    // Element templates
    var markup = {
        node: '<span class="node"/>',
        back: '<span class="face back"/>',
        over: '<span class="face over"/>'
    };

    // Plugin definition
    $.fn.myLists = function( options ) {

        // Notify if 3D isn't available
        if ( !canRun ) {

            var message = 'Failed to detect CSS 3D support';

            if( console && console.warn ) {
                
                // Print warning to the console
                console.warn( message );

                // Trigger errors on elements
                this.each( function() {
                    $( this ).trigger( 'error', message );
                });
            }

            return;
        }

        // Fires only once
        if ( !initialized ) {

            initialized = true;

            // Unfold
            utils.inject( '@' + prefix + 'keyframes unfold        {' +

                '0%   {' + prefix + 'transform: rotateX(180deg);  }' +
                '50%  {' + prefix + 'transform: rotateX(-30deg);  }' +
                '100% {' + prefix + 'transform: rotateX(0deg);    }' +

                '}');

            // Unfold (first item)
            utils.inject( '@' + prefix + 'keyframes unfold-first  {' +

                '0%   {' + prefix + 'transform: rotateX(-90deg);  }' +
                '50%  {' + prefix + 'transform: rotateX(60deg);   }' +
                '100% {' + prefix + 'transform: rotateX(0deg);    }' +

                '}');

            // Fold
            utils.inject( '@' + prefix + 'keyframes fold          {' +

                '0%   {' + prefix + 'transform: rotateX(0deg);    }' +
                '100% {' + prefix + 'transform: rotateX(180deg);  }' +

                '}');

            // Fold (first item)
            utils.inject( '@' + prefix + 'keyframes fold-first    {' +

                '0%   {' + prefix + 'transform: rotateX(0deg);    }' +
                '100% {' + prefix + 'transform: rotateX(-180deg); }' +

                '}');

            // Swing out
            utils.inject( '@' + prefix + 'keyframes swing-out     {' +

                '0%   {' + prefix + 'transform: rotateX(0deg);    }' +
                '30%  {' + prefix + 'transform: rotateX(-30deg);  }' +
                '60%  {' + prefix + 'transform: rotateX(15deg);   }' +
                '100% {' + prefix + 'transform: rotateX(0deg);    }' +

                '}');

            // Swing in
            utils.inject( '@' + prefix + 'keyframes swing-in      {' +

                '0%   {' + prefix + 'transform: rotateX(0deg);    }' +
                '50%  {' + prefix + 'transform: rotateX(-10deg);  }' +
                '90%  {' + prefix + 'transform: rotateX(15deg);   }' +
                '100% {' + prefix + 'transform: rotateX(0deg);    }' +

                '}');

            // Shading (unfold)
            utils.inject( '@' + prefix + 'keyframes unfold-over   {' +
                '0%   { opacity: 1.0; }' +
                '100% { opacity: 0.0; }' +
                '}');

            // Shading (fold)
            utils.inject( '@' + prefix + 'keyframes fold-over     {' +
                '0%   { opacity: 0.0; }' +
                '100% { opacity: 1.0; }' +
                '}');

            // Node styles
            utils.inject( '.node {' +
                'position: relative;' +
                'display: block;' +
                '}');

            // Face styles
            utils.inject( '.face {' +
                'pointer-events: none;' +
                'position: absolute;' +
                'display: block;' +
                'height: 100%;' +
                'width: 100%;' +
                'left: 0;' +
                'top: 0;' +
                '}');
        }

        // Merge options & defaults
        var opts = $.extend( {}, $.fn.myLists.defaults, options );

        // Extract api method arguments
        var args = Array.prototype.slice.call( arguments, 1 );

        // Main plugin loop
        return this.each( function () {

            // If the user is calling a method...
            if ( api[ options ] ) {
                return api[ options ].apply( this, args );
            }

            // Store options in view
            $this = $( this ).data( opts );

            // Only proceed if the scene hierarchy isn't already built
            if ( !$this.data( 'initialized' ) ) {

                $this.data( 'initialized', true );

                // Select the first level of matching child elements
                $kids = $this.children( opts.selector );

                // Build a scene graph for elements
                $root = $( markup.node ).addClass( 'root' );
                $base = $root;
                
                // Process each element and insert into hierarchy
                $kids.each( function( index, el ) {

                    $item = $( el );

                    // Which animation should this node use?
                    anim = 'fold' + ( !index ? '-first' : '' );

                    // Since we're adding absolutely positioned children
                    $item.css( 'position', 'relative' );

                    // Give the item some depth to avoid clipping artefacts
                    $item.css(utils.prefix({
                        'transform-style': 'preserve-3d',
                        'transform': 'translateZ(-0.1px)'
                    }));

                    // Create back face
                    $back = $( markup.back );
                    $back.css( 'background', $item.css( 'background' ) );
                    $back.css(utils.prefix({ 'transform': 'translateZ(-0.1px)' }));

                    // Create shading
                    $over = $( markup.over );
                    $over.css(utils.prefix({ 'transform': 'translateZ(0.1px)' }));
                    $over.css({
                        'background': opts.shading,
                        'opacity': 0.0
                    });
                    
                    // Begin folded
                    $node = $( markup.node ).append( $item );
                    $node.css(utils.prefix({
                        'transform-origin': '50% 0%',
                        'transform-style': 'preserve-3d',
                        'animation': anim + ' 1ms linear 0s 1 normal forwards'
                    }));

                    // Build display list
                    $item.append( $over );
                    $item.append( $back );
                    $base.append( $node );

                    // Use as parent in next iteration
                    $base = $node;
                });

                // Set root transform settings
                $root.css(utils.prefix({
                    'transform-origin': '50% 0%',
                    'transform-style': 'preserve-3d'
                }));

                // Apply perspective
                $this.css(utils.prefix({
                    'transform': 'perspective(' + opts.perspective + 'px)'
                }));

                // Display the scene
                $this.append( $root );
            }
        });
    };

    // Default options
    $.fn.myLists.defaults = {

        // Perspective to apply to rotating elements
        perspective: 1200,

        // Default shading to apply (null => no shading)
        shading: 'rgba(0,0,0,0.12)',

        // Area of rotation (fraction or pixel value)
        selector: null,

        // Fraction of speed (0-1)
        overlap: 0.6,

        // Duration per element
        speed: 0.8,

        // Animation curve
        easing: 'ease-in-out'
    };

    $.fn.myLists.enabled = canRun;

})( jQuery );

// The `enabled` flag will be `false` if CSS 3D isn't available

if ( $.fn.myLists.enabled ) {

    var $artistsList1 = $( '.artistsList1' );
    var $artistsList2 = $( '.artistsList2' );
    var $artistsList3 = $( '.artistsList3' );

    // Create Makisus

    $artistsList1.myLists({
        selector: 'dd',
        overlap: 0.2,
        speed: 0.5
    }); 

    $artistsList2.myLists({
        selector: 'dd',
        overlap: 0.85,
        speed: 1.7
    });

    $artistsList3.myLists({
        selector: 'dd',
        overlap: 0.6,
        speed: 0.85
    });

   
    // Open all
    
    $( '.list' ).myLists( 'open' );

    // Toggle on click

    $( '.toggle' ).on( 'click', function() {
        $( '.list' ).myLists( 'toggle' );
    });

    // Disable all links

    $( '.artists a' ).click( function( event ) {
         event.preventDefault();
     });

    } else {

         $( '.warning' ).show();
}


$(document).ready(() => {
    
        let artists = [];
        let images = [];
        let styles=[];
        let category;
        let lastCategory;
        let tempimages = [];
        let tempartist;
        let artist;
     
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
                    artists[i].images[j].famouseOld=artists[i].famouseOld;
                    images.push(artists[i].images[j]);     
                  }            
                }
       
            },
            error: (err) => {
                console.log(err);
            }

         });

         $("#1st").on("click", () => {
            artist = 0;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
         });
         $("#2nd").on("click", () => {
            artist = 1;
           
          populateArtistTable(artist,artists);
          $('#myDiv2').show();
          $("#myDiv3").show();
        });
  
        $("#3rd").on("click", () => {
            artist = 2;
            populateArtistTable(artist,artists);
            $('#myDiv2').show(); 
            $("#myDiv3").show();
         });

         $("#4th").on("click", () => {
            artist = 3;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });
         $("#5th").on("click", () => {
            artist = 4;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
        });
  
        $("#6th").on("click", () => {
            artist = 5;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
        });

        $("#7th").on("click", () => {
            artist = 6;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
         });
         $("#8th").on("click", () => {
            artist = 7;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
        });
  
        $("#9th").on("click", () => {
            artist = 8;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
         });

         $("#10th").on("click", () => {
            artist = 9;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });
         $("#11th").on("click", () => {
            artist = 10;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
        });
  
        $("#12th").on("click", () => {
            artist = 11;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
        });

        $("#13th").on("click", () => {
            artist = 12;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });
         $("#14th").on("click", () => {
            artist = 13;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
        });
  
        $("#15th").on("click", () => {
            artist = 14;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
         });

         $("#16th").on("click", () => {
            artist = 15;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });
         $("#17th").on("click", () => {
            artist = 16;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
        });
  
        $("#18th").on("click", () => {
            artist = 17;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
        });

        $("#19th").on("click", () => {
            artist = 18;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });
         $("#20th").on("click", () => {
            artist = 19;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
        });
  
        $("#21st").on("click", () => {
            artist = 20;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
         });

         $("#22nd").on("click", () => {
            artist = 21;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });
         $("#23rd").on("click", () => {
            artist = 22;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
        });
  
        $("#24th").on("click", () => {
            artist = 23;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
        });

        $("#25th").on("click", () => {
            artist = 24;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
        });
  
        $("#26th").on("click", () => {
            artist = 25;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
        });

        $("#27th").on("click", () => {
            artist = 26;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });
        // On click events for Old Macedonian Artists

         $("#28th").on("click", () => {
            artist = 27;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });

         $("#29th").on("click", () => {
            artist = 28;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });
        
         $("#30th").on("click", () => {
            artist = 29;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });
         
         $("#31st").on("click", () => {
            artist = 30;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });

         $("#32nd").on("click", () => {
            artist = 31;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });
        
         $("#33th").on("click", () => {
            artist = 32;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         }); 

         $("#34th").on("click", () => {
            artist = 33;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });

         $("#35th").on("click", () => {
            artist = 34;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });
        
         $("#36th").on("click", () => {
            artist = 35;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });
         
         $("#37th").on("click", () => {
            artist = 36;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });

         $("#38th").on("click", () => {
            artist = 37;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         });
        
         $("#39th").on("click", () => {
            artist = 38;
            populateArtistTable(artist,artists);
            $('#myDiv2').show();
            $("#myDiv3").show();
           
         }); 
  

     function populateArtistTable(artist,artists){
    
        
      $('.container').hide();
      $('body > :not(#myDiv)').hide();
      $('.artists').show();
      $(".nav-top").hide();
      
            $("#myDiv2").append(
                `
                <div class="blog-card">
                    <div class="photo photo1"></div>
                    <ul class="details"></br>
                        </br>
                        <li class="artist"><a href="#">${artists[artist].name}</a></li></br>
                        <li class="country">${artists[artist].country}</li>
                    </ul>
                    <div class="description">
                        <h1>${artists[artist].name}</h1>
                        <h2><small><i>${artists[artist].country}</i></small></h2>
                        <h3>Opening a door to the future</h3>
                        <p class="summary">${artists[artist].biography}</p>
                    </div>
                </div>
            
                `  
            );
          
            for(let i = 0; i < artists[artist].images.length; i++){
                
                $("#myDiv3").append(
                   `
                    <section class="flexContainer" id="art"+${artists[artist].artistId}>
                        
                        <header class="flexItem-header">
                        <h1 class="flexItem-headline"><strong>${artists[artist].images[i].title}, year: ${artists[artist].images[i].year};</strong></h1>
                        </br><i>${artists[artist].images[i].category}</i>
                        </header>
                        <figure class="flexItem-media">
                        <img class="flexItem-shot" src="${artists[artist].images[i].url}" id="image-frame" width="600" height="600" />
                        </figure>
                        <div class="flexItem">
                            <div>
                            <button id="goBack${artists[artist].images[i].imgId}">back to artists</button>
                            </div>
                        </div>
                    </section>
                    `
                );
				 $("#goBack" + artists[artist].images[i].imgId).on("click", () => {
                    $('#myDiv2').hide();
                    $("#myDiv3").hide();
                    $("#artistlist").show();
                    $(".nav-top").show();
                    $(".amg-floating-contacts").show();
                    $( '.blog-card' ).remove();
                    $( '.flexContainer' ).remove();
                });
            }  
    
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


});
 
  