**Commands**

/newgame
  
    Create a game
    -  Check database if user exists
    -  If (no user exists)
        -  Enter Username
        -  "Choose your Main."
            -  Set fighter proficiency to 20
        -  Provide quick story prompt
    -  Else (user exists)
        -  "Your game already exists with this discord profile. Delete your game with /restart to start over"

/stats

    Reports profile of user.
    -  Name
    -  Player Level
    -  All fighters and proficiencies
    -  Major Tournaments Won
        -  (optional until major tournaments implemented) 
    -  Earnings
  
/train [fighter]

    Earn player exp
       -  
    Earn fighter proficiency exp
    -  TODO Figure out how much exp to reward for each session
    -  "You earned [xxx] experience with [fighter]"
    
    
/onlinematch

    Faces user against CPU generated player
    -  CPU has similar level to user (+/- 10)
    -  CPU fighter proficiency always 50
    -  WIN: Awards more EXP than /train to player level and fighter proficiency
    -  LOSE: 
  
/rest

    Disables actions for user until certain time elapses
    -  "You go to sleep"
    -  Disable /train, /onlinematch, /tournament, /challenge
    -  Wait [2 hrs]
    -  Set Stamina to 150.
    -  Re-enable commands.
    -  "You feel well rested"
    -  Optional
       - Give choice to sleep a certain number of hours: 2, 4, 6, 8 (but honestly I don't think it really matters, 
         there isn't really an incentive to manage sleep schedule)
         - each option restores a certain amount of stamina
         - choosing 8 hours will give you a bonus exp effect


/tournament

    IF game enables local or major tournament
        -  "Local Tournament is starting in [time] minutes"
        -  Create 7 random CPUs with designated fighters.
        -  "The tournament participants use the following fighters: "
            -  Print all CPU fighters in local tourney. 
        -  "Your next opponent is [CPU Name]. Their favorite fighter is [fighter]: "
            -  Print users next opponent.
        User Enters Local Tournament
        -  Generate and Print Tournament Bracket
        -  "Starting Quarterfinals, [user fighter] vs [CPU fighter]
        -  Start Quarterfinals
            -  Match 1
                -  Show Smash Levels of User vs CPU
                -  "fighting......... [User / CPU Name] WINS"
                -  WIN - Increase fighter and player EXP, Decrease Stamina
                -  LOSE - Increase fighter and player EXP less than win, decrease Stamina more than win
            -  Prompt user to use same fighter or choose another
            -  Match 2
                - (see match 1)
                - IF USER wins, go to WIN Quarterfinal scenario
                - IF CPU wins, go to Lose Tournament scenario
            -  Prompt user to use same fighter or choose another
            -  Match 3
                - repeat for BO3
            -  WIN Quarterfinal
                -  "You defeated [CPU Name]. You advanced to the Semi-Finals"
                
        -  "Do you want to continue? "[YES / NO]
        -  "Your next opponent is [CPU Name]. Their favorite fighter is [fighter]: "
        -  Start Semi-finals
            -  (same logic as quarterfinals BO3)
            -  IF USER wins, go to WIN Semi-final scenario
            -  IF USER lose, go to Lose Tournament scenario
            -  WIN Semi-final
                -  "You defeated [CPU Name]. You advanced to the Finals"
                
        -  "Do you want to continue? " [YES / NO]
        -  "Your next opponent is [CPU Name]. Their favorite fighter is [fighter]: "
        -  Start Finals
            -  BO3 fight
            -  IF WIN, go to WIN Tournament scenario
            -  WIN TOURNAMENT
                -  "You won the local tournament! You earned a shit ton of money"
                -  "you received [xxx] EXP"
                -  "You won $$$$$$"
                
        - LOSE TOURNAMENT Scenario
            -  "You lost to [CPU Name] and their [CPU fighter]."
            -  Award extra Player EXP
/tournament ends
           
           
/dropfighter [fighter]

    Removes [fighter] from player's list of playable fighters.

            
(optional) /challenge [username]

    Challenge another player in your server for bragging rights. This function should 
    -  Sends challenge prompt to [username]
    -  "waiting for [username]'s response... ... ... "
    -  IF [username] accepts
        -  Both users will blind-pick their fighter
        -  Print to both users
            -  "  
                  User1                           User2
                  Player Level: [User1 PL]        Player Level: [User1 PL] 
                  [fighter] [fighter_prof]        [fighter] [fighter_prof]
               "
            -  Print winner
                  
    -  IF [username] declines OR 20 seconds elapses
        -  print "[username] declined your challenge"
    
    -  (other player's perspective)
        -  "[user] wants to challenge"
        -  "Do you accept this challenge? [Yes / No]"


(optional) /scout [username]

    -  Reports profile of [username] in current server.
        -  Player Level
        -  "Top 10 fighters" 
            Fighters and proficiencies
        
    -  If (no username) "This [username] does not exist"
  
Hidden Commands

/AdminCreatePlayer [username] [playerlevel]

    Creates a player profile into the database. This command is hidden from the normal Discord user.
    - Creates new player
        -  name = [username]
        -  playerlevel = [playerlevel]
    - Set default fighters and fighter proficiencies
        - MARIO 50
        - DONKEY KONG 50
        - LINK 50
        - SAMUS 50
        - SORA 50
        // If max number of fighters change, update this list to include more default fighters.
        
