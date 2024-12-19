CREATE DATABASE writing_hub;
USE writing_hub;

CREATE TABLE requests (
	request_id INT AUTO_INCREMENT,
    title VARCHAR(100),
    content TEXT,
    author VARCHAR(100),
    timestamp DATETIME DEFAULT NOW(),
    interest_num INT DEFAULT 0,
    
	PRIMARY KEY(request_id)
);

CREATE TABLE responses (
	response_id INT AUTO_INCREMENT,
    message TEXT,
    response TEXT,
    author VARCHAR(100),
    timestamp DATETIME DEFAULT NOW(),
    interest_num INT DEFAULT 0,
    request_id INT,
    
    PRIMARY KEY(response_id),
    FOREIGN KEY(request_id) REFERENCES requests(request_id)
);

CREATE TABLE comments (
	comment_id INT AUTO_INCREMENT,
    comment TEXT,
    author VARCHAR(100),
    timestamp DATETIME DEFAULT NOW(),
    interest_num INT DEFAULT 0,
    request_id INT,
    
    PRIMARY KEY(comment_id),
    FOREIGN KEY(request_id) REFERENCES requests(request_id)
);

-- Testing
/*
INSERT INTO requests (title, content, author) VALUES ('This is my title', 'This is my content', 'Augy Markham');
INSERT INTO responses (message, response, author, request_id) VALUES ('Here is my message', 'here is my response', 'author', 1);
INSERT INTO comments (comment, author, request_id) VALUES ('This is a comment', 'me author', '1');
SELECT * FROM requests;
SELECT * FROM responses;
SELECT * FROM comments;
*/
