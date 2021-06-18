export function createButton(item: string) {
    const button = document.createElement("button")
    button.value = item
    button.textContent = item
    button.setAttribute("class", "btn btn-outline-primary btn-light")
    return button
}
