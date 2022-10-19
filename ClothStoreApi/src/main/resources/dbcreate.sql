--CREATE TABLE FOR CLOTHES
CREATE TABLE tb_cloth (
id_cloth int not null auto_increment,
description varchar(1000) not null,
name varchar(150) not null,
price decimal(10,2) not null,
type varchar(150) not null,
primary key (id_cloth)
);
--CREATE TABLE FOR CLOTH IMAGES
CREATE TABLE tb_cloth_image (
id_cloth_image int not null auto_increment,
id_cloth int not null,
image_url varchar(255) not null,
primary key (id_cloth_image),
foreign key (id_cloth) references tb_cloth(id_cloth) on delete cascade
);
--INSERT TEST CLOTHES
INSERT INTO tb_cloth (id_cloth, description, name, price, type) 
VALUES (null, "Description test", "Name test", 22.90, "Type test");
INSERT INTO tb_cloth (id_cloth, description, name, price, type) 
VALUES (null, "Description test", "Name test", 22.90, "Type test");
INSERT INTO tb_cloth (id_cloth, description, name, price, type) 
VALUES (null, "Description test", "Name test", 22.90, "Type test");
INSERT INTO tb_cloth (id_cloth, description, name, price, type) 
VALUES (null, "Description test", "Name test", 22.90, "Type test");
INSERT INTO tb_cloth (id_cloth, description, name, price, type) 
VALUES (null, "Description test", "Name test", 22.90, "Type test");
INSERT INTO tb_cloth (id_cloth, description, name, price, type) 
VALUES (null, "Description test", "Name test", 22.90, "Type test");
--INSERT TEST IMAGES (PATH REQUIRED)
INSERT INTO tb_cloth_image (id_cloth_image, id_cloth, image_url) 
VALUES (null, 1, "/cloth-images/image.jpg");
INSERT INTO tb_cloth_image (id_cloth_image, id_cloth, image_url) 
VALUES (null, 1, "/cloth-images/image.jpg");
INSERT INTO tb_cloth_image (id_cloth_image, id_cloth, image_url) 
VALUES (null, 2, "/cloth-images/image.jpg");
INSERT INTO tb_cloth_image (id_cloth_image, id_cloth, image_url) 
VALUES (null, 3, "/cloth-images/image.jpg");
INSERT INTO tb_cloth_image (id_cloth_image, id_cloth, image_url) 
VALUES (null, 4, "/cloth-images/image.jpg");
INSERT INTO tb_cloth_image (id_cloth_image, id_cloth, image_url) 
VALUES (null, 5, "/cloth-images/image.jpg");
INSERT INTO tb_cloth_image (id_cloth_image, id_cloth, image_url) 
VALUES (null, 6, "/cloth-images/image.jpg");