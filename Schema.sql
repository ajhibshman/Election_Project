CREATE TABLE "turnout_2020" (
    "state" VARCHAR   PRIMARY KEY ,
    "total_votes_2020" int   NOT NULL,
    "vep_percent_2020" decimal   NOT NULL,
    "vep_2020" int   NOT NULL,
    "state_id" VARCHAR(2)   NOT NULL
);

CREATE TABLE "turnout_2016" (
    "state" VARCHAR  PRIMARY KEY ,
    "total_votes_2016" int   NOT NULL,
    "vep_percent_2016" decimal   NOT NULL,
    "vep_2016" int   NOT NULL,
    "state_id" VARCHAR(2)   NOT NULL
);

CREATE TABLE "results_2016" (
    "state_id" VARCHAR   PRIMARY KEY,
    "state" VARCHAR   NOT NULL,
    "dem_percent" decimal   NOT NULL,
    "rep_percent" decimal   NOT NULL,
    "other_percent" decimal   NOT NULL
);

CREATE TABLE "results_2020" (
    "stateid" VARCHAR(2)   PRIMARY KEY,
    "state" VARCHAR   NOT NULL,
    "dem_percent" decimal   NOT NULL,
    "rep_percent" decimal   NOT NULL,
    "other_percent" decimal   NOT NULL
);

SELECT * FROM results_2020