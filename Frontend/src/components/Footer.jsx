const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-lg border-t border-gray-200/50 text-center py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💕</span>
            <span className="text-gray-800 font-semibold">TinDev</span>
          </div>

          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} TinDev. Made with ❤️ for developers finding love.
          </p>

          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
