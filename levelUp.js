modules.export = function(currlevel) {
  // update player level +=1 - do it here or in another method?
  // Report to player that you leveled up
  console.log("You reached level " + (currLevel + 1)) // get player level // double check if I can concatenate

  // Update new exp cap - fetch it from sql server
    // if there is remainder exp after reaching new level, add it to current exp
      // Ex. if you had exp 99/100, and you gain 20 exp, your current exp amount = 19/120


}
