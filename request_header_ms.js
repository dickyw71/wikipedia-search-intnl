// User Story: I can get the IP address, language and operating system for my browser.

const requestHeaderService = (ip, lang, source) => { 
  return { 
    ipaddress: ip,
    language: lang,
    software: source.slice(source.indexOf('(')+1, source.indexOf(')'))
  }
}


module.exports = requestHeaderService
