export const scrollButton = document.getElementById(
  'scrollToTop',
) as HTMLButtonElement;

export function showOnScroll() {
  if (document.documentElement.scrollTop > 20) {
    scrollButton.style.display = 'block';
  } else {
    scrollButton.style.display = 'none';
  }
}
export function toTopScroll() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
