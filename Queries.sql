
SELECT * FROM results_2016

SELECT * FROM results_2020

SELECT * FROM turnout_2016

SELECT * FROM turnout_2020

-- Join query for comparison of VEP percentage change and 2020 election outcomes:
SELECT turnout_2020.state,turnout_2016.vep_percent_2016,turnout_2020.vep_percent_2020,results_2020.dem_percent,results_2020.rep_percent,results_2020.other_percent
FROM turnout_2020 
JOIN turnout_2016  ON turnout_2020.state_id=turnout_2016.state_id
JOIN results_2020 ON turnout_2020.state_id = results_2020.stateid;


