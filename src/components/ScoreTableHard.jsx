
export function ScoreTableHard({ players }) {
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
                {
                players.map((player) => (
                    <tr key={player.id}>
                        <td>{player.pseudo}</td>
                        <td>{player.difficulty.charAt(0).toUpperCase() + player.difficulty.slice(1)}</td>
                        <td>{player.score}</td>
                        <td>{player.played_at}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}