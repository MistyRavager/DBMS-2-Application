-- The csv files should be in a directory called 'csv' in the same directory as this file. Otherwise, the path might have to be changes

DELETE FROM badges;
DELETE FROM comments;
DELETE FROM post_history;
DELETE FROM post_links;
DELETE FROM posts;
DELETE FROM tags;
DELETE FROM users;
DELETE FROM votes;

LOAD XML LOCAL INFILE '/Users/suryanshjain/Desktop/xml/PostHistory1.xml'
INTO TABLE post_history
ROWS IDENTIFIED BY '<row>';

LOAD XML LOCAL INFILE '/Users/suryanshjain/Desktop/xml/PostLinks1.xml'
INTO TABLE post_links
ROWS IDENTIFIED BY '<row>';

LOAD XML LOCAL INFILE '/Users/suryanshjain/Desktop/xml/Posts1.xml'
INTO TABLE posts
ROWS IDENTIFIED BY '<row>';

LOAD XML LOCAL INFILE '/Users/suryanshjain/Desktop/xml/Tags1.xml'
INTO TABLE tags
ROWS IDENTIFIED BY '<row>';

LOAD XML LOCAL INFILE '/Users/suryanshjain/Desktop/xml/Users.xml'
INTO TABLE users
ROWS IDENTIFIED BY '<row>';

LOAD XML LOCAL INFILE '/Users/suryanshjain/Desktop/xml/Votes1.xml'
INTO TABLE votes
ROWS IDENTIFIED BY '<row>';

LOAD XML LOCAL INFILE '/Users/suryanshjain/Desktop/xml/Badges1.xml'
INTO TABLE badges
ROWS IDENTIFIED BY '<row>';

LOAD XML LOCAL INFILE '/Users/suryanshjain/Desktop/xml/Comments1.xml'
INTO TABLE comments
ROWS IDENTIFIED BY '<row>';

-- use source data.sql to dump data