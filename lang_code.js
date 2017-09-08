//  get language for my browser.

const parseClientLang = (lang) => { 
  var regex = /^\w+/;
  
  return (
      lang.match(regex)[0] || "fr"  //  the first regex result in the matched array or 'fr' if match returns null
    );
}


module.exports = parseClientLang
