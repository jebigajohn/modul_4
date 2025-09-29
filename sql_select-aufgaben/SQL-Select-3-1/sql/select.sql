-- # Tabelle Customers:
-- Zeige alle Länder an, die mehr als fünf Kunden haben
SELECT Country, COUNT(*)  
FROM Customers
GROUP BY Country
HAVING COUNT(*) >= 5;

-- # Tabelle Orders:
-- Zeige alle Bestellungen im August 1996 an
SELECT * FROM Orders
WHERE OrderDate LIKE "%8/__/1996%";
-- Zeige alle CustomerIds, die mehr als eine Bestellung getätigt haben
SELECT CustomerID,
COUNT(*) FROM Orders
GROUP BY CustomerID
HAVING COUNT(*) > 1;
-- ! Zeige die CustomerId mit den meisten Bestellungen an
-- ! Bonus: Zeige direkt den Kundennamen an (nutze JOIN um zwei -- Tabellenabfragen zu verbinden)
SELECT MAX(CustomerID),
COUNT(*) FROM Orders
GROUP BY CustomerID
HAVING COUNT(*) > 1;

-- # Tabelle Products
-- Zeige alle Produkte an, die von der Firma “Heli Süßwaren GmbH & Co. KG ” geliefert werden
SELECT * FROM Products
WHERE SupplierID = 11;
-- Zeige den Durchschnittspreis aller Produkte an 
SELECT AVG(Price)
FROM Products;
-- Zeige den Höchstpreis aller Produkte an
SELECT MAX(Price)
FROM Products;

-- # Tabelle Suppliers
-- Zeige alle Lieferanten an, deren Telefonnummer keine Klammern () enthält
SELECT Phone FROM Suppliers
WHERE Phone NOT LIKE '%[()]%';

-- Liste die Länder mit der Anzahl der Lieferanten auf, sortiert nach der Anzahl der Lieferanten in absteigender Reihenfolge und bei gleicher Anzahl von Lieferanten alphabetisch nach Ländernamen.
SELECT Country, COUNT(*) AS SupplierCount
FROM Suppliers 
GROUP BY Country
ORDER BY COUNT(*) DESC,
COUNTRY ASC;

SELECT Country, COUNT(*) AS SupplierCount 
FROM Suppliers
GROUP BY Country 
ORDER BY COUNT(*) DESC,
Country ASC;