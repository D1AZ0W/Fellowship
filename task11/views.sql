CREATE VIEW CreateOrderSummary AS SELECT c.CustomerID,c.CustomerName,COUNT(o.OrderID) AS TotalOrders
FROM Customers AS c
LEFT JOIN Orders AS o ON c.CustomerID = o.CustomerID
GROUP BY c.CustomerID, c.CustomerName
ORDER BY c.CustomerID;

CREATE VIEW ProductCatalog AS SELECT p.ProductId,p.ProductName,c.CategoryName,s.SupplierName,p.Price
FROM Products AS p JOIN Categories AS c ON p.CategoryID = c.CategoryID
JOIN Suppliers AS s ON p.SupplierID = s.SupplierID
GROUP BY p.ProductId,p.ProductName,c.CategoryName,s.SupplierName,p.Price;