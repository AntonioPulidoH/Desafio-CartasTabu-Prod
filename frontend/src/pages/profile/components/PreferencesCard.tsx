import { useState } from "react";

export default function PreferencesCard({preferences}: any) {
    const [languaje, setLanguaje] = useState(preferences.defaultLanguaje)
    const [cards, setCards] = useState(preferences.defaultCardsNumber)
    const [tabuWords, setTabuWords] = useState(preferences.defaultTabuWords)
    const [format, setFormat] = useState(preferences.defaultPrintFormat)

    return (
        <div className="profile-card">
            <h3>Preferencias</h3>

            <label>Idioma</label>
            <select value={languaje} onChange={e => setLanguaje(e.target.value)}>
                <option value='ES'>Español</option>
                <option value='EN'>Inglés</option>
            </select>

            <label>Nº tarjetas</label>
            <input type="number" value={cards} onChange={e => setCards(e.target.value)}></input>

            <label>Nº palabras tabú</label>
            <input type="number" value={tabuWords} onChange={e => setTabuWords(e.target.value)}></input>

            <label>Formato de impresión</label>
            <select value={format} onChange={e => setFormat(e.target.value)}>
                <option value='A4'>A4</option>
                <option value='CARDS'>Tarjetas recortables</option>
            </select>

            <button>Guardar preferencias</button>
        </div>
    )
}