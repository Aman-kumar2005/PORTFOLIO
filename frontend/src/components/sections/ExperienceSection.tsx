import { motion } from 'framer-motion';
import type { Profile } from '../../types/index';

interface Props {
  profile: Profile | null;
}

const ExperienceSection = ({ profile }: Props) => {
  const experience = profile?.experience || [];

  return (
    <section id="experience" className="section-container bg-gray-50 dark:bg-gray-900/40 rounded-3xl">
      <h2 className="section-title">Experience & Education</h2>
      <p className="section-subtitle">My professional journey so far</p>

      <div className="max-w-2xl mx-auto relative pl-8 border-l-2 border-primary-200 dark:border-primary-900">
        {experience.length === 0 && (
          <p className="text-center text-gray-500">No experience added yet.</p>
        )}
        {experience.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="mb-10 relative"
          >
            <span className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-primary-600 ring-4 ring-white dark:ring-gray-950" />
            <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">
              {item.startDate} – {item.endDate || 'Present'}
            </span>
            <h3 className="text-lg font-semibold mt-1">{item.role}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.organization}</p>
            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
            <span
              className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-primary-100
              text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 capitalize"
            >
              {item.type}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
