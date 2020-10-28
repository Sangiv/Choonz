INSERT INTO users (user_name,password) VALUES
('Dank Adam', '123456'),
('Simon P', '123456'),
('Sangiv D', '123456'),
('M Joni', '123456');

INSERT INTO playlist (name,artwork, description, users_user_id) VALUES
('Chill', 'ImageOne', 'My friend, it is good!', 1),
('Super Chill', 'ImageTwo', 'My friend, it is very good!', 2),
('Club Banger', 'ImageThree', 'My friend, it is very very good!',3),
('UK Garage Mix', 'ImageFour', 'My friend, it is extremely good!',4);

INSERT INTO artist (name) VALUES ('Chris Brown'),('The Weeknd'),('Post Malone'),('Lana Del Rey');

INSERT INTO genre (name,description) VALUES
('Pop', 'I like it always'),
('RnB', 'I like it when I am hyped'),
('Rock', 'I like it when I am at the gym'),
('Jazz', 'I like it when I am the bar'),
('Blue', 'I like it when I am in my zone');

-- INSERT INTO album (name,cover, artist_id, genre_id) VALUES
-- ('Royalty', LOAD_FILE('resources/img/royalty.jpg'),1,2);
-- ('X', LOAD_FILE('resources/img/xchrisbrown.jpg'),1,2),
-- ('Starboy', LOAD_FILE('resources/img/starboy.jpg'),2,1),
-- ('AfterHours', LOAD_FILE('resources/img/afterhours.jpg'),2,1),
-- ('BeerBongs and Bentleys', LOAD_FILE('resources/img/beerbong.jpg'),3,2),
-- ('Lust for Life', LOAD_FILE('resources/img/lustforlife.jpg'),4,5);
INSERT INTO album (name,cover, artist_id, genre_id) VALUES
('Royalty', 'CoverImageOne',1,2),
('X', 'CoverImageTwo',1,2),
('Starboy', 'CoverImageThree',2,1),
('AfterHours', 'CoverImageFour',2,1),
('BeerBongs and Bentleys', 'CoverImageFive',3,2),
('Lust for Life', 'CoverImageSix',4,5);


INSERT INTO track (name, duration, lyrics, album_id) VALUES
('I feel it coming', 5, 'I feel it coming', 3),
('Rockstar', 5, 'I feel it coming', 5),
('When I see', 5, 'When I see you eyes', 6),
('Royalty', 5, 'Jude Jude Jud', 1),
('Grass aint greener', 5, 'Blah blah blah', 2);
