-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 20. Mrz 2014 um 07:52
-- Server Version: 5.5.27
-- PHP-Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `test`
--

DELIMITER $$
--
-- Prozeduren
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `test_multi_sets`()
    DETERMINISTIC
begin
        select user() as first_col;
        select user() as first_col, now() as second_col;
        select user() as first_col, now() as second_col, now() as third_col;
        end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `dept`
--

CREATE TABLE IF NOT EXISTS `dept` (
  `deptno` int(11) NOT NULL,
  `location` varchar(100) NOT NULL,
  `dname` varchar(100) NOT NULL,
  PRIMARY KEY (`deptno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `dept`
--

INSERT INTO `dept` (`deptno`, `location`, `dname`) VALUES
(10, 'New York', 'Accounting'),
(30, 'Boston', 'Research'),
(40, 'Miami', 'Marketing'),
(50, 'San Diego', 'Headquarter');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `employee`
--

CREATE TABLE IF NOT EXISTS `employee` (
  `empno` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `job` varchar(100) NOT NULL,
  `salary` double NOT NULL,
  `comm` double NOT NULL,
  `deptno` int(11) NOT NULL,
  `sex` char(1) NOT NULL,
  PRIMARY KEY (`empno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `employee`
--

INSERT INTO `employee` (`empno`, `name`, `job`, `salary`, `comm`, `deptno`, `sex`) VALUES
(100, 'Wilson', 'Clrk', 1700, 0, 10, 'M'),
(101, 'Smith', 'Slsm', 2500, 1300, 40, 'F'),
(103, 'Reed', 'Anlt', 3500, 0, 30, 'M'),
(105, 'Watson', 'Mngr', 4500, 0, 30, 'M'),
(109, 'Allen', 'Mngr', 3800, 8000, 40, 'F'),
(110, 'Turner', 'Clrk', 1800, 0, 50, 'M');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
