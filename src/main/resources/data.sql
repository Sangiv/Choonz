INSERT INTO users (user_name,password) VALUES
('Dank Adam', '123456'),
('Simon P', '123456'),
('Sangiv D', '123456'),
('M Joni', '123456');

INSERT INTO playlist (name,artwork, description, users_user_id) VALUES
('Chill', 'img/work.jpg', 'My friend, it is good!', 1),
('Super Chill', 'img/study.jpg', 'My friend, it is very good!', 2),
('Club Banger', 'img/party.jpg', 'My friend, it is very very good!',3),
('UK Garage Mix', 'img/sports.jpg', 'My friend, it is extremely good!',4);

INSERT INTO artist (name) VALUES ('Chris Brown'),('The Weeknd'),('Post Malone'),('Lana Del Rey'),('The Black Keys'),('Kanye West');

INSERT INTO genre (name,description) VALUES
('Pop', 'I like it always'),
('RnB', 'I like it when I am hyped'),
('Rock', 'I like it when I am at the gym'),
('Jazz', 'I like it when I am the bar'),
('Blues', 'I like it when I am in my zone'),
('Blues Rock', 'Fusion genre of blues and rock'),
('Hip Hop', 'Hip, hop');

INSERT INTO album (name,cover, artist_id, genre_id) VALUES
('Royalty', 'img/royalty.jpg',1,2),
('X', 'img/xchrisbrown.jpg',1,2),
('Starboy', 'img/starboy.jpg',2,1),
('AfterHours', 'img/afterhours.jpg',2,1),
('BeerBongs and Bentleys', 'img/beerbong.jpg',3,2),
('Lust for Life', 'img/lustforlife.jpg',4,5),
('El Camino', 'img/elcamino.png', 5, 6),
('Ye', 'img/ye.png', 6, 7),
('The Life of Pablo', 'img/tlop.png', 6, 7),
('My Beautiful Dark Twisted Fantasy', 'img/mbdtf.png', 6, 7);


INSERT INTO track (name, duration, lyrics, album_id, artist_id) VALUES
('I feel it coming', 269, 'I feel it coming', 3, 2),
('Rockstar', 220, 'I feel it coming', 5, 3),
('When I see', 298, 'When I see you eyes', 6, 4),
('Royalty', 263, 'Jude Jude Jud', 1, 1),
('Grass aint greener', 293, 'Blah blah blah', 2, 1),
('Lonely Boy', 194, 'Woaaawoaa I got a love that keeps me waiting', 7, 5),
('Ghost Town', 272, 'I cut my hand on a stove', 8, 6),
('Ultralight Beam', 321, 'we on a ultralight beam', 9, 6),
('Dark Fantasy', 281, 'You might think youve peeped the scene', 10, 6);

INSERT INTO playlist_track (track_id, playlist_id) VALUES
(1,1),(1,2),(2,2),(2,1),(2,3);