create database User;
use User;
create table details(Slno INT AUTO_INCREMENT primary key, Full_name varchar(100), Email varchar(100), Password varchar(50), check(char_length(Password)>=8));
insert into details (Full_name, Email, Password) values('Justin Biju', '2024jb@gmail.com', '12345678');P
