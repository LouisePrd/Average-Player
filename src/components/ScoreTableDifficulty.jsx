// Scores des joueurs sous forme de tableau avec les difficultés
export function ScoreTableHard({ players }) {
  // Formatte la date au format ISO
  function formatDate(isoString) {
    return new Date(isoString).toLocaleString();
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Difficulty</th>
          <th>Score</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={player.id}>
            <td>{player.pseudo}</td>
            <td>
              {player.difficulty.charAt(0).toUpperCase() +
                player.difficulty.slice(1)}
            </td>
            <td>{player.score}</td>
            <td>{formatDate(player.played_at)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
