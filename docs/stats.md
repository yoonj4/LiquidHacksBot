Player fields

	Name: 
	Level: Default 1 (max level 99)
	Stamina: 0-100
	Fighter List: (implemented as List of the # of characters in SSBU). Each element of Map contains key: string Fighter, value: Map String OpponentKnowledge and Int Count
	OpponentKnowledge: (implemented as sub array of Fighter Proficiency)
	(optional) buffs[]
	(optional) tempbuffs[]
	
Combat Formula

	Compute Smash Level
	Smash Level (SL) = PlayerLevel + (Stamina% * FighterProficiency% * OpponentKnowledge * FighterMatchup)
	
	Compute Win Odds
	Victory% = 50 + delta_SL
	
	SL 50 vs SL 25
	Odds = 75/25
	SL 4 vs SL 2
	52/48
	SL 90 vs SL 50
	90/10
	SL 99 vs SL 90
	59/41	
	
	Stamina%
		100% = 1
		0% = .5
		Linear from x0.5 to x1.0
		Stamina% = .5 + .5(Stamina / 100)
		
	FighterProficiency%
		Increased by using fighter in Training or Match
		Also has match up history
		lv 1 - 99
		@ lv 1 = x1.0
		@ lv 99 = x1.5
		FighterProficiency% = 1 + .5(fighterProficiency / 100)
		
		Training gives a range of 100 to 5000 EXP, EXP reward scales with Player Level
		Match gives range of 5000 - 10000 EXP, more exp when faced with similar opponent Smash Level
		
		FighterProficiency LV 99 EXP = 1,000,000
		PlayerLevel LV99 EXP = 5,000,000
		
	OpponentKnowledge
		How well do you know the opponent fighter's strengths and weaknesses?
		
		Int matchupCount;
		If matchupCount < 5, then x0.90 multiplier to SL
		if 6 < matchupCount < 20, then x1.00
		if matchupCount > 21, then x1.05
	
	FighterMatchup
		Modifier based on fighter matchup meta
		Create table for each character using data from two methods:
			1. reddit https://www.reddit.com/r/smashbros/comments/p7a25f/ultimate_matchup_chart_compilation_v6/
			2. Historical win rates via Liquipedia DB
		If no data available, provide negative matchup against all characters since no data means this is a piss low tier fighter and thats why its crap
		
		Using Liquipedia DB, find win rate and apply directly into Smash Level formula
		Example: if pikachu vs DK is 54 / 46, Pikachu player Smash level * .54, DK player Smash Level * .46

Luck

	Luck gives a flat value to 
	Calculate odds based on each player’s Smash Level. Random number generator determines winner
	
	Equal level players - 50/50 odds
	Player 1 has +10 luck - 60/40 odds

Stamina

	If stamina === 0 , Fatigued === True
	If fatigued, wait until stamina = 100
	If win, decrease 10 stamina
	If lose, decrease 20 stamina

Recover Stamina 

Passive Regeneration

	/rest
		If (stamina < 100 && datetime.now() > (cooldownTimestamp + 60 minutes))
			cooldownTimestamp = datetime.now();
		Disable fighting until certain time elapses
		-

	/eat
		recoverstamina(food);
	
Event Commands

	/train 
		- play a CPU match
			Connects you with a fighter that has a fixed smash level
				default: random fighter is picked
				if provided a fighter, you will fight that fighter
			win: decrease 5 stamina, gain 20 exp
			lose: decrease 10 stamina, gain 10 exp
			gain fighter proficiency
			gain matchup knowledge but only up to 5 for a character
		(optional) - practicing combos (not a core feature)
			gain fighter proficiency
			gain exp
			(optional) - chance to make a breakthrough fighter tech?, granted exp and character proficiency
				discovering fighter tech adds +1 to win rate
	
	/onlineMatch play an online match
		Connects you with players with similar player level
			player is generated and their stats (figther proficiency, matchup knowledge - generate random multiplier)
			fighter you encouter
		win: decrease 10 stamina, gain TBD exp
		lose: decrease 20 stamina, gain TBD exp
		gain character proficiency
		gain matchup knowledge
	
	/Tournament 
		- local : play a local match
			randomly generate number of players and their stats (5-10 players?)
		- major : participate in a major tournament. Only available when a Major Tournament in real life is On Going
		
	(Optional) /challenge [player name]
		- challenge any player within the server
		
	/scout [player name]
		- see player level of player
		- see high score
		
Generating random players
	
	cpu
	
	online match
		Randomly choose Opponent's character
		Calculate Player's Smash Level
		Set Opponent's Smash Level x0.90 to x1.1 of Player
		
		
		
	tournaments
		- local (Best of 3)
			Opponent's Smash Level = current player's level * (value between .225 - .7875). Average value would be 0.625
		- major (Best of 5)
			
	

Future Features

	Current Real-life winner of each major tournament becomes ultra boss ( + 20 luck)
