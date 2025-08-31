import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Sip.", "Smile.", "Repeat."];

const directions = [
  { x: "-50vw", y: 0 }, 
  { x: "50vw", y: 0 }, 
  { x: 0, y: "-50vh" }, 
  { x: 0, y: "50vh" }, 
];

const AnimatedText = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => setVisible(true), 4000);
    }, 10000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animatedCont">
      <AnimatePresence>
        {visible && (
          <div className="textAnim">
            {words.map((word, i) => (
              <motion.div
                key={i}
                initial={directions[i % directions.length]}
                animate={{ x: 100, y: 300, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                {word}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AnimatedText