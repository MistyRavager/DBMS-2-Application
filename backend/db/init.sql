-- Example of schema 

-- Create all tables

--Login
CREATE TABLE login (
	id INT NOT NULL PRIMARY KEY,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	FOREIGN KEY (id) REFERENCES users(id)
);

-- users
CREATE TABLE users (
	id INT NOT NULL PRIMARY KEY,
	account_id INT,
	reputation INT NOT NULL,
	views INT DEFAULT 0,
	down_votes INT DEFAULT 0,
	up_votes INT DEFAULT 0,
	display_name VARCHAR(255) NOT NULL,
	location VARCHAR(512),
	profile_image_url VARCHAR(255),
	website_url VARCHAR(255),
	about_me MEDIUMTEXT,
	creation_date TIMESTAMP(3) NOT NULL,
	last_access_date TIMESTAMP(3) NOT NULL
);

-- Posts
CREATE TABLE posts (
	id INT NOT NULL PRIMARY KEY,
	owner_user_id INT,
	last_editor_user_id INT,
	post_type_id SMALLINT NOT NULL,
	accepted_answer_id INT,
	score INT NOT NULL,
	parent_id INT,
	view_count INT,
	answer_count INT DEFAULT 0,
	comment_count INT DEFAULT 0,
	owner_display_name VARCHAR(64),
	last_editor_display_name VARCHAR(64),
	title VARCHAR(512),
	tags VARCHAR(512),
	content_license VARCHAR(64) NOT NULL,
	body MEDIUMTEXT,
	favorite_count INT,
	creation_date TIMESTAMP(3) NOT NULL,
	community_owned_date TIMESTAMP(3),
	closed_date TIMESTAMP(3),
	last_edit_date TIMESTAMP(3),
	last_activity_date TIMESTAMP(3)    
);

-- PostLinks
CREATE TABLE post_links (
	id INT NOT NULL PRIMARY KEY,
	related_post_id INT NOT NULL,
	post_id INT NOT NULL,
	link_type_id TINYINT NOT NULL,
	creation_date TIMESTAMP(3) NOT NULL
);

-- PostHistory
CREATE TABLE post_history (
	id INT NOT NULL PRIMARY KEY,
	post_id INT NOT NULL,
	user_id INT,
	post_history_type_id TINYINT NOT NULL,
	user_display_name VARCHAR(64),
	content_license VARCHAR(64),
	revision_guid VARCHAR(225),
	text MEDIUMTEXT,
	comment MEDIUMTEXT,
	creation_date TIMESTAMP(3) NOT NULL
);

-- Comments
CREATE TABLE comments (
	id INT NOT NULL PRIMARY KEY,
	post_id INT NOT NULL,
	user_id INT,
	score TINYINT NOT NULL,
	content_license VARCHAR(64) NOT NULL,
	user_display_name VARCHAR(64),
	text MEDIUMTEXT,
	creation_date TIMESTAMP(3) NOT NULL
);

-- Votes
CREATE TABLE votes (
	id INT NOT NULL PRIMARY KEY,
	user_id INT,
	post_id INT NOT NULL,
	vote_type_id TINYINT NOT NULL,
	bounty_amount TINYINT,
	creation_date TIMESTAMP(3) NOT NULL
);

-- Badges
CREATE TABLE badges (
	id INT NOT NULL PRIMARY KEY,
	user_id INT NOT NULL,
	class TINYINT NOT NULL,
	name VARCHAR(64) NOT NULL,
	tag_based TINYINT(1) NOT NULL,
	date TIMESTAMP(3) NOT NULL
);

-- Tags
CREATE TABLE tags (
	id INT NOT NULL PRIMARY KEY,
	excerpt_post_id INT,
	wiki_post_id INT,
	tag_name VARCHAR(255) NOT NULL,
	count INT DEFAULT 0
);


-- use source schema.sql to make tables