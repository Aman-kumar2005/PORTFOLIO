import React from 'react';
import { motion } from 'framer-motion';
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
} from 'react-icons/si';
import { FiCpu } from 'react-icons/fi';

const skillIcons: { name: string; icon: React.ReactElement; color: string }[] = [
  { name: 'MERN Stack', icon: <SiJavascript />, color: 'text-yellow-500' },
  { name: 'TypeScript', icon: <SiTypescript />, color: 'text-blue-600' },
  { name: 'React', icon: <SiReact />, color: 'text-cyan-500' },
  { name: 'Node.js', icon: <SiNodedotjs />, color: 'text-green-600' },
  { name: 'Express.js', icon: <SiExpress />, color: 'text-gray-700 dark:text-gray-300' },
  { name: 'MongoDB', icon: <SiMongodb />, color: 'text-green-500' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: 'text-cyan-400' },
  { name: 'DSA & Problem Solving', icon: <FiCpu />, color: 'text-purple-500' },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-container bg-gray-50 dark:bg-gray-900/40 rounded-3xl">
      <h2 className="section-title">Skills</h2>
      <p className="section-subtitle">Technologies and concepts I work with day to day</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {skillIcons.map((skill, idx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="card flex flex-col items-center justify-center gap-3 p-6 text-center"
          >
            <span className={`text-4xl ${skill.color}`}>{skill.icon}</span>
            <span className="text-sm font-medium">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
