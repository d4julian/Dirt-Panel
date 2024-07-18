-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.5.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table dirtpanel.ftp_blacklist
CREATE TABLE IF NOT EXISTS `ftp_blacklist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(512) NOT NULL,
  `isDirectory` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `path` (`path`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

-- Dumping data for table dirtpanel.ftp_blacklist: ~2 rows (approximately)
/*!40000 ALTER TABLE `ftp_blacklist` DISABLE KEYS */;
INSERT INTO `ftp_blacklist` (`id`, `path`, `isDirectory`) VALUES
	(37, 'logs/debug.log', 0),
	(38, 'mods', 1),
	(39, 'whitelist.json', 0);
/*!40000 ALTER TABLE `ftp_blacklist` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
