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
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `oid` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(45) NOT NULL,
  `detail` varchar(255) NOT NULL,
  `price` varchar(45) NOT NULL,
  `address` varchar(80) NOT NULL,
  `time` varchar(45) NOT NULL,
  `type` varchar(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (4,'666','商品5×3','50.70￥','测试地址','2022/4/4','1'),(6,'123','商品6×1,商品8×3','179.60￥','测试地址','2022/4/7','1'),(7,'123','商品6×6,商品8×7','603.50￥','测试地址','2022/4/7','1'),(13,'123','化妆品礼包×1,剃须刀×2,山花牛奶×3','735.40￥','测试地址','2022/4/26','1'),(14,'123','模型车×1,小黄人模型×1,定制手机壳×9','348.70￥','测试地址','2022/4/30','1'),(16,'123','精美手机壳×10','236.00￥','测试地址','2022/5/2','0'),(17,'123','蓝色模型车×1,精美手机壳×8','239.10￥','测试地址','2022/5/2','0'),(21,'123','精美手机壳×2,键盘×3','177.70￥','测试测试地址','2022/5/6','0'),(24,'123','木雕饰品×1,精美手机壳×3','96.60￥','测试测试地址','2022/5/7','2'),(25,'123','大黄蜂×1,精美手机壳×2','90.30￥','测试测试地址','2022/5/7','0'),(26,'123','大黄蜂×1,精美手机壳×3','113.90￥','测试测试地址','2022/5/8','0');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
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
