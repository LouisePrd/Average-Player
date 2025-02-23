export function Champion({ champion }) {
    return (
        <div>
            <h1>Champion</h1>
            <h2>{champion.name}</h2>
            <h3>{champion.title}</h3>
            <img src={champion.img} alt={champion.name} />
        </div>
    );
}
