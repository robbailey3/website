CREATE TABLE blog (Id SERIAL PRIMARY KEY, Title VARCHAR(255) NOT NULL, Content VARCHAR(65536) NOT NULL, DateAdded TIMESTAMP NOT NULL, DateModified TIMESTAMP NOT NULL);

CREATE TABLE AiImages (Id SERIAL PRIMARY KEY, PATH VARCHAR(510) NOT NULL, DateAdded TIMESTAMP NOT NULL, ExpiryTime TIMESTAMP NOT NULL);

CREATE TABLE Tasks (Id SERIAL PRIMARY KEY, Title VARCHAR(255) NOT NULL, Completed BOOLEAN NOT NULL DEFAULT FALSE, DateAdded TIMESTAMP NOT NULL, DateModified TIMESTAMP NOT NULL);

CREATE TABLE Activities (
    Id SERIAL PRIMARY KEY,
    StravaId BIGINT NOT NULL UNIQUE,
    Type VARCHAR(255),
    Name VARCHAR(255),
    Description VARCHAR(510),
    Distance FLOAT NOT NULL,
    MovingTime INT NOT NULL,
    ElapsedTime INT NOT NULL,
    TotalElevationGain FLOAT NOT NULL,
    StartDate TIMESTAMP NOT NULL,
    StartDateLocal TIMESTAMP NOT NULL,
    GearName VARCHAR(255),
    MapPolyline VARCHAR(1028),
    DateAdded TIMESTAMP NOT NULL,
    DateModified TIMESTAMP NOT NULL
);

CREATE TABLE ActivitySplit
(
    Id SERIAL PRIMARY KEY,
    ActivityId SERIAL NOT NULL,
    Distance FLOAT NOT NULL,
    ElapsedTime INT NOT NULL,
    MovingTime INT NOT NULL,
    ElevationDifference FLOAT NOT NULL,
    AverageSpeed FLOAT NOT NULL,
    CONSTRAINT fk_acivityid
        FOREIGN KEY(ActivityId)
            REFERENCES Activities(Id)
);


CREATE TABLE ActivitySegment
(
    Id          SERIAL PRIMARY KEY,
    ActivityId  SERIAL       NOT NULL,
    Name        VARCHAR(255) NOT NULL,
    ElapsedTime INT          NOT NULL,
    MovingTime  INT          NOT NULL,
    Distance    FLOAT        NOT NULL,
    CONSTRAINT fk_acivityid
        FOREIGN KEY (ActivityId)
            REFERENCES Activities (Id)
);