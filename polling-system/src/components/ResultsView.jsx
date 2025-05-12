// import { useState, useEffect } from "react";
// import { fetchPollResults, fetchPollStats } from "../services/api";
// import answersBg from "../../public/answerBg.png";

// function ResultsView() {
//   const [pollData, setPollData] = useState({});
//   const [totalSubmissions, setTotalSubmissions] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [animate, setAnimate] = useState(false);

//   const bgBlue = "#677C9B";
//   const accentTan = "#A99F94";

//   useEffect(() => {
//     // Function to fetch data
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const results = await fetchPollResults();
//         const stats = await fetchPollStats();

//         setPollData(results);
//         setTotalSubmissions(stats.totalSubmissions);
//         setLastUpdated(new Date());
//         setError(null);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError("Failed to load results. Please refresh the page.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Fetch data immediately on mount
//     fetchData();

//     // Then fetch every 60 seconds
//     const intervalId = setInterval(fetchData, 60000);

//     // Trigger animation after component mounts
//     setTimeout(() => {
//       setAnimate(true);
//     }, 300);

//     // Cleanup function
//     return () => clearInterval(intervalId);
//   }, []);

//   // Determine if we have data
//   const hasData = Object.keys(pollData).length > 0;

//   // Split skills into two columns
//   const allSkills = Object.keys(pollData);
//   const midpoint = Math.ceil(allSkills.length / 2);

//   const formatTime = (date) => {
//     return date?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   return (
//     <div className="relative p-3 sm:p-4 md:p-6 lg:p-6 h-full overflow-auto border-12 border-[#677C9B]">
//       {/* Background with 10% opacity */}
//       <div
//         className="absolute inset-0 z-0 rounded-8"
//         style={{
//           backgroundImage: `url(${answersBg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           opacity: 0.1,
//         }}
//       ></div>

//       <div className="relative z-10 max-w-7xl mx-auto">
//         <div className="mb-2">
//           <div className="flex flex-col md:flex-row md:items-start md:justify-between">
//             <div className="animate-fadeIn">
//               <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
//                 Self-Taught or School-Taught?
//               </h1>
//               <p className="text-xs sm:text-sm text-gray-800 mb-2">
//                 How much of what we know comes from school <br /> — and how much
//                 from ourselves? <br /> Cast your vote and watch the data adjust
//                 in real time.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-2 mb-4">
//                 <div className="text-sm text-gray-600">
//                   Total Submissions:{" "}
//                   <span className="font-bold">{totalSubmissions}</span>
//                 </div>
//                 {/* {lastUpdated && (
//                   <div className="text-sm text-gray-600">
//                     Last Updated:{" "}
//                     <span className="font-bold">{formatTime(lastUpdated)}</span>
//                   </div>
//                 )} */}
//               </div>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm sm:text-base md:text-lg animate-fadeIn">
//               <div className="flex items-center gap-2">
//                 <div className="bg-[#677C9B] h-4 w-4 md:h-5 md:w-5"></div>
//                 <span>Self Taught</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="bg-[#A99F94] h-4 w-4 md:h-5 md:w-5"></div>
//                 <span>School Taught</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {loading && !hasData ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="text-lg">Loading results...</div>
//           </div>
//         ) : error ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="text-lg text-red-500">{error}</div>
//           </div>
//         ) : !hasData ? (
//           <div className="flex justify-center items-center h-64 ">
//             <div className="text-lg">No poll data available yet</div>
//           </div>
//         ) : (
//           <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-100vh mt-8">
//             <div className="flex-1 animate-slideInLeft">
//               {allSkills.slice(0, midpoint - 1).map((skill) => (
//                 <SkillBar
//                   key={skill}
//                   skill={skill}
//                   selfTaught={pollData[skill].selfTaught}
//                   schoolTaught={pollData[skill].schoolTaught}
//                   bgColor={bgBlue}
//                   accentColor={accentTan}
//                   animate={animate}
//                 />
//               ))}
//             </div>
//             <div className="flex-1 animate-slideInRight">
//               {allSkills.slice(midpoint).map((skill) => (
//                 <SkillBar
//                   key={skill}
//                   skill={skill}
//                   selfTaught={pollData[skill].selfTaught}
//                   schoolTaught={pollData[skill].schoolTaught}
//                   bgColor={bgBlue}
//                   accentColor={accentTan}
//                   animate={animate}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function SkillBar({
//   skill,
//   selfTaught,
//   schoolTaught,
//   bgColor,
//   accentColor,
//   animate,
// }) {
//   const total = selfTaught + schoolTaught;
//   const selfPercent = total > 0 ? Math.round((selfTaught / total) * 100) : 0;
//   const schoolPercent =
//     total > 0 ? Math.round((schoolTaught / total) * 100) : 0;

//   return (
//     <div className="flex flex-col sm:flex-row sm:items-center mb-6">
//       <div className="w-full sm:w-1/3 md:w-1/4 text-lg md:text-base  font-semibold mb-1 sm:mb-0 sm:pr-2">
//         {skill}
//       </div>
//       <div className="w-full sm:w-2/3 md:w-3/4 flex flex-col gap-1 sm:gap-4">
//         {/* Self-Taught Bar */}
//         <div className="bg-gray-200 rounded-lg overflow-hidden relative group">
//           <div
//             style={{
//               width: animate ? `${selfPercent}%` : "0%",
//               backgroundColor: bgColor,
//             }}
//             className="h-4 sm:h-5 transition-all duration-1000 ease-out rounded-xl"
//           ></div>
//           <span className="absolute right-1 top-1/2 -translate-y-1/2 text-md font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
//             {selfPercent}%
//           </span>
//         </div>

//         <div className="bg-gray-200 rounded-lg overflow-hidden relative group">
//           <div
//             style={{
//               width: animate ? `${schoolPercent}%` : "0%",
//               backgroundColor: accentColor,
//             }}
//             className="h-4 sm:h-5 transition-all duration-1000 ease-out rounded-lg"
//           ></div>
//           <span className="absolute right-1 top-1/2 -translate-y-1/2 text-md font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             {schoolPercent}%
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResultsView;
import { useState, useEffect } from "react";
import { fetchPollResults, fetchPollStats } from "../services/api";
import answersBg from "../../public/answerBg.png";

function ResultsView() {
  const [pollData, setPollData] = useState({});
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [animate, setAnimate] = useState(false);

  const bgBlue = "#677C9B";
  const accentTan = "#A99F94";

  // Sample skills to display when no data is available
  const defaultSkills = [
    "Adobe Suite",
    "Figma",
    "Coding/ Programming",
    "Technical Drawing",
    "Video Editing",
    "Typography",
    "3D Modelling",
    "Motion Graphics / Animation",
    "Prototyping",
    "Networking",
    "Project Management",
    "Clear Communication",
    "Problem Solving",
    "Teamwork / Collaboration",
    "Critical Thinking",
    "Entrepreneurship",
    "Adaptability & Flexibility",
    "Using AI"
  ];

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        setLoading(true);
        const results = await fetchPollResults();
        const stats = await fetchPollStats();

        setPollData(results);
        setTotalSubmissions(stats.totalSubmissions);
        setLastUpdated(new Date());
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load results. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch data immediately on mount
    fetchData();

    // Then fetch every 60 seconds
    const intervalId = setInterval(fetchData, 60000);

    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimate(true);
    }, 300);

    // Cleanup function
    return () => clearInterval(intervalId);
  }, []);

  // Determine if we have data
  const hasData = Object.keys(pollData).length > 0;

  // Use actual data if available, otherwise use default skills with empty data
  const skillsToDisplay = hasData 
    ? Object.keys(pollData)
    : defaultSkills;

  // Split skills into two columns
  const midpoint = Math.ceil(skillsToDisplay.length / 2);

  const formatTime = (date) => {
    return date?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="relative p-3 sm:p-4 md:p-6 lg:p-6 h-full overflow-auto border-12 border-[#677C9B]">
      {/* Background with 10% opacity */}
      <div
        className="absolute inset-0 z-0 rounded-8"
        style={{
          backgroundImage: `url(${answersBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.1,
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-2">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="animate-fadeIn">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                Self-Taught or School-Taught?
              </h1>
              <p className="text-xs sm:text-sm text-gray-800 mb-2">
                How much of what we know comes from school <br /> — and how much
                from ourselves? <br /> Cast your vote and watch the data adjust
                in real time.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <div className="text-sm text-gray-600">
                  Total Submissions:{" "}
                  <span className="font-bold">{totalSubmissions}</span>
                </div>
                {/* {lastUpdated && (
                  <div className="text-sm text-gray-600">
                    Last Updated:{" "}
                    <span className="font-bold">{formatTime(lastUpdated)}</span>
                  </div>
                )} */}
              </div>
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

        {loading && !hasData ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading results...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-500">{error}</div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-100vh mt-8">
            <div className="flex-1 animate-slideInLeft">
              {skillsToDisplay.slice(0, midpoint).map((skill) => (
                <SkillBar
                  key={skill}
                  skill={skill}
                  selfTaught={hasData ? pollData[skill]?.selfTaught || 0 : 0}
                  schoolTaught={hasData ? pollData[skill]?.schoolTaught || 0 : 0}
                  bgColor={bgBlue}
                  accentColor={accentTan}
                  animate={animate}
                  isEmpty={!hasData}
                />
              ))}
            </div>
            <div className="flex-1 animate-slideInRight">
              {skillsToDisplay.slice(midpoint).map((skill) => (
                <SkillBar
                  key={skill}
                  skill={skill}
                  selfTaught={hasData ? pollData[skill]?.selfTaught || 0 : 0}
                  schoolTaught={hasData ? pollData[skill]?.schoolTaught || 0 : 0}
                  bgColor={bgBlue}
                  accentColor={accentTan}
                  animate={animate}
                  isEmpty={!hasData}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SkillBar({
  skill,
  selfTaught,
  schoolTaught,
  bgColor,
  accentColor,
  animate,
  isEmpty
}) {
  const total = selfTaught + schoolTaught;
  const selfPercent = total > 0 ? Math.round((selfTaught / total) * 100) : 0;
  const schoolPercent = total > 0 ? Math.round((schoolTaught / total) * 100) : 0;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center mb-6">
      <div className="w-full sm:w-1/3 md:w-1/4 text-lg md:text-base font-semibold mb-1 sm:mb-0 sm:pr-2">
        {skill}
      </div>
      <div className="w-full sm:w-2/3 md:w-3/4 flex flex-col gap-1 sm:gap-4">
        {/* Self-Taught Bar */}
        <div className="bg-gray-200 rounded-lg overflow-hidden relative group">
          <div
            style={{
              width: isEmpty ? "0%" : (animate ? `${selfPercent}%` : "0%"),
              backgroundColor: bgColor,
            }}
            className="h-4 sm:h-5 transition-all duration-1000 ease-out rounded-xl"
          ></div>
          {!isEmpty && (
            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-md font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {selfPercent}%
            </span>
          )}
        </div>

        {/* School-Taught Bar */}
        <div className="bg-gray-200 rounded-lg overflow-hidden relative group">
          <div
            style={{
              width: isEmpty ? "0%" : (animate ? `${schoolPercent}%` : "0%"),
              backgroundColor: accentColor,
            }}
            className="h-4 sm:h-5 transition-all duration-1000 ease-out rounded-lg"
          ></div>
          {!isEmpty && (
            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-md font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {schoolPercent}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultsView;