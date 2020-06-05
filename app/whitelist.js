var whitelist;

function preload(){
  whitelist = loadStrings('app/applist.txt');
}

function setup() {
var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;
  
      // an array that will be populated with substring matches
      matches = [];
  
      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');
  
      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });
  
      cb(matches);
    };
  };

 $('#whitelist-search .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 3,
    limit: 10
  },
  {
    name: 'whitelistapps',
    source: substringMatcher(whitelist),
    templates: {
      empty: [
        '<div class="empty-message">',
          'Unable to find any application on the whitelist that match the current query. You may submit a whitelist request via <a href="mailto:CISTAC@caci.com">CISTAC@caci.com</a>.',
        '</div>',
      ].join('\n')
    },
  });

    //attempting to simply allow for toggle of the boxes to different underlying whitelist TXT files.
    //doesn't appear to be successfully tying these listeners to the buttons and it's not firing actively. Perhaps this is due to being in $SETUP versus being somewhere else - i'm not clear on when in the DOM ordering it should exist.
  var button1 = document.getElementById('CACI');
    button1.addEventListener("click", function() {ListChanger('CACI')});
    
  var button2 = document.getElementById('UDEV');
    button2.addEventListener("click", function() {ListChanger('UDEV')});
    
  var button3 = document.getElementById('LGSDirect');
    button3.addEventListener("click", function() {ListChanger('LGSDirect')});
    
   var button4 = document.getElementById('Critical Insight');
    button4.addEventListener("click", function() {ListChanger('Critical Insight')});

    function ListChanger(listname) {
      if (listname = 'CACI') {
        whitelist = undefined  
        whitelist = loadStrings('app/applist.txt');
          console.log(whitelist);
      } else if (listname = 'UDEV') {
        whitelist = undefined
        whitelist = loadStrings('app/udev-applist.txt');
        console.log(whitelist);
      } else if (listname = 'LGSDirect') {
        whitelist = undefined
        whitelist = loadStrings('app/lgsdirect-applist.txt');
        console.log(whitelist);
      } else if (listname = 'Critical Insight') {
        whitelist = undefined
        whitelist = loadStrings('app/criticalinsight-applist.txt');
        console.log(whitelist);
     }
    }

//attempting to bind or align on-event listeners to the click against a found item. This is using the typeahead:select portion of the library.
// but it doesn't seem to fire the way i would expect when i click a suggestion item. It 'should' create a note for the user that tells them 'A-OK'.
  $('.typeahead').bind('typeahead:select', function(ev, suggestion) {
    document.getElementById('result').innerHTML="Great news, the item you have chosen, " + suggestion + ", exists on the whitelist and may be able to be installed. ";
    console.log('Selection: ' + suggestion);
  });

/*   var NotifyUser = function() {
    document.getElementById('result').innerHTML="The item you have chosen exists on the CACI Whitelist and may be able to be installed.";
  }; 

  var elements = document.getElementsByClassName("tt-suggestion tt-selectable");

  for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', NotifyUser, false);
  };
 */
};