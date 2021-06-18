import { removeAllChildren } from './removeAllChildren'
import { createButton } from "./createButton"

type Word = {
    word: string
    score: number
}

export async function updateSuggestions(text: string, suggestionGroup: HTMLElement) {
    if (text.length < 2) {
        removeAllChildren(suggestionGroup)
        return
    }
    const buttons = await createSuggestionButtons(text)
    removeAllChildren(suggestionGroup)
    suggestionGroup.append(...buttons)
}

async function createSuggestionButtons(text: string) {
    const data: Word[] = await getSuggestions(text)
    const buttons = data.map(e => createButton(e.word))
    return buttons
}

async function getSuggestions(text: string) {
    const response = await fetch("https://api.datamuse.com/sug?s=" + text)
    const data: Word[] = await response.json()
    return data
}

