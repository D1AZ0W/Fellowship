INSERT INTO Customers(CustomerName, ContactName, Address, City, PostalCode, Country) VALUES
('Sharma Store', 'Rohit Sharma', 'Putalisadak', 'Kathmandu', '44600', 'Nepal'),
('Tech International', 'Alice Green', 'Lakeside', 'Pokhara', '33700', 'Nepal'),
('Everest Traders', 'Anil Kumar', 'New Road', 'Kathmandu', '44600', 'Nepal'),
('My Shop Collection', 'Ansh Shrestha', 'Bagbazar', 'Kathmandu', '44600', 'Nepal'),
('A1 Suppliers', 'Ramesh Lal', 'Main Road', 'Biratnagar', '56613', 'Nepal'),
('Mountain Mart', 'Sita Rai', 'Dharan', 'Sunsari', '56700', 'Nepal'),
('Valley Bazaar', 'Kiran Thapa', 'Jawalakhel', 'Lalitpur', '44700', 'Nepal'),
('Pokhara Traders', 'Bikash KC', 'Mahendrapool', 'Pokhara', '33700', 'Nepal');

INSERT INTO Employees(LastName, FirstName, BirthDate, Photo, Notes) VALUES
('Shrestha', 'Anil', '1992-04-15', 'anil.jpg', 'Sales Executive'),
('Adhikari', 'Suman', '1988-11-23', 'suman.jpg', 'Warehouse Manager'),
('Shah', 'Priya', '1995-07-09', 'priya.jpg', 'Customer Support'),
('Singh', 'Aman', '1990-02-18', 'aman.jpg', 'Sales Representative'),
('Karmacharya', 'Kunal', '1986-09-30', 'emily.jpg', 'Operations Manager');

INSERT INTO Shippers(ShipperName, Phone) VALUES
('Express Logistics', '+977-1-4212345'),
('Quick Delivery', '+91-9876543210'),
('Global Freight', '+1-800-555-0123'),
('Swift Cargo', '+81-1234-5678'),
('Sky Express', '+91-987654322');

INSERT INTO Suppliers(SupplierName, ContactName, Address, City, PostalCode, Country, Phone) VALUES
('Kathmandu Wholesale', 'Suresh Gautam', 'Kalimati', 'Kathmandu', '44600', 'Nepal', '+977-9801234567'),
('Digital Hub', 'Nisha Sharma', 'Durbar Marg', 'Kathmandu', '44600', 'Nepal', '+977-9812345678'),
('Agro Harvest Pvt. Ltd.', 'Ramesh Thapa', 'Bharatpur', 'Chitwan', '44200', 'Nepal', '+977-9851122334'),
('Book World Distributors', 'Aarav Mehta', 'Connaught Place', 'New Delhi', '110001', 'India', '+91-9876501234'),
('Office Essentials', 'Yuki Sato', 'Shinjuku', 'Tokyo', '1600022', 'Japan', '+81-3-4567-8901');

INSERT INTO Categories(CategoryName, Description) VALUES
('Groceries', 'Daily household food items'),
('Electronics', 'Electronic gadgets and accessories'),
('Stationery', 'Office and school supplies'),
('Books', 'Educational and recreational books'),
('Furniture', 'Home and office furniture');

INSERT INTO Products(ProductName, SupplierID, CategoryID, Unit, Price) VALUES
('Basmati Rice',3,1,'25 Kg Bag',48.50),
('Cooking Oil',3,1,'5 Liter',18.00),
('Wireless Mouse',2,2,'Piece',18.99),
('Mechanical Keyboard',2,2,'Piece',55.00),
('USB Flash Drive',2,2,'32 GB',12.50),
('A4 Paper',4,3,'Pack of 10',6.75),
('Notebook',4,3,'Piece',2.50),
('Learning PostgreSQL',4,4,'Book',32.50),
('Study Desk',5,5,'Piece',210.00),
('Office Chair',5,5,'Piece',150.00);

INSERT INTO Orders(CustomerID,EmployeeID,OrderDate,ShipperID) VALUES
(1,2,'2026-07-02',1),
(1,2,'2026-07-08',3),
(2,5,'2026-07-03',2),
(3,1,'2026-07-04',2),
(3,1,'2026-07-10',1),
(4,3,'2026-07-05',4),
(5,4,'2026-07-06',5),
(5,4,'2026-07-12',5),
(7,2,'2026-07-15',3);

INSERT INTO OrderDetails(OrderID,ProductID,Quantity) VALUES
(1,3,2),
(1,6,5),
(2,4,1),
(3,1,3),
(3,2,2),
(4,8,1),
(5,3,4),
(5,9,1),
(6,7,10),
(7,10,2),
(8,1,1),
(8,4,2),
(9,6,3);