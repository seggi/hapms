-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 04, 2021 at 08:24 PM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nk-hpas`
--

-- --------------------------------------------------------

--
-- Table structure for table `alembic_version`
--

CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `alembic_version`
--

INSERT INTO `alembic_version` (`version_num`) VALUES
('e49370349246');

-- --------------------------------------------------------

--
-- Table structure for table `nk_doctor_availability`
--

CREATE TABLE `nk_doctor_availability` (
  `id` int(11) NOT NULL,
  `appointment_date` date DEFAULT NULL,
  `appointment_time` varchar(20) DEFAULT NULL,
  `notice` text DEFAULT NULL,
  `patient` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `nk_received_request`
--

CREATE TABLE `nk_received_request` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  `appointment_time` varchar(20) DEFAULT NULL,
  `doctor` int(11) NOT NULL,
  `sent_date` datetime DEFAULT NULL,
  `contacte` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `onhold` tinyint(1) DEFAULT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `nk_register_doctor`
--

CREATE TABLE `nk_register_doctor` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `hospital` varchar(200) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  `passwordhash` varchar(500) NOT NULL,
  `actived` tinyint(1) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `function` varchar(200) DEFAULT NULL,
  `picture` varchar(500) DEFAULT NULL
) ;

-- --------------------------------------------------------

--
-- Table structure for table `nk_responsed_request`
--

CREATE TABLE `nk_responsed_request` (
  `id` int(11) NOT NULL,
  `patient` int(11) DEFAULT NULL,
  `doctor` int(11) NOT NULL,
  `sent_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alembic_version`
--
ALTER TABLE `alembic_version`
  ADD PRIMARY KEY (`version_num`);

--
-- Indexes for table `nk_doctor_availability`
--
ALTER TABLE `nk_doctor_availability`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient` (`patient`);

--
-- Indexes for table `nk_received_request`
--
ALTER TABLE `nk_received_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor` (`doctor`);

--
-- Indexes for table `nk_register_doctor`
--
ALTER TABLE `nk_register_doctor`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `passwordhash` (`passwordhash`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `nk_responsed_request`
--
ALTER TABLE `nk_responsed_request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor` (`doctor`),
  ADD KEY `patient` (`patient`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `nk_doctor_availability`
--
ALTER TABLE `nk_doctor_availability`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nk_received_request`
--
ALTER TABLE `nk_received_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nk_register_doctor`
--
ALTER TABLE `nk_register_doctor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nk_responsed_request`
--
ALTER TABLE `nk_responsed_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `nk_doctor_availability`
--
ALTER TABLE `nk_doctor_availability`
  ADD CONSTRAINT `nk_doctor_availability_ibfk_1` FOREIGN KEY (`patient`) REFERENCES `nk_received_request` (`id`);

--
-- Constraints for table `nk_received_request`
--
ALTER TABLE `nk_received_request`
  ADD CONSTRAINT `nk_received_request_ibfk_1` FOREIGN KEY (`doctor`) REFERENCES `nk_register_doctor` (`id`);

--
-- Constraints for table `nk_responsed_request`
--
ALTER TABLE `nk_responsed_request`
  ADD CONSTRAINT `nk_responsed_request_ibfk_1` FOREIGN KEY (`doctor`) REFERENCES `nk_register_doctor` (`id`),
  ADD CONSTRAINT `nk_responsed_request_ibfk_2` FOREIGN KEY (`patient`) REFERENCES `nk_received_request` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
