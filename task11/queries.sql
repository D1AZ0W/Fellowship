select * from Customers;
select * from Products;
select  from Orders;

select ProductName,Price from Products ORDER BY Price Desc;

SELECT p.ProductName,c.CategoryName FROM Products AS p JOIN Categories AS c ON p.CategoryID=c.CategoryID WHERE c.CategoryName='Electronics';
SELECT p.ProductName,c.CategoryName FROM Products AS p JOIN Categories AS c ON p.CategoryID=c.CategoryID WHERE c.CategoryName='Groceries';
SELECT p.ProductName,c.CategoryName FROM Products AS p JOIN Categories AS c ON p.CategoryID=c.CategoryID WHERE c.CategoryName='Books';

SELECT p.ProductName,c.CategoryName FROM Products AS p JOIN Categories AS c ON p.CategoryID=c.CategoryID;
SELECT p.ProductName,s.SupplierName FROM Products AS p JOIN Suppliers AS s ON p.CategoryID=s.SupplierID;

SELECT o.OrderID AS "Order",c.CustomerName AS "Customer" FROM Orders AS o JOIN Customers AS c ON o.CustomerID = c.CustomerID;
SELECT o.OrderID AS "Order",s.ShipperName AS "Shipper" FROM Orders AS o JOIN Shippers AS s ON o.ShipperID = s.ShipperID;

SELECT o.OrderID,p.ProductName,o.Quantity FROM OrderDetails AS o JOIN Products AS p ON o.ProductID = p.ProductID ORDER BY o.OrderID;

SELECT c.CategoryName,COUNT(p.ProductID) AS "No. of Products" FROM Categories AS c JOIN Products as p ON c.CategoryID=p.CategoryID
GROUP BY c.CategoryID,c.CategoryName;

SELECT c.CustomerName,SUM(p.Price * od.Quantity) AS "Sales" FROM Customers AS c
JOIN Orders AS o ON c.CustomerID = o.CustomerID
JOIN OrderDetails AS od ON o.OrderID = od.OrderID
JOIN Products AS p ON od.ProductID = p.ProductID
GROUP BY c.CustomerID, c.CustomerName;

SELECT p.ProductName,SUM(p.Price * od.Quantity) AS "Total Sales" FROM Products AS p 
JOIN OrderDetails AS od ON p.ProductID=od.ProductID
GROUP BY p.ProductID,p.ProductName
ORDER BY "Total Sales" DESC;

SELECT e.FirstName || ' ' || e.LastName AS "Employee Name",COUNT(o.OrderID) AS "Orders Handled" 
FROM Employees AS e JOIN Orders AS o ON e.EmployeeID = o.EmployeeID
GROUP BY e.EmployeeID, e.FirstName, e.LastName
ORDER BY "Orders Handled" DESC;

SELECT c.CustomerName FROM Customer AS c LEFT JOIN Order AS o ON c.CustomerID = o.CustomerID WHERE o.OrderID IS NULL;
SELECT p.ProductName FROM Products AS p LEFT JOIN OrderDetails AS od ON p.ProductID = od.ProductID WHERE od.OrderID IS NULL;

SELECT ProductName,SUM(Price) AS "Price" FROM Products 
WHERE Price>(
    SELECT AVG(Price)
    FROM Products
)
GROUP BY ProductID,ProductName;

SELECT c.CustomerName,COUNT(o.OrderID) AS "Number of Orders" FROM Customers AS c 
JOIN Orders AS o ON c.CustomerID = o.CustomerID 
GROUP BY c.CustomerID, c.CustomerName
HAVING COUNT(o.OrderID) > 1;

SELECT s.SupplierName,COUNT(p.ProductID) AS "Total Products" FROM Suppliers AS s
JOIN Products AS p ON s.SupplierID = p.SupplierID
GROUP BY s.SupplierID, s.SupplierName
ORDER BY "Total Products" DESC LIMIT 1;

SELECT c.CustomerName,o.OrderDate,p.ProductName,od.Quantity,p.Price AS "Unit Price",(p.Price * od.Quantity) AS "Line Total"
FROM Customers AS c 
JOIN Orders AS o ON c.CustomerID = o.CustomerID
JOIN OrderDetails AS od ON o.OrderID = od.OrderID
JOIN Products AS p ON od.ProductID = p.ProductID
ORDER BY o.OrderDate;