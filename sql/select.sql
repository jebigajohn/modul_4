-- ? Alle Datensätze und Spalten in der Tabelle Students abrufen
SELECT * FROM Students;

--?  Nur die Spalten mit Vornamen und Nachnamen von Students ausgeben
SELECT FirstName, LastName FROM Students;

-- ? Alle Spalten von Students bei denen in der Spalte House der Wert Slytherin steht
SELECT * FROM Students 
  WHERE House = "Slytherin";

-- ? Alle Ergebenisse der Zeile House mit der Value "Huffelpuff" und dem YearOfStudy Value "6"
SELECT * FROM Students
WHERE House = "Hufflepuff" AND YearOfStudy = 6;

-- ? Alle Ergebnisse der Zeile House mit den Values "Slytherin" oder "Huffelpuff"
SELECT * FROM Students WHERE House = "Slytherin" OR House = "Hufflepuff";

-- ? Alle Ergebnisse der Zeile House mit den Values "Slytherin" oder "Huffelpuff" oder House = "Gryffindor"
SELECT * FROM Students WHERE House = "Slytherin" OR House = "Hufflepuff" OR House = "Gryffindor";

-- ? Alternative Schreibweise mit "IN" und runden Klammern
SELECT * FROM Students WHERE House IN ("Slytherin", "Gryffindor","Hufflepuff");

-- ? Alle Students absteigend nach Geburtsdatum. DESC ist die Abkürzung für Absteigend
-- ? ORDER BY ist für die Sortierung zuständig
SELECT * FROM Students ORDER BY BirtDate DESC;

-- ? Alle Students deren Vorname mit H beginnt 
-- ? Großkleinschreibung wird hier nicht beachtet
-- ? Das Potenzzeichen steht als Platzhalter für beliebig viele Buchstaben
SELECT * FROM Students WHERE FirstName LIKE "H%";

-- ? Alle Students deren Vorname ein H enthält
SELECT * FROM Students WHERE FirstName LIKE "%H%";

-- ? Alle Students deren Vorname mit H beginnt und dann genau 5 Zeichen folgen
-- ? Der Unterstrich steht als Platzhalter für einen Buchstaben
SELECT * FROM Students WHERE FirstName LIKE "H_____";

-- ? Alle Students bei denen Unicorn in der Spalte Wandtype vorkommt
SELECT * FROM Students WHERE WandType LIKE "%unicorn%";

-- ? Alle Students deren Geburstag zwischen dem 01.01.1980 und 31.12.1980 liegen
SELECT * FROM Students WHERE BirtDate BETWEEN "1980-01-01" AND "1980-12-31";

-- ? Alle Students mit StudentID
SELECT * FROM Students WHERE StudentID BETWEEN 11 and 20;

-- ? Alle Students bei denen in der Spalte Wandtype nicht NULL steht
SELECT * FROM Students WHERE WandType is NULL;

-- ? Alle Students bei denen in der Spalte Wandtype NULL steht
SELECT * FROM Students WHERE WandType is not NULL;

-- ? mit COUNT kann ich die Anzahl der Students ermitteln
-- ? das nennt sich Aggregatfunktion
SELECT COUNT(*) FROM Students;

-- ? Anzahl der Studenten im House "Slytherin"
SELECT COUNT(*) FROM Students WHERE House = "Slytherin";

-- ? Man kann der Spalte auch eine eigene Überschrift geben mit AS
SELECT COUNT(*) AS NumberOfSlytherin
FROM Students 
WHERE House = "Slytherin";

-- ? Mit dem KeyWord MAX können wir den Maximalen Wert einer Spalte ausgeben
SELECT MAX(BirtDate)
FROM Students;
-- 
SELECT MAX(YearOfStudy)
FROM Students;

-- ? Mit dem KeyWord MIN können wir den minimalen Wert einer Spalte ausgeben
SELECT MIN(BirtDate)
FROM Students;

-- ? Mit dem KeyWord AVG können wir den durchschnittlichen Wert einer Spalte ausgeben
SELECT AVG(YearOfStudy)
FROM Students;

-- ? Mit dem KeyWord SUM können wir die Summe einer Spalte ausgeben
SELECT SUM(YearOfStudy)
FROM Students;

-- ? Mit dem KeyWord ROUND können wir die Summe einer Spalte runden
SELECT ROUND(AVG(YearOfStudy), 3)
FROM Students;

-- ? Mit GROUP BY kann ich nach bestimmt Spalten gruppieren
-- ? und mir dann z.B. die Anzahl der Students anzeigen lassen
SELECT House, COUNT(*) 
FROM Students
GROUP BY House;
-- 
SELECT WandType, COUNT(*) 
FROM Students
GROUP BY WandType;

-- ? nach House gruppieren und dann nochmal filtern, nach den Gruppen (=Houses), die 10 und mehr Students haben
SELECT House, COUNT(*) 
FROM Students
GROUP BY House
HAVING COUNT(*) >= 10;

-- ? Mit LIMIT kann man die ersten 5 Datensätze der Students abfragen
SELECT * FROM Students
LIMIT 5

-- ? Mit OFFSET kann man Datensätze Überspringen
-- ? 10 Studens abrufen und davor 10 überspringen
SELECT * FROM Students
LIMIT 10 OFFSET 10

-- ! EXTRA
SELECT *
FROM Students
ORDER BY StudentID DESC
LIMIT 10;

-- ? Mit CONCAT kann man mehrere Spalten zu einer neuen zusammenführen
-- ? am besten mit AS einen neuen Spaltennamen vergeben
SELECT CONCAT(FirstName,"",LastName) AS FullName
FROM Students;