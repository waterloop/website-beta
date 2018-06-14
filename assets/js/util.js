export function noscroll() {
  document.body.classList.add('overflow-hidden')
}

export function scroll() {
  document.body.classList.remove('overflow-hidden')
}
