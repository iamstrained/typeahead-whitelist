var fileURL = '/app/applist.txt';
var whitelist;

//var fs = require('fs')
function preload(){
  whitelist = loadStrings('app/applist.txt');
}

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
    }
  });


  function setup() {
    console.log(whitelist);
};