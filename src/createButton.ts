export function createButton(item: string) {
    const button = document.createElement("button")
    button.value = item
    button.textContent = item
    button.setAttribute("class", "btn btn-outline-light text-start text-secondary border-start-0 border-end-0")
    return button
}
