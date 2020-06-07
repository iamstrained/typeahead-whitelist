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



//this section feeds the buttons to the function for assigning the unique whitelist file to a variable array. 
  var button1 = document.getElementById('CACI');
    button1.addEventListener("click", function() {
      ListChanger('CACI');
    }
    );
    
  var button2 = document.getElementById('UDEV');
    button2.addEventListener("click", function() {
      ListChanger('UDEV');
    }
    );
    
  var button3 = document.getElementById('LGSDirect');
    button3.addEventListener("click", function() {
      ListChanger('LGSDirect');
    }
    );
    
   var button4 = document.getElementById('Critical Insight');
    button4.addEventListener("click", function() {
      ListChanger('Critical Insight');
    }
    );

    function ListChanger(listname) {
      if (listname == 'CACI') {
        whitelist = undefined  
        whitelist = loadStrings('app/applist.txt');
        $('#whitelist-search .typeahead').typeahead('destroy');
          console.log(whitelist);
          whiteliststart();
      } else if (listname == 'UDEV') {
        whitelist = undefined
        whitelist = loadStrings('app/udev-applist.txt');
        $('#whitelist-search .typeahead').typeahead('destroy');
        whiteliststart();
        console.log(whitelist);
      } else if (listname == 'LGSDirect') {
        whitelist = undefined
        whitelist = loadStrings('app/lgsdirect-applist.txt');
        $('#whitelist-search .typeahead').typeahead('destroy');
        whiteliststart();
        console.log(whitelist);
      } else if (listname == 'Critical Insight') {
        whitelist = undefined
        whitelist = loadStrings('app/criticalinsight-applist.txt');
        $('#whitelist-search .typeahead').typeahead('destroy');
        whiteliststart();
        console.log(whitelist);
     }
    }
function whiteliststart () {
    $('#whitelist-search .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 2,
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
  };


//initalize the first list on-load
whiteliststart()

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
 var resultbox = document.getElementById("result");
 var button6 = document.getElementById("Reset");
 button6.addEventListener("click", function() {
  resultbox.innerHTML="",
  document.getElementById("typeahead-search").value="";
  });

};