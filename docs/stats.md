Player fields
	Name: 
	Level: Default 1 (max level 99)
	Stamina: 0-100
	Fatigued: True / False 
	Luck: Default 0 (range from -10 to +10)
	Fighter Proficiency: (implemented as array of the # of characters in SSBU)
	
Combat Formula
	Compute Smash Level
	Smash Level = (PlayerLevel * Stamina% * FighterProficiency%) * OpponentKnowledge * FighterMatchup
	SL 50 vs SL 25
	Odds = 80/20
	SL 4 vs SL 2
	55/45
	SL 90 vs SL 50
	90/10
	SL 99 vs SL 90
	55/45
	
	Stamina%
		100% = 1
		0% = .5
		Linear from 50% to 100%
		**Stamina% = .5 + .5(Stamina / 100)**
		
	FighterProficiency%
		Increased by using fighter in Training or Match
		Also has match up history
		lv 1 - 99
		@ lv 1 = x1.0
		@ lv 99 = x1.5
		FighterProficiency% = 1 + .5(fighterProficiency / 100)
		
		Training gives a range of 10 to 50 EXP
		Match gives range of 500 - 1000 EXP, more exp when faced with similar opponent Smash Level
		

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

Combat
	Calculate odds based on each player’s Smash Level. Random number generator determines winner
	Equal level players - 50/50 odds
	Stronger level - 75/25 odds
	Stronger but weaker player has extra +10 luck - 65/35

Stamina
	If stamina === 0 , Fatigued === True
	If fatigued, wait until stamina = 100
	If win, decrease 10 stamina
	If lose, decrease 20 stamina 

Recover Stamina 

/rest
	// determine amount of stamina recovered
	If (stamina < 100 && datetime.now() > (cooldownTimestamp + 60 minutes))
		recoverstamina(food);
		cooldownTimestamp = datetime.now();
	Disable fighting until certain time elapses
