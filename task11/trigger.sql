CREATE FUNCTION check_quantity()
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

CREATE FUNCTION validate_date()
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