# Create DATABASE
CREATE DATABASE node44;
USE node44;
# Create TABLE
CREATE TABLE users (
	user_id INT,
    full_name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(255)
);
# 3 primary data types
# numeric: INT, FLOAT,...
# STRING: VARCHAR, TEXT,...
# DATE: DATETIME, TIMESTAMP,...

# Create data
INSERT INTO users (user_id, full_name, email, password, age) VALUES
(1, 'John Doe', 'johndoe@example.com', 'password123', 28),
(2, 'Jane Smith', 'janesmith@example.com', 'password123', 34),
(3, 'Michael Johnson', 'michaelj@example.com', 'password123', 40),
(4, 'Emily Davis', 'emilyd@example.com', 'password123', 25),
(5, 'Chris Brown', 'chrisb@example.com', 'password123', 31),
(6, 'Sarah Wilson', 'sarahw@example.com', 'password123', 27),
(7, 'David Miller', 'davidm@example.com', 'password123', 45),
(8, 'Jessica Taylor', 'jessicat@example.com', 'password123', 22),
(9, 'Daniel Anderson', 'daniela@example.com', 'password123', 33),
(10, 'Laura Thomas', 'laurat@example.com', 'password123', 29),
(11, 'Paul Moore', 'paulm@example.com', 'password123', 36),
(12, 'Anna Jackson', 'annaj@example.com', 'password123', 24),
(13, 'Mark Lee', 'markl@example.com', 'password123', 38),
(14, 'Sophia Harris', 'sophiah@example.com', 'password123', 26),
(15, 'Peter Clark', 'peterc@example.com', 'password123', 32),
(16, 'Olivia Lewis', 'olivial@example.com', 'password123', 30),
(17, 'James Walker', 'jamesw@example.com', 'password123', 42),
(18, 'Linda Young', 'linday@example.com', 'password123', 37),
(19, 'Robert Hall', 'roberth@example.com', 'password123', 50),
(20, 'Susan Allen', 'susana@example.com', 'password123', 28);


# Add column
ALTER TABLE users
ADD COLUMN age INT;

ALTER TABLE users
MODIFY COLUMN full_name VARCHAR(255);

-- DELETE FROM users;

# Interact with data
-- tìm những người có tuổi từ 25 tới 30
-- C1:
SELECT * FROM users
WHERE age >= 25 AND age <= 30;

-- C2:
SELECT * FROM users
WHERE age BETWEEN 25 AND 30;

-- tìm những người tên John
SELECT * FROM users
WHERE full_name LIKE "%John%" AND (age BETWEEN 25 AND 30);

-- Sắp xếp tuổi theo thứ tự giảm dần
SELECT * FROM users
ORDER BY age DESC
LIMIT 5;

-- Add constraint
ALTER TABLE users
MODIFY COLUMN full_name VARCHAR(255) NOT NULL,
MODIFY COLUMN email VARCHAR(50) NOT NULL,
MODIFY COLUMN password VARCHAR(255) NOT NULL;

-- Add primary key
ALTER TABLE users
MODIFY COLUMN user_id INT PRIMARY KEY AUTO_INCREMENT;

# UPDATE data
UPDATE users
SET full_name = 'Thanh Hien'
WHERE user_id = 1;

-- Delete Data 
-- hard delete
DELETE FROM users
WHERE user_id = 2;

-- soft delete -> thêm flag is_deleted để không show data
ALTER TABLE users
ADD COLUMN is_deleted INT NOT NULL DEFAULT 0;

-- tìm những người có tuổi lớn nhất
SELECT * FROM users
WHERE age = (SELECT age FROM users ORDER BY age DESC LIMIT 1);

SELECT * FROM users
WHERE age = (SELECT max(age) FROM users);


