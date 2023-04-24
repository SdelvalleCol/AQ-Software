-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-04-2023 a las 06:44:20
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aq`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`` PROCEDURE `insertar_registro` (IN `cedula` INT(11), IN `tipo` INT(11), IN `vehiculo` VARCHAR(45))   Insert into entradas(personas_cedula,personas_tipo_id,ingreso,vehiculos_id	
) VALUES (cedula,tipo,DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s'),vehiculo)$$

CREATE DEFINER=`` PROCEDURE `insertar_registro_coche` (IN `matricula` VARCHAR(45), IN `ciudad` VARCHAR(45), IN `cedula` INT(11))   INSERT INTO vehiculos(placa,ciudad,personas_cedula) VALUES (matricula,ciudad,cedula)$$

CREATE DEFINER=`` PROCEDURE `insertar_usuario` (IN `cedula` INT(11), IN `nombre` VARCHAR(45), IN `edad` INT(11), IN `telefono` INT(11), IN `sexo` VARCHAR(45), IN `tipo` INT(1))   INSERT INTO personas (cedula,nombre,edad,telefono,sexo,tipo_id) values (cedula,nombre,edad,telefono,sexo,tipo)$$

--
-- Funciones
--
CREATE DEFINER=`` FUNCTION `obtener_registros` () RETURNS VARCHAR(4000) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN
    DECLARE json VARCHAR(4000);
    SELECT JSON_ARRAYAGG(
        JSON_OBJECT(
            'idingreso', idingreso,
            'personas_cedula', personas_cedula,
            'personas_tipo_id', personas_tipo_id,
            'ingreso', ingreso,
            'egreso', egreso,
            'vehiculos_id', vehiculos_id
        )
    ) INTO json FROM entradas;
    RETURN json;
END$$

CREATE DEFINER=`` FUNCTION `ver_usuario` (`cedula_x` INT(11)) RETURNS LONGTEXT CHARSET utf8mb4 COLLATE utf8mb4_bin  BEGIN
  DECLARE persona_id INT(11);
  DECLARE tipo_persona INT(11);
  SELECT cedula, tipo_id INTO persona_id, tipo_persona FROM personas WHERE cedula = cedula_x;
  RETURN JSON_OBJECT('persona_id', persona_id, 'tipo_persona', tipo_persona);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entradas`
--

CREATE TABLE `entradas` (
  `idingreso` int(45) NOT NULL,
  `personas_cedula` int(11) NOT NULL,
  `personas_tipo_id` int(11) NOT NULL,
  `ingreso` datetime NOT NULL,
  `egreso` datetime DEFAULT NULL,
  `vehiculos_id` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entradas`
--

INSERT INTO `entradas` (`idingreso`, `personas_cedula`, `personas_tipo_id`, `ingreso`, `egreso`, `vehiculos_id`) VALUES
(19, 1234567, 1, '2023-04-23 22:34:17', NULL, '0'),
(20, 1234567, 1, '2023-04-23 22:34:34', NULL, 'mx-23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `cedula` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `edad` int(11) NOT NULL,
  `telefono` int(11) NOT NULL,
  `sexo` varchar(45) NOT NULL,
  `tipo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`cedula`, `nombre`, `edad`, `telefono`, `sexo`, `tipo_id`) VALUES
(1234567, 'hola', 23, 3213, 'Femenino', 1),
(100523411, 'Angela', 29, 323213, 'Femenino', 1),
(100532341, 'Santiago', 20, 2147483647, 'Masculino', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo`
--

CREATE TABLE `tipo` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo`
--

INSERT INTO `tipo` (`id`, `descripcion`) VALUES
(0, 'residente'),
(1, 'visitante'),
(2, 'celador'),
(3, 'limpieza'),
(4, 'otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `id` int(11) NOT NULL,
  `placa` varchar(45) NOT NULL,
  `ciudad` varchar(45) NOT NULL,
  `personas_cedula` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`id`, `placa`, `ciudad`, `personas_cedula`) VALUES
(3, 'MXN-20', 'floridablanca', 100532341),
(4, 'MNX-SS', 'Bucaramanga', 100523411),
(5, 'BBO-332', 'Floridablanca', 100532341),
(6, 'mx-23', 'ss', 1234567);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `entradas`
--
ALTER TABLE `entradas`
  ADD PRIMARY KEY (`idingreso`,`personas_cedula`,`personas_tipo_id`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`cedula`,`tipo_id`);

--
-- Indices de la tabla `tipo`
--
ALTER TABLE `tipo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `entradas`
--
ALTER TABLE `entradas`
  MODIFY `idingreso` int(45) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
