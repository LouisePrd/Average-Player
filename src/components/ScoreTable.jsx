


export function ScoreTable({ players }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {players.map((player) => (
                    <tr key={player.id}>
                        <td>{player.pseudo}</td>
                        <td>{player.score}</td>
                        <td>{player.played_at}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}