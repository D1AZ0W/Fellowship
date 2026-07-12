CREATE TABLE Customers (
    CustomerID SERIAL PRIMARY KEY,
    CustomerName text NOT NULL,
    ContactName text,
    Address text,
    City text,
    PostalCode text,
    Country text
);

CREATE TABLE Employees (
    EmployeeID SERIAL PRIMARY KEY,
    LastName text NOT NULL,
    FirstName text NOT NULL,
    BirthDate DATE,
    Photo text,
    Notes text
);

CREATE TABLE Shippers (
    ShipperID SERIAL PRIMARY KEY,
    ShipperName text NOT NULL,
    Phone text
);

CREATE TABLE Suppliers (
    SupplierID SERIAL PRIMARY KEY,
    SupplierName text NOT NULL,
    ContactName text,
    Address text,
    City text,
    PostalCode text,
    Country text,
    Phone text
);

CREATE TABLE Categories (
    CategoryID SERIAL PRIMARY KEY,
    CategoryName text NOT NULL UNIQUE,
    Description text
);

CREATE TABLE Products (
    ProductID SERIAL PRIMARY KEY,
    ProductName text NOT NULL,
    SupplierID integer NOT NULL REFERENCES Suppliers (SupplierID),
    CategoryID integer NOT NULL REFERENCES Categories(CategoryID),
    Unit text,
    Price numeric(10,2) NOT NULL CHECK (Price >= 0)
);

CREATE TABLE Orders (
    OrderID SERIAL PRIMARY KEY,
    CustomerID integer NOT NULL REFERENCES Customers(CustomerID),
    EmployeeID integer NOT NULL REFERENCES Employees(EmployeeID),
    OrderDate DATE NOT NULL,
    ShipperID integer NOT NULL REFERENCES Shippers(ShipperID)
);

CREATE TABLE OrderDetails (
    OrderDetailID SERIAL PRIMARY KEY,
    OrderID integer NOT NULL REFERENCES Orders(OrderID),
    ProductID integer NOT NULL REFERENCES Products(ProductID),
    Quantity integer NOT NULL CHECK (Quantity > 0)
); 