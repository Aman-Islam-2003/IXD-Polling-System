import { useState, useEffect } from "react";
import { submitPollResponses } from "../services/api";
import background from "../../public/background.png";

function PollForm() {
  const [pollData, setPollData] = useState({
    "Adobe Suite": { selfTaught: 0, schoolTaught: 0 },
    Figma: { selfTaught: 0, schoolTaught: 0 },
    "Coding/ Programming": { selfTaught: 0, schoolTaught: 0 },
    "Technical Drawing": { selfTaught: 0, schoolTaught: 0 },
    "Video Editing": { selfTaught: 0, schoolTaught: 0 },
    Typography: { selfTaught: 0, schoolTaught: 0 },
    "3D Modelling": { selfTaught: 0, schoolTaught: 0 },
    "Motion Graphics / Animation": { selfTaught: 0, schoolTaught: 0 },
    Prototyping: { selfTaught: 0, schoolTaught: 0 },
    Networking: { selfTaught: 0, schoolTaught: 0 },
    "Project Management": { selfTaught: 0, schoolTaught: 0 },
    "Clear Communication": { selfTaught: 0, schoolTaught: 0 },
    "Problem Solving": { selfTaught: 0, schoolTaught: 0 },
    "Teamwork / Collaboration": { selfTaught: 0, schoolTaught: 0 },
    "Critical Thinking": { selfTaught: 0, schoolTaught: 0 },
    Entrepreneurship: { selfTaught: 0, schoolTaught: 0 },
    "Adaptability & Flexibility": { selfTaught: 0, schoolTaught: 0 },
    "Using AI": { selfTaught: 0, schoolTaught: 0 },
  });

  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [pollStarted, setPollStarted] = useState(false);
  const [pollSubmitted, setPollSubmitted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const skills = Object.keys(pollData);

  const bgBlue = "#677C9B";
  const accentTan = "#A99F94";

  const handleVote = async (skill, voteType) => {
    setIsTransitioning(true);
  
    // Calculate the new poll data
    const updatedPollData = { ...pollData };
    updatedPollData[skill] = {
      ...updatedPollData[skill],
      [voteType]: 5,
      [voteType === "selfTaught" ? "schoolTaught" : "selfTaught"]: 0
    };
  
    // Update the state
    setPollData(updatedPollData);
  
    if (currentSkillIndex < skills.length - 1) {
      setTimeout(() => {
        setCurrentSkillIndex(currentSkillIndex + 1);
        setIsTransitioning(false);
      }, 500);
    } else {
      // This is the last question, submit the poll with the updated data
      try {
        await submitPollResponses(updatedPollData); // ← Use the calculated data!
        setTimeout(() => {
          setPollSubmitted(true);
          setIsTransitioning(false);
        }, 500);
      } catch (error) {
        setSubmissionError("Failed to submit poll. Please try again.");
        setIsTransitioning(false);
      }
    }
  };


  const skipQuestion = () => {
    setIsTransitioning(true);
  
    // Calculate the updated poll data
    const updatedPollData = { ...pollData };
    updatedPollData[skills[currentSkillIndex]] = { selfTaught: 0, schoolTaught: 0 };
  
    // Update the state
    setPollData(updatedPollData);
  
    if (currentSkillIndex < skills.length - 1) {
      setTimeout(() => {
        setCurrentSkillIndex(currentSkillIndex + 1);
        setIsTransitioning(false);
      }, 500);
    } else {
      // This is the last question, submit the poll with the updated data
      submitPollResponses(updatedPollData) // ← Use the calculated data!
        .then(() => {
          setTimeout(() => {
            setPollSubmitted(true);
            setIsTransitioning(false);
          }, 500);
        })
        .catch((error) => {
          setSubmissionError("Failed to submit poll. Please try again.");
          setIsTransitioning(false);
        });
    }
  };
  
  // const handleVote = async (skill, voteType) => {
  //   setIsTransitioning(true);

  //   setPollData((prevData) => {
  //     const newData = { ...prevData };
  //     newData[skill] = {
  //       ...newData[skill],
  //       [voteType]: 5, // Set to 5 for the selected option
  //       [voteType === "selfTaught" ? "schoolTaught" : "selfTaught"]: 0 // Reset the other option
  //     };
  //     return newData;
  //   });

  //   if (currentSkillIndex < skills.length - 1) {
  //     setTimeout(() => {
  //       setCurrentSkillIndex(currentSkillIndex + 1);
  //       setIsTransitioning(false);
  //     }, 500);
  //   } else {
  //     // This is the last question, submit the poll
  //     try {
  //       await submitPollResponses(pollData);
  //       setTimeout(() => {
  //         setPollSubmitted(true);
  //         setIsTransitioning(false);
  //       }, 500);
  //     } catch (error) {
  //       setSubmissionError("Failed to submit poll. Please try again.");
  //       setIsTransitioning(false);
  //     }
  //   }
  // };

  // const skipQuestion = () => {
  //   setIsTransitioning(true);

  //   // Reset both values for this skill
  //   setPollData((prevData) => {
  //     const newData = { ...prevData };
  //     newData[skills[currentSkillIndex]] = { selfTaught: 0, schoolTaught: 0 };
  //     return newData;
  //   });

  //   if (currentSkillIndex < skills.length - 1) {
  //     setTimeout(() => {
  //       setCurrentSkillIndex(currentSkillIndex + 1);
  //       setIsTransitioning(false);
  //     }, 500);
  //   } else {
  //     // This is the last question, submit the poll
  //     submitPollResponses(pollData)
  //       .then(() => {
  //         setTimeout(() => {
  //           setPollSubmitted(true);
  //           setIsTransitioning(false);
  //         }, 500);
  //       })
  //       .catch((error) => {
  //         setSubmissionError("Failed to submit poll. Please try again.");
  //         setIsTransitioning(false);
  //       });
  //   }
  // };

  const navigateQuestion = (direction) => {
    setIsTransitioning(true);

    setTimeout(() => {
      if (direction === "prev" && currentSkillIndex > 0) {
        setCurrentSkillIndex(currentSkillIndex - 1);
      } else if (
        direction === "next" &&
        currentSkillIndex < skills.length - 1
      ) {
        setCurrentSkillIndex(currentSkillIndex + 1);
      }
      setIsTransitioning(false);
    }, 500);
  };

  const startPoll = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPollStarted(true);
      setIsTransitioning(false);
    }, 300);
  };

  const resetPoll = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      // Reset all poll data
      const resetData = Object.keys(pollData).reduce((acc, skill) => {
        acc[skill] = { selfTaught: 0, schoolTaught: 0 };
        return acc;
      }, {});
      
      setPollData(resetData);
      setPollStarted(false);
      setPollSubmitted(false);
      setCurrentSkillIndex(0);
      setSubmissionError(null);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div
      className="h-full w-full flex flex-col justify-center items-center"
      style={{
        background: bgBlue,
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col justify-center items-center h-full w-full p-6 md:p-10 lg:p-16">
        {!pollStarted ? (
          <div
            className={`bg-white rounded-lg w-full max-w-lg mx-auto p-10 py-12 md:py-14 md:px-12 lg:py-16 lg:px-16 shadow-lg transform transition-all duration-500 ${
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <h2 className="text-center text-gray-700 mb-6 text-xl md:text-2xl">
              <span className="italic">(self)</span>{" "}
              <span className="font-bold text-2xl">Taught</span>
            </h2>
            <p className="text-center text-sm md:text-base w-3/4 mx-auto text-gray-800 mb-4 font-semibold">
              Join the data panel and vote whether each skill was learned
              through self-study or during your education
            </p>
            <p className="text-center text-xs md:text-sm mb-6 font-bold">
              Est. time: ~2 min
            </p>
            <button
              onClick={startPoll}
              className="w-full py-2 md:py-3 bg-[#677C9B] text-white rounded-xl transition-all duration-300 hover:bg-[#4a6081] shadow-xs hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] active:scale-95 text-lg cursor-pointer"
            >
              Start the Poll
            </button>
          </div>
        ) : pollSubmitted ? (
          <div
            className={`bg-white rounded-lg w-full max-w-lg mx-auto p-10 py-12 md:py-14 md:px-12 lg:py-16 lg:px-16 shadow-lg transform transition-all duration-500 ${
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <h2 className="text-center text-gray-700 mb-6 text-2xl  font-bold">
            Submission complete!
            </h2>
            <p className="text-center text-md md:text-base mx-auto text-gray-800 mb-8 font-semibold">
            Your answers are now part of the data — check the board to see the changes in real time !
            </p>
          </div>
        ) : (
          <div
            className={`bg-white rounded-lg px-6 py-10 md:px-10 md:py-12 w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto shadow-lg transform transition-all duration-500 ${
              isTransitioning
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
          >
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <button
                onClick={() => currentIndex > 0 && navigateQuestion("prev")}
                className={`text-gray-400 text-lg md:text-xl transition-all duration-300 ${
                  currentSkillIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:text-gray-600 cursor-pointer hover:scale-110"
                }`}
                disabled={currentSkillIndex === 0}
              >
                &lt;
              </button>
              <h2 className="text-center font-bold text-xl md:text-xl  w-3/4">
                {skills[currentSkillIndex]}
              </h2>
              <button
                onClick={() =>
                  currentSkillIndex < skills.length - 1 && navigateQuestion("next")
                }
                className={`text-gray-400 text-lg md:text-xl transition-all duration-300 ${
                  currentSkillIndex === skills.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:text-gray-600 cursor-pointer hover:scale-110"
                }`}
                disabled={currentSkillIndex === skills.length - 1}
              >
                &gt;
              </button>
            </div>

            {/* <div className="text-center text-xs text-gray-500 mb-4">
              Question {currentSkillIndex + 1} of {skills.length}
            </div> */}

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleVote(skills[currentSkillIndex], "selfTaught")}
                className="flex-1 py-2 md:py-3 px-3 bg-[#677C9B] text-white rounded-lg shadow-md transition-all duration-300 hover:bg-[#4a6081] hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] active:scale-95 cursor-pointer"
              >
                Self Taught
              </button>
              <button
                onClick={() => handleVote(skills[currentSkillIndex], "schoolTaught")}
                className="flex-1 py-2 md:py-3 px-3 bg-[#A99F94] text-white rounded-lg shadow-md transition-all duration-300 hover:bg-[#bba081] hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] active:scale-95 cursor-pointer"
              >
                School Taught
              </button>
            </div>

            <div className="text-center mt-4">
              <span
                className="text-gray-800 text-sm underline cursor-pointer hover:text-gray-600 transition-all duration-300 hover:font-medium"
                onClick={skipQuestion}
              >
                Not applicable
              </span>
            </div>

            {submissionError && (
              <div className="mt-4 text-red-500 text-center text-sm">
                {submissionError}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PollForm;