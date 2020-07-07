export const courseOutline = {
  id: 1284870,
  title: 'Really Good Course!',
  items: [
    {
      id: 1284871,
      description: '',
      properties: {},
      title: 'Lesson 1 - Learn how to be a Really Good developer',
      type: 'lesson',
      childNodes: [
        {
          id: 670742,
          description: '',
          properties: {},
          title: 'Smart Walk-Thru: Lorem Ipsum is not simply random',
          type: 'smartwalkthru',
          childNodes: [],
        },
        {
          id: 698759,
          description: '',
          properties: {},
          title: 'Smart Walk-Thru: Lorem Ipsum is simply dummy text',
          type: 'smartwalkthru',
          childNodes: [],
        },
      ],
    },
    {
      id: 704247,
      description: '',
      properties: {},
      title: 'Smart Walk-Thru: The standard Lorem Ipsum',
      type: 'smartwalkthru',
      childNodes: [],
    },
    {
      id: 1284913,
      description: '',
      properties: {},
      title: 'Lesson 2 - Create a Really Good application',
      type: 'lesson',
      childNodes: [
        {
          id: 258975,
          description: '',
          properties: {},
          title: 'The Good Parts of JavaScript',
          type: 'content',
          childNodes: [],
        },
        {
          id: 259804,
          description: '',
          properties: {},
          title: 'Build Sudoku app with React',
          type: 'content',
          childNodes: [],
        },
      ],
    },
    {
      id: 258974,
      description: '',
      properties: {},
      title: 'JavaScript Best Practices',
      type: 'content',
      childNodes: [],
    },
  ],
  quiz: {
    Id: 4919,
    WelcomePage: {
      Id: 14746,
      Title: 'Course Assessment',
      Description: 'Did you master this course? Use this quiz to assess your knowledge',
      ButtonText: 'Start Quiz',
      Type: 1,
      UITemplateId: 21,
      UITemplateVersion: 1,
      UiComponentId: 4,
      UiComponentVersion: 1,
      DisplayerId: 1,
      UIVariationsIds: [],
    },
    SuccessSummeryPage: {
      Id: 14747,
      Title: 'Well Done!',
      Description: "Congratulations! You've passed the quiz!",
      ButtonText: 'Go Back to Courses',
      Type: 2,
      UITemplateId: 22,
      UITemplateVersion: 1,
      UiComponentId: 4,
      UiComponentVersion: 1,
      DisplayerId: 1,
      UIVariationsIds: [],
    },
    FailSummeryPage: {
      Id: 14748,
      Title: "Sorry, you didn't pass this time",
      Description:
        'Unfortunately, your score did not reach the passmark. Consider reviewing the course before you retake this quiz.',
      ButtonText: 'View Full Quiz Results',
      Type: 3,
      UITemplateId: 22,
      UITemplateVersion: 1,
      UiComponentId: 4,
      UiComponentVersion: 1,
      DisplayerId: 1,
      UIVariationsIds: [],
    },
    Questions: [
      {
        Id: 10158,
        Question: 'What is HTML?',
        Description: '',
        QuestionType: 1,
        Answers: [
          { Id: 28626, IsCorrect: false, Text: 'HTML is a programming language', OrderIndex: 0 },
          {
            Id: 28627,
            IsCorrect: true,
            Text: 'HTML stands for Hyper Text Markup Language',
            OrderIndex: 1,
          },
          {
            Id: 28628,
            IsCorrect: true,
            Text: 'HTML is the standard markup language for Web pages',
            OrderIndex: 2,
          },
          {
            Id: 28629,
            IsCorrect: true,
            Text: 'HTML elements are the building blocks of HTML pages',
            OrderIndex: 3,
          },
          {
            Id: 28630,
            IsCorrect: true,
            Text: 'HTML elements are represented by <> tags',
            OrderIndex: 4,
          },
        ],
        Explanation: null,
        OrderIndex: 1,
        Settings: null,
      },
      {
        Id: 10159,
        Question: 'Which language use to style website?',
        Description: '',
        QuestionType: 0,
        Answers: [
          { Id: 28631, IsCorrect: false, Text: 'HTML', OrderIndex: 0 },
          { Id: 28632, IsCorrect: true, Text: 'CSS', OrderIndex: 1 },
          { Id: 28633, IsCorrect: false, Text: 'JavaScript', OrderIndex: 2 },
        ],
        Explanation:
          'CSS is the language developers can use to style a website. The style sheet language describes how your website is presented and its layout. CSS is used hand in hand with HTML to add colors, backgrounds, layouts, font sizes, and more. This language is a core technology web developers use to design and build websites.',
        OrderIndex: 2,
        Settings: { hasExplanation: 1 },
      },
      {
        Id: 10149,
        Question: 'What is JavaScript?',
        Description: '',
        QuestionType: 0,
        Answers: [
          {
            Id: 28603,
            IsCorrect: true,
            Text:
              'is a scripting language that enables you to create dynamically updating content, control multimedia, animate images, and pretty much everything else',
            OrderIndex: 0,
          },
          { Id: 28604, IsCorrect: false, Text: 'Distractor option', OrderIndex: 1 },
        ],
        Explanation:
          'JavaScript is a scripting or programming language that allows you to implement complex features on web pages — every time a web page does more than just sit there and display static information for you to look at — displaying timely content updates, interactive maps, animated 2D/3D graphics, scrolling video jukeboxes, etc. ',
        OrderIndex: 3,
        Settings: { hasExplanation: 1 },
      },
      {
        Id: 10160,
        Question: 'Why using TypeScript?',
        Description: '',
        QuestionType: 1,
        Answers: [
          {
            Id: 28634,
            IsCorrect: true,
            Text: 'Optional static typing (the key here is optional)',
            OrderIndex: 0,
          },
          {
            Id: 28635,
            IsCorrect: true,
            Text:
              'Type Inference, which gives some of the benefits of types, without actually using them',
            OrderIndex: 1,
          },
          {
            Id: 28636,
            IsCorrect: true,
            Text: 'Access to ES6 and ES7 features, before they become supported by major browsers',
            OrderIndex: 2,
          },
          {
            Id: 28637,
            IsCorrect: true,
            Text:
              'The ability to compile down to a version of JavaScript that runs on all browsers',
            OrderIndex: 3,
          },
          {
            Id: 28638,
            IsCorrect: true,
            Text: 'Great tooling support with IntelliSense',
            OrderIndex: 4,
          },
        ],
        Explanation:
          'Because of these awesome features and the huge advantages it gives to you as a developer, Ionic apps are written in TypeScript, instead of ES6.',
        OrderIndex: 4,
        Settings: { hasExplanation: 1 },
      },
      {
        Id: 10161,
        Question: 'What exactly is GitHub?',
        Description: '',
        QuestionType: 0,
        Answers: [
          {
            Id: 28639,
            IsCorrect: true,
            Text:
              'GitHub is a for-profit company that offers a cloud-based Git repository hosting service. Essentially, it makes it a lot easier for individuals and teams to use Git for version control and collaboratio',
            OrderIndex: 0,
          },
          { Id: 28640, IsCorrect: false, Text: 'Social media', OrderIndex: 1 },
        ],
        Explanation:
          'Github is a web-based platform used for version control. Git simplifies the process of working with other people and makes it easy to collaborate on projects. Team members can work on files and easily merge their changes in with the master branch of the project.',
        OrderIndex: 5,
        Settings: { hasExplanation: 1 },
      },
    ],
    Passmark: 100,
    IsEnabled: true,
    UiComponentId: 3,
    DisplayerId: 1,
    UITemplateId: 20,
    UITemplateVersion: 1,
    UiComponentVersion: 1,
    Settings: { overlay: {}, position: 8, isQuizResults: 1 },
    UIVariationsIds: [],
  },
};

export const courseOutlineTableData = courseOutline.items.map((item) => {
  const isLesson = item.type === 'lesson';

  let itemData = {
    key: item.id,
    title: item.title,
    type: item.type,
    itemName: { value: item.title, icon: !isLesson ? item.type : undefined },
    className: `wm-expanded-default-hide-handler ${
      isLesson ? 'wm-expandable-item only-first-cell' : ''
    }`,
    usersCompletedItem: undefined, // TODO: update this property from the data
    dropOff: undefined, // TODO: update this property from the data
  };

  if (!isLesson) {
    return itemData;
  } else {
    return {
      ...itemData,
      children: item.childNodes.map((node) => {
        return {
          ...itemData,
          className: '',
          key: node.id,
          itemName: { value: node.title, icon: node.type },
        };
      }),
    };
  }
});
