CREATE TABLE IF NOT EXISTS `projects` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL  
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `jobs` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  creationDate datetime DEFAULT NULL,
  project_id int(11) NOT NULL,
  price decimal(10,3) DEFAULT NULL,
  status varchar(16) DEFAULT "in preparation" COMMENT "possible states: in preparation, in progress, delivered, cancelled"
) ENGINE=InnoDB DEFAULT CHARSET=utf8;