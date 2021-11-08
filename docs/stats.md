Player fields
	Name: 
	Level: Default 1 (max level 99)
	Stamina: 0-100
	Fatigued: True / False 
	Luck: Default 0 (range from -10 to +10)
	Character Proficiency: (implemented as array of the # of characters in SSBU)
	
Combat Formula
	Compute Smash Level
	Smash Level = Player level * Stamina% * Character Proficiency
	SL 50 vs SL 25
	Odds = 80/20
	SL 4 vs SL 2
	55/45
	SL 90 vs SL 50
	90/10
	SL 99 vs SL 90
	55/45
	
	Character Proficiency Formula
	
	Stamina% Formula
	100% = 1
	0% = .5
	Linear from 0% to 100%
	**Stamina% = .5 + .5(Stamina / 100)**


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
