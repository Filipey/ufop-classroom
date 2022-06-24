import bannerIcea from '../assets/banner_icea.png'

export function Header() {
  return (
    <header className="w-full py-5 flex items-center justify-center bg-gray-100 border-b border-gray-600">
      <img src={bannerIcea} alt="Banner ICEA" />
    </header>
  )
}