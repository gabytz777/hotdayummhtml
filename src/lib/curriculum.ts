export type Challenge =
  | {
      id: string;
      type: "mc";
      prompt: string;
      code?: string;
      options: string[];
      correctIndex: number;
      hint: string;
    }
  | {
      id: string;
      type: "fill";
      prompt: string;
      code?: string;
      /** normalized accepted answers, see normalizeAnswer() */
      accept: string[];
      placeholder?: string;
      hint: string;
    };

export type Lesson = {
  id: string;
  unitId: string;
  title: string;
  blurb: string;
  explanation: string[];
  tip: string;
  challenges: Challenge[];
};

export type Unit = {
  id: string;
  title: string;
  icon: string;
  description: string;
  lessonIds: string[];
};

export const UNITS: Unit[] = [
  {
    id: "foundations",
    title: "Foundations",
    icon: "<>",
    description: "Tags, elements, attributes, and the page skeleton.",
    lessonIds: ["found-1", "found-2", "found-3", "found-4"],
  },
  {
    id: "structure",
    title: "Text & Structure",
    icon: "¶",
    description: "Headings, lists, and giving a page real shape.",
    lessonIds: ["struct-1", "struct-2", "struct-3", "struct-4"],
  },
  {
    id: "media",
    title: "Links & Media",
    icon: "🔗",
    description: "Send people places and show them things.",
    lessonIds: ["media-1", "media-2", "media-3", "media-4"],
  },
  {
    id: "forms-1",
    title: "Tables & Forms",
    icon: "▦",
    description: "Structured data and collecting input.",
    lessonIds: ["forms1-1", "forms1-2", "forms1-3", "forms1-4"],
  },
  {
    id: "forms-2",
    title: "Form Power-Ups",
    icon: "⌨",
    description: "Dropdowns, checkboxes, and better inputs.",
    lessonIds: ["forms2-1", "forms2-2", "forms2-3", "forms2-4"],
  },
  {
    id: "a11y",
    title: "Accessibility",
    icon: "◎",
    description: "Write HTML that works for everyone.",
    lessonIds: ["a11y-1", "a11y-2", "a11y-3", "a11y-4"],
  },
];

