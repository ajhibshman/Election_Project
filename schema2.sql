

SELECT t20.state AS state,
	t20.state_id AS state_id,
	t20.vep_2020 AS vep_2020,
	t16.vep_2016 AS vep_2016,
	CAST(((t20.vep_2020-t16.vep_2016)::decimal/t16.vep_2016) AS DECIMAL(5,4))*100 AS vep_delta,
	t20.vep_percent_2020 as turnout_2020,
	t16.vep_percent_2016 AS turnout_2016,
	CAST(((t20.vep_percent_2020-t16.vep_percent_2016)::decimal/t16.vep_percent_2016) AS DECIMAL(5,4))*100 AS turnout_delta,
	r20.dem_percent as dem_percent_2020,
	r20.rep_percent as rep_percent_2020,
	r16.dem_percent as dem_percent_2016,
	r16.rep_percent as rep_percent_2016	
FROM turnout_2020 AS t20 
	JOIN turnout_2016 AS t16 on t20.state_id = t16.state_id
	JOIN results_2020 as r20 on t20.state_id = r20.stateid
	JOIN results_2016 as r16 on t20.state_id = r16.state_id
	
	
