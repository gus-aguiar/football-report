const leaderboardQuery = `SELECT
t.team_name AS name,
COUNT(*) AS totalGames,
SUM(
CASE
WHEN matches.home_team_goals = matches.away_team_goals THEN 1
WHEN matches.home_team_goals > matches.away_team_goals THEN 3
    ELSE 0
  END
) AS totalPoints,
SUM(
  CASE
    WHEN matches.home_team_goals > matches.away_team_goals THEN 1
    ELSE 0
  END
) AS totalVictories,
SUM(
  CASE
    WHEN matches.home_team_goals = matches.away_team_goals THEN 1
    ELSE 0
  END
) AS totalDraws,
SUM(
  CASE
    WHEN matches.home_team_goals < matches.away_team_goals THEN 1
    ELSE 0
  END
) AS totalLosses,
SUM(matches.away_team_goals) AS goalsOwn,
SUM(matches.home_team_goals) AS goalsFavor,
SUM(matches.home_team_goals) - SUM(matches.away_team_goals) AS goalsBalance,
ROUND(
  (
    SUM(
      CASE
      WHEN matches.home_team_goals = matches.away_team_goals THEN 1
      WHEN matches.home_team_goals > matches.away_team_goals THEN 3
        ELSE 0
      END
    ) / (COUNT(*) * 3)
  ) * 100,
  2
) AS efficiency
FROM
TRYBE_FUTEBOL_CLUBE.matches as matches
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as t ON matches.home_team_id = t.id
WHERE
matches.in_progress = false
GROUP BY
team_name
ORDER BY
  totalPoints DESC,
totalVictories DESC,
goalsBalance DESC,
goalsFavor DESC;`;
export default leaderboardQuery;
