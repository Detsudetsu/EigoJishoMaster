import 'bootstrap/dist/css/bootstrap.min.css'
import { debounce } from './debounce'
import { SubmitEvent } from './SubmitEvent'
import { updateSuggestions } from './suggest'

const search_box = document.getElementById("search_box")
const search_text = document.getElementById("search_text")
if (!(search_text instanceof HTMLInputElement)) throw new TypeError()
const suggestionGroup = document.getElementById("suggestions")

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