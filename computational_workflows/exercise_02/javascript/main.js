console.log("this works")

let nouns = ["heart", "rainbow", "ocean"];
let verbs = ["look", "make", "continue"];
let adjectives = ["good", "different", "possible"];

let noun = nouns[Math.floor(Math.random() * nouns.length)]
let verb = verbs[Math.floor(Math.random() * verbs.length)]
let adjective = adjectives[Math.floor(Math.random() * adjectives.length)]

console.log(`Wow, look how ${adjective} the ${noun} looks today. We should ${verb} it.`)