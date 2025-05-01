import { useState, useEffect } from "react";
import background from "../public/background.png";
import answersBg from "../public/answerBg.png"

export default function App() {
  const [pollData, setPollData] = useState(() => {
    // Try to get existing data from localStorage
    const savedData = localStorage.getItem('pollData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return {
      "Adobe Suite": { selfTaught: 0, schoolTaught: 0 },
      "Figma": { selfTaught: 0, schoolTaught: 0 },
      "Coding / Programming": { selfTaught: 0, schoolTaught: 0 },
      "Technical Drawing": { selfTaught: 0, schoolTaught: 0 },
      "Video Editing": { selfTaught: 0, schoolTaught: 0 },
      "Typography": { selfTaught: 0, schoolTaught: 0 },
      "3D Modelling": { selfTaught: 0, schoolTaught: 0 },
      "Motion Graphics / Animation": { selfTaught: 0, schoolTaught: 0 },
      "Prototyping": { selfTaught: 0, schoolTaught: 0 },
      "Networking": { selfTaught: 0, schoolTaught: 0 },
      "Project Management": { selfTaught: 0, schoolTaught: 0 },
      "Clear Communication": { selfTaught: 0, schoolTaught: 0 },
      "Problem Solving": { selfTaught: 0, schoolTaught: 0 },
      "Teamwork / Collaboration": { selfTaught: 0, schoolTaught: 0 },
      "Critical Thinking": { selfTaught: 0, schoolTaught: 0 },
      "Entrepreneurship": { selfTaught: 0, schoolTaught: 0 },
      "Adaptability & Flexibility": { selfTaught: 0, schoolTaught: 0 },
      "Using AI": { selfTaught: 0, schoolTaught: 0 },
    };
  });

  const [hasVotes, setHasVotes] = useState(false);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [pollStarted, setPollStarted] = useState(false);
  const [pollCompleted, setPollCompleted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const skills = Object.keys(pollData);

  const bgBlue = "#677C9B";
  const accentTan = "#A99F94";

  useEffect(() => {
    if (hasVotes) {
      localStorage.setItem('pollData', JSON.stringify(pollData));
    }
  }, [pollData, hasVotes]);

  const handleVote = (skill, voteType) => {
    if (!hasVotes) {
      setHasVotes(true);
    }

    setIsTransitioning(true);

    setPollData((prevData) => {
      const newData = { ...prevData };
      newData[skill] = {
        ...newData[skill],
        [voteType]: newData[skill][voteType] + 5,
      };
      return newData;
    });

    if (currentSkillIndex < skills.length - 1) {
      setTimeout(() => {
        setCurrentSkillIndex(currentSkillIndex + 1);
        setIsTransitioning(false);
      }, 500);
    } else {
      setTimeout(() => {
        setPollCompleted(true);
        setCurrentSkillIndex(0);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const navigateQuestion = (direction) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      if (direction === "prev" && currentSkillIndex > 0) {
        setCurrentSkillIndex(currentSkillIndex - 1);
      } else if (direction === "next" && currentSkillIndex < skills.length - 1) {
        setCurrentSkillIndex(currentSkillIndex + 1);
      }
      setIsTransitioning(false);
    }, 500);
  };

  const skipQuestion = () => {
    setIsTransitioning(true);
    
    if (currentSkillIndex < skills.length - 1) {
      setTimeout(() => {
        setCurrentSkillIndex(currentSkillIndex + 1);
        setIsTransitioning(false);
      }, 500);
    } else {
      setTimeout(() => {
        setPollCompleted(true);
        setCurrentSkillIndex(0);
        setIsTransitioning(false);
      }, 500);
    }
  };

  const startPoll = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPollStarted(true);
      setPollCompleted(false);
      setIsTransitioning(false);
    }, 300);
  };

  const resetPoll = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPollStarted(false);
      setPollCompleted(false);
      setCurrentSkillIndex(0);
      setIsTransitioning(false);
    }, 300);
  };
  
  const clearAllData = () => {
    setIsTransitioning(true);
    const resetData = Object.keys(pollData).reduce((acc, skill) => {
      acc[skill] = { selfTaught: 0, schoolTaught: 0 };
      return acc;
    }, {});
    
    setPollData(resetData);
    localStorage.setItem('pollData', JSON.stringify(resetData));
    setHasVotes(false);
    
    setTimeout(() => {
      setPollStarted(false);
      setPollCompleted(false);
      setCurrentSkillIndex(0);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      {!pollCompleted ? (
        <VotingInterface
          pollStarted={pollStarted}
          startPoll={startPoll}
          currentSkill={skills[currentSkillIndex]}
          onVote={handleVote}
          onNavigate={navigateQuestion}
          onSkip={skipQuestion}
          bgColor={bgBlue}
          accentColor={accentTan}
          currentIndex={currentSkillIndex}
          totalSkills={skills.length}
          isTransitioning={isTransitioning}
        />
      ) : (
        <IPadInterface
          pollData={pollData}
          hasVotes={hasVotes}
          bgColor={bgBlue}
          accentColor={accentTan}
          onReset={resetPoll}
          onClearAll={clearAllData}
        />
      )}
    </div>
  );
}
function VotingInterface({
  pollStarted,
  startPoll,
  currentSkill,
  onVote,
  onNavigate,
  onSkip,
  bgColor,
  currentIndex,
  totalSkills,
  isTransitioning
}) {
  return (
    <div
      className="h-full w-full flex flex-col justify-center items-center"
      style={{
        background: bgColor,
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col justify-center items-center h-full w-full p-6 md:p-10 lg:p-16">
        {!pollStarted ? (
          <div className={`bg-white rounded-lg w-full max-w-lg mx-auto p-10 py-12 md:py-14 md:px-12 lg:py-16 lg:px-16 shadow-lg transform transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <h2 className="text-center text-gray-700 mb-6 text-xl md:text-2xl">
              <span className="italic">(self)</span>{" "}
              <span className="font-bold">Taught</span>
            </h2>
            <p className="text-center text-sm md:text-base w-3/4 mx-auto text-gray-800 mb-4">
              Join the data panel and vote whether each skill was learned
              through self-study or during your education
            </p>
            <p className="text-center text-xs md:text-sm mb-6 font-bold">
              Est. time: ~2 min
            </p>
            <button
              onClick={startPoll}
              className="w-full py-2 md:py-3 bg-[#677C9B] text-white rounded-xl transition-all duration-300 hover:bg-opacity-90 hover:shadow-md active:scale-95 text-lg"
            >
              Start the Poll
            </button>
          </div>
        ) : (
          <div 
            className={`bg-white rounded-lg px-6 py-10 md:px-10 md:py-12 w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto shadow-lg transform transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
          >
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <button 
                onClick={() => currentIndex > 0 && onNavigate("prev")} 
                className={`text-gray-400 text-lg md:text-xl transition-all duration-300 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-600 cursor-pointer hover:scale-110'}`}
                disabled={currentIndex === 0}
              >
                &lt;
              </button>
              <h2 className="text-center font-bold text-2xl md:text-xl">
                {currentSkill}
              </h2>
              <button 
                onClick={() => currentIndex < totalSkills - 1 && onNavigate("next")}
                className={`text-gray-400 text-lg md:text-xl transition-all duration-300 ${currentIndex === totalSkills - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-600 cursor-pointer hover:scale-110'}`}
                disabled={currentIndex === totalSkills - 1}
              >
                &gt;
              </button>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => onVote(currentSkill, "selfTaught")}
                className="flex-1 py-2 md:py-3 px-3 bg-[#677C9B] text-white rounded-lg transition-all duration-300 hover:bg-opacity-90 hover:shadow-md active:scale-95 cursor-pointer font-semibold"
              >
                Self Taught
              </button>
              <button
                onClick={() => onVote(currentSkill, "schoolTaught")}
                className="flex-1 py-2 md:py-3 px-3 rounded-lg transition-all duration-300 bg-[#A99F94] text-white hover:bg-opacity-90 hover:shadow-md active:scale-95 cursor-pointer font-semibold"
              >
                School Taught
              </button>
            </div>
            <div className="text-center mt-4">
              <span 
                className="text-gray-800 text-sm underline cursor-pointer hover:text-gray-600 transition-all duration-300 hover:font-medium"
                onClick={onSkip}
              >
                Not applicable
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function IPadInterface({ pollData, hasVotes, bgColor, accentColor, onReset, onClearAll }) {
  const allSkills = Object.keys(pollData);
  const midpoint = Math.ceil(allSkills.length / 2);
  
  // For initial animation of bars
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimate(true);
    }, 300);
  }, []);
  
  return (
<div className="relative p-3 sm:p-4 md:p-6 lg:p-6 h-full overflow-auto border-12 border-[#677C9B] ">
  {/* Background with 10% opacity */}
  <div 
    className="absolute inset-0 z-0 rounded-8"
    style={{
      backgroundImage: `url(${answersBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      opacity: 0.1 // 10% opacity
    }}
  ></div>
  
  <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-2">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="animate-fadeIn">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                Self-Taught or School-Taught?
              </h1>
              <p className="text-xs sm:text-sm text-gray-800 mb-4 md:mb-6">
                How much of what we know comes from school and how much from ourselves?
                <br className="hidden sm:block" />
                Cast your vote and watch the data adjust in real time.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm sm:text-base md:text-lg animate-fadeIn">
              <div className="flex items-center gap-2">
                <div className="bg-[#677C9B] h-4 w-4 md:h-5 md:w-5"></div>
                <span>Self Taught</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#A99F94] h-4 w-4 md:h-5 md:w-5"></div>
                <span>School Taught</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          <div className="flex-1 animate-slideInLeft">
            {allSkills.slice(0, midpoint).map((skill) => (
              <SkillBar
                key={skill}
                skill={skill}
                selfTaught={pollData[skill].selfTaught}
                schoolTaught={pollData[skill].schoolTaught}
                bgColor={bgColor}
                accentColor={accentColor}
                animate={animate}
              />
            ))}
          </div>
          <div className="flex-1 animate-slideInRight">
            {allSkills.slice(midpoint).map((skill) => (
              <SkillBar
                key={skill}
                skill={skill}
                selfTaught={pollData[skill].selfTaught}
                schoolTaught={pollData[skill].schoolTaught}
                bgColor={bgColor}
                accentColor={accentColor}
                animate={animate}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <div className="mt-5 flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp">
          <button 
            onClick={onReset}
            className="py-2 px-4 bg-[#677C9B] text-white rounded-md transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg active:scale-95"
          >
            Take Poll Again
          </button>
          <button 
            onClick={onClearAll}
            className="py-2 px-4 bg-[#A99F94] text-white rounded-md transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg active:scale-95"
          >
            Clear All Data
          </button>
        </div> */}
    </div>
  );
}

function SkillBar({ skill, selfTaught, schoolTaught, bgColor, accentColor, animate }) {
  const total = selfTaught + schoolTaught;
  const selfPercent = total > 0 ? (selfTaught / total) * 100 : 0;
  const schoolPercent = total > 0 ? (schoolTaught / total) * 100 : 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center mb-4">
      <div className="w-full sm:w-1/3 md:w-1/4 text-sm md:text-base font-medium mb-1 sm:mb-0 sm:pr-2">
        {skill}
      </div>
      <div className="w-full sm:w-2/3 md:w-3/4 flex flex-col gap-1 sm:gap-2">
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          <div
            style={{ 
              width: animate ? `${selfPercent}%` : '0%', 
              backgroundColor: bgColor 
            }}
            className="h-4 sm:h-5 transition-all duration-1000 ease-out rounded-xl"
          ></div>
        </div>
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          <div
            style={{ 
              width: animate ? `${schoolPercent}%` : '0%', 
              backgroundColor: accentColor 
            }}
            className="h-4 sm:h-5 transition-all duration-1000 ease-out rounded-lg"
          ></div>
        </div>
      </div>
    </div>
  );
}

