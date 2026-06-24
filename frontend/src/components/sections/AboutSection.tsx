import { motion } from 'framer-motion';
import type { Profile } from '../../types/index';

interface Props {
  profile: Profile | null;
}

const AboutSection = ({ profile }: Props) => {
  return (
    <section id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">A quick introduction to who I am and what I do</p>

        <div className="max-w-3xl mx-auto card p-8 sm:p-10">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {profile?.about ||
              'I am a full-stack developer with a passion for building clean, performant web applications.'}
          </p>

          {profile?.skills && profile.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm rounded-full bg-primary-50 text-primary-700
                    dark:bg-primary-900/30 dark:text-primary-300 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
