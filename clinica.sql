-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: manto068_clinica
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.21.10.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `anamneses`
--

DROP TABLE IF EXISTS `anamneses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anamneses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) DEFAULT NULL,
  `atendimentos_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_anamneses_atendimentos1_idx` (`atendimentos_id`),
  CONSTRAINT `fk_anamneses_atendimentos1` FOREIGN KEY (`atendimentos_id`) REFERENCES `atendimentos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anamneses`
--

LOCK TABLES `anamneses` WRITE;
/*!40000 ALTER TABLE `anamneses` DISABLE KEYS */;
/*!40000 ALTER TABLE `anamneses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartamentos`
--

DROP TABLE IF EXISTS `apartamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` int DEFAULT NULL,
  `leitos` float NOT NULL DEFAULT '1',
  `situacao` varchar(45) NOT NULL DEFAULT 'Ativo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=234 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartamentos`
--

LOCK TABLES `apartamentos` WRITE;
/*!40000 ALTER TABLE `apartamentos` DISABLE KEYS */;
INSERT INTO `apartamentos` VALUES (102,102,1,'Ativo'),(103,103,1,'Ativo'),(104,104,1,'Ativo'),(105,105,1,'Ativo'),(106,106,1,'Ativo'),(107,107,1,'Ativo'),(108,108,1,'Ativo'),(109,109,1,'Ativo'),(110,110,1,'Ativo'),(111,111,1,'Ativo'),(112,112,1,'Ativo'),(113,113,1,'Ativo'),(114,114,1,'Ativo'),(115,115,1,'Ativo'),(116,116,1,'Ativo'),(117,117,1,'Ativo'),(118,118,1,'Ativo'),(119,119,1,'Ativo'),(120,120,1,'Ativo'),(201,201,1,'Ativo'),(202,202,1,'Ativo'),(203,203,1,'Ativo'),(204,204,1,'Ativo'),(205,205,1,'Ativo'),(206,206,1,'Ativo'),(207,207,1,'Ativo'),(208,208,1,'Ativo'),(209,209,1,'Ativo'),(210,210,1,'Ativo'),(211,NULL,1,'Ativo'),(212,NULL,1,'Ativo'),(213,NULL,1,'Ativo'),(214,NULL,1,'Ativo'),(215,NULL,1,'Ativo'),(216,NULL,1,'Ativo'),(217,NULL,1,'Ativo'),(218,NULL,1,'Ativo'),(219,NULL,1,'Ativo'),(220,NULL,1,'Ativo'),(221,NULL,1,'Ativo'),(222,NULL,1,'Ativo'),(223,NULL,1,'Ativo'),(224,NULL,1,'Ativo'),(225,NULL,1,'Ativo'),(226,NULL,1,'Ativo'),(227,NULL,1,'Ativo'),(228,NULL,1,'Ativo'),(229,NULL,1,'Ativo'),(230,NULL,1,'Ativo');
/*!40000 ALTER TABLE `apartamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atendimentos`
--

DROP TABLE IF EXISTS `atendimentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atendimentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pacientes_id` int NOT NULL,
  `profissionais_id` int DEFAULT NULL,
  `usuarios_id` int NOT NULL,
  `abertura` datetime DEFAULT CURRENT_TIMESTAMP,
  `fechamento` timestamp NULL DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL COMMENT 'aberto\nfechado',
  `recebido` varchar(45) DEFAULT NULL COMMENT 'sim\nnao',
  `registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `anamnese` varchar(245) DEFAULT NULL,
  `atestado` varchar(245) DEFAULT NULL,
  `receituario` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_atendimentos_1_idx` (`pacientes_id`),
  KEY `fk_atendimentos_2_idx` (`profissionais_id`),
  KEY `fk_atendimentos_6_idx` (`usuarios_id`),
  CONSTRAINT `fk_atendimentos_1` FOREIGN KEY (`pacientes_id`) REFERENCES `pacientes` (`id`),
  CONSTRAINT `fk_atendimentos_2` FOREIGN KEY (`profissionais_id`) REFERENCES `profissionais` (`id`),
  CONSTRAINT `fk_atendimentos_6` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atendimentos`
--

LOCK TABLES `atendimentos` WRITE;
/*!40000 ALTER TABLE `atendimentos` DISABLE KEYS */;
INSERT INTO `atendimentos` VALUES (5,3,NULL,1,'2022-03-21 01:25:30',NULL,'Aberto',NULL,'2022-03-21 04:25:30','','',''),(6,4,NULL,1,'2022-03-21 01:36:41',NULL,'Aberto',NULL,'2022-03-21 04:36:41','','',''),(7,1,NULL,1,'2022-03-21 21:43:58',NULL,'Aberto',NULL,'2022-03-22 00:43:58','','',''),(8,2,NULL,1,'2022-03-21 23:29:49',NULL,'Aberto',NULL,'2022-03-22 02:29:49','','','');
/*!40000 ALTER TABLE `atendimentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atendimentos_has_procedimentos`
--

DROP TABLE IF EXISTS `atendimentos_has_procedimentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atendimentos_has_procedimentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `atendimentos_id` int NOT NULL,
  `procedimentos_id` int NOT NULL,
  `quantidade` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_atendimentos_has_procedimentos_1_idx` (`procedimentos_id`),
  KEY `fk_atendimentos_has_procedimentos_2_idx` (`atendimentos_id`),
  CONSTRAINT `fk_atendimentos_has_procedimentos_1` FOREIGN KEY (`procedimentos_id`) REFERENCES `procedimentos` (`id`),
  CONSTRAINT `fk_atendimentos_has_procedimentos_2` FOREIGN KEY (`atendimentos_id`) REFERENCES `atendimentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atendimentos_has_procedimentos`
--

LOCK TABLES `atendimentos_has_procedimentos` WRITE;
/*!40000 ALTER TABLE `atendimentos_has_procedimentos` DISABLE KEYS */;
INSERT INTO `atendimentos_has_procedimentos` VALUES (5,7,1,'1'),(6,7,1,'1'),(7,7,2,'1'),(53,6,1,'1'),(54,6,1,'2'),(55,6,2,'1'),(67,5,2,'1'),(68,5,1,'1'),(69,5,2,'1'),(70,5,2,'1'),(71,5,2,'1'),(91,8,2,'1'),(92,8,1,'1');
/*!40000 ALTER TABLE `atendimentos_has_procedimentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atestados`
--

DROP TABLE IF EXISTS `atestados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atestados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `atendimentos_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_atestados_atendimentos1_idx` (`atendimentos_id`),
  CONSTRAINT `fk_atestados_atendimentos1` FOREIGN KEY (`atendimentos_id`) REFERENCES `atendimentos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atestados`
--

LOCK TABLES `atestados` WRITE;
/*!40000 ALTER TABLE `atestados` DISABLE KEYS */;
/*!40000 ALTER TABLE `atestados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cafes`
--

DROP TABLE IF EXISTS `cafes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cafes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuarios_id` int DEFAULT NULL,
  `hospedes` float DEFAULT NULL,
  `data` date DEFAULT NULL,
  `registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_cafes_usuarios1_idx` (`usuarios_id`),
  CONSTRAINT `fk_cafes_usuarios1` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cafes`
--

LOCK TABLES `cafes` WRITE;
/*!40000 ALTER TABLE `cafes` DISABLE KEYS */;
INSERT INTO `cafes` VALUES (23,1,50,'2021-05-09','2021-05-09 04:48:22'),(24,1,60,'2021-05-10','2021-05-09 04:55:32'),(25,1,80,'2021-05-11','2021-05-09 06:05:40'),(26,1,2,'2021-05-12','2021-05-11 04:48:38'),(27,1,2,'2021-05-13','2021-05-11 05:07:45'),(28,1,40,'2021-05-14','2021-05-11 05:22:40'),(32,1,1,'2021-05-15','2021-05-18 07:43:18'),(33,1,50,'2021-05-16','2021-05-18 08:08:11'),(34,1,23,'2021-05-17','2021-05-18 08:11:44'),(35,1,20,'2021-05-18','2021-05-18 08:15:03'),(36,1,20,'2021-05-19','2021-05-18 08:16:31'),(37,1,20,'2021-05-20','2021-05-20 20:13:22'),(48,1,1,'2021-06-07','2021-06-07 10:10:26');
/*!40000 ALTER TABLE `cafes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `cafesCusto_view`
--

DROP TABLE IF EXISTS `cafesCusto_view`;
/*!50001 DROP VIEW IF EXISTS `cafesCusto_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `cafesCusto_view` AS SELECT 
 1 AS `id`,
 1 AS `usuarios_id`,
 1 AS `hospedes`,
 1 AS `data`,
 1 AS `registro`,
 1 AS `quantidade_itens`,
 1 AS `custo`,
 1 AS `custo_hospede`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `cafesItens_view`
--

DROP TABLE IF EXISTS `cafesItens_view`;
/*!50001 DROP VIEW IF EXISTS `cafesItens_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `cafesItens_view` AS SELECT 
 1 AS `cafe_id`,
 1 AS `data`,
 1 AS `hospedes`,
 1 AS `usuarios_id`,
 1 AS `custo_cafe`,
 1 AS `quantidade`,
 1 AS `custo`,
 1 AS `id`,
 1 AS `nome`,
 1 AS `categoria`,
 1 AS `subcategoria`,
 1 AS `descricao`,
 1 AS `registro`,
 1 AS `unidade`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `cafesProdutos_view`
--

DROP TABLE IF EXISTS `cafesProdutos_view`;
/*!50001 DROP VIEW IF EXISTS `cafesProdutos_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `cafesProdutos_view` AS SELECT 
 1 AS `produtos_nome`,
 1 AS `produtos_unidade`,
 1 AS `estoque_minimo`,
 1 AS `cafeProdutos_quantidade`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `cafes_has_itens`
--

DROP TABLE IF EXISTS `cafes_has_itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cafes_has_itens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cafes_id` int NOT NULL,
  `itens_id` int NOT NULL,
  `quantidade` float DEFAULT NULL,
  `custo` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cafes_has_itens_cafes1_idx` (`cafes_id`),
  KEY `fk_cafes_has_itens_itens1_idx` (`itens_id`),
  CONSTRAINT `fk_cafes_has_itens_cafes1` FOREIGN KEY (`cafes_id`) REFERENCES `cafes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_cafes_has_itens_itens1` FOREIGN KEY (`itens_id`) REFERENCES `itens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cafes_has_itens`
--

LOCK TABLES `cafes_has_itens` WRITE;
/*!40000 ALTER TABLE `cafes_has_itens` DISABLE KEYS */;
INSERT INTO `cafes_has_itens` VALUES (63,23,241,1,60),(64,24,242,3,20),(65,24,241,2,60),(66,25,242,2,20),(67,25,243,3,305),(68,25,241,2,60),(69,26,241,1,56.75),(70,27,241,1,56.75),(71,28,241,5,56.75),(72,28,242,3,20),(73,28,243,10,288.75),(79,32,241,1,35.05),(80,33,241,5,33.81),(81,33,243,4,232.22),(82,33,242,3,20),(83,34,241,10,33.81),(84,35,241,2,33.81),(85,36,241,2,33.81),(86,36,243,2,232.22),(87,37,241,1,35.4),(88,37,243,1,205.21),(102,48,241,1,35.4);
/*!40000 ALTER TABLE `cafes_has_itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estoques`
--

DROP TABLE IF EXISTS `estoques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estoques` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `categoria` varchar(45) DEFAULT NULL,
  `subcategoria` varchar(45) DEFAULT NULL,
  `apartamentos_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_estoques_1_idx` (`apartamentos_id`),
  CONSTRAINT `fk_estoques_1` FOREIGN KEY (`apartamentos_id`) REFERENCES `apartamentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoques`
--

LOCK TABLES `estoques` WRITE;
/*!40000 ALTER TABLE `estoques` DISABLE KEYS */;
INSERT INTO `estoques` VALUES (1,'Produção','Café',NULL,NULL),(2,'Almoxerifado','Café',NULL,NULL),(3,'Rouparia','Rouparia',NULL,NULL),(4,'Recepção','Rouparia',NULL,NULL),(6,'Lavanderia','Rouparia',NULL,NULL),(11,'Ap 102','Rouparia','Apartamento',102),(12,'Ap 103','Rouparia','Apartamento',103),(13,'Ap 104','Rouparia','Apartamento',104),(14,'Ap 105','Rouparia','Apartamento',105),(15,'Ap 106','Rouparia','Apartamento',106),(16,'Ap 107','Rouparia','Apartamento',107),(17,'Ap 108','Rouparia','Apartamento',108),(18,'Ap 109','Rouparia','Apartamento',109),(19,'Ap 110','Rouparia','Apartamento',110),(20,'Ap 111','Rouparia','Apartamento',111),(21,'Ap 112','Rouparia','Apartamento',112),(22,'Ap 113','Rouparia','Apartamento',113),(23,'Ap 114','Rouparia','Apartamento',114),(24,'Ap 115','Rouparia','Apartamento',115),(25,'Ap 116','Rouparia','Apartamento',116),(26,'Ap 117','Rouparia','Apartamento',117),(27,'Ap 118','Rouparia','Apartamento',118),(28,'Ap 119','Rouparia','Apartamento',119),(29,'Ap 120','Rouparia','Apartamento',120),(30,'Ap 201','Rouparia','Apartamento',201),(31,'Ap 202','Rouparia','Apartamento',202),(32,'Ap 203','Rouparia','Apartamento',203),(33,'Ap 204','Rouparia','Apartamento',204),(34,'Ap 205','Rouparia','Apartamento',205),(35,'Ap 206','Rouparia','Apartamento',206),(36,'Ap 207','Rouparia','Apartamento',207),(37,'Ap 208','Rouparia','Apartamento',208),(38,'Ap 209','Rouparia','Apartamento',209),(39,'Ap 210','Rouparia','Apartamento',210),(40,'Ap 211','Rouparia','Apartamento',211),(41,'Ap 212','Rouparia','Apartamento',212),(42,'Ap 213','Rouparia','Apartamento',213),(43,'Ap 214','Rouparia','Apartamento',214),(44,'Ap 215','Rouparia','Apartamento',215),(45,'Ap 216','Rouparia','Apartamento',216),(46,'Ap 217','Rouparia','Apartamento',217),(47,'Ap 218','Rouparia','Apartamento',218),(48,'Ap 219','Rouparia','Apartamento',219),(49,'Ap 220','Rouparia','Apartamento',220),(50,'Ap 221','Rouparia','Apartamento',221),(51,'Ap 222','Rouparia','Apartamento',222),(52,'Ap 223','Rouparia','Apartamento',223),(53,'Ap 224','Rouparia','Apartamento',224),(54,'Ap 225','Rouparia','Apartamento',225),(55,'Ap 226','Rouparia','Apartamento',226),(56,'Ap 227','Rouparia','Apartamento',227),(57,'Ap 228','Rouparia','Apartamento',228),(58,'Ap 229','Rouparia','Apartamento',229),(59,'Ap 230','Rouparia','Apartamento',230);
/*!40000 ALTER TABLE `estoques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estoques_has_produtos`
--

DROP TABLE IF EXISTS `estoques_has_produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estoques_has_produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `estoques_id` int NOT NULL,
  `produtos_id` int NOT NULL,
  `quantidade` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_estoques_has_produtos_estoques1_idx` (`estoques_id`),
  KEY `fk_estoques_has_produtos_produtos1_idx` (`produtos_id`),
  CONSTRAINT `fk_estoques_has_produtos_estoques1` FOREIGN KEY (`estoques_id`) REFERENCES `estoques` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_estoques_has_produtos_produtos1` FOREIGN KEY (`produtos_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoques_has_produtos`
--

LOCK TABLES `estoques_has_produtos` WRITE;
/*!40000 ALTER TABLE `estoques_has_produtos` DISABLE KEYS */;
INSERT INTO `estoques_has_produtos` VALUES (17,2,78,240.541),(18,2,80,31),(19,2,81,111.09),(20,2,82,85),(21,2,83,60.56),(22,2,84,501),(23,2,79,20),(24,1,81,16.57),(25,1,83,37.66),(27,1,82,113),(28,1,84,72),(31,1,79,100),(32,1,80,2),(33,3,100,36),(34,3,99,58),(35,3,98,15),(36,3,97,73),(37,4,97,17),(39,4,98,21),(41,6,99,10),(42,4,100,3),(44,4,99,2),(45,6,98,1),(48,6,100,1),(51,11,97,15),(52,11,100,0),(53,11,98,8),(54,29,97,5),(55,3,104,10);
/*!40000 ALTER TABLE `estoques_has_produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itens`
--

DROP TABLE IF EXISTS `itens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `categoria` varchar(45) DEFAULT NULL,
  `subcategoria` varchar(45) DEFAULT NULL,
  `descricao` varchar(45) DEFAULT NULL,
  `registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `unidade` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=245 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itens`
--

LOCK TABLES `itens` WRITE;
/*!40000 ALTER TABLE `itens` DISABLE KEYS */;
INSERT INTO `itens` VALUES (241,'Bolo de Fubá',NULL,NULL,NULL,'2021-05-09 04:31:36','Un'),(242,'Queijo',NULL,NULL,NULL,'2021-05-09 04:54:55','Kg'),(243,'Bolo de Queijo',NULL,NULL,NULL,'2021-05-09 06:05:14','Un'),(244,'adasdsad',NULL,NULL,NULL,'2022-03-21 04:39:41','Un');
/*!40000 ALTER TABLE `itens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `itensCusto_view`
--

DROP TABLE IF EXISTS `itensCusto_view`;
/*!50001 DROP VIEW IF EXISTS `itensCusto_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `itensCusto_view` AS SELECT 
 1 AS `id`,
 1 AS `nome`,
 1 AS `categoria`,
 1 AS `subcategoria`,
 1 AS `descricao`,
 1 AS `registro`,
 1 AS `unidade`,
 1 AS `custo`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `itens_has_produtos`
--

DROP TABLE IF EXISTS `itens_has_produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itens_has_produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `produtos_id` int NOT NULL,
  `itens_id` int NOT NULL,
  `quantidade` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_itens_has_produtos_produtos_idx` (`produtos_id`),
  KEY `fk_itens_has_produtos_itens1_idx` (`itens_id`),
  CONSTRAINT `fk_itens_has_produtos_itens1` FOREIGN KEY (`itens_id`) REFERENCES `itens` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_itens_has_produtos_produtos` FOREIGN KEY (`produtos_id`) REFERENCES `produtos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=987 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itens_has_produtos`
--

LOCK TABLES `itens_has_produtos` WRITE;
/*!40000 ALTER TABLE `itens_has_produtos` DISABLE KEYS */;
INSERT INTO `itens_has_produtos` VALUES (976,82,242,1),(977,84,243,5),(978,81,243,6),(979,82,243,3),(982,84,241,1),(983,81,241,3),(985,79,244,1),(986,80,244,1);
/*!40000 ALTER TABLE `itens_has_produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimentacoes`
--

DROP TABLE IF EXISTS `movimentacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimentacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `produtos_id` int NOT NULL,
  `estoques_id` int NOT NULL,
  `cafes_id` int DEFAULT NULL,
  `usuarios_id` int NOT NULL,
  `data` date DEFAULT NULL,
  `operacao` varchar(45) DEFAULT NULL COMMENT 'Cafe da Manhã - Quando lança um cafe, operação do tipo saida - Origem - Estoque Produção\nCompras - Tipo sempre entrada - Destino - Estoque Almoxerifado \nTransferencia - Origem e Destino, Entrada e Saida recebe dois lançamentos ',
  `origem` varchar(45) DEFAULT '' COMMENT 'retirada manual (retirada feita pela tela de movimentação de estoque)\\\\\\\\\\\\\\\\nentrada manual (entra feita pela tela de movimentação de estoque)\\\\\\\\\\\\\\\\ncafe/sistema (saida pelo proprio sistema)\\\\\\\\\\\\\\\\n',
  `tipo` varchar(45) DEFAULT NULL COMMENT 'entrada ou saida',
  `quantidade` float DEFAULT NULL,
  `valor` float DEFAULT '0',
  `registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `observacao` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_movimentacoes_usuarios1_idx` (`usuarios_id`)
) ENGINE=InnoDB AUTO_INCREMENT=472 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimentacoes`
--

LOCK TABLES `movimentacoes` WRITE;
/*!40000 ALTER TABLE `movimentacoes` DISABLE KEYS */;
INSERT INTO `movimentacoes` VALUES (161,78,2,NULL,1,'2021-05-08','Compra','Compra','Entrada',0.02,0.02,'2021-05-09 00:13:06',''),(162,78,2,NULL,1,'2021-05-08','Compra','Compra','Entrada',0.01,0.01,'2021-05-09 00:14:06',''),(163,78,2,NULL,1,'2021-05-08','Compra','Compra','Entrada',0.01,0.01,'2021-05-09 00:15:40',''),(164,78,2,NULL,1,'2021-05-08','Compra','Compra','Entrada',20,20,'2021-05-09 00:15:50',''),(165,80,2,NULL,1,'2021-05-09','Compra','Compra','Entrada',30,10,'2021-05-09 04:18:04',''),(166,81,2,NULL,1,'2021-05-09','Compra','Compra','Entrada',30,10,'2021-05-09 04:22:10',''),(167,82,2,NULL,1,'2021-05-09','Compra','Compra','Entrada',30,20,'2021-05-09 04:27:50',''),(168,83,2,NULL,1,'2021-05-09','Compra','Compra','Entrada',50,35,'2021-05-09 04:28:59',''),(169,84,2,NULL,1,'2021-05-09','Compra','Compra','Entrada',50,15,'2021-05-09 04:30:27',''),(170,81,2,NULL,1,'2021-05-09','Compra','Compra','Entrada',30,20,'2021-05-09 04:32:49',''),(183,84,2,25,1,'2021-05-09','Café da Manhã','','Saida',6,0,'2021-05-09 07:48:58',NULL),(184,81,2,25,1,'2021-05-09','Café da Manhã','','Saida',9,0,'2021-05-09 07:48:58',NULL),(185,82,2,25,1,'2021-05-09','Café da Manhã','','Saida',8,0,'2021-05-09 07:48:58',NULL),(194,84,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',20,15,'2021-05-10 20:53:53',''),(195,84,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',20,15,'2021-05-10 20:55:34',''),(196,84,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',40,2,'2021-05-10 20:56:14',''),(199,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',20,5,'2021-05-10 23:50:31',''),(200,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',5.55,5.55,'2021-05-10 23:52:03',''),(201,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',5.55,0.55,'2021-05-10 23:52:48',''),(202,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',45.45,454.45,'2021-05-10 23:54:52',''),(203,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',1.22,1.21,'2021-05-10 23:56:21',''),(204,78,2,NULL,1,'2021-05-10','Manual','','Saida',20,0,'2021-05-11 00:25:34',''),(205,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',20,2,'2021-05-11 01:20:37',''),(206,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',8.88,8.88,'2021-05-11 01:21:00',''),(207,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',32.32,3.23,'2021-05-11 01:27:38',''),(208,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',12.12,1.11,'2021-05-11 01:30:49',''),(209,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',66.66,6.66,'2021-05-11 01:31:36',''),(210,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',0.11,0.11,'2021-05-11 01:31:51',''),(211,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',1.12,22.22,'2021-05-11 01:32:48',''),(212,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',0.02,0.02,'2021-05-11 01:33:29',''),(213,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',9.99,9.99,'2021-05-11 01:33:58',''),(215,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',0.01,0.01,'2021-05-11 01:34:44',''),(216,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',0.22,0.22,'2021-05-11 01:35:37',''),(217,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',5.55,5.55,'2021-05-11 01:35:45',''),(218,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',3.33,3.33,'2021-05-11 01:36:48',''),(219,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',1.212,1.21,'2021-05-11 02:10:59',''),(220,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',0.212,0.12,'2021-05-11 02:11:18',''),(221,78,2,NULL,1,'2021-05-10','Compra','Compra','Entrada',0.777,0.77,'2021-05-11 02:11:25',''),(222,84,2,27,1,'2021-05-11','Café da Manhã','','Saida',1,0,'2021-05-11 05:07:45',NULL),(223,81,2,27,1,'2021-05-11','Café da Manhã','','Saida',3,0,'2021-05-11 05:07:45',NULL),(225,84,2,28,1,'2021-05-11','Café da Manhã','','Saida',6,0,'2021-05-11 05:22:40',NULL),(226,81,2,28,1,'2021-05-11','Café da Manhã','','Saida',9,0,'2021-05-11 05:22:40',NULL),(227,82,2,28,1,'2021-05-11','Café da Manhã','','Saida',8,0,'2021-05-11 05:22:40',NULL),(228,79,2,NULL,1,'2021-05-11','Compra','Compra','Entrada',20,5,'2021-05-11 23:08:00',NULL),(229,81,2,NULL,1,'2021-05-12','Compra','','Entrada',66.66,6.66,'2021-05-12 04:07:47',NULL),(230,81,2,NULL,1,'2021-05-12','Compra','','Entrada',8.88,8.88,'2021-05-12 04:09:17',NULL),(231,81,2,NULL,1,'2021-05-12','Compra','','Entrada',0.55,7.87,'2021-05-12 04:16:14',NULL),(232,81,1,NULL,1,'2021-05-12','Compra','','Entrada',8.88,0.88,'2021-05-12 04:16:31',NULL),(233,81,1,NULL,1,'2021-05-12','Compra','','Entrada',5.55,5.45,'2021-05-12 04:17:50',NULL),(234,81,2,NULL,1,'2021-05-12','Manual','','Entrada',10,0,'2021-05-12 04:44:22',NULL),(235,81,1,NULL,1,'2021-05-12','Transferencia','','Entrada',1,0,'2021-05-12 04:45:08',NULL),(236,81,2,NULL,1,'2021-05-12','Transferencia','','Saida',1,0,'2021-05-12 04:45:08',NULL),(237,81,1,NULL,1,'2021-05-12','Transferencia','','Entrada',10,0,'2021-05-12 04:47:00',NULL),(238,81,2,NULL,1,'2021-05-12','Transferencia','','Saida',10,0,'2021-05-12 04:47:00',NULL),(239,83,2,NULL,1,'2021-05-17','Compra','','Entrada',20,20,'2021-05-17 07:15:20',NULL),(240,83,1,NULL,1,'2021-05-17','Transferencia','','Entrada',5,0,'2021-05-17 07:20:36',NULL),(241,83,2,NULL,1,'2021-05-17','Transferencia','','Saida',5,0,'2021-05-17 07:20:36',NULL),(242,83,1,NULL,1,'2021-05-17','Manual','','Saida',2,0,'2021-05-17 07:26:55',NULL),(243,83,2,NULL,1,'2021-05-17','Manual','','Entrada',5,0,'2021-05-17 07:27:08',NULL),(244,83,2,NULL,1,'2021-05-17','Compra','','Entrada',0.1,0,'2021-05-17 07:31:14',NULL),(245,83,2,NULL,1,'2021-05-17','Compra','','Entrada',0.32,0.23,'2021-05-17 07:32:35',NULL),(246,83,1,NULL,1,'2021-05-17','Transferencia','','Entrada',1.11,0,'2021-05-17 07:37:52',NULL),(247,83,2,NULL,1,'2021-05-17','Transferencia','','Saida',1.11,0,'2021-05-17 07:37:52',NULL),(248,83,2,NULL,1,'2021-05-17','Transferencia','','Entrada',0.11,0,'2021-05-17 07:46:44',NULL),(249,83,1,NULL,1,'2021-05-17','Transferencia','','Saida',0.11,0,'2021-05-17 07:46:44',NULL),(250,83,1,NULL,1,'2021-05-17','Transferencia','','Entrada',0.11,0,'2021-05-17 07:51:03',NULL),(251,83,2,NULL,1,'2021-05-17','Transferencia','','Saida',0.11,0,'2021-05-17 07:51:03',NULL),(252,83,1,NULL,1,'2021-05-17','Transferencia','','Entrada',1.11,0,'2021-05-17 08:09:03',NULL),(253,83,2,NULL,1,'2021-05-17','Transferencia','','Saida',1.11,0,'2021-05-17 08:09:03',NULL),(254,83,2,NULL,1,'2021-05-17','Compra','','Entrada',4.44,0.55,'2021-05-17 08:12:59',NULL),(255,83,2,NULL,1,'2021-05-17','Compra','','Entrada',0.01,0.01,'2021-05-17 08:28:07',NULL),(256,83,2,NULL,1,'2021-05-17','Compra','','Entrada',0.22,0.22,'2021-05-17 08:28:53',NULL),(257,83,2,NULL,1,'2021-05-17','Compra','','Entrada',0.11,0.11,'2021-05-17 08:34:30',NULL),(258,83,2,NULL,1,'2021-05-17','Compra','','Entrada',0.02,0.22,'2021-05-17 08:35:00',NULL),(259,83,1,NULL,1,'2021-05-17','Transferencia','','Entrada',0.11,0,'2021-05-17 08:35:13',NULL),(260,83,2,NULL,1,'2021-05-17','Transferencia','','Saida',0.11,0,'2021-05-17 08:35:13',NULL),(261,83,1,NULL,1,'2021-05-17','Transferencia','','Entrada',12.21,0,'2021-05-17 08:40:59',NULL),(262,83,2,NULL,1,'2021-05-17','Transferencia','','Saida',12.21,0,'2021-05-17 08:40:59',NULL),(263,83,1,NULL,1,'2021-05-17','Transferencia','','Entrada',0.12,0,'2021-05-17 08:41:48',NULL),(264,83,2,NULL,1,'2021-05-17','Transferencia','','Saida',0.12,0,'2021-05-17 08:41:48',NULL),(269,81,2,32,1,'2021-05-18','Café','','Saida',3,0,'2021-05-18 07:43:18',NULL),(271,84,2,NULL,1,'2021-05-18','Compra','','Entrada',10,2,'2021-05-18 07:47:59',NULL),(272,84,2,33,1,'2021-05-18','Café','','Saida',6,0,'2021-05-18 08:08:11',NULL),(273,81,2,33,1,'2021-05-18','Café','','Saida',9,0,'2021-05-18 08:08:11',NULL),(274,82,2,33,1,'2021-05-18','Café','','Saida',8,0,'2021-05-18 08:08:11',NULL),(275,84,1,34,1,'2021-05-18','Café','','Saida',1,0,'2021-05-18 08:11:44',NULL),(276,81,1,34,1,'2021-05-18','Café','','Saida',3,0,'2021-05-18 08:11:44',NULL),(278,84,1,35,1,'2021-05-18','Café','','Saida',1,0,'2021-05-18 08:15:03',NULL),(279,81,1,35,1,'2021-05-18','Café','','Saida',3,0,'2021-05-18 08:15:03',NULL),(281,84,1,36,1,'2021-05-18','Café','','Saida',6,0,'2021-05-18 08:16:31',NULL),(282,81,1,36,1,'2021-05-18','Café','','Saida',9,0,'2021-05-18 08:16:31',NULL),(283,82,1,36,1,'2021-05-18','Café','','Saida',7,0,'2021-05-18 08:16:31',NULL),(287,83,2,NULL,1,'2021-05-18','Compra','','Entrada',10,10,'2021-05-18 09:52:46',NULL),(288,83,2,NULL,1,'2021-05-18','Compra','','Entrada',10,1.11,'2021-05-18 09:53:47',NULL),(289,83,2,NULL,1,'2021-05-18','Manual','','Saida',20,0,'2021-05-18 09:54:03',NULL),(290,87,2,NULL,1,'2021-05-18','Compra','','Entrada',20,5,'2021-05-19 02:37:46',NULL),(291,82,2,NULL,1,'2021-05-19','Manual','','Entrada',10,0,'2021-05-19 07:15:38',NULL),(292,82,1,NULL,1,'2021-05-19','Transferencia','','Entrada',20,0,'2021-05-19 07:17:57',NULL),(293,82,2,NULL,1,'2021-05-19','Transferencia','','Saida',20,0,'2021-05-19 07:17:57',NULL),(294,82,1,NULL,1,'2021-05-19','Transferencia','','Entrada',5,0,'2021-05-19 07:19:30',NULL),(296,82,1,NULL,1,'2021-05-19','Transferencia','','Entrada',6,0,'2021-05-19 07:20:27',NULL),(297,82,2,NULL,1,'2021-05-19','Transferencia','','Saida',6,0,'2021-05-19 07:20:27',NULL),(298,82,1,NULL,1,'2021-05-19','Transferencia','','Entrada',3,0,'2021-05-19 07:25:03',NULL),(299,82,2,NULL,1,'2021-05-19','Transferencia','','Saida',3,0,'2021-05-19 07:25:03',NULL),(300,82,2,NULL,1,'2021-05-19','Compra','','Entrada',90,10,'2021-05-19 07:35:08',NULL),(301,84,1,NULL,1,'2021-05-19','Manual','','Saida',10,0,'2021-05-19 07:41:03',NULL),(302,84,1,NULL,1,'2021-05-19','Transferencia','','Entrada',500,0,'2021-05-19 08:18:11',NULL),(304,84,1,37,1,'2021-05-20','Café','','Saida',6,0,'2021-05-20 20:13:23',NULL),(305,81,1,37,1,'2021-05-20','Café','','Saida',9,0,'2021-05-20 20:13:23',NULL),(306,82,1,37,1,'2021-05-20','Café','','Saida',7,0,'2021-05-20 20:13:23',NULL),(307,86,2,NULL,1,'2021-05-20','Manual','','Entrada',10,0,'2021-05-21 00:25:54',NULL),(308,84,2,NULL,1,'2021-05-24','Manual','','Saida',1500,0,'2021-05-24 05:19:32',NULL),(310,84,2,NULL,1,'2021-05-24','Manual','','Entrada',50,0,'2021-05-24 11:44:04',NULL),(312,87,2,NULL,1,'2021-05-24','Manual','','Entrada',50,0,'2021-05-24 11:58:42',NULL),(313,86,2,NULL,1,'2021-05-24','Manual','','Entrada',18,0,'2021-05-24 11:59:26',NULL),(314,86,2,NULL,1,'2021-05-24','Manual','','Entrada',50,0,'2021-05-25 00:13:04',NULL),(324,79,1,NULL,1,'2021-05-25','Manual','','Entrada',50,0,'2021-05-25 03:59:53',NULL),(325,79,1,NULL,1,'2021-05-25','Manual','','Entrada',50,0,'2021-05-25 04:00:17',NULL),(326,80,1,NULL,1,'2021-05-26','Manual','','Entrada',3,0,'2021-05-26 05:10:05',NULL),(333,78,2,NULL,1,'2021-05-26','Compra','','Entrada',0.2,15,'2021-05-26 19:36:25',NULL),(334,100,3,NULL,1,'2021-05-28','Manual','','Entrada',50,0,'2021-05-28 13:05:16',NULL),(335,99,3,NULL,1,'2021-05-28','Manual','','Entrada',60,0,'2021-05-28 13:20:49',NULL),(336,98,3,NULL,1,'2021-05-28','Manual','','Entrada',45,0,'2021-05-28 13:21:17',NULL),(337,97,3,NULL,1,'2021-05-28','Manual','','Entrada',120,0,'2021-05-28 13:21:57',NULL),(339,97,4,NULL,1,'2021-05-28','Transferencia','','Entrada',10,0,'2021-05-28 14:10:32',NULL),(340,97,3,NULL,1,'2021-05-28','Transferencia','','Saida',10,0,'2021-05-28 14:10:32',NULL),(341,97,5,NULL,1,'2021-05-28','Transferencia','','Entrada',15,0,'2021-05-28 14:16:44',NULL),(342,97,3,NULL,1,'2021-05-28','Transferencia','','Saida',15,0,'2021-05-28 14:16:44',NULL),(343,97,4,NULL,1,'2021-05-28','Transferencia','','Entrada',5,0,'2021-05-28 14:18:35',NULL),(344,97,5,NULL,1,'2021-05-28','Transferencia','','Saida',5,0,'2021-05-28 14:18:36',NULL),(345,98,4,NULL,1,'2021-05-28','Transferencia','','Entrada',15,0,'2021-05-28 17:19:00',NULL),(346,98,3,NULL,1,'2021-05-28','Transferencia','','Saida',15,0,'2021-05-28 17:19:00',NULL),(347,99,5,NULL,1,'2021-05-31','Transferencia','','Entrada',15,0,'2021-05-31 05:24:44',NULL),(349,99,6,NULL,1,'2021-05-31','Transferencia','','Entrada',10,0,'2021-05-31 05:27:30',NULL),(351,100,4,NULL,1,'2021-05-31','Transferencia','','Entrada',5,0,'2021-05-31 06:08:56',NULL),(352,100,3,NULL,1,'2021-05-31','Transferencia','','Saida',5,0,'2021-05-31 06:08:56',NULL),(353,100,4,NULL,1,'2021-05-31','Transferencia','','Entrada',5,0,'2021-05-31 06:10:45',NULL),(354,100,3,NULL,1,'2021-05-31','Transferencia','','Saida',5,0,'2021-05-31 06:10:45',NULL),(355,100,4,NULL,1,'2021-05-31','Transferencia','','Entrada',5,0,'2021-05-31 06:11:10',NULL),(356,100,3,NULL,1,'2021-05-31','Transferencia','','Saida',5,0,'2021-05-31 06:11:10',NULL),(357,100,4,NULL,1,'2021-05-31','Transferencia','','Entrada',5,0,'2021-05-31 06:11:28',NULL),(358,100,3,NULL,1,'2021-05-31','Transferencia','','Saida',5,0,'2021-05-31 06:11:28',NULL),(359,100,4,NULL,1,'2021-05-31','Transferencia','','Entrada',5,0,'2021-05-31 06:13:25',NULL),(360,100,3,NULL,1,'2021-05-31','Transferencia','','Saida',5,0,'2021-05-31 06:13:25',NULL),(361,100,5,NULL,1,'2021-05-31','Transferencia','','Entrada',10,0,'2021-05-31 06:13:46',NULL),(362,100,3,NULL,1,'2021-05-31','Transferencia','','Saida',10,0,'2021-05-31 06:13:46',NULL),(363,100,3,NULL,1,'2021-05-31','Transferencia','','Entrada',25,0,'2021-05-31 06:18:36',NULL),(364,100,4,NULL,1,'2021-05-31','Transferencia','','Saida',25,0,'2021-05-31 06:18:36',NULL),(387,99,3,NULL,1,'2021-06-01','Transferencia','','Saida',2,0,'2021-06-02 02:39:09',NULL),(388,99,4,NULL,1,'2021-06-01','Transferencia','','Entrada',2,0,'2021-06-02 02:39:10',NULL),(389,100,3,NULL,1,'2021-06-01','Transferencia','','Saida',3,0,'2021-06-02 02:39:10',NULL),(390,100,4,NULL,1,'2021-06-01','Transferencia','','Entrada',3,0,'2021-06-02 02:39:10',NULL),(391,98,3,NULL,1,'2021-06-01','Transferencia','','Saida',1,0,'2021-06-02 02:42:50',NULL),(392,98,6,NULL,1,'2021-06-01','Transferencia','','Entrada',1,0,'2021-06-02 02:42:50',NULL),(393,97,3,NULL,1,'2021-06-01','Transferencia','','Saida',1,0,'2021-06-02 02:43:08',NULL),(394,97,4,NULL,1,'2021-06-01','Transferencia','','Entrada',1,0,'2021-06-02 02:43:08',NULL),(395,98,3,NULL,1,'2021-06-03','Transferencia','','Saida',5,0,'2021-06-03 16:00:48',NULL),(396,98,4,NULL,1,'2021-06-03','Transferencia','','Entrada',5,0,'2021-06-03 16:00:49',NULL),(397,98,3,NULL,1,'2021-06-03','Transferencia','','Saida',5,0,'2021-06-03 16:01:50',NULL),(398,98,4,NULL,1,'2021-06-03','Transferencia','','Entrada',5,0,'2021-06-03 16:01:50',NULL),(399,98,4,NULL,1,'2021-06-03','Transferencia','','Saida',5,0,'2021-06-03 16:03:43',NULL),(400,98,3,NULL,1,'2021-06-03','Transferencia','','Entrada',5,0,'2021-06-03 16:03:43',NULL),(401,97,3,NULL,1,'2021-06-03','Transferencia','','Saida',1,0,'2021-06-04 02:13:12',NULL),(402,97,4,NULL,1,'2021-06-03','Transferencia','','Entrada',1,0,'2021-06-04 02:13:13',NULL),(403,100,3,NULL,1,'2021-06-04','Transferencia','','Saida',1,0,'2021-06-04 18:25:49',NULL),(404,100,6,NULL,1,'2021-06-04','Transferencia','','Entrada',1,0,'2021-06-04 18:25:50',NULL),(406,97,3,NULL,1,'2021-06-05','Transferencia','','Saida',1,0,'2021-06-05 16:32:50',NULL),(407,97,11,NULL,1,'2021-06-05','Transferencia','','Entrada',1,0,'2021-06-05 16:32:50',NULL),(408,100,3,NULL,1,'2021-06-05','Transferencia','','Saida',1,0,'2021-06-05 16:32:50',NULL),(409,100,11,NULL,1,'2021-06-05','Transferencia','','Entrada',1,0,'2021-06-05 16:32:50',NULL),(410,97,3,NULL,1,'2021-06-05','Transferencia','','Saida',1,0,'2021-06-05 18:19:29',NULL),(411,97,11,NULL,1,'2021-06-05','Transferencia','','Entrada',1,0,'2021-06-05 18:19:29',NULL),(412,97,3,NULL,1,'2021-06-05','Transferencia','','Saida',1,0,'2021-06-05 18:34:02',NULL),(413,97,11,NULL,1,'2021-06-05','Transferencia','','Entrada',1,0,'2021-06-05 18:34:03',NULL),(414,97,3,NULL,1,'2021-06-05','Transferencia','','Saida',1,0,'2021-06-05 21:46:44',NULL),(415,97,11,NULL,1,'2021-06-05','Transferencia','','Entrada',1,0,'2021-06-05 21:46:44',NULL),(416,97,3,NULL,1,'2021-06-05','Transferencia','','Saida',1,0,'2021-06-05 21:46:50',NULL),(417,97,11,NULL,1,'2021-06-05','Transferencia','','Entrada',1,0,'2021-06-05 21:46:50',NULL),(418,97,3,NULL,1,'2021-06-05','Transferencia','','Saida',1,0,'2021-06-05 21:47:02',NULL),(419,97,11,NULL,1,'2021-06-05','Transferencia','','Entrada',1,0,'2021-06-05 21:47:02',NULL),(420,97,3,NULL,1,'2021-06-05','Transferencia','','Saida',1,0,'2021-06-05 21:47:07',NULL),(421,97,11,NULL,1,'2021-06-05','Transferencia','','Entrada',1,0,'2021-06-05 21:47:08',NULL),(422,97,3,NULL,1,'2021-06-05','Transferencia','','Saida',1,0,'2021-06-05 21:47:18',NULL),(423,97,11,NULL,1,'2021-06-05','Transferencia','','Entrada',1,0,'2021-06-05 21:47:18',NULL),(424,97,3,NULL,1,'2021-06-05','Transferencia','','Saida',1,0,'2021-06-05 21:47:42',NULL),(425,97,11,NULL,1,'2021-06-05','Transferencia','','Entrada',1,0,'2021-06-05 21:47:42',NULL),(426,97,3,NULL,1,'2021-06-05','Transferencia','','Saida',1,0,'2021-06-05 21:47:46',NULL),(427,97,11,NULL,1,'2021-06-05','Transferencia','','Entrada',1,0,'2021-06-05 21:47:46',NULL),(428,97,11,NULL,1,'2021-06-05','Transferencia','','Saida',1,0,'2021-06-05 21:48:02',NULL),(429,97,3,NULL,1,'2021-06-05','Transferencia','','Entrada',1,0,'2021-06-05 21:48:02',NULL),(430,97,11,NULL,1,'2021-06-05','Transferencia','','Saida',1,0,'2021-06-05 21:48:08',NULL),(431,97,3,NULL,1,'2021-06-05','Transferencia','','Entrada',1,0,'2021-06-05 21:48:09',NULL),(432,100,11,NULL,1,'2021-06-05','Transferencia','','Saida',1,0,'2021-06-05 21:48:47',NULL),(433,100,3,NULL,1,'2021-06-05','Transferencia','','Entrada',1,0,'2021-06-05 21:48:47',NULL),(434,98,11,NULL,1,'2021-06-05','Transferencia','','Saida',1,0,'2021-06-05 21:48:57',NULL),(435,98,3,NULL,1,'2021-06-05','Transferencia','','Entrada',1,0,'2021-06-05 21:48:58',NULL),(436,100,3,NULL,1,'2021-06-05','Transferencia','','Saida',1,0,'2021-06-05 21:49:33',NULL),(437,100,11,NULL,1,'2021-06-05','Transferencia','','Entrada',1,0,'2021-06-05 21:49:34',NULL),(438,97,3,NULL,1,'2021-06-06','Transferencia','','Saida',1,0,'2021-06-06 05:30:08',NULL),(439,97,11,NULL,1,'2021-06-06','Transferencia','','Entrada',1,0,'2021-06-06 05:30:08',NULL),(440,97,3,NULL,1,'2021-06-06','Transferencia','','Saida',1,0,'2021-06-06 05:30:34',NULL),(441,97,11,NULL,1,'2021-06-06','Transferencia','','Entrada',1,0,'2021-06-06 05:30:34',NULL),(442,97,3,NULL,1,'2021-06-06','Transferencia','','Saida',1,0,'2021-06-06 05:34:55',NULL),(443,97,11,NULL,1,'2021-06-06','Transferencia','','Entrada',1,0,'2021-06-06 05:34:55',NULL),(444,97,3,NULL,1,'2021-06-06','Transferencia','','Saida',1,0,'2021-06-06 05:36:10',NULL),(445,97,11,NULL,1,'2021-06-06','Transferencia','','Entrada',1,0,'2021-06-06 05:36:10',NULL),(446,97,3,NULL,1,'2021-06-06','Transferencia','','Saida',1,0,'2021-06-06 05:37:38',NULL),(447,97,11,NULL,1,'2021-06-06','Transferencia','','Entrada',1,0,'2021-06-06 05:37:38',NULL),(448,98,3,NULL,1,'2021-06-06','Transferencia','','Saida',10,0,'2021-06-06 05:38:02',NULL),(449,98,11,NULL,1,'2021-06-06','Transferencia','','Entrada',10,0,'2021-06-06 05:38:02',NULL),(450,97,3,NULL,1,'2021-06-06','Transferencia','','Saida',1,0,'2021-06-06 06:04:46',NULL),(451,97,11,NULL,1,'2021-06-06','Transferencia','','Entrada',1,0,'2021-06-06 06:04:46',NULL),(452,97,3,NULL,1,'2021-06-06','Transferencia','','Saida',1,0,'2021-06-06 06:06:37',NULL),(453,97,11,NULL,1,'2021-06-06','Transferencia','','Entrada',1,0,'2021-06-06 06:06:37',NULL),(454,100,11,NULL,1,'2021-06-06','Transferencia','','Saida',1,0,'2021-06-06 14:01:59',NULL),(455,100,3,NULL,1,'2021-06-06','Transferencia','','Entrada',1,0,'2021-06-06 14:02:00',NULL),(456,98,11,NULL,1,'2021-06-06','Transferencia','','Saida',1,0,'2021-06-06 14:02:00',NULL),(457,98,3,NULL,1,'2021-06-06','Transferencia','','Entrada',1,0,'2021-06-06 14:02:00',NULL),(458,97,11,NULL,1,'2021-06-06','Transferencia','','Saida',5,0,'2021-06-06 14:02:00',NULL),(459,97,3,NULL,1,'2021-06-06','Transferencia','','Entrada',5,0,'2021-06-06 14:02:00',NULL),(460,97,3,NULL,1,'2021-06-06','Transferencia','','Saida',5,0,'2021-06-06 19:57:45',NULL),(461,97,11,NULL,1,'2021-06-06','Transferencia','','Entrada',5,0,'2021-06-06 19:57:45',NULL),(462,97,3,NULL,1,'2021-06-06','Transferencia','','Saida',5,0,'2021-06-06 19:57:54',NULL),(463,97,29,NULL,1,'2021-06-06','Transferencia','','Entrada',5,0,'2021-06-06 19:57:54',NULL),(464,84,1,48,1,'2021-06-07','Café','','Saida',1,0,'2021-06-07 10:10:26',NULL),(465,81,1,48,1,'2021-06-07','Café','','Saida',3,0,'2021-06-07 10:10:26',NULL),(467,104,3,NULL,1,'2021-06-07','Manual','','Entrada',10,0,'2021-06-07 11:12:07',NULL),(468,98,3,NULL,1,'2021-06-07','Transferencia','','Saida',1,0,'2021-06-07 20:14:17',NULL),(469,98,4,NULL,1,'2021-06-07','Transferencia','','Entrada',1,0,'2021-06-07 20:14:18',NULL),(470,80,1,NULL,1,'2021-06-07','Transferencia','','Saida',1,0,'2021-06-08 00:30:59',NULL),(471,80,2,NULL,1,'2021-06-07','Transferencia','','Entrada',1,0,'2021-06-08 00:30:59',NULL);
/*!40000 ALTER TABLE `movimentacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacientes`
--

DROP TABLE IF EXISTS `pacientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pacientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `cpf` varchar(45) DEFAULT NULL,
  `rg` varchar(45) DEFAULT NULL,
  `sexo` varchar(45) DEFAULT NULL,
  `responsavel_nome` varchar(45) DEFAULT NULL,
  `endereco` varchar(45) DEFAULT NULL,
  `bairro` varchar(45) DEFAULT NULL,
  `numero` varchar(45) DEFAULT NULL,
  `celular` varchar(45) DEFAULT NULL,
  `situacao` varchar(45) DEFAULT NULL,
  `observacao` varchar(245) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacientes`
--

LOCK TABLES `pacientes` WRITE;
/*!40000 ALTER TABLE `pacientes` DISABLE KEYS */;
INSERT INTO `pacientes` VALUES (1,'Daiane Sampaio','1988-09-22','4234324324','','Mulher','Meire Sampaio','','','',NULL,'ativo',''),(2,'Teste ttasd','1988-09-22','','','Homem','','','','',NULL,'ativo',''),(3,'Samuel SIlva','1988-09-22','','','Homem','a','','','',NULL,'ativo',''),(4,'Pedro Cardoso','1988-09-22','','','Homem','ffdsf','','','',NULL,'ativo',''),(5,'Joana Pereira Lala ','1988-09-22','','','Mulher','','','','',NULL,'ativo','');
/*!40000 ALTER TABLE `pacientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procedimentos`
--

DROP TABLE IF EXISTS `procedimentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `procedimentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(240) DEFAULT NULL,
  `valor` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procedimentos`
--

LOCK TABLES `procedimentos` WRITE;
/*!40000 ALTER TABLE `procedimentos` DISABLE KEYS */;
INSERT INTO `procedimentos` VALUES (1,'Consulta Clínica',200),(2,'Aplicação de Soro',150),(3,'Sutura',180),(4,'Procedimento Teste 01',300),(5,'Procedimento Teste 02',100),(6,'Procedimento Teste 03',250);
/*!40000 ALTER TABLE `procedimentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `marca` varchar(45) DEFAULT NULL,
  `unidade` varchar(45) DEFAULT NULL,
  `estoque_minimo` float DEFAULT NULL,
  `estoque_maximo` float DEFAULT NULL,
  `situacao` varchar(45) DEFAULT NULL,
  `observacao` varchar(45) DEFAULT NULL,
  `categoria` varchar(45) DEFAULT NULL,
  `subcategoria` varchar(45) DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (78,'Pimenta','','Kg',0,NULL,'ativo','',NULL,NULL,'Cafe'),(79,'Salame','','Kg',0,NULL,'ativo','',NULL,NULL,'Cafe'),(80,'Farinha de Trigo','','Kg',0,NULL,'ativo','',NULL,NULL,'Cafe'),(81,'Ovo','','Un',0,NULL,'ativo','',NULL,NULL,'Cafe'),(82,'Queijo','','Kg',0,NULL,'ativo','',NULL,NULL,'Cafe'),(83,'Presunto','','Kg',0,NULL,'ativo','',NULL,NULL,'Cafe'),(84,'Leite','','L',0,NULL,'ativo','aa',NULL,NULL,'Cafe'),(85,'Requeijão','','Kg',0,NULL,'ativo','',NULL,NULL,'Cafe'),(94,'teste25','','L',0,NULL,'ativo','',NULL,NULL,'Rouparia'),(95,'teste26','','Kg',0,NULL,'ativo','',NULL,NULL,'Rouparia'),(96,'teste288','','Kg',0,NULL,'ativo','',NULL,NULL,'Rouparia'),(97,'Toalha de Rosto','','Un',0,NULL,'ativo','',NULL,NULL,'Rouparia'),(98,'Toalha de Banho','','Un',0,NULL,'ativo','',NULL,NULL,'Rouparia'),(99,'Piso','','Un',0,NULL,'ativo','',NULL,NULL,'Rouparia'),(100,'Lençol Casal','','Un',0,NULL,'ativo','',NULL,NULL,'Rouparia'),(104,'aaaaaaaaaaa','','Kg',0,NULL,'ativo','',NULL,NULL,'Rouparia'),(105,'bbbbb','','Un',0,NULL,'ativo','',NULL,NULL,'Cafe da Manha'),(106,'teste','','Kg',0,NULL,'ativo','',NULL,NULL,NULL);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `produtosCusto2_view`
--

DROP TABLE IF EXISTS `produtosCusto2_view`;
/*!50001 DROP VIEW IF EXISTS `produtosCusto2_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `produtosCusto2_view` AS SELECT 
 1 AS `id`,
 1 AS `nome`,
 1 AS `marca`,
 1 AS `unidade`,
 1 AS `estoque_minimo`,
 1 AS `estoque_maximo`,
 1 AS `situacao`,
 1 AS `observacao`,
 1 AS `categoria`,
 1 AS `subcategoria`,
 1 AS `tipo`,
 1 AS `custo`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `produtosCusto_view`
--

DROP TABLE IF EXISTS `produtosCusto_view`;
/*!50001 DROP VIEW IF EXISTS `produtosCusto_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `produtosCusto_view` AS SELECT 
 1 AS `id`,
 1 AS `nome`,
 1 AS `marca`,
 1 AS `unidade`,
 1 AS `estoque_minimo`,
 1 AS `estoque_maximo`,
 1 AS `situacao`,
 1 AS `observacao`,
 1 AS `categoria`,
 1 AS `subcategoria`,
 1 AS `tipo`,
 1 AS `custo`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `profissionais`
--

DROP TABLE IF EXISTS `profissionais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profissionais` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(250) DEFAULT NULL,
  `sexo` varchar(45) DEFAULT NULL,
  `cpf` varchar(45) DEFAULT NULL,
  `data_nascimento` varchar(45) DEFAULT NULL,
  `funcao` varchar(45) DEFAULT NULL,
  `numero_conselho` varchar(45) DEFAULT NULL,
  `rg` varchar(45) DEFAULT NULL,
  `endereco` varchar(45) DEFAULT NULL,
  `bairro` varchar(45) DEFAULT NULL,
  `numero` varchar(45) DEFAULT NULL,
  `situacao` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profissionais`
--

LOCK TABLES `profissionais` WRITE;
/*!40000 ALTER TABLE `profissionais` DISABLE KEYS */;
/*!40000 ALTER TABLE `profissionais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(45) DEFAULT NULL,
  `senha` varchar(45) DEFAULT NULL,
  `acesso` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'admin','admin','admin'),(3,'UALACE','1988','usuario'),(4,'GLORIA','3288','usuario'),(5,'teste','teste','usuario');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `cafesCusto_view`
--

/*!50001 DROP VIEW IF EXISTS `cafesCusto_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`admin`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `cafesCusto_view` AS select `cafes`.`id` AS `id`,`cafes`.`usuarios_id` AS `usuarios_id`,`cafes`.`hospedes` AS `hospedes`,`cafes`.`data` AS `data`,`cafes`.`registro` AS `registro`,count(`cafes`.`id`) AS `quantidade_itens`,sum((`cafes_has_itens`.`custo` * `cafes_has_itens`.`quantidade`)) AS `custo`,(sum((`cafes_has_itens`.`custo` * `cafes_has_itens`.`quantidade`)) / `cafes`.`hospedes`) AS `custo_hospede` from (`cafes` join `cafes_has_itens` on((`cafes`.`id` = `cafes_has_itens`.`cafes_id`))) group by `cafes`.`id` order by `cafes`.`id` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `cafesItens_view`
--

/*!50001 DROP VIEW IF EXISTS `cafesItens_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`admin`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `cafesItens_view` AS select `cafesCusto_view`.`id` AS `cafe_id`,`cafesCusto_view`.`data` AS `data`,`cafesCusto_view`.`hospedes` AS `hospedes`,`cafesCusto_view`.`usuarios_id` AS `usuarios_id`,`cafesCusto_view`.`custo` AS `custo_cafe`,`cafes_has_itens`.`quantidade` AS `quantidade`,`cafes_has_itens`.`custo` AS `custo`,`itens`.`id` AS `id`,`itens`.`nome` AS `nome`,`itens`.`categoria` AS `categoria`,`itens`.`subcategoria` AS `subcategoria`,`itens`.`descricao` AS `descricao`,`itens`.`registro` AS `registro`,`itens`.`unidade` AS `unidade` from ((`cafesCusto_view` join `cafes_has_itens` on((`cafesCusto_view`.`id` = `cafes_has_itens`.`cafes_id`))) join `itens` on((`itens`.`id` = `cafes_has_itens`.`itens_id`))) where (`cafesCusto_view`.`id` = 24) order by `cafesCusto_view`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `cafesProdutos_view`
--

/*!50001 DROP VIEW IF EXISTS `cafesProdutos_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`admin`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `cafesProdutos_view` AS select `produtos`.`nome` AS `produtos_nome`,`produtos`.`unidade` AS `produtos_unidade`,`produtos`.`estoque_minimo` AS `estoque_minimo`,sum((`itens_has_produtos`.`quantidade` * `cafes_has_itens`.`quantidade`)) AS `cafeProdutos_quantidade` from ((((`cafesCusto_view` join `cafes_has_itens` on((`cafesCusto_view`.`id` = `cafes_has_itens`.`cafes_id`))) join `itens` on((`itens`.`id` = `cafes_has_itens`.`itens_id`))) join `itens_has_produtos` on((`itens`.`id` = `itens_has_produtos`.`itens_id`))) join `produtos` on((`produtos`.`id` = `itens_has_produtos`.`produtos_id`))) group by `produtos`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `itensCusto_view`
--

/*!50001 DROP VIEW IF EXISTS `itensCusto_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`admin`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `itensCusto_view` AS select `itens`.`id` AS `id`,`itens`.`nome` AS `nome`,`itens`.`categoria` AS `categoria`,`itens`.`subcategoria` AS `subcategoria`,`itens`.`descricao` AS `descricao`,`itens`.`registro` AS `registro`,`itens`.`unidade` AS `unidade`,sum((`produtosCusto_view`.`custo` * `itens_has_produtos`.`quantidade`)) AS `custo` from ((`itens` join `itens_has_produtos` on((`itens`.`id` = `itens_has_produtos`.`itens_id`))) join `produtosCusto_view` on((`produtosCusto_view`.`id` = `itens_has_produtos`.`produtos_id`))) group by `itens`.`id` order by `itens`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `produtosCusto2_view`
--

/*!50001 DROP VIEW IF EXISTS `produtosCusto2_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`admin`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `produtosCusto2_view` AS select `produtos`.`id` AS `id`,`produtos`.`nome` AS `nome`,`produtos`.`marca` AS `marca`,`produtos`.`unidade` AS `unidade`,`produtos`.`estoque_minimo` AS `estoque_minimo`,`produtos`.`estoque_maximo` AS `estoque_maximo`,`produtos`.`situacao` AS `situacao`,`produtos`.`observacao` AS `observacao`,`produtos`.`categoria` AS `categoria`,`produtos`.`subcategoria` AS `subcategoria`,`produtos`.`tipo` AS `tipo`,avg(`movimentacoes`.`valor`) AS `custo` from (`produtos` join `movimentacoes` on((`produtos`.`id` = `movimentacoes`.`produtos_id`))) where (`movimentacoes`.`operacao` = 'compra') group by `produtos`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `produtosCusto_view`
--

/*!50001 DROP VIEW IF EXISTS `produtosCusto_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`admin`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `produtosCusto_view` AS select `produtos`.`id` AS `id`,`produtos`.`nome` AS `nome`,`produtos`.`marca` AS `marca`,`produtos`.`unidade` AS `unidade`,`produtos`.`estoque_minimo` AS `estoque_minimo`,`produtos`.`estoque_maximo` AS `estoque_maximo`,`produtos`.`situacao` AS `situacao`,`produtos`.`observacao` AS `observacao`,`produtos`.`categoria` AS `categoria`,`produtos`.`subcategoria` AS `subcategoria`,`produtos`.`tipo` AS `tipo`,avg(`movimentacoes`.`valor`) AS `custo` from (`produtos` join `movimentacoes` on((`produtos`.`id` = `movimentacoes`.`produtos_id`))) where (`movimentacoes`.`operacao` = 'compra') group by `produtos`.`id` order by `produtos`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-22  1:02:54
