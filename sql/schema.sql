CREATE SCHEMA IF NOT EXISTS smash_game;

CREATE TABLE smash_game.`fighter_proficiency` (
	fp_id INT auto_increment NOT NULL,
	character_id INT NOT NULL,
	experience INT NOT NULL,
	name varchar(20) NOT NULL,
	CONSTRAINT fighter_proficiency_PK PRIMARY KEY (fp_id),
	CONSTRAINT fighter_proficiency_FK FOREIGN KEY (character_id) REFERENCES smash_game.`character`(character_id)
)

CREATE TABLE smash_game.`character` (
	character_id INT auto_increment NOT NULL,
	prize_money INT DEFAULT 0 NOT NULL,
	experience INT DEFAULT 0 NOT NULL,
	name varchar(20) NOT NULL,
	stamina INT DEFAULT 100 NOT NULL,
	is_pro BOOL NOT NULL,
	CONSTRAINT character_PK PRIMARY KEY (character_id)
)
