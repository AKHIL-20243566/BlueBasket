create database User;
use User;
create table details(Slno INT AUTO_INCREMENT primary key, Full_name varchar(100), Email varchar(100), Password varchar(50), check(char_length(Password)>=8));
insert into details (Full_name, Email, Password) values('Justin Biju', '2024jb@gmail.com', '12345678');

create table itemdet(Item varchar(100), Model_name varchar(100) NOT NULL,Used ENUM('Yes','No'), category varchar(100), CurrentCondition varchar(100),
  year_of_purchase INT, Warranty ENUM('Yes','No'), Price_in_Rs INT, Status ENUM('In Stock','Out of Stock'), Contact_No BIGINT);
insert into itemdet values('Casio watch','G-SHOCK AWM-500','Yes','Electronics','Working','2020','Yes',40000,'In Stock',9344561792);

create table cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Email varchar NOT NULL,
    product_id INT NOT NULL,
    quantity INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);