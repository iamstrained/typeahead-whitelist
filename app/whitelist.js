var fileURL = '/app/applist.txt';
var whitelist;

//var fs = require('fs')
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
    var button1 = document.getElementById('CACI');
    button1.addEventListener("click", ListChanger('CACI'));
    
    var button2 = document.getElementById('UDEV');
    button2.addEventListener("click", ListChanger('UDEV'));
    
    var button3 = document.getElementById('LGSDirect');
    button3.addEventListener("click", ListChanger('LGSDirect'));
    
    var button4 = document.getElementById('Critical Insight');
    button4.addEventListener("click", ListChanger('Critical Insight'));
    
    function ListChanger(listname) {
      if (listname = 'CACI') {
          whitelist = loadStrings('app/applist.txt');
          console.log(whitelist);
      } else if (listname = 'UDEV') {
        whitelist = loadStrings('app/udev-applist.txt');
        console.log(whitelist);
      } else if (listname = 'LGSDirect') {
        whitelist = loadStrings('app/lgsdirect-applist.txt');
        console.log(whitelist);
      } else if (listname = 'Critical Insight') {
        whitelist = loadStrings('app/criticalinsight-applist.txt');
        console.log(whitelist);
     }
    }


//attempting to bind or align on-event listeners to the click against a found item.
$('.typehead').bind('typeahead:select', function(ev, suggestion) {
  document.getElementById('result').innerHTML="The item you have chosen exists on the CACI Whitelist and may be able to be installed.";
  console.log('Selection: ' + suggestion);
});

var NotifyUser = function() {
  document.getElementById('result').innerHTML="The item you have chosen exists on the CACI Whitelist and may be able to be installed.";
}; 

var elements = document.getElementsByClassName("tt-suggestion tt-selectable");

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', NotifyUser, false);
};

};