DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS thread CASCADE;
DROP TABLE IF EXISTS post CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

--Create Tables
CREATE TABLE roles (role_id serial PRIMARY KEY, role_name VARCHAR(15));
CREATE TABLE users (user_id serial PRIMARY KEY, username varchar(25),password varchar(60), email varchar(30),role_id int DEFAULT 1,register_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,last_login TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP(2), CONSTRAINT fk_role_ID FOREIGN KEY(role_id) REFERENCES roles(role_id));
CREATE TABLE category (cat_id serial PRIMARY KEY, name VARCHAR(120));
CREATE TABLE thread (thread_id serial PRIMARY KEY, cat_id INT REFERENCES category (cat_id),subject VARCHAR(120),thread_description VARCHAR(120),user_id INT,create_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP(2), CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE SET NULL);
CREATE TABLE post (post_id serial PRIMARY KEY, thread_id INT REFERENCES thread (thread_id) ON DELETE CASCADE, user_id INT REFERENCES users (user_id) ON DELETE SET NULL, content VARCHAR(5000) NOT NULL, post_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP(2));

--add user roles
INSERT INTO roles (role_name) VALUES ('user');
INSERT INTO roles (role_name) VALUES ('admin');

--Insert Users
INSERT INTO users VALUES (DEFAULT,'hunterrisse','SADJLFAIMSCIMASE','hunterrisse@gmail.com',2);
INSERT INTO users VALUES (DEFAULT,'Madison','SADJLFAIMSCIMASE','M@gmail.com',2);
INSERT INTO users VALUES (DEFAULT,'Gino','SADJLFAIMSCIMASE','Gilgamesh@gmail.com',2);
INSERT INTO users VALUES (DEFAULT,'Eric','SADJLFAIMSCIMASE','Evara@gmail.com',2);
INSERT INTO users VALUES (DEFAULT,'Alex','SADJLFAIMSCIMASE','alex@gmail.com',2);
INSERT INTO users VALUES (DEFAULT,'Madison','SADJLFAIMSCIMASE','M@gmail.com',2);
INSERT INTO users VALUES (DEFAULT,'Gino','SADJLFAIMSCIMASE','Gilgamesh@gmail.com',2);
INSERT INTO users VALUES (DEFAULT,'Eric','SADJLFAIMSCIMASE','Evara@gmail.com',2);

INSERT INTO users (username,password,email)
VALUES
  ('Upton','TKR14JTE7IG','enim@google.com'),
  ('Cynthia','QBJ11KET0HH','eleifend@icloud.edu'),
  ('Gary','GUM82NMV4IE','et@google.ca'),
  ('Nolan','VVG15WMV3CS','luctus.ut@icloud.ca'),
  ('Quon','YUO65YQO9OM','curabitur@protonmail.ca');


--insert categories
INSERT INTO category VALUES(DEFAULT,'Technology');
INSERT INTO category VALUES(DEFAULT,'Anime');
INSERT INTO category VALUES(DEFAULT,'Psychology');
INSERT INTO category VALUES(DEFAULT,'Art');

--insert a THREAD
INSERT INTO thread VALUES (DEFAULT,2,'Kanata no Astra is a God-Tier Anime','Discussion about the anime Kanata no Astra. Try and convince me it is not the best.',1,DEFAULT);
INSERT INTO thread VALUES (DEFAULT,1,'React technology','A discussion of the new version of React: 18, that was just added to NPM.',4,DEFAULT);
INSERT INTO thread VALUES (DEFAULT,3,'Playing as Japan psychology','A discussion about universalis europa IV and playing in Japan.',3,DEFAULT);
INSERT INTO thread VALUES (DEFAULT,4,'Morning art','What kind of artsy stuff do you do in the wee hours of the morning?',2,DEFAULT);

--make post
INSERT INTO post VALUES (DEFAULT,1,1,'Anime is the pinnacle of entertaiment, The best of the best being Kanata no Astra: Lost in Space. CHANGE MY MIND',DEFAULT);
INSERT INTO post VALUES (DEFAULT,4,2,'There is no better time to do art then in the early morning.',DEFAULT);
INSERT INTO post VALUES (DEFAULT,2,4,'This new React v18 really brought some major changes',DEFAULT);
INSERT INTO post VALUES (DEFAULT,3,3,'History repeats itself, people follow patterns, and taking over the entirety of Asia as Japan is a challenge.',DEFAULT);
INSERT INTO post VALUES (DEFAULT,1,3,'That is incorrect. The best anime by far is Fate/Zero.',DEFAULT);
INSERT INTO post VALUES (DEFAULT,1,1,'You can say that after you see Kanata no Astra',DEFAULT);

--SELECT content,post_date,user_id FROM post WHERE thread_id = (select thread_id FROM thread WHERE subject = 'Best Anime');
SELECT * FROM categories;
SELECT * FROM thread;
SELECT * FROM post;
SELECT * FROM users;
