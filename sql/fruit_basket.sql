create table fruit_basket ( 
  id serial not null primary key,
  fruit_name text, 
  quantity number, 
  price decimal (10,2)
);

INSERT INTO fruit_basket(fruit_name, quantity, price)VALUES ('Apple', 3, 2);
