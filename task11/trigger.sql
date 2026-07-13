CREATE OR REPLACE FUNCTION check_quantity()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.Quantity <= 0 THEN
        RAISE EXCEPTION 'Quantity must be greater than zero.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER PreventInvalidQuantity
BEFORE INSERT OR UPDATE ON OrderDetails
FOR EACH ROW
EXECUTE FUNCTION check_quantity();

CREATE OR REPLACE FUNCTION validate_date()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.OrderDate > CURRENT_DATE THEN
        RAISE EXCEPTION 'Order date cannot be in the future.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ValidateOrderDate
BEFORE INSERT OR UPDATE
ON Orders
FOR EACH ROW
EXECUTE FUNCTION validate_date();

CREATE TABLE IF NOT EXISTS PriceHistory(
    HistoryID SERIAL PRIMARY KEY, 
    ProductID integer NOT NULL REFERENCES Products(ProductID),
    OldPrice NUMERIC(10,2),
    NewPrice NUMERIC(10,2),
    ChangeOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION track_price()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.Price != OLD.price THEN
        INSERT INTO PriceHistory (ProductID,OldPrice,NewPrice) VALUES (OLD.ProductID,OLD.Price,NEW.Price);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
    

CREATE TRIGGER PriceHistory
AFTER UPDATE
ON Products
FOR EACH ROW
EXECUTE FUNCTION track_price();
