import { motion } from "framer-motion";

const Loader = () => (
  <div className='flex h-screen w-screen flex-col items-center justify-center gap-4 bg-gray-900'>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      className='border-primary-blue-500 h-20 w-20 rounded-full border-t-4 border-solid'
    />
    <p className='animate-pulse text-lg font-semibold text-white'>Loading...</p>
  </div>
);

export default Loader;
