import img1 from "../Images/testingImags/trainImage.png";

import img2 from "../Images/testingImags/testRes.jpg";
import img3 from "../Images/testingImags/shipImage.png";
import img4 from "../Images/testingImags/planeImage.png";
// import img5 from "../Images/testingImags/image5.png";
// import img6 from "../Images/testingImags/image6.png";


export const questions = [
  {
    id: 1,
    question: "How do you measure success?",
    // answer: "A",
    options: [
      {
        label: "A",
        text: "Impact",
        category: "DisruptiveInnovator",
      },
      {
        label: "B",
        text: "Results",
        category: "RealWorlders",
      },
      {
        label: "C",
        text: "Accuracy",
        category: "ImplementationSpecialists",
      },
    ],
  },
  //  {
  //    id: 2,
  //    question: "What’s your priority in project planning?",
  //     answer: "A",
  //    options: [
  //      {
  //        label: "A",
  //        text: "Vision",
  //        category: "DisruptiveInnovator",
  //      },
  //      {
  //        label: "B",
  //        text: "Feasibility",
  //        category: "RealWorlders",
  //      },
  //      {
  //        label: "C",
  //        text: "Execution",
  //        category: "ImplementationSpecialists",
  //      },
  //    ],
  //  },
  // {
  //   id: 3,
  //   question: "What drives your curiosity?",
  //    answer: "A",
  //   options: [
  //     {
  //       label: "A",
  //       text: "Discovery",
  //       category: "DisruptiveInnovator",
  //     },
  //     {
  //       label: "B",
  //       text: "Solutions",
  //       category: "RealWorlders",
  //     },
  //     {
  //       label: "C",
  //       text: "Process",
  //       category: "ImplementationSpecialists",
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   question: "What’s your first step in problem-solving?",
  //    answer: "A",
  //   options: [
  //     {
  //       label: "A",
  //       text: "Ideate",
  //       category: "DisruptiveInnovator",
  //     },
  //     {
  //       label: "B",
  //       text: "Research",
  //       category: "RealWorlders",
  //     },
  //     {
  //       label: "C",
  //       text: "Execute",
  //       category: "ImplementationSpecialists",
  //     },
  //   ],
  // },
  // {
  //   id: 5,
  //   question: "What’s your role in team building?",
  //    answer: "A",
  //   options: [
  //     {
  //       label: "A",
  //       text: "Visionary",
  //       category: "DisruptiveInnovator",
  //     },
  //     {
  //       label: "B",
  //       text: "Supporter",
  //       category: "RealWorlders",
  //     },
  //     {
  //       label: "C",
  //       text: "Coordinator",
  //       category: "ImplementationSpecialists",
  //     },
  //   ],
  // },
  // {
  //   id: 6,
  //   question: "What’s your work environment preference?",
  //    answer: "A",
  //   options: [
  //     {
  //       label: "A",
  //       text: "Dynamic",
  //       category: "DisruptiveInnovator",
  //     },
  //     {
  //       label: "B",
  //       text: "Balanced",
  //       category: "RealWorlders",
  //     },
  //     {
  //       label: "C",
  //       text: "Structured",
  //       category: "ImplementationSpecialists",
  //     },
  //   ],
  // },
  //  {
  //    id: 7,
  //    question: "How do you manage pressure?",
  //     answer: "A",
  //    options: [
  //      {
  //        label: "A",
  //        text: "Adapt",
  //        category: "DisruptiveInnovator",
  //      },
  //      {
  //        label: "B",
  //        text: "Focus",
  //        category: "RealWorlders",
  //      },
  //      {
  //        label: "C",
  //        text: "Prepare",
  //        category: "ImplementationSpecialists",
  //      },
  //    ],
  //  },
  //  {
  //    id: 8,
  //    question: "How do you assess risks?",
  //     answer: "A",
  //    options: [
  //      {
  //        label: "A",
  //        text: "Embrace",
  //        category: "DisruptiveInnovator",
  //      },
  //      {
  //        label: "B",
  //        text: "Evaluate",
  //        category: "RealWorlders",
  //      },
  //      {
  //        label: "C",
  //        text: "Mitigate",
  //        category: "ImplementationSpecialists",
  //      },
  //    ],
  //  },
  //  {
  //    id: 9,
  //    question: "What’s your preferred decision tool?",
  //     answer: "A",
  //    options: [
  //      {
  //        label: "A",
  // //       text: "Insight",
  //        category: "DisruptiveInnovator",
  //      },
  //      {
  //        label: "B",
  //        text: "Data",
  //        category: "RealWorlders",
  //      },
  //      {
  //        label: "C",
  //        text: "Process",
  //        category: "ImplementationSpecialists",
  //      },
  //    ],
  //  },
  //  {
  //    id: 10,
  //    question: "What’s your communication style?",
  //     answer: "A",
  //    options: [
  //      {
  //        label: "A",
  //        text: "Persuasive",
  //        category: "DisruptiveInnovator",
  //      },
  //      {
  //        label: "B",
  //        text: "Clear",
  //        category: "RealWorlders",
  //      },
  //      {
  //        label: "C",
  //        text: "Direct",
  //        category: "ImplementationSpecialists",
  //      },
  //    ],
  //  },
  //  {
  //    id: 11,
  //    question: "How do you allocate time?",
  //     answer: "A",
  //    options: [
  //      {
  //        label: "A",
  //        text: "Strategically",
  //        category: "DisruptiveInnovator",
  //      },
  //      {
  //        label: "B",
  //        text: "Practically",
  //        category: "RealWorlders",
  //      },
  //      {
  //        label: "C",
  //        text: "Precisely",
  //        category: "ImplementationSpecialists",
  //      },
  //    ],
  //  },
  //  {
  //    id: 12,
  //    question: "How do you mostly do things?",
  //     answer: "B",
  //    options: [
  //      {
  //        label: "A",
  //        text: "The way that they're usually done",
  //        category: "ImplementationSpecialists",
  //      },
  //      {
  //        label: "B",
  //        text: "Your own way",
  //       category: "DisruptiveInnovator",
  //      },
  //    ],
  //  },

  {
    id: 13,
    question: "Which kind of person would you like to be for one year?",
    // answer: "A",
    options: [
      {
        label: "A",

        image: img1,
        isImage: true,
        category: "DisruptiveInnovator",
      },
      {
        label: "B",

        image: img2,
        isImage: true,
        category: "RealWorlders",
      },
      {
        label: "C",

        image: img3,
        isImage: true,
        category: "ImplementationSpecialists",
      },
    ],
  },
  {
    id: 14,
    question: "What is the meaning of freedom?",
    // answer: "A",
    options: [
      {
        label: "A",

        image: img4,
        isImage: true,
        category: "DisruptiveInnovator",
      },
      {
        label: "B",
        image: img2,
        isImage: true,
        category: "RealWorlders",
      },
      {
        label: "C",
        image: img1,
        isImage: true, // Indicates this option uses text only
        category: "ImplementationSpecialists",
      },
      {
        label: "D",
        image: img2,
        isImage: true, // Indicates this option uses text only
        category: "RealWorlders",
      },
    ],
  },
];
