-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hostiteľ: 127.0.0.1
-- Čas generovania: St 12.Jan 2022, 23:19
-- Verzia serveru: 10.4.21-MariaDB
-- Verzia PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáza: `test`
--

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `movies`
--

CREATE TABLE `movies` (
  `id` int(32) NOT NULL,
  `id_user` int(32) NOT NULL,
  `title` varchar(64) NOT NULL,
  `year` varchar(16) NOT NULL,
  `linkApi` varchar(64) NOT NULL,
  `type` varchar(16) NOT NULL,
  `poster` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `movies`
--

INSERT INTO `movies` (`id`, `id_user`, `title`, `year`, `linkApi`, `type`, `poster`) VALUES
(37, 5, 'The Simpsons Movie', '2007', 'tt0462538', 'movie', 'https://m.media-amazon.com/images/M/MV5BMTgxMDczMTA5N15BMl5BanBnXkFtZTcwMzk1MzMzMw@@._V1_SX300.jpg'),
(38, 5, 'Scary Movie', '2000', 'tt0175142', 'movie', 'https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.j'),
(63, 2, 'DDD TV Sunday Night Classic Movie', '2020–', 'tt12070960', 'series', 'https://m.media-amazon.com/images/M/MV5BNGU0OTM0NWItMzQ3ZC00Y2I0LWEwN2YtNzMwNzdlYzliNTY0XkEyXkFqcGdeQXVyOTI4NzcxNjY@._V1_SX300.j'),
(64, 18, 'The Lego Movie', '2014', 'tt1490017', 'movie', 'https://m.media-amazon.com/images/M/MV5BMTg4MDk1ODExN15BMl5BanBnXkFtZTgwNzIyNjg3MDE@._V1_SX300.jpg'),
(65, 2, 'El Camino: A Breaking Bad Movie', '2019', 'tt9243946', 'movie', 'https://m.media-amazon.com/images/M/MV5BNjk4MzVlM2UtZGM0ZC00M2M1LThkMWEtZjUyN2U2ZTc0NmM5XkEyXkFqcGdeQXVyOTAzMTc2MjA@._V1_SX300.j'),
(66, 2, 'Batman Begins', '2005', 'tt0372784', 'movie', 'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.j');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `movies_history`
--

CREATE TABLE `movies_history` (
  `id` int(32) NOT NULL,
  `id_user` int(32) NOT NULL,
  `title` varchar(64) NOT NULL,
  `linkApi` varchar(64) NOT NULL,
  `type` varchar(16) NOT NULL,
  `action` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `movies_history`
--

INSERT INTO `movies_history` (`id`, `id_user`, `title`, `linkApi`, `type`, `action`) VALUES
(1, 2, 'OMG: Oh My God!', 'tt2283748', 'movie', 'ADDED'),
(2, 2, 'OMG: Oh My God!', 'tt2283748', 'movie', 'ADDED'),
(3, 2, 'Batman Begins', 'tt0372784', 'movie', 'ADDED'),
(4, 2, 'Batman Begins', 'tt0372784', 'movie', 'ADDED'),
(5, 2, 'Batman Begins', 'tt0372784', 'movie', 'ADDED'),
(6, 2, 'Batman Begins', 'tt0372784', 'movie', 'REMOVED'),
(7, 2, 'Batman Begins', 'tt0372784', 'movie', 'ADDED'),
(8, 2, 'Batman Begins', 'tt0372784', 'movie', 'REMOVED'),
(9, 2, 'Batman v Superman: Dawn of Justice', 'tt2975590', 'movie', 'ADDED'),
(10, 2, 'The Lego Movie', 'tt1490017', 'movie', 'ADDED'),
(11, 2, 'DDD TV Sunday Night Classic Movie', 'tt12070960', 'series', 'ADDED'),
(12, 2, 'Batman v Superman: Dawn of Justice', 'tt2975590', 'movie', 'REMOVED'),
(13, 18, 'The Lego Movie', 'tt1490017', 'movie', 'ADDED'),
(14, 2, 'El Camino: A Breaking Bad Movie', 'tt9243946', 'movie', 'ADDED'),
(15, 2, 'The Lego Movie', 'tt1490017', 'movie', 'REMOVED'),
(16, 2, 'Batman Begins', 'tt0372784', 'movie', 'ADDED');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES
(2, 'dddd', '$2b$06$kxIZYfJzMrHjufr3oCzfSeW7BCmr3AW87ioqc0nGkqcZeyUIhYmCy', 'martin162000@gmail.com'),
(13, 'ddddd', '$2b$06$vQj07eBrE7nrnPGY2NI9..2lmufAJYljBFT0wUhdG4lXTtZXUFQoK', 'martin162000@gmail.com'),
(7, 'eeeeee', '$2b$06$Ng1zZqru9zQUC5M5275yY.7YbXqmiWK70cRDMYbc12D6zz2De8E7O', 'martin162000@gmail.comqqqq'),
(5, 'martin', '$2b$06$bpz/7mcQjqhUp7RGKKWdOOrNK7C80vQyOGA8erSKvwlWs2zFq0nAq', 'martin162000@gmail.com'),
(15, 'martin1', '$2b$06$FzWbnWgdeHc8nGNIlKNkWucU/gjdnukaoq7lt6ioa/.wLm1ok1u7y', 'martin@gmail.com'),
(9, 'martin123', '$2b$06$w8kMRNRynluNoZFeh3Grj.mvAcB2eyd2Pnf5IOUxRfU/WdA5X2OfS', 'dddddd0@gmail.com'),
(17, 'martinn', '$2b$06$wU/Fr2n.N4vXjuA2ZRjPoeT7phzStXIqzr8cTTPO1rwoZhpyp2gxS', 'martin162000@gmail.com'),
(4, 'qqqq', '$2b$06$ZXRf1A83m2L7ECT/Xtmi4Op/bWLcI56DpiD5w.oa.R9gXvcBRIYla', 'martin162000@gmail.com'),
(18, 'test', '$2b$06$s5gSC8hT.QCFgWooaj1Diu4JCOwzwxlrwPBLgmDy4WsF9efzqfZga', 'martin162000@gmail.com'),
(12, 'tttt', '$2b$06$sKB5nKxigeaUZFlTg1sC/.WPyv2Bm.6cGkMT/8GyPBpi37kb805/W', 'martin162000@gmail.com'),
(6, 'wwww', '$2b$06$KJW6ZGBHyyk2S29dv/CvNuw3CE05gr2Agot7lqV2bmW4Jc1a65Ydi', 'martin162000@gmail.com'),
(1, 'wwwwwwww', '$2b$06$T9EYnbBuzX6vnKOUkOlgROdT1Cpzz8VUh/XyIXP1uuyYzqe6jNrra', 'martin162000@gmail.com');

-- --------------------------------------------------------

--
-- Štruktúra tabuľky pre tabuľku `users_history`
--

CREATE TABLE `users_history` (
  `id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `action` varchar(32) NOT NULL,
  `date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Sťahujem dáta pre tabuľku `users_history`
--

INSERT INTO `users_history` (`id`, `username`, `action`, `date`) VALUES
(1, 'dddd', 'changeEmail', '2022-01-12 19:05:13.469000'),
(2, 'dddd', 'changeEmail', '2022-01-12 19:06:10.590000'),
(3, 'dddd', 'changeEmail', '2022-01-12 19:08:12.294000'),
(4, 'dddd', 'changeEmail', '2022-01-12 19:08:53.172000'),
(5, 'dddd', 'changeEmail', '2022-01-12 19:08:55.381000'),
(6, 'dddd', 'changeEmail', '2022-01-12 19:08:57.168000'),
(7, 'dddd', 'changeEmail', '2022-01-12 19:09:23.938000'),
(8, 'dddd', 'changeEmail', '2022-01-12 19:09:25.833000'),
(9, 'dddd', 'changeEmail', '2022-01-12 19:09:35.752000'),
(10, 'dddd', 'changeEmail', '2022-01-12 19:09:39.812000'),
(11, 'dddd', 'changeEmail', '2022-01-12 19:10:46.183000'),
(12, 'dddd', 'changeEmail', '2022-01-12 19:10:55.887000'),
(13, 'dddd', 'changeEmail', '2022-01-12 19:19:44.996000'),
(14, 'dddd', 'changeEmail', '2022-01-12 20:58:57.119000'),
(15, 'dddd', 'changeEmail', '2022-01-12 22:10:30.993000'),
(16, 'dddd', 'changeEmail', '2022-01-12 22:27:06.747000'),
(17, 'dddd', 'changeEmail', '2022-01-12 22:28:49.007000'),
(18, 'dddd', 'changeEmail', '2022-01-12 22:31:56.272000'),
(19, 'dddd', 'changeEmail', '2022-01-12 22:32:00.466000'),
(20, 'dddd', 'changeEmail', '2022-01-12 22:32:03.329000'),
(21, 'dddd', 'changeEmail', '2022-01-12 22:34:13.650000'),
(22, 'test', 'changeEmail', '2022-01-12 22:34:37.420000'),
(23, 'test', 'changePassword', '2022-01-12 22:34:43.755000'),
(24, 'test', 'changeEmail', '2022-01-12 22:34:48.744000'),
(25, 'test', 'changePassword', '2022-01-12 22:34:51.881000'),
(26, 'test', 'changePassword', '2022-01-12 22:34:56.804000'),
(27, 'test', 'changePassword', '2022-01-12 22:35:01.136000'),
(28, 'test', 'changeEmail', '2022-01-12 22:35:03.798000'),
(29, 'dddd', 'changeEmail', '2022-01-12 22:41:16.972000'),
(30, 'dddd', 'changeEmail', '2022-01-12 22:41:27.729000');

--
-- Kľúče pre exportované tabuľky
--

--
-- Indexy pre tabuľku `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pre tabuľku `movies_history`
--
ALTER TABLE `movies_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pre tabuľku `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexy pre tabuľku `users_history`
--
ALTER TABLE `users_history`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT pre exportované tabuľky
--

--
-- AUTO_INCREMENT pre tabuľku `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT pre tabuľku `movies_history`
--
ALTER TABLE `movies_history`
  MODIFY `id` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pre tabuľku `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pre tabuľku `users_history`
--
ALTER TABLE `users_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
