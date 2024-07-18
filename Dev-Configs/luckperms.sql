-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2021 at 06:25 AM
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
-- Database: `luckperms`
--

-- --------------------------------------------------------

--
-- Table structure for table `luckperms_actions`
--

CREATE TABLE `luckperms_actions` (
  `id` int(11) NOT NULL,
  `time` bigint(20) NOT NULL,
  `actor_uuid` varchar(36) NOT NULL,
  `actor_name` varchar(100) NOT NULL,
  `type` char(1) NOT NULL,
  `acted_uuid` varchar(36) NOT NULL,
  `acted_name` varchar(36) NOT NULL,
  `action` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `luckperms_actions`
--

INSERT INTO `luckperms_actions` (`id`, `time`, `actor_uuid`, `actor_name`, `type`, `acted_uuid`, `acted_name`, `action`) VALUES
(1, 1578580048, '00000000-0000-0000-0000-000000000000', 'Console', 'G', 'null', 'admin', 'create'),
(2, 1578581250, '00000000-0000-0000-0000-000000000000', 'Console', 'U', '4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0', 'techdweebgaming', 'parent add admin'),
(3, 1578581264, '00000000-0000-0000-0000-000000000000', 'Console', 'G', 'null', 'owner', 'create'),
(4, 1578581275, '00000000-0000-0000-0000-000000000000', 'Console', 'U', '4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0', 'techdweebgaming', 'parent add owner server=sb2'),
(5, 1611768710, '00000000-0000-0000-0000-000000000000', 'Console@alpha', 'G', 'null', 'owner', 'permission set .* true'),
(6, 1611768754, '00000000-0000-0000-0000-000000000000', 'Console@alpha', 'U', 'd3402ae5-084a-3c8d-ab9e-a8466c05400c', 'techdweebgaming', 'parent add owner'),
(7, 1611769034, '00000000-0000-0000-0000-000000000000', 'Console@alpha', 'G', 'null', 'owner', 'permission set luckperms.* true'),
(8, 1611769074, '4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0', 'TechDweebGaming@alpha', 'G', 'null', 'owner', 'permission set * true'),
(9, 1611769080, '4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0', 'TechDweebGaming@alpha', 'G', 'null', 'owner', 'permission set * true server=0'),
(10, 1611769097, '4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0', 'TechDweebGaming@alpha', 'G', 'null', 'owner', 'permission set 0 true server=*'),
(11, 1611769104, '4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0', 'TechDweebGaming@alpha', 'G', 'null', 'owner', 'permission set *. true');

-- --------------------------------------------------------

--
-- Table structure for table `luckperms_groups`
--

CREATE TABLE `luckperms_groups` (
  `name` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `luckperms_groups`
--

INSERT INTO `luckperms_groups` (`name`) VALUES
('admin'),
('default'),
('helper'),
('manager'),
('mod'),
('owner');

-- --------------------------------------------------------

--
-- Table structure for table `luckperms_group_permissions`
--

CREATE TABLE `luckperms_group_permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(36) NOT NULL,
  `permission` varchar(200) NOT NULL,
  `value` tinyint(1) NOT NULL,
  `server` varchar(36) NOT NULL,
  `world` varchar(36) NOT NULL,
  `expiry` int(11) NOT NULL,
  `contexts` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `luckperms_group_permissions`
--

INSERT INTO `luckperms_group_permissions` (`id`, `name`, `permission`, `value`, `server`, `world`, `expiry`, `contexts`) VALUES
(1, 'owner', '.*', 1, 'global', 'global', 0, '{}'),
(2, 'owner', 'luckperms.*', 1, 'global', 'global', 0, '{}'),
(3, 'owner', '*', 1, 'global', 'global', 0, '{}'),
(4, 'owner', '*', 1, '0', 'global', 0, '{}'),
(5, 'owner', '0', 1, '*', 'global', 0, '{}'),
(6, 'owner', '*.', 1, 'global', 'global', 0, '{}');

-- --------------------------------------------------------

--
-- Table structure for table `luckperms_messenger`
--

CREATE TABLE `luckperms_messenger` (
  `id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `msg` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `luckperms_players`
--

CREATE TABLE `luckperms_players` (
  `uuid` varchar(36) NOT NULL,
  `username` varchar(16) NOT NULL,
  `primary_group` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `luckperms_players`
--

INSERT INTO `luckperms_players` (`uuid`, `username`, `primary_group`) VALUES
('4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0', 'techdweebgaming', 'default');

-- --------------------------------------------------------

--
-- Table structure for table `luckperms_tracks`
--

CREATE TABLE `luckperms_tracks` (
  `name` varchar(36) NOT NULL,
  `groups` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `luckperms_user_permissions`
--

CREATE TABLE `luckperms_user_permissions` (
  `id` int(11) NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `permission` varchar(200) NOT NULL,
  `value` tinyint(1) NOT NULL,
  `server` varchar(36) NOT NULL,
  `world` varchar(36) NOT NULL,
  `expiry` int(11) NOT NULL,
  `contexts` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `luckperms_user_permissions`
--

INSERT INTO `luckperms_user_permissions` (`id`, `uuid`, `permission`, `value`, `server`, `world`, `expiry`, `contexts`) VALUES
(1, '4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0', 'group.default', 1, 'global', 'global', 0, '{}'),
(2, '4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0', 'group.admin', 1, 'global', 'global', 0, '{}'),
(3, '4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0', 'group.owner', 1, 'alpha', 'global', 0, '{}');

-- --------------------------------------------------------

--
-- Table structure for table `pixelmon_actions`
--

CREATE TABLE `pixelmon_actions` (
  `id` int(11) NOT NULL,
  `time` bigint(20) NOT NULL,
  `actor_uuid` varchar(36) NOT NULL,
  `actor_name` varchar(100) NOT NULL,
  `type` char(1) NOT NULL,
  `acted_uuid` varchar(36) NOT NULL,
  `acted_name` varchar(36) NOT NULL,
  `action` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pixelmon_actions`
--

INSERT INTO `pixelmon_actions` (`id`, `time`, `actor_uuid`, `actor_name`, `type`, `acted_uuid`, `acted_name`, `action`) VALUES
(1, 1578580048, '00000000-0000-0000-0000-000000000000', 'Console', 'G', 'null', 'admin', 'create'),
(2, 1578581250, '00000000-0000-0000-0000-000000000000', 'Console', 'U', '4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0', 'techdweebgaming', 'parent add admin'),
(3, 1578581264, '00000000-0000-0000-0000-000000000000', 'Console', 'G', 'null', 'owner', 'create'),
(4, 1578581275, '00000000-0000-0000-0000-000000000000', 'Console', 'U', '4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0', 'techdweebgaming', 'parent add owner server=sb2');

-- --------------------------------------------------------

--
-- Table structure for table `pixelmon_groups`
--

CREATE TABLE `pixelmon_groups` (
  `name` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pixelmon_groups`
--

INSERT INTO `pixelmon_groups` (`name`) VALUES
('admin'),
('default'),
('helper'),
('manager'),
('mod'),
('owner');

-- --------------------------------------------------------

--
-- Table structure for table `pixelmon_group_permissions`
--

CREATE TABLE `pixelmon_group_permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(36) NOT NULL,
  `permission` varchar(200) NOT NULL,
  `value` tinyint(1) NOT NULL,
  `server` varchar(36) NOT NULL,
  `world` varchar(36) NOT NULL,
  `expiry` int(11) NOT NULL,
  `contexts` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pixelmon_messenger`
--

CREATE TABLE `pixelmon_messenger` (
  `id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `msg` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pixelmon_messenger`
--

INSERT INTO `pixelmon_messenger` (`id`, `time`, `msg`) VALUES
(3, '2020-01-09 14:47:44', '{\"id\":\"935df2de-c471-41da-acb0-e47779536c57\",\"type\":\"log\",\"content\":{\"timestamp\":1578581264,\"source\":{\"uniqueId\":\"00000000-0000-0000-0000-000000000000\",\"name\":\"Console\"},\"target\":{\"type\":\"GROUP\",\"name\":\"owner\"},\"description\":\"create\"}}'),
(4, '2020-01-09 14:47:55', '{\"id\":\"69b40719-e9fd-4b2d-9168-4ae0becd7a59\",\"type\":\"log\",\"content\":{\"timestamp\":1578581275,\"source\":{\"uniqueId\":\"00000000-0000-0000-0000-000000000000\",\"name\":\"Console\"},\"target\":{\"type\":\"USER\",\"uniqueId\":\"4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0\",\"name\":\"techdweebgaming\"},\"description\":\"parent add owner server=sb2\"}}'),
(5, '2020-01-09 14:47:55', '{\"id\":\"6b4abaf5-1781-4380-a3b2-948ea2e2d52b\",\"type\":\"userupdate\",\"content\":{\"userUuid\":\"4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `pixelmon_players`
--

CREATE TABLE `pixelmon_players` (
  `uuid` varchar(36) NOT NULL,
  `username` varchar(16) NOT NULL,
  `primary_group` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pixelmon_players`
--

INSERT INTO `pixelmon_players` (`uuid`, `username`, `primary_group`) VALUES
('4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0', 'techdweebgaming', 'default');

-- --------------------------------------------------------

--
-- Table structure for table `pixelmon_tracks`
--

CREATE TABLE `pixelmon_tracks` (
  `name` varchar(36) NOT NULL,
  `groups` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pixelmon_user_permissions`
--

CREATE TABLE `pixelmon_user_permissions` (
  `id` int(11) NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `permission` varchar(200) NOT NULL,
  `value` tinyint(1) NOT NULL,
  `server` varchar(36) NOT NULL,
  `world` varchar(36) NOT NULL,
  `expiry` int(11) NOT NULL,
  `contexts` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pixelmon_user_permissions`
--

INSERT INTO `pixelmon_user_permissions` (`id`, `uuid`, `permission`, `value`, `server`, `world`, `expiry`, `contexts`) VALUES
(1, '4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0', 'group.default', 1, 'global', 'global', 0, '{}'),
(2, '4ca02fdc-d046-4e8d-ba69-fe1c1e17b8e0', 'group.moderator', 1, 'global', 'global', 0, '{}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `luckperms_actions`
--
ALTER TABLE `luckperms_actions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `luckperms_groups`
--
ALTER TABLE `luckperms_groups`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `luckperms_group_permissions`
--
ALTER TABLE `luckperms_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `luckperms_group_permissions_name` (`name`);

--
-- Indexes for table `luckperms_messenger`
--
ALTER TABLE `luckperms_messenger`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `luckperms_players`
--
ALTER TABLE `luckperms_players`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `luckperms_players_username` (`username`);

--
-- Indexes for table `luckperms_tracks`
--
ALTER TABLE `luckperms_tracks`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `luckperms_user_permissions`
--
ALTER TABLE `luckperms_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `luckperms_user_permissions_uuid` (`uuid`);

--
-- Indexes for table `pixelmon_actions`
--
ALTER TABLE `pixelmon_actions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pixelmon_groups`
--
ALTER TABLE `pixelmon_groups`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `pixelmon_group_permissions`
--
ALTER TABLE `pixelmon_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pixelmon_group_permissions_name` (`name`);

--
-- Indexes for table `pixelmon_messenger`
--
ALTER TABLE `pixelmon_messenger`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pixelmon_players`
--
ALTER TABLE `pixelmon_players`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `pixelmon_players_username` (`username`);

--
-- Indexes for table `pixelmon_tracks`
--
ALTER TABLE `pixelmon_tracks`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `pixelmon_user_permissions`
--
ALTER TABLE `pixelmon_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pixelmon_user_permissions_uuid` (`uuid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `luckperms_actions`
--
ALTER TABLE `luckperms_actions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `luckperms_group_permissions`
--
ALTER TABLE `luckperms_group_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `luckperms_messenger`
--
ALTER TABLE `luckperms_messenger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `luckperms_user_permissions`
--
ALTER TABLE `luckperms_user_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pixelmon_actions`
--
ALTER TABLE `pixelmon_actions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pixelmon_group_permissions`
--
ALTER TABLE `pixelmon_group_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pixelmon_messenger`
--
ALTER TABLE `pixelmon_messenger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pixelmon_user_permissions`
--
ALTER TABLE `pixelmon_user_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
