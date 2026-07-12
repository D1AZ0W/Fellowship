INSERT INTO Customers(CustomerName, ContactName, Address, City, PostalCode, Country) VALUES
('Sharma Store', 'Rohit Sharma', 'Putalisadak', 'Kathmandu', '44600', 'Nepal'),
('Tech International', 'Alice Green', 'Lakeside', 'Pokhara', '33700', 'Nepal'),
('Everest Traders', 'Anil Kumar', 'New Road', 'Kathmandu', '44600', 'Nepal'),
('My Shop Collection', 'Ansh Shrestha', 'Bagbazar', 'Kathmandu', '44600', 'Nepal'),
('A1 Suppliers', 'Ramesh Lal', 'Main Road', 'Biratnagar', '56613', 'Nepal');

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
('Basmati Rice', 3, 1, '25 Kg Bag', 48.50),
('Wireless Mouse', 2, 2, 'Piece', 18.99),
('A4 Paper', 4, 3, 'Pack of 10', 6.75),
('Learning PostgreSQL', 4, 4, 'Book', 32.50),
('Study Desk', 5, 5, 'Piece', 210.00);

INSERT INTO Orders(CustomerID, EmployeeID, OrderDate, ShipperID) VALUES
(1, 2, '2026-07-02', 1),
(3, 1, '2026-07-04', 2),
(5, 4, '2026-07-05', 3),
(2, 5, '2026-07-07', 4),
(4, 3, '2026-07-09', 5);

INSERT INTO OrderDetails (OrderID, ProductID, Quantity) VALUES
(1, 2, 3),
(2, 1, 2),
(3, 5, 1),
(4, 4, 4),
(5, 3, 10);