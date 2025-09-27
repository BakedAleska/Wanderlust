// Once the DOM is ready, attach.
window.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.menu-button')
  if (!btn) return

  btn.addEventListener('click', () => {
    console.log('renderer: menu-button click detected')

    showToast('Home clicked')

    if (window.electronAPI && typeof window.electronAPI.homeClick === 'function') {
      window.electronAPI.homeClick()
    } else {
      console.log('Home button clicked (fallback)')
    }
  })
})

function showToast(text, ms = 1200) {
  let container = document.querySelector('.toast-container')
  if (!container) {
    container = document.createElement('div')
    container.className = 'toast-container'
    document.body.appendChild(container)
  }

  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.textContent = text
  container.appendChild(toast)

  requestAnimationFrame(() => toast.classList.add('show'))

  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => toast.remove(), 200)
  }, ms)
}
