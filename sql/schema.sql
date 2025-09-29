-- eine neue Tabelle legen wir mit CREATE TABLE "Tablename" am
-- dann kommen in runde Klammern alle Spalten mit dem jeweiligen Datentyp

CREATE TABLE Students (
  -- SERIAL -- Spalte die automatisch beim einfügen hochzählt
  -- PRIMARY KEY -- Spalte mit eindeutigem Wert, der den Datensatz identifiziert

-- VARCHAR - Text mit maximal 50 Zeichen
  StudentID SERIAL PRIMARY KEY,
  FirstName VARCHAR(50),
  LastName VARCHAR(50),
  House VARCHAR(50),
  -- DATE für Datum
  BirtDate DATE,
  -- INT für eine ganze Zahl
  YearOfStudy INT,
  WandType VARCHAR(50),
  BloodStatus VARCHAR(50),
)

-- Datensätze fügen wir mit INSERT INTO "Tabellenname" 
-- Dann alle Spaltennamen in runden Klammern
-- StudentID lasse ich weg, denn das zählt die Datenbank für uns hoch

INSERT INTO Students(
  FirstName,
  LastName,
  House,
  BirtDate,
  
  YearOfStudy,
  WandType,
  BloodStatus


  -- VALUES in den Runden Klammern die die einzelnen Datensätze
  -- mit den Werten in der Reihenfolge von oben
  -- Es müssen genau so viele Werte wie Spalten sein
) VALUES (
        'Tom',
        'Riddle',
        'Slytherin',
        '1926-12-31',
        1,
        'Yew and phoenix feather',
        'Pure-blood'
    ),
    (
        'Horace',
        'Slughorn',
        'Slytherin',
        '1921-12-01',
        1,
        'Cypress and unicorn hair',
        'Half-blood'
    ),
    (
        'Gellert',
        'Grindelwald',
        'Durmstrang',
        '1883-06-01',
        1,
        'Elder and dragon heartstring',
        'Pure-blood'
    ),
    (
        'Nymphadora',
        'Tonks',
        'Hufflepuff',
        '1973-03-24',
        1,
        'Ash and phoenix feather',
        'Half-blood'
    ),
    (
        'Fleur',
        'Delacour',
        'Beauxbatons',
        '1977-01-07',
        1,
        'Cypress and phoenix feather',
        'Half-blood'
    ),
    (
        'Gabrielle',
        'Delacour',
        'Beauxbatons',
        '1981-05-02',
        1,
        'Ash and unicorn hair',
        'Half-blood'
    ),
    (
        'Luna',
        'Lovegood',
        'Ravenclaw',
        '1981-02-13',
        2,
        'Yew and phoenix feather',
        'Half-blood'
    ),
    (
        'Ernie',
        'Macmillan',
        'Hufflepuff',
        '1980-03-21',
        2,
        'Hawthorn and phoenix feather',
        'Pure-blood'
    ),
    (
        'Susan',
        'Bones',
        'Hufflepuff',
        '1980-01-12',
        2,
        'Holly and dragon heartstring',
        'Pure-blood'
    ),
    (
        'Cho',
        'Chang',
        'Ravenclaw',
        '1979-07-15',
        2,
        'Cedar and unicorn hair',
        'Muggle-born'
    ),
    (
        'Anthony',
        'Goldstein',
        'Ravenclaw',
        '1979-06-14',
        2,
        'Willow and unicorn hair',
        'Muggle-born'
    ),
    (
        'Ron',
        'Weasley',
        'Gryffindor',
        '1980-03-01',
        3,
        'Willow and unicorn hair',
        'Pure-blood'
    ),
    (
        'Ginny',
        'Weasley',
        'Gryffindor',
        '1981-08-11',
        3,
        'Cherry and dragon heartstring',
        'Pure-blood'
    ),
    (
        'Neville',
        'Longbottom',
        'Gryffindor',
        '1980-07-30',
        3,
        'Ash and dragon heartstring',
        'Pure-blood'
    ),
    (
        'Seamus',
        'Finnigan',
        'Gryffindor',
        '1980-04-11',
        3,
        'Birch and dragon heartstring',
        'Half-blood'
    ),
    -- Year 4
    (
        'Fred',
        'Weasley',
        'Gryffindor',
        '1978-04-01',
        4,
        'Elder and dragon heartstring',
        'Pure-blood'
    ),
    (
        'George',
        'Weasley',
        'Gryffindor',
        '1978-04-01',
        4,
        'Elder and dragon heartstring',
        'Pure-blood'
    ),
    (
        'Percy',
        'Weasley',
        'Gryffindor',
        '1976-08-22',
        4,
        'Holly and unicorn hair',
        'Pure-blood'
    ),
    (
        'Padma',
        'Patil',
        'Ravenclaw',
        '1979-12-14',
        4,
        'Cedar and phoenix feather',
        'Muggle-born'
    ),
    -- Year 5
    (
        'Draco',
        'Malfoy',
        'Slytherin',
        '1980-06-05',
        5,
        'Hawthorn and dragon heartstring',
        'Pure-blood'
    ),
    (
        'Millicent',
        'Bulstrode',
        'Slytherin',
        '1980-08-29',
        5,
        'Hawthorn and dragon heartstring',
        'Pure-blood'
    ),
    (
        'Theodore',
        'Nott',
        'Slytherin',
        '1980-10-03',
        5,
        'Cypress and dragon heartstring',
        'Pure-blood'
    ),
    (
        'Vincent',
        'Crabbe',
        'Slytherin',
        '1980-07-20',
        5,
        'Elder and dragon heartstring',
        'Pure-blood'
    ),
    -- Year 6
    (
        'Ginny',
        'Weasley',
        'Gryffindor',
        '1981-08-11',
        6,
        'Cherry and dragon heartstring',
        'Pure-blood'
    ),
    (
        'Gabrielle',
        'Delacour',
        'Beauxbatons',
        '1981-05-02',
        6,
        'Ash and unicorn hair',
        'Half-blood'
    ),
    (
        'Hannah',
        'Abbott',
        'Hufflepuff',
        '1980-05-01',
        6,
        'Yew and unicorn hair',
        'Half-blood'
    ),
    (
        'Justin',
        'Finch-Fletchley',
        'Hufflepuff',
        '1980-05-10',
        6,
        'Cypress and phoenix feather',
        'Muggle-born'
    ),
    -- Year 7
    (
        'Harry',
        'Potter',
        'Gryffindor',
        '1980-07-31',
        7,
        'Holly and phoenix feather',
        'Half-blood'
    ),
    (
        'Hermione',
        'Granger',
        'Gryffindor',
        '1979-09-19',
        7,
        'Vine wood and dragon heartstring',
        'Muggle-born'
    ),
    (
        'Luna',
        'Lovegood',
        'Ravenclaw',
        '1981-02-13',
        7,
        'Yew and phoenix feather',
        'Half-blood'
    ),
    (
        'Seamus',
        'Finnigan',
        'Gryffindor',
        '1980-04-11',
        7,
        'Birch and dragon heartstring',
        'Half-blood'
    ),
    (
        'Parvati',
        'Patil',
        'Gryffindor',
        '1979-12-14',
        7,
        'Cedar and phoenix feather',
        'Muggle-born'
    ),
    (
        'Dean',
        'Thomas',
        'Gryffindor',
        '1979-02-14',
        7,
        'Larch and dragon heartstring',
        'Muggle-born'
    ),
    (
        'Michael',
        'Corner',
        'Ravenclaw',
        '1979-11-23',
        7,
        'Ash and unicorn hair',
        'Muggle-born'
    ),
    (
        'Anthony',
        'Goldstein',
        'Ravenclaw',
        '1979-06-14',
        7,
        'Willow and unicorn hair',
        'Muggle-born'
    ),
    (
        'Ernie',
        'Macmillan',
        'Hufflepuff',
        '1980-03-21',
        7,
        'Hawthorn and phoenix feather',
        'Pure-blood'
    ),
    (
        'Hannah',
        'Abbott',
        'Hufflepuff',
        '1980-05-01',
        7,
        'Yew and unicorn hair',
        'Half-blood'
    ),
    (
        'Justin',
        'Finch-Fletchley',
        'Hufflepuff',
        '1980-05-10',
        7,
        'Cypress and phoenix feather',
        'Muggle-born'
    ),
    (
        'Susan',
        'Bones',
        'Hufflepuff',
        '1980-01-12',
        7,
        'Holly and dragon heartstring',
        'Pure-blood'
    ),
    (
        'Cedric',
        'Diggory',
        'Hufflepuff',
        '1977-09-23',
        7,
        'Ash and phoenix feather',
        'Pure-blood'
    ),
    (
        'Cho',
        'Chang',
        'Ravenclaw',
        '1979-07-15',
        7,
        'Cedar and unicorn hair',
        'Muggle-born'
    ),
    (
        'Fleur',
        'Delacour',
        'Beauxbatons',
        '1977-01-07',
        7,
        'Cypress and phoenix feather',
        'Half-blood'
    ),
    (
        'Viktor',
        'Krum',
        'Durmstrang',
        '1976-05-07',
        7,
        'Yew and dragon heartstring',
        'Pure-blood'
    ),
    (
        'Gabrielle',
        'Delacour',
        'Beauxbatons',
        '1981-05-02',
        7,
        'Ash and unicorn hair',
        'Half-blood'
    ),
    (
        'Blaise',
        'Zabini',
        'Slytherin',
        '1980-07-05',
        7,
        'Elder and dragon heartstring',
        'Pure-blood'
    ),
    (
        'Pansy',
        'Parkinson',
        'Slytherin',
        '1980-03-11',
        7,
        'Elder and unicorn hair',
        'Pure-blood'
    ),
    (
        'Millicent',
        'Bulstrode',
        'Slytherin',
        '1980-08-29',
        7,
        'Hawthorn and dragon heartstring',
        'Pure-blood'
    ),
    (
        'Theodore',
        'Nott',
        'Slytherin',
        '1980-10-03',
        7,
        'Cypress and dragon heartstring',
        'Pure-blood'
    ),
    (
        'Vincent',
        'Crabbe',
        'Slytherin',
        '1980-07-20',
        7,
        'Elder and dragon heartstring',
        'Pure-blood'
    ),
    (
        'Gregory',
        'Goyle',
        'Slytherin',
        '1980-08-18',
        7,
        'Elder and unicorn hair',
        'Pure-blood'
    ),
    (
        'Nymphadora',
        'Tonks',
        'Hufflepuff',
        '1973-03-24',
        7,
        'Ash and phoenix feather',
        'Half-blood'
    ),
    (
        'Remus',
        'Lupin',
        'Gryffindor',
        '1960-03-10',
        7,
        'Elder and dragon heartstring',
        'Half-blood'
    ),
    (
        'Sirius',
        'Black',
        'Gryffindor',
        '1960-11-03',
        7,
        'Ebony and dragon heartstring',
        'Pure-blood'
    ),
    (
        'James',
        'Potter',
        'Gryffindor',
        '1960-03-27',
        7,
        'Holly and phoenix feather',
        'Pure-blood'
    ),
    (
        'Lily',
        'Potter',
        'Gryffindor',
        '1960-01-30',
        7,
        'Hawthorn and unicorn hair',
        'Muggle-born'
    ),
    (
        'Albus',
        'Dumbledore',
        'Gryffindor',
        '1881-08-28',
        7,
        'Elder and thestral tail hair',
        'Half-blood'
    ),
    (
        'Gellert',
        'Grindelwald',
        'Durmstrang',
        '1883-06-01',
        7,
        'Elder and dragon heartstring',
        'Pure-blood'
    ),
    (
        'Rubeus',
        'Hagrid',
        'Gryffindor',
        '1928-12-06',
        7,
        'Giant’s wand',
        'Half-blood'
    ),
    (
        'Minerva',
        'McGonagall',
        'Gryffindor',
        '1935-10-04',
        7,
        'Fir and dragon heartstring',
        'Half-blood'
    ),
    (
        'Filius',
        'Flitwick',
        'Ravenclaw',
        '1935-05-17',
        7,
        'Yew and phoenix feather',
        'Half-blood'
    ),
    (
        'Pomona',
        'Sprout',
        'Hufflepuff',
        '1930-03-15',
        7,
        'Ash and unicorn hair',
        'Half-blood'
    ),
    (
        'Sybill',
        'Trelawney',
        'Ravenclaw',
        '1964-03-09',
        7,
        'Beech and dragon heartstring',
        'Half-blood'
    ),
    (
        'Horace',
        'Slughorn',
        'Slytherin',
        '1921-12-01',
        7,
        'Cypress and unicorn hair',
        'Half-blood'
    ),
    (
        'Sampson',
        'Sampson',
        'Gryffindor',
        '1992-06-06',
        7,
        'Elm and phoenix feather',
        'Half-blood'
    ),
    (
        'Petunia',
        'Dursley',
        'None',
        '1959-06-14',
        7,
        -- wenn es keinen Wert gibt NULL angeben
        NULL,
        'Muggle'
    ),
    (
        'Vernon',
        'Dursley',
        'None',
        '1958-05-15',
        7,
        NULL,
        'Muggle'
    ),
    (
        'Dudley',
        'Dursley',
        'None',
        '1980-06-24',
        7,
        NULL,
        'Muggle'
    ),
    (
        'Marjorie',
        'Dursley',
        'None',
        '1983-10-31',
        7,
        NULL,
        'Muggle'
    ),
    (
        'Rita',
        'Skeeter',
        'None',
        '1966-04-20',
        7,
        NULL,
        'Muggle'
    ),
    (
        'Gilderoy',
        'Lockhart',
        'None',
        '1961-03-26',
        7,
        NULL,
        'Pure-blood'
    ),
    (
        'Quirinus',
        'Quirrell',
        'None',
        '1964-09-27',
        7,
        NULL,
        'Half-blood'
    ),
    (
        'Igor',
        'Karkaroff',
        'None',
        '1964-11-29',
        7,
        NULL,
        'Half-blood'
    );