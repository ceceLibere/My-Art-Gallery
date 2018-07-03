$(document).ready(function() {
    
    $('html').show();
    $('.stage').hide();
  
      var tlLoading = new TimelineMax({repeat: 1, onComplete: finishLoading});
      var loader = $(".loader");
      var count = 0;
  
      tlLoading.set(loader, {scale:1, top: "-=100"})
      .to(loader, 0.75, {autoAlpha:1, top: "50%", ease: Power3.easeIn})
      .to(loader, 0.25, {height: "-=5px", width: "+=2px"}, "-=0.15")
      .to(loader, 0.75, {top: "-=100",height: "+=5px", width: "-=2px", ease: Power3.easeout})
  
      var tlFinishLoading = new TimelineMax({paused:true, onComplete: remove });
      tlFinishLoading.to(loader, 0.75, { top: "50%", ease: Power3.easeIn})
                      .to(loader, 0.5, {scale:1000, ease: Power3.easeIn}, "-=0.15")
                      .remove($(this))
  
      function finishLoading(){
          tlFinishLoading.play();
      }
      function remove(){
          $("body").css("background", "#8537E7");
          loader.hide();
          $('.stage').show();
          tlMenuToggle.play();
          tlSearchIcon.play();
          tlHero.play();
          tlContact.play();
      }
  
      tlMenuToggle = new TimelineMax({paused:true});
      var menuToggle = $(".menu-toggle");
  
      tlMenuToggle.from(menuToggle, 0.5, {autoAlpha:0, x: "-150%", ease:Power1.easeOut})
  
      tlSearchIcon = new TimelineMax({paused:true});
      var searchIcon = $(".search-icon");
  
      tlSearchIcon.from(searchIcon, 0.5, {autoAlpha:0, x: "150%", ease:Power1.easeOut})
  
      tlContact = new TimelineMax({paused:true});

      var contact = $(".contact");
      tlContact.from(contact, 0.5, {autoAlpha:0, x: "-150%", ease:Power1.easeOut})
  
      var tlHero = new TimelineMax({paused:true});
      var superHero = $(".super-hero");
      var smallTitle = $(".small-intro-title");
      var introTitle = $(".intro-title");
      var line = $(".line");
  
      tlHero.from(superHero, 0.75, {autoAlpha: 0, scale: 0, ease: Power3.easeOut})
              .from(smallTitle, 0.75, {autoAlpha:0, y: "50px", ease: Power3.easeOut}, "-=0.5")
              .from(introTitle, 0.75, {autoAlpha:0, y: "25px", ease: Power3.easeOut}, "-=0.75")
              .from(line, 0.25, {width: 0, ease: Power3.easeOut},"-=0.20");
  
      var tlTimelineHover = new TimelineMax({repeat:-1, paused: true});
      tlTimelineHover.to(introTitle, 0.5, {textShadow: "1px 1px 0px rgba(0,0,0,0.25)"})
                          .to(introTitle, 0.5, {textShadow: "0px 3px 10px rgba(0,0,0,0.55)"}, "+=0.25");
  
      introTitle.mouseover(function(event) {
          tlTimelineHover.play();
      });
      introTitle.mouseleave(function(event) {
          tlTimelineHover.pause();
      });
  
      var tlMenuIcon = new TimelineMax({paused:true});
      var menuIcon = $(".menu-icon");
      tlMenuIcon.staggerFrom(menuIcon, 1.5, {autoAlpha: 0, y: 10, scale: 0, ease: Elastic.easeOut.config(1.2, 0.3)}, 0.1);
  
  
      var tlMenuIconLabel = new TimelineMax({paused:true});
      var menuIconLabel = $(".menu-icon-label");
      tlMenuIconLabel.staggerFrom(menuIconLabel, 1.5, {autoAlpha: 0, y: 20, ease: Elastic.easeOut.config(1, 0.3)}, 0.1);
  

  
      var menuOpen = false;
      menuToggle.click(function(){
          if(menuOpen){
              tlMenuIcon.reverse();
              tlMenuIconLabel.reverse();
              menuOpen = false;
          }else{
              tlMenuIcon.play();
              tlMenuIconLabel.play();
              menuOpen = true;
          }
      })

      var tlSearchFeild = new TimelineMax({paused:true});
      var serchFeild = $(".search-field");
  
      tlSearchFeild.from(serchFeild, 0.75, {width: 0, autoAlpha:0, ease: Power2.easeOut, onComplete: focusSearchField});
  
  
      var tlSearchResult = new TimelineMax({paused:true});
      var searchResults = $(".search-result a");
  
      tlSearchResult.staggerFrom(searchResults, 0.5, {autoAlpha:0, ease: Power2.easeOut, cycle:{x:["100%", "-100%"]}}, 0.05);
  
      var searchResultOpen = false;
      serchFeild.keyup(function(e) {
          var val = $(this).val();
  
          if(val){
              $(".search-result").fadeIn(200);
              tlSearchResult.play();
              searchResultOpen = true;
          }else{
              $(".search-result").fadeOut(400);
              tlSearchResult.reverse();
              searchResultOpen = false;
          }
      });
  
  
      var searchOpen = false;
      searchIcon.click(function(){
          if(searchOpen){
              tlSearchFeild.reverse();
              searchOpen = false;
          }else{
              tlSearchFeild.play();
              searchOpen = true;
          }
  
          if(searchResultOpen){
              tlSearchResult.reverse();
              $(".search-result").fadeOut(400);
          }
      })
  
      function focusSearchField(){
          serchFeild.focus();
      }
  
      $(document).click(function(e) {
          
          if ($(e.target).hasClass('search-field') || $(e.target).hasClass('search-icon') ){
              return null;
          }else{
              if(searchOpen ) {
                  tlSearchFeild.reverse();
                  tlSearchResult.reverse();
                  $(".search-result").fadeOut(400);
              }
          }
      });
   
});