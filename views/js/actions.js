// var disabledButton = "";
// var disabledButtonMobile = "";

var SetVisibilityFor = (function () {

    function displayNavBar (element) {
      if (element === "#homePage_Mobile") {
        document.getElementById("navigationBar").style.display = "none";
      }
      else {
        document.getElementById("navigationBar").style.display = "block";
      }
    }

    function desktopPage (nextPageId, currentPageId) {
      $(currentPageId).fadeOut("slow");
      $(nextPageId).delay(1000).fadeIn("slow");
    }

    function mobilePage (nextPageId) {
      var mobilePages = ["aboutPage_Mobile", "projectPage_Mobile", "contactPage_Mobile", "homePage_Mobile", "experiencePage_Mobile"];
      for (var c=0; c< mobilePages.length; c++) {
        if (document.getElementById(mobilePages[c]).style.display === 'block') {
          $(".navbar-collapse").removeClass("in");
          $("#"+mobilePages[c]).css("display","none");
          $(nextPageId).fadeIn("slow");
          displayNavBar(nextPageId);
          $(nextPageId).css("display","block");
          SetBackgroundColor.page();
        }
      }
    }

    return {
      desktopPage : desktopPage,
      mobilePage : mobilePage
    }
})();

var SetBackgroundColor = (function () {
    return {
      page : function () {
        if (document.getElementById("homePage_Mobile").style.display === "block") {
            $("body").css("background-color","black");
        }
        else {
            $("body").css("background-color","white");
        }
      }
    }
})();

var mobileIcons = (function () {
    return {
      setDimensions : function () {
        var iconWidth = ($(window).width()/2) - 5;
        $(".homePage_Icon").css("width", iconWidth+"px");
        $(".homePage_Icon").css("height", iconWidth+"px");
        $(".mobile-carousel-inner").css("width", (iconWidth-0.5)+"px");
        $(".mobile-carousel-inner").css("height", (iconWidth-0.5)+"px");
      }
    }
})();

var SetTemplate = (function () {

    function setLaptopPosition() {
      var WINDOWHEIGHT = $(window).height();
      var WINDOWWIDTH = $(window).width();
      var LAPTOPHEIGHT = $("#laptopImage").height();

      document.getElementById('laptopImage').style.marginTop = ((WINDOWHEIGHT-LAPTOPHEIGHT)/2) - 15+"px";
    	document.getElementById('laptopImage').style.marginBottom = ((WINDOWHEIGHT-LAPTOPHEIGHT)/2) - 10+"px";
    }

    function setNavBarVisibility (currentPage) {
      if (currentPage === "homePage") {
        SetVisibility.toNone("navigationBar");
      }
      else {
        SetVisibility.toBlock("navigationBar");
      }
    }

    function mobilePage () {
      var desktopElements = ["homePage","projectPage","experiencePage","aboutPage"];
      for (c=0; c<desktopElements.length; c++) {
        if(document.getElementById(desktopElements[c]).style.display === "block") {
            SetVisibility.toNone(desktopElements[c]);
            SetVisibility.toNone("desktopVersion");
            SetVisibility.toBlock("mobileVersion");
            SetVisibility.toBlock(desktopElements[c]+"_Mobile");
            setNavBarVisibility(desktopElements[c]);
            SetBackgroundColor.page();
        }
      }
    }

    function desktopPage () {
      setLaptopPosition();
      var mobilePages = ["projectPage_Mobile", "homePage_Mobile", "experiencePage_Mobile", "contactPage_Mobile", "aboutPage_Mobile"];
      for (c =0; c< mobilePages.length; c++) {
        if (document.getElementById(mobilePages[c]).style.display === 'block') {
            SetVisibility.toNone('mobileVersion');
            SetVisibility.toNone(mobilePages[c]);
            SetVisibility.toBlock('desktopVersion');
            SetVisibility.toBlock(mobilePages[c].substring(0,mobilePages[c].indexOf('_')));
            SetBackgroundColor.page();
        }
      }
    }

    return {
      mobilePage: mobilePage,
      desktopPage: desktopPage
    }
})();

function setPositionForContactModal () {
    document.getElementById("modalContent").style.marginTop =  $(window).height()/2 - 128 +"px";
}

var SetVisibilityForProjectPage = (function () {
    var disabledButton = "";
    var disabledButtonMobile = "";
    return {
        descriptions: function (buttonId) {
          if (buttonId !== undefined) {
            var elements = [ "#sbProjectDescription", "#plpProjectDescription", "#irsProjectDescription", "#vswProjectDescription","#lunchProjectDescription"];
            var buttons = ["#sbProjectButton_","#plpProjectButton_", "#irsProjectButton_","#vswProjectButton_", "#lunchProjectButton_"];
            var mobileButtons = ["#sbProjectButton_","#plpProjectButtonMobile_", "#irsProjectButtonMobile_","#vswProjectButtonMobile_"];
            if (disabledButton !== "") {
                document.getElementById(disabledButton).disabled = false;
                document.getElementById(disabledButtonMobile).disabled = false;
            }

            for (i=0; i< elements.length; i++) {
                 if (elements[i].charAt(1) === buttonId.charAt(1)) {
                    elementToDisplay = elements[i];
                }
                else {
                    SetVisibility.fadeOut(elements[i]);
                    SetVisibility.fadeOut(elements[i]+"_Mobile");
                }
            }
            SetVisibility.fadeIn(elementToDisplay);
            SetVisibility.fadeIn(elementToDisplay+"_Mobile");
            document.getElementById(buttonId.substring(1, buttonId.length)).disabled=true;
            document.getElementById((buttonId.substring(1, buttonId.length-1)+"Mobile_")).disabled=true;
            disabledButton= buttonId.substring(1, buttonId.length);
            disabledButtonMobile = buttonId.substring(1, buttonId.length-1)+"Mobile_";
          }
      }
    }
})();

var SetVisibility = (function () {
	return {
		toBlock : function (elementId) {
			document.getElementById(elementId).style.display= "block";
		},

		toNone : function (elementId) {
			document.getElementById(elementId).style.display = "none";
		},

    fadeOut : function (elementId) {
        $(elementId).fadeOut("slow");
    },

    fadeIn : function (elementId) {
          $(elementId).delay(1000).fadeIn("slow");
    }
	}
})();

$(document).ready(function () {
    $(window).resize(function () {
       mobileIcons.setDimensions();
       if (($(window).width() <= 755) && (document.getElementById('mobileVersion').style.display !== "block")) {
          SetTemplate.mobilePage();
          if (document.getElementById("myModal").style.display === "block") {
            $(".modal-backdrop").css("display","none");
            $("#myModal").css("display","none");
          }
       }
       else if (($(window).width() > 755) && (document.getElementById('desktopVersion').style.display !== "block")) {
          SetTemplate.desktopPage();
          setPositionForContactModal();
       }
   });
});

$(document).ready(function () {
   if (($(window).width() <= 755) && (document.getElementById('mobileVersion').style.display !== "block")) {
      SetTemplate.mobilePage();
      mobileIcons.setDimensions();
   }
   else if (($(window).width() >755) && (document.getElementById('desktopVersion').style.display !== "block")) {
      SetTemplate.desktopPage();
      setPositionForContactModal();
   }
});
