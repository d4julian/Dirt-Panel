-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2021 at 06:24 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dirtpanel`
--

-- --------------------------------------------------------

--
-- Table structure for table `nodes`
--

CREATE TABLE `nodes` (
  `id` int(3) NOT NULL,
  `name` varchar(32) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `ftpPort` int(5) NOT NULL,
  `concurrentFtpCons` int(2) NOT NULL DEFAULT '5'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `nodes`
--

INSERT INTO `nodes` (`id`, `name`, `ip`, `ftpPort`, `concurrentFtpCons`) VALUES
(2, 'T. D. 2: Electric Boogaloo', '192.168.0.1', 2220, 5),
(7, 'Actual Testing Daemon', '127.0.0.1', 2221, 5);

-- --------------------------------------------------------

--
-- Table structure for table `punishments`
--

CREATE TABLE `punishments` (
  `id` int(11) NOT NULL,
  `complete` tinyint(1) NOT NULL DEFAULT '0',
  `uuid` varchar(36) NOT NULL,
  `username` varchar(16) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `type` enum('warn','mute','ban','ipban') NOT NULL,
  `duration` int(10) NOT NULL,
  `staffUUID` varchar(36) NOT NULL,
  `staffUsername` varchar(16) NOT NULL,
  `onBehalfUUID` varchar(36) DEFAULT NULL,
  `onBehalfUsername` varchar(16) DEFAULT NULL,
  `date` int(10) NOT NULL,
  `server` varchar(32) NOT NULL,
  `ingameReason` varchar(256) NOT NULL,
  `fullReason` text,
  `removeUUID` varchar(36) DEFAULT NULL,
  `removeUsername` varchar(16) DEFAULT NULL,
  `removeDate` int(10) DEFAULT NULL,
  `appealStatus` enum('unknown','accepted','rejected','') NOT NULL DEFAULT 'unknown',
  `dismissed` tinyint(1) NOT NULL DEFAULT '0',
  `editHistory` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `punishments`
--

INSERT INTO `punishments` (`id`, `complete`, `uuid`, `username`, `ip`, `type`, `duration`, `staffUUID`, `staffUsername`, `onBehalfUUID`, `onBehalfUsername`, `date`, `server`, `ingameReason`, `fullReason`, `removeUUID`, `removeUsername`, `removeDate`, `appealStatus`, `dismissed`, `editHistory`) VALUES
(1, 0, '8d57e5a0891b486f8dc33ed3ca844de4', '_Cin0x_', '111.111.111.111', 'ban', -1, '4ca02fdcd0464e8dba69fe1c1e17b8e0', 'TechDweebGaming', NULL, NULL, 1586025580, 'Test Server Alpha', 'He\'s a fucking nerd', '', NULL, NULL, NULL, 'unknown', 0, '[]'),
(2, 0, '087f0c8f70ed4d96bad46c4dc40aca2d', 'Tendollarsdeep', '111.111.111.111', 'ipban', -1, '551bd4cefe614a4db72b14dda2ff41ff', 'pwnstar', NULL, NULL, 1581125580, 'Test Server Beta', 'He\'s a fucking nerd', '', NULL, NULL, NULL, 'unknown', 0, '[]');

-- --------------------------------------------------------

--
-- Table structure for table `servers`
--

CREATE TABLE `servers` (
  `id` int(5) NOT NULL,
  `name` varchar(32) NOT NULL,
  `port` int(5) NOT NULL,
  `code` varchar(32) NOT NULL,
  `domainIp` varchar(64) NOT NULL,
  `launchCommand` varchar(512) NOT NULL,
  `nodeId` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `servers`
--

INSERT INTO `servers` (`id`, `name`, `port`, `code`, `domainIp`, `launchCommand`, `nodeId`) VALUES
(23, 'Test Server Alpha', 25560, 'alpha', 'alpha.dirtcraft.gg', 'java -Xms1024M -Xmx6144M -jar forge-1.12.2-14.23.5.2847-universal.jar nogui', 7),
(24, 'Test Server Beta', 25561, 'beta', 'beta.dirtcraft.gg', 'java -Xms1024M -Xmx6144M -jar forge-1.12.2-14.23.5.2847-universal.jar nogui', 7),
(25, 'Test Server Spigot', 25565, 'spigot', 'spigot.dirtcraft.gg', 'java -XX:+UseG1GC -XX:+UseFastAccessorMethods -XX:+OptimizeStringConcat -XX:MetaspaceSize=1024m -XX:MaxMetaspaceSize=2048m -XX:+AggressiveOpts -XX:MaxGCPauseMillis=10 -XX:+UseStringDeduplication -Xms4G -Xmx6G -XX:hashCode=5 -Dfile.encoding=UTF-8 -jar Thermos-1.7.10-1558-server.jar --log-strip-color', 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `discord` varchar(25) NOT NULL,
  `lastLoginUsername` varchar(32) NOT NULL,
  `lastLoginUUID` varchar(36) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `console` tinyint(1) NOT NULL DEFAULT '0',
  `ftp` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`discord`, `lastLoginUsername`, `lastLoginUUID`, `enabled`, `console`, `ftp`) VALUES
('155688380162637825', 'Tendollarsdeep', '087f0c8f70ed4d96bad46c4dc40aca2d', 1, 1, 1),
('177618988761743360', 'TechDweebGaming', '4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0', 1, 1, 1),
('8d57e5a0891b486f8dc33ed3c', '_Cin0x_', '330422856565653514', 1, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `nodes`
--
ALTER TABLE `nodes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `punishments`
--
ALTER TABLE `punishments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `server` (`server`);

--
-- Indexes for table `servers`
--
ALTER TABLE `servers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD UNIQUE KEY `domainIp` (`domainIp`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `nodeId` (`nodeId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`discord`),
  ADD UNIQUE KEY `lastLoginUUID` (`lastLoginUUID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `nodes`
--
ALTER TABLE `nodes`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `punishments`
--
ALTER TABLE `punishments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `servers`
--
ALTER TABLE `servers`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `punishments`
--
ALTER TABLE `punishments`
  ADD CONSTRAINT `punishments_ibfk_1` FOREIGN KEY (`server`) REFERENCES `servers` (`name`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `servers`
--
ALTER TABLE `servers`
  ADD CONSTRAINT `servers_ibfk_1` FOREIGN KEY (`nodeId`) REFERENCES `nodes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
