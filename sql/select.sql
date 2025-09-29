-- Alle Datensätze und Spalten in der Tabelle Students abrufen

SELECT * FROM Students;

-- Nur die Spalten mit Vornamen und Nachnamen von Students ausgeben

SELECT FirstName, LastName FROM Students;

-- Alle Spalten von Students bei denen in der Spalte House der Wert Slytherin steht
SELECT * FROM Students 
  WHERE House = "Slytherin"


-- Alle Ergebenisse der Zeile House mit der Value "Huffelpuff" und dem YearOfStudy Value "6"
SELECT * FROM Students
WHERE House = "Hufflepuff" AND YearOfStudy = 6
