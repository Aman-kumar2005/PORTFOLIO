const Footer = () => {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Aman Kumar. All rights reserved.</p>
        <p>Built with React, TypeScript, Tailwind CSS & Node.js</p>
      </div>
    </footer>
  );
};

export default Footer;
