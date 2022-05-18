-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: mallsystem
-- ------------------------------------------------------
-- Server version	5.6.31-log

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
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods` (
  `gid` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `img` varchar(255) NOT NULL,
  `name` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  `sales` varchar(45) DEFAULT '0',
  `score` varchar(45) DEFAULT NULL,
  `parameter` varchar(255) NOT NULL,
  `introduction` varchar(255) NOT NULL,
  `stock` varchar(45) NOT NULL,
  PRIMARY KEY (`gid`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (8,'2','http://localhost:8888/1649777959436-goods9.jpg','大黄蜂','43.1','28','4','150mm * 100mm，塑料制品','塑料制品，但很结实，耐造','50'),(9,'3','http://localhost:8888/1649779138811-goods14.jpg','精美手机壳','23.6','78','4','适用于大部分机型，可定制。','采用XXXXX材质个性定制，品质优良','0'),(10,'1','http://localhost:8888/1649778023199-goods4.png','玻璃水杯','23.4','13','4','30cm * 8cm,无机玻璃','原材料是无机玻璃,无毒健康，品质优良','53'),(11,'1','http://localhost:8888/1649778050905-goods3.png','小音箱','98.1','33','4','13cm * 13cm 两个','高质量小音箱，一年保修','66'),(12,'4','http://localhost:8888/1649778096821-goods2.png','手表','76','17','5','机械电子表，搭载三星全新的 Exynos W920 芯片。','这表非常不错，与上代产品相比，该芯片的性能将显著提升。','57'),(13,'5','http://localhost:8888/1649778132309-goods5.png','键盘','43.5','35','4','96键客制键盘','纯手工制品，组装部件选用上等零件，一年保修','20'),(14,'5','http://localhost:8888/1649779060138-goods15.png','各种球','33.3','12','5','篮球 * 1，足球 * 1，橄榄球 * 1，乒乓球 * 3，棒球 * 2，网球 * 2，','球类大礼包，包含多种球','45'),(16,'0','http://localhost:8888/1649779173944-goods11.png','化妆品','500','21','5','面霜*1，洗面奶*1，身体乳*1，眼霜*1，防晒*1','护肤大礼包，超级划算','23'),(17,'0','http://localhost:8888/1649779241961-goods13.jpg','剃须刀','34.9','12','4','17','17','65'),(18,'0','http://localhost:8888/1649779273212-goods12.jpg','牛奶','50.3','17','4','230ml * 16','源自大自然，好喝到爆','12'),(21,'2','http://localhost:8888/1651395230493-goods16.png','耳机','366','23','5','轻质耳机300g,6000毫安大电池','轻质耳机300g,6000毫安大容量，好评如潮','88'),(22,'1','http://localhost:8888/1651937289821-goods17.png','桌游','66','0','4','好玩的桌游','与伙伴们来一场紧张刺激的桌游吧！','66'),(23,'1','http://localhost:8888/1649777841534-goods8.jpg','模型车','88.8','9','5','12345245','113524','55'),(24,'4','http://localhost:8888/1649777876722-goods6.png','木雕碗','36.6','34','4','43251312','154235123','12'),(25,'5','http://localhost:8888/1649777959436-goods9.jpg','模型车2','66.6','12','4','124315749','35131','23'),(26,'0','http://localhost:8888/1649777989583-goods7.png','台灯','35.5','11','4','98706','45562','54'),(27,'2','http://localhost:8888/1649778023199-goods4.png','玻璃水杯','23.3','23','4','15798','413275','86'),(28,'3','http://localhost:8888/1649778050905-goods3.png','小音响','77.9','13','3','1366906','314236589','12'),(29,'5','http://localhost:8888/1649778096821-goods2.png','手表','326','2','3','1231266','12453563','66'),(30,'3','http://localhost:8888/1649778132309-goods5.png','客制键盘','99.9','5','4','124315','75608','89'),(31,'3','http://localhost:8888/1649779060138-goods15.png','球礼包','222.28','8','3','124136','346680','32'),(32,'0','http://localhost:8888/1649779138811-goods14.jpg','定制手机壳','23.3','9','5','125367','64865','14'),(33,'5','http://localhost:8888/1649779173944-goods11.png','化妆品礼包','335.8','2','3','1255876','0=06569','45'),(34,'2','http://localhost:8888/1649779241961-goods13.jpg','剃须刀','99.9','2','4','126497870','4653423','78'),(35,'4','http://localhost:8888/1649779273212-goods12.jpg','山花牛奶','66.6','3','5','1243634','36578','66'),(39,'3','http://localhost:8888/1651654136977-goods1.png','小黄人2','1123','0','5','123123','123123123','33'),(40,'1','http://localhost:8888/1649777817985-goods1.png','小黄人模型','50.2','16','4','123123','12312312','19'),(41,'2','http://localhost:8888/1651973496643-goods3.png','123','123','0','5','12312','123','123');
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-18 15:51:43
