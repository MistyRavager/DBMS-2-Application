-- The csv files should be in a directory called 'csv' in the same directory as this file. Otherwise, the path might have to be changes

LOAD DATA LOCAL INFILE './csv/Badges.csv' 
INTO TABLE badges 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;


LOAD DATA LOCAL INFILE '/Users/suryanshjain/Desktop/DBMS-2-Application_local/csv/Comments.csv' 
INTO TABLE comments 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;


LOAD DATA LOCAL INFILE './csv/PostHistory.csv' 
INTO TABLE post_history 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;


LOAD DATA LOCAL INFILE './csv/PostLinks.csv' 
INTO TABLE post_links 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;


LOAD DATA LOCAL INFILE './csv/Posts.csv' 
INTO TABLE posts 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;


LOAD DATA LOCAL INFILE './csv/Tags.csv' 
INTO TABLE tags 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;


LOAD DATA LOCAL INFILE '/Users/suryanshjain/Desktop/DBMS-2-Application_local/csv/Users.csv' 
INTO TABLE users 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;


LOAD DATA LOCAL INFILE './csv/Votes.csv' 
INTO TABLE votes 
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;


-- use source data.sql to dump data