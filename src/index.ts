import 'bootstrap/dist/css/bootstrap.min.css'
import { debounce } from './debounce'
import { SubmitEvent } from './SubmitEvent'
import { updateSuggestions } from './suggest'

const search_box = document.getElementById("search_box")
const search_text = document.getElementById("search_text")
if (!(search_text instanceof HTMLInputElement)) throw new TypeError()
const suggestionGroup = document.getElementById("suggestions")
const suggestionButtons = suggestionGroup.getElementsByTagName("button")

search_box.addEventListener("keydown", e => {
    switch (e.code) {
        case "ArrowDown":
            if (suggestionButtons.length === 0) break
            const isFocusOnSearchBar = document.activeElement === search_text
            const next = isFocusOnSearchBar ? suggestionButtons[0] : document.activeElement.nextElementSibling
            tryFocus(next)
            break
        case "ArrowUp":
            const isFocusOnTopButton = document.activeElement === suggestionButtons[0]
            const prev = isFocusOnTopButton ? search_text : document.activeElement.previousElementSibling
            tryFocus(prev)
            break
        default:
            if (e.key.length === 1 || e.key === "Backspace") {
                search_text.focus()
            }
            break
    }

    function tryFocus(elem: Element) {
        if (elem === null) return false
        if (!(elem instanceof HTMLElement)) throw new TypeError()
        elem.focus()
    }
})

search_box.addEventListener("submit", (e: SubmitEvent) => {
    const query = e.submitter.attributes.getNamedItem("value").value
    window.open("https://www.google.com/search?q=meaning+" + query)
    window.open("https://eow.alc.co.jp/search?q=" + query)
    window.open("https://www.etymonline.com/search?q=" + query)
    e.preventDefault()
})

const debouncedUpdateSuggestions = debounce(updateSuggestions)

search_box.addEventListener("input", e => {
    const text = search_text.value
    debouncedUpdateSuggestions(text, suggestionGroup)
})

const setFillHeight = () => {
    const vh = document.documentElement.clientHeight
    document.documentElement.style.setProperty('--vh', `${vh}px`)
}

// 画面のサイズ変動があった時に高さを再計算する
window.addEventListener('resize', setFillHeight)

// 初期化
setFillHeight()