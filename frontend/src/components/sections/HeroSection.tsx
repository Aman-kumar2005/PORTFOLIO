import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiDownload } from 'react-icons/fi';
import type { Profile } from '../../types/index';

interface Props {
  profile: Profile | null;
}

const HeroSection = ({ profile }: Props) => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950" />

      <div className="section-container grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-primary-600 dark:text-primary-400 font-semibold mb-3">
            Hi, my name is
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
            {profile?.name || 'Aman Kumar'}
          </h1>
          <h2 className="text-xl sm:text-2xl font-medium text-gray-500 dark:text-gray-400 mb-6">
            {profile?.title || 'MERN- STACK devloper'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-lg mb-8">
            {profile?.bio ||
              'I build fast, accessible, and scalable web applications using the MERN stack and TypeScript.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <a href={profile?.resumeUrl || '/resume.pdf'} download className="btn-primary">
              <FiDownload /> Download Resume
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Me
            </a>
          </div>

          <div className="flex items-center gap-4">
            {profile?.socialLinks?.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-2xl text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FiGithub />
              </a>
            )}
            {profile?.socialLinks?.linkedin && (
              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-2xl text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FiLinkedin />
              </a>
            )}
            {profile?.socialLinks?.twitter && (
              <a
                href={profile.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-2xl text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FiTwitter />
              </a>
            )}
            {profile?.socialLinks?.email && (
              <a
                href={profile.socialLinks.email}
                aria-label="Email"
                className="text-2xl text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <FiMail />
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-primary-500/20 rounded-full blur-2xl animate-float" />
            <img
              src={profile?.profileImage || 'C:\Users\HP\OneDrive\Desktop\New folder\portfolio\frontend\src\components\sections\profile .pdf'}
              alt={profile?.name || 'Profile'}
              className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full object-cover
                border-4 border-white dark:border-gray-800 shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