export const LESSONS: Record<string, Lesson> = {
  "found-1": {
    id: "found-1",
    unitId: "foundations",
    title: "What Is HTML?",
    blurb: "The language that gives every webpage its bones.",
    explanation: [
      "HTML stands for HyperText Markup Language. It's not a programming language — it's a markup language that describes the structure and content of a webpage.",
      "Every button, paragraph, image, and heading you've ever seen on the web started life as an HTML element. The browser reads your HTML and turns it into the page you see.",
    ],
    tip: "HTML handles structure. CSS handles style. JavaScript handles behavior. Three languages, one page.",
    challenges: [
      {
        id: "found-1-a",
        type: "mc",
        prompt: "What does HTML stand for?",
        options: [
          "HyperText Markup Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language",
          "HighText Machine Language",
        ],
        correctIndex: 0,
        hint: "Think about what each letter stands for: H-T-M-L.",
      },
      {
        id: "found-1-b",
        type: "mc",
        prompt: "What is HTML's job on a webpage?",
        options: [
          "Define the structure and content",
          "Style the colors and layout",
          "Add interactivity and logic",
          "Store data in a database",
        ],
        correctIndex: 0,
        hint: "HTML is the structural layer — CSS and JS handle the other two jobs.",
      },
    ],
  },
  "found-2": {
    id: "found-2",
    unitId: "foundations",
    title: "Tags & Elements",
    blurb: "Opening tags, closing tags, and how they nest.",
    explanation: [
      "Most HTML elements come in a pair: an opening tag like <p>, some content, and a closing tag like </p>. Together, that's one element.",
      "Elements can nest inside each other, but they have to close in the reverse order they opened — like stacking cups. The last one opened is the first one closed.",
    ],
    tip: "A tag is just the bracket-wrapped label, like <p>. An element is the whole package: opening tag + content + closing tag.",
    challenges: [
      {
        id: "found-2-a",
        type: "mc",
        prompt: "Which of these is nested correctly?",
        options: [
          "<b><i>text</i></b>",
          "<b><i>text</b></i>",
          "<b><i>text</i>",
          "<i>text</b></i>",
        ],
        correctIndex: 0,
        hint: "Whatever tag opens last must close first — like nested parentheses.",
      },
      {
        id: "found-2-b",
        type: "fill",
        prompt: "Type the closing tag that matches this opening tag:",
        code: "<div>",
        accept: ["/div"],
        placeholder: "</...>",
        hint: "Closing tags always start with a forward slash before the tag name.",
      },
    ],
  },
  "found-3": {
    id: "found-3",
    unitId: "foundations",
    title: "The Page Skeleton",
    blurb: "DOCTYPE, html, head, and body.",
    explanation: [
      "Every HTML page starts with <!DOCTYPE html> — a signal that tells the browser to render using modern HTML5 rules.",
      "The <html> tag wraps the whole page. Inside it, <head> holds metadata you don't see (like the page title), and <body> holds everything you actually look at.",
    ],
    tip: "Forgetting the DOCTYPE won't crash your page, but it can quietly change how the browser measures and renders things.",
    challenges: [
      {
        id: "found-3-a",
        type: "mc",
        prompt: "Which part of the page holds content that visitors actually see?",
        options: ["<body>", "<head>", "<!DOCTYPE html>", "<html lang>"],
        correctIndex: 0,
        hint: "It's the one that isn't invisible metadata or a document-type declaration.",
      },
      {
        id: "found-3-b",
        type: "fill",
        prompt:
          "Type the tag that holds metadata (like the page title) — content that isn't shown on the page itself.",
        accept: ["head"],
        placeholder: "tag name",
        hint: "It sits alongside <body>, inside <html>, and never shows up on the rendered page.",
      },
    ],
  },
  "found-4": {
    id: "found-4",
    unitId: "foundations",
    title: "Attributes",
    blurb: "Extra info that lives inside the opening tag.",
    explanation: [
      "Attributes add extra information to an element, written as name=\"value\" pairs inside the opening tag — never the closing one.",
      "For example, <a href=\"https://example.com\"> uses the href attribute to say where the link goes.",
    ],
    tip: "Always wrap attribute values in quotes. Browsers often forgive missing quotes, but it's a bug waiting to happen.",
    challenges: [
      {
        id: "found-4-a",
        type: "mc",
        prompt: "Where do attributes go?",
        options: [
          "Inside the opening tag",
          "Inside the closing tag",
          "Between the tags, as content",
          "In a separate file only",
        ],
        correctIndex: 0,
        hint: "They live in the same tag where the element starts, right after the tag name.",
      },
      {
        id: "found-4-b",
        type: "fill",
        prompt: "Complete the attribute name that provides fallback text for this image:",
        code: '<img src="cat.jpg" ___="A cat napping">',
        accept: ["alt"],
        placeholder: "attribute name",
        hint: "It's the classic accessibility attribute for images — three letters, short for 'alternative text'.",
      },
    ],
  },

  "struct-1": {
    id: "struct-1",
    unitId: "structure",
    title: "Headings & Paragraphs",
    blurb: "Building blocks for readable text.",
    explanation: [
      "Headings run from <h1> (most important) down to <h6> (least important). A page typically has one <h1> that names the main content.",
      "Regular text goes in <p> tags — one per paragraph. Browsers add space above and below them automatically.",
    ],
    tip: "Pick a heading level for what it means in the outline, not for how big you want the text — that's a job for CSS.",
    challenges: [
      {
        id: "struct-1-a",
        type: "mc",
        prompt: "Which tag represents the most important, top-level heading?",
        options: ["<h1>", "<h6>", "<h3>", "<head>"],
        correctIndex: 0,
        hint: "The number after 'h' shows its rank — lower means more important.",
      },
      {
        id: "struct-1-b",
        type: "fill",
        prompt: "Type the tag used to wrap a paragraph of text.",
        accept: ["p"],
        placeholder: "tag name",
        hint: "One letter, short for 'paragraph'.",
      },
    ],
  },
  "struct-2": {
    id: "struct-2",
    unitId: "structure",
    title: "Lists",
    blurb: "Bullets, numbers, and their items.",
    explanation: [
      "<ul> creates an unordered (bulleted) list. <ol> creates an ordered (numbered) list.",
      "Either way, each item inside goes in an <li> — short for 'list item'.",
    ],
    tip: "Use <ol> when the order matters, like steps in a recipe. Use <ul> when it doesn't.",
    challenges: [
      {
        id: "struct-2-a",
        type: "mc",
        prompt: "Which tag creates a numbered list?",
        options: ["<ol>", "<ul>", "<li>", "<dl>"],
        correctIndex: 0,
        hint: "'Ordered' means numbered, not bulleted.",
      },
      {
        id: "struct-2-b",
        type: "fill",
        prompt: "Every item inside a <ul> or <ol> must be wrapped in this tag.",
        accept: ["li"],
        placeholder: "tag name",
        hint: "Two letters, short for 'list item' — used inside both list types.",
      },
    ],
  },
  "struct-3": {
    id: "struct-3",
    unitId: "structure",
    title: "Semantic Layout",
    blurb: "Tags that describe meaning, not just boxes.",
    explanation: [
      "Semantic tags describe what a chunk of content is for: <header>, <nav>, <main>, <section>, <article>, <aside>, and <footer>.",
      "<main> wraps the primary content of the page and should appear once. <article> wraps something self-contained, like a blog post, that could stand on its own.",
    ],
    tip: "Semantic tags look plain by default, but screen readers, search engines, and browsers all use them to understand your page.",
    challenges: [
      {
        id: "struct-3-a",
        type: "mc",
        prompt: "Which tag wraps the primary, unique content of a page (used once per page)?",
        options: ["<main>", "<div>", "<section>", "<aside>"],
        correctIndex: 0,
        hint: "It's meant to appear exactly once, wrapping the page's unique content — not a repeatable container.",
      },
      {
        id: "struct-3-b",
        type: "fill",
        prompt:
          "Type the tag for a self-contained piece of content, like a blog post, that could stand on its own.",
        accept: ["article"],
        placeholder: "tag name",
        hint: "Think 'a standalone piece of content,' like a news story or blog post.",
      },
    ],
  },
  "struct-4": {
    id: "struct-4",
    unitId: "structure",
    title: "Div & Span",
    blurb: "The generic containers you reach for last.",
    explanation: [
      "<div> is a generic block-level container — it starts on its own line. <span> is a generic inline container — it flows within text.",
      "Reach for a semantic tag first. Use <div> or <span> when nothing more specific fits, usually just to group things for styling.",
    ],
    tip: "If you're wrapping navigation links, reach for <nav>, not <div>. Save div/span for when nothing semantic applies.",
    challenges: [
      {
        id: "struct-4-a",
        type: "mc",
        prompt: "What's the key difference between <div> and <span>?",
        options: [
          "<div> is block-level, <span> is inline",
          "<div> is inline, <span> is block-level",
          "They behave identically",
          "<span> can't contain text",
        ],
        correctIndex: 0,
        hint: "One starts a new line by default, the other flows inline with surrounding text.",
      },
      {
        id: "struct-4-b",
        type: "fill",
        prompt:
          "Type the generic inline container used to style one small piece of text inside a sentence.",
        accept: ["span"],
        placeholder: "tag name",
        hint: "It's the inline sibling of <div> — same job, different display behavior.",
      },
    ],
  },

  "media-1": {
    id: "media-1",
    unitId: "media",
    title: "Links",
    blurb: "Sending people somewhere else.",
    explanation: [
      "The <a> (anchor) tag creates a link. Its href attribute holds the destination URL: <a href=\"https://example.com\">Visit</a>.",
      "Add target=\"_blank\" to open the link in a new tab instead of navigating away from the current page.",
    ],
    tip: "When you use target=\"_blank\", it's good practice to add rel=\"noopener noreferrer\" for security.",
    challenges: [
      {
        id: "media-1-a",
        type: "mc",
        prompt: "Which attribute makes a link open in a new tab?",
        options: [
          'target="_blank"',
          'href="_blank"',
          'new="tab"',
          'open="_blank"',
        ],
        correctIndex: 0,
        hint: "The value tells the browser where to open the link — 'blank' means a fresh tab.",
      },
      {
        id: "media-1-b",
        type: "fill",
        prompt: "Type the attribute that holds a link's destination URL.",
        accept: ["href"],
        placeholder: "attribute name",
        hint: "Short for 'hypertext reference' — it's the attribute every <a> tag needs.",
      },
    ],
  },
  "media-2": {
    id: "media-2",
    unitId: "media",
    title: "Images",
    blurb: "Showing pictures the right way.",
    explanation: [
      "The <img> tag embeds an image. It's a void element — it never has a closing tag or content, just attributes.",
      "It needs src (the image file) and alt (a text description). alt is read by screen readers and shown if the image fails to load.",
    ],
    tip: "Good alt text describes what the image means in context, not just 'image' or the file name.",
    challenges: [
      {
        id: "media-2-a",
        type: "mc",
        prompt: "Why does the alt attribute matter on <img>?",
        options: [
          "It describes the image for screen readers and shows if the image fails to load",
          "It sets the image's file size",
          "It makes the image clickable",
          "The browser can't parse HTML without it",
        ],
        correctIndex: 0,
        hint: "Think about what happens when the image can't load, or when someone can't see it at all.",
      },
      {
        id: "media-2-b",
        type: "fill",
        prompt: "Type the tag name for embedding an image (it never has a closing tag).",
        accept: ["img"],
        placeholder: "tag name",
        hint: "Three letters, short for 'image' — and it never needs a closing tag.",
      },
    ],
  },
  "media-3": {
    id: "media-3",
    unitId: "media",
    title: "Void Elements",
    blurb: "Tags that never get a closing partner.",
    explanation: [
      "A void element has no closing tag and can't contain content — it's just one self-contained tag, like <img>, <br>, and <hr>.",
      "Other common void elements include <input>, <meta>, and <link>.",
    ],
    tip: "Trying to write </br> or </img> isn't wrong exactly, it's just unnecessary — void elements don't take a closing tag.",
    challenges: [
      {
        id: "media-3-a",
        type: "mc",
        prompt: "Which of these is a void element with no closing tag?",
        options: ["<br>", "<p>", "<div>", "<a>"],
        correctIndex: 0,
        hint: "It's the one that's just a single tag with no matching closer — nothing goes inside it.",
      },
      {
        id: "media-3-b",
        type: "fill",
        prompt: "Type the void element used to draw a horizontal divider line.",
        accept: ["hr"],
        placeholder: "tag name",
        hint: "Two letters — think 'horizontal rule,' the line that sometimes divides sections.",
      },
    ],
  },
  "media-4": {
    id: "media-4",
    unitId: "media",
    title: "Figures & Captions",
    blurb: "Pairing media with a caption.",
    explanation: [
      "<figure> groups a piece of media (like an image) with content related to it, and <figcaption> gives that media a caption.",
      "This keeps the caption tied to the image semantically, not just placed visually nearby.",
    ],
    tip: "A <figure> can hold more than images — diagrams, code snippets, or quotes all qualify if they need a caption.",
    challenges: [
      {
        id: "media-4-a",
        type: "mc",
        prompt: "Which tag pairs with <figure> to caption its contents?",
        options: ["<figcaption>", "<caption>", "<figtext>", "<label>"],
        correctIndex: 0,
        hint: "It starts with 'fig' too, just like its parent tag.",
      },
      {
        id: "media-4-b",
        type: "fill",
        prompt: "Type the tag that wraps an image plus its caption as one unit.",
        accept: ["figure"],
        placeholder: "tag name",
        hint: "It's the outer wrapper — the caption tag nests inside this one.",
      },
    ],
  },

  "forms1-1": {
    id: "forms1-1",
    unitId: "forms-1",
    title: "Table Structure",
    blurb: "Rows, cells, and headers.",
    explanation: [
      "A <table> is built from rows: each <tr> is a table row. Inside a row, <td> is a normal data cell.",
      "<th> is a header cell — used for column or row labels, and it's bold and centered by default in most browsers.",
    ],
    tip: "Tables are for tabular data, like a spreadsheet — not for laying out a whole page.",
    challenges: [
      {
        id: "forms1-1-a",
        type: "mc",
        prompt: "Which tag defines a table row?",
        options: ["<tr>", "<td>", "<th>", "<table>"],
        correctIndex: 0,
        hint: "Two letters, short for 'table row.'",
      },
      {
        id: "forms1-1-b",
        type: "fill",
        prompt: "Type the tag for a header cell in a table.",
        accept: ["th"],
        placeholder: "tag name",
        hint: "Two letters, short for 'table header' — bold and centered by default.",
      },
    ],
  },
  "forms1-2": {
    id: "forms1-2",
    unitId: "forms-1",
    title: "Forms",
    blurb: "The container for everything you collect.",
    explanation: [
      "<form> wraps every control you want to submit together — text fields, checkboxes, buttons, all of it.",
      "The action attribute tells the browser where to send the data, and method (get or post) says how.",
    ],
    tip: "Nothing inside a <form> actually submits anywhere until you add a submit button or trigger it in code.",
    challenges: [
      {
        id: "forms1-2-a",
        type: "mc",
        prompt: "Which attribute of <form> says where to send the submitted data?",
        options: ["action", "method", "src", "href"],
        correctIndex: 0,
        hint: "It answers the question 'where does this data go when submitted?'",
      },
      {
        id: "forms1-2-b",
        type: "fill",
        prompt: "Type the tag that wraps all your form controls together.",
        accept: ["form"],
        placeholder: "tag name",
        hint: "It's the outermost tag that wraps every input, select, and button together.",
      },
    ],
  },
  "forms1-3": {
    id: "forms1-3",
    unitId: "forms-1",
    title: "Inputs",
    blurb: "Collecting a single piece of data.",
    explanation: [
      "<input> is the workhorse of forms. Its type attribute decides what kind of control it is — text, email, checkbox, and more.",
      "It also needs a name attribute — without one, its value won't be included when the form is submitted.",
    ],
    tip: "type=\"email\" doesn't just look like a text field — many browsers validate the format and show an email keyboard on mobile.",
    challenges: [
      {
        id: "forms1-3-a",
        type: "mc",
        prompt: "Which attribute is required on <input> for its value to be submitted with a name?",
        options: ["name", "id", "class", "alt"],
        correctIndex: 0,
        hint: "Without it, the browser has nothing to label the submitted value with.",
      },
      {
        id: "forms1-3-b",
        type: "fill",
        prompt: "Type the input type value for a single-line email address field.",
        code: '<input type="___">',
        accept: ["email"],
        placeholder: "type value",
        hint: "It's literally the word for the kind of address you'd type after '@'.",
      },
    ],
  },
  "forms1-4": {
    id: "forms1-4",
    unitId: "forms-1",
    title: "Labels",
    blurb: "Naming a field so everyone understands it.",
    explanation: [
      "<label> gives a form control a readable name — and it's not just cosmetic. Clicking the label focuses or toggles its input.",
      "Link them by matching the label's for attribute to the input's id: <label for=\"email\">Email</label> <input id=\"email\">.",
    ],
    tip: "A properly linked label expands the clickable area of checkboxes and radio buttons — a small change with a big usability payoff.",
    challenges: [
      {
        id: "forms1-4-a",
        type: "mc",
        prompt: "How does a <label> get linked to a specific input?",
        options: [
          "Its for attribute matches the input's id",
          "They must be written on the same line",
          "Labels can't be linked to inputs",
          "Using the src attribute",
        ],
        correctIndex: 0,
        hint: "The label's attribute value has to exactly match the input's id.",
      },
      {
        id: "forms1-4-b",
        type: "fill",
        prompt: "Type the attribute on <label> that connects it to an input's id.",
        accept: ["for"],
        placeholder: "attribute name",
        hint: "Short word, three letters — it points 'for' which input this label belongs to.",
      },
    ],
  },

  "forms2-1": {
    id: "forms2-1",
    unitId: "forms-2",
    title: "Select & Options",
    blurb: "Dropdown menus.",
    explanation: [
      "<select> creates a dropdown menu. Each choice inside it is an <option>.",
      "Give each <option> a value attribute — that's what actually gets submitted, which can differ from the text shown.",
    ],
    tip: "Group related options with <optgroup> when a dropdown gets long — it adds a visual label without changing what's submitted.",
    challenges: [
      {
        id: "forms2-1-a",
        type: "mc",
        prompt: "Which tag creates a dropdown menu?",
        options: ["<select>", "<option>", "<list>", "<dropdown>"],
        correctIndex: 0,
        hint: "It's the tag that opens the dropdown, not the individual choices inside it.",
      },
      {
        id: "forms2-1-b",
        type: "fill",
        prompt: "Type the tag used for each individual choice inside a <select>.",
        accept: ["option"],
        placeholder: "tag name",
        hint: "Each choice inside <select> gets its own tag — short for 'option.'",
      },
    ],
  },
  "forms2-2": {
    id: "forms2-2",
    unitId: "forms-2",
    title: "Textarea & Buttons",
    blurb: "Bigger text boxes and things to click.",
    explanation: [
      "<textarea> is a multi-line text box — perfect for comments or messages, unlike the single line of <input type=\"text\">.",
      "<button> creates a clickable button. Inside a <form>, its default type is 'submit', which sends the form when clicked.",
    ],
    tip: "Give <button> an explicit type=\"button\" when you don't want it to submit a form — a common surprise for beginners.",
    challenges: [
      {
        id: "forms2-2-a",
        type: "mc",
        prompt: "Which tag is best for a multi-line text box, like a comment field?",
        options: ["<textarea>", "<input>", "<text>", "<p>"],
        correctIndex: 0,
        hint: "Think about which one lets text wrap onto multiple lines.",
      },
      {
        id: "forms2-2-b",
        type: "fill",
        prompt: "Type the tag for a clickable button element.",
        accept: ["button"],
        placeholder: "tag name",
        hint: "It's the tag literally named after what it is — a clickable button.",
      },
    ],
  },
  "forms2-3": {
    id: "forms2-3",
    unitId: "forms-2",
    title: "Helpful Input Attributes",
    blurb: "Small attributes, big usability wins.",
    explanation: [
      "placeholder shows faint example text inside an empty input — it disappears once someone starts typing, and it's not a real value.",
      "required stops the form from submitting until that field has something in it.",
    ],
    tip: "Placeholder text isn't a substitute for a real <label> — it vanishes the moment someone starts typing, which hurts accessibility.",
    challenges: [
      {
        id: "forms2-3-a",
        type: "mc",
        prompt: "Which attribute shows faint example text inside an empty input?",
        options: ["placeholder", "value", "alt", "label"],
        correctIndex: 0,
        hint: "It's the grey example text that vanishes the moment you start typing.",
      },
      {
        id: "forms2-3-b",
        type: "fill",
        prompt: "Type the attribute that blocks form submission until a field is filled in.",
        accept: ["required"],
        placeholder: "attribute name",
        hint: "It's the attribute that makes a field mandatory before the form can submit.",
      },
    ],
  },
  "forms2-4": {
    id: "forms2-4",
    unitId: "forms-2",
    title: "Checkboxes & Radios",
    blurb: "Pick one, or pick many.",
    explanation: [
      "type=\"checkbox\" lets someone select any number of independent options — none, one, or all of them.",
      "type=\"radio\" buttons that share the same name attribute become a group where only one can be selected at a time.",
    ],
    tip: "Forgetting to give a set of radio buttons the same name is the classic bug — without it, every button acts like its own group.",
    challenges: [
      {
        id: "forms2-4-a",
        type: "mc",
        prompt: "What makes a group of radio buttons mutually exclusive (only one selectable)?",
        options: [
          "They share the same name attribute",
          "They share the same id",
          "They must be inside a <fieldset>",
          "Radio buttons can't be grouped",
        ],
        correctIndex: 0,
        hint: "Radios in the same group need something in common to know they're a set.",
      },
      {
        id: "forms2-4-b",
        type: "fill",
        prompt: "Type the input type that lets someone select multiple independent options.",
        code: '<input type="___">',
        accept: ["checkbox"],
        placeholder: "type value",
        hint: "It's the input type where each option is independent — you can tick more than one.",
      },
    ],
  },

  "a11y-1": {
    id: "a11y-1",
    unitId: "a11y",
    title: "Why Alt Text Matters",
    blurb: "The image description that carries real weight.",
    explanation: [
      "Screen reader users can't see an image — they hear whatever you put in its alt attribute instead.",
      "Good alt text describes the purpose or content of the image concisely. It shouldn't start with 'image of' — screen readers already announce it as an image.",
    ],
    tip: "If an image is purely decorative, use alt=\"\" (empty, but present) so screen readers skip right past it.",
    challenges: [
      {
        id: "a11y-1-a",
        type: "mc",
        prompt: "What should good alt text describe?",
        options: [
          "The purpose or content of the image, concisely",
          "The image's file name",
          "The image's pixel dimensions",
          "Nothing — alt text is optional",
        ],
        correctIndex: 0,
        hint: "Good alt text answers 'what is this image communicating,' not 'what file is this.'",
      },
      {
        id: "a11y-1-b",
        type: "fill",
        prompt: "Type the attribute that gives an image a text alternative.",
        accept: ["alt"],
        placeholder: "attribute name",
        hint: "Same attribute you used back in the Images lesson.",
      },
    ],
  },
  "a11y-2": {
    id: "a11y-2",
    unitId: "a11y",
    title: "Semantic HTML vs. Divs",
    blurb: "Meaning that assistive tech can actually use.",
    explanation: [
      "A <div> carries zero meaning — it's a blank box. A <nav> tells browsers, screen readers, and search engines exactly what that block is for.",
      "Swapping generic divs for semantic tags like <nav>, <main>, and <footer> often costs nothing visually, but adds real meaning underneath.",
    ],
    tip: "Screen reader users often jump between landmarks like <nav> and <main> directly — divs don't offer that shortcut.",
    challenges: [
      {
        id: "a11y-2-a",
        type: "mc",
        prompt: "Why prefer <nav> over a plain <div> for a block of navigation links?",
        options: [
          "Screen readers and browsers understand its purpose automatically",
          "It's the only way to make links clickable",
          "<div> elements can't contain links",
          "<nav> makes the page load faster",
        ],
        correctIndex: 0,
        hint: "Semantic tags carry built-in meaning that assistive tech and browsers can read automatically.",
      },
      {
        id: "a11y-2-b",
        type: "fill",
        prompt: "Type the semantic tag meant to wrap a site's primary navigation links.",
        accept: ["nav"],
        placeholder: "tag name",
        hint: "Short word, three letters — the semantic tag for a navigation block.",
      },
    ],
  },
  "a11y-3": {
    id: "a11y-3",
    unitId: "a11y",
    title: "The lang Attribute",
    blurb: "One attribute, better pronunciation everywhere.",
    explanation: [
      "Adding lang=\"en\" to the <html> tag tells browsers and screen readers what language the page is in, so words get pronounced and translated correctly.",
      "It's easy to forget because it changes nothing visually — but assistive tech and translation tools both depend on it.",
    ],
    tip: "Got a page with a paragraph in another language? You can set lang again on that specific element too.",
    challenges: [
      {
        id: "a11y-3-a",
        type: "mc",
        prompt: "Where does the lang attribute usually go to declare a page's language?",
        options: [
          "On the <html> tag",
          "On the <body> tag",
          "On every <p> tag",
          "In the page URL",
        ],
        correctIndex: 0,
        hint: "It's set once, high up in the document, so it applies to everything inside.",
      },
      {
        id: "a11y-3-b",
        type: "fill",
        prompt: 'Type the attribute name used like this: <html ___="en">',
        accept: ["lang"],
        placeholder: "attribute name",
        hint: "Four letters — short for 'language.'",
      },
    ],
  },
  "a11y-4": {
    id: "a11y-4",
    unitId: "a11y",
    title: "Headings as an Outline",
    blurb: "Structure first, size second.",
    explanation: [
      "Heading levels should form a logical outline — go in order, and don't skip from <h1> straight to <h4> just because you want smaller text.",
      "If you want a heading to look bigger or smaller, that's a styling decision for CSS, not a reason to pick a different heading level.",
    ],
    tip: "Screen reader users often navigate a page heading-by-heading, like a table of contents — a broken outline breaks that shortcut.",
    challenges: [
      {
        id: "a11y-4-a",
        type: "mc",
        prompt: "What's a heading best practice?",
        options: [
          "Use heading levels in order to build a logical outline",
          "Use as many <h1> tags as you like, anywhere",
          "Pick a heading level based only on the font size you want",
          "Headings are purely decorative",
        ],
        correctIndex: 0,
        hint: "The rule is about order, not about how large or small the text looks.",
      },
      {
        id: "a11y-4-b",
        type: "fill",
        prompt: "Type the tag for the lowest-level (smallest) heading.",
        accept: ["h6"],
        placeholder: "tag name",
        hint: "It's the highest-numbered heading tag — the smallest, least important one.",
      },
    ],
  },
};

export function normalizeAnswer(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^</, "")
    .replace(/>$/, "")
    .replace(/\s+/g, "");
}

export function isCorrectFill(challenge: Extract<Challenge, { type: "fill" }>, raw: string) {
  const normalized = normalizeAnswer(raw);
  return challenge.accept.some((a) => normalizeAnswer(a) === normalized);
}

export function getLesson(id: string): Lesson | undefined {
  return LESSONS[id];
}

export function getUnitLessons(unitId: string): Lesson[] {
  const unit = UNITS.find((u) => u.id === unitId);
  if (!unit) return [];
  return unit.lessonIds.map((id) => LESSONS[id]);
}

export const ALL_LESSON_IDS = UNITS.flatMap((u) => u.lessonIds);

export const TOTAL_CHALLENGES = Object.values(LESSONS).reduce(
  (sum, l) => sum + l.challenges.length,
  0,
);
