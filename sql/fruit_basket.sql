create table fruit_basket ( 
  id serial not null primary key,
  fruit_name text not null, 
  quantity int not null, 
  price decimal (10,2) not null
);

INSERT INTO fruit_basket(fruit_name, quantity, price)VALUES ('Apple', 3, 2);
