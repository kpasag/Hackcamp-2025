import { db } from "./firebaseConfig.js";
import {
  doc, setDoc, collection, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Create room button
const createBtn = document.getElementById("createRoomBtn");

const checkbox = document.getElementById("customCheck");
const textarea = document.getElementById("customScenariosInput");

checkbox.addEventListener("change", () => {
  textarea.classList.toggle("hidden", !checkbox.checked);
});


// CLICK HANDLER
createBtn.addEventListener("click", async () => {
  const name = document.getElementById("clasherName").value.trim();

  // Get grid size
  let selectedGrid = document.querySelector("input[name='gridSize']:checked");
  if (!selectedGrid) return alert("Select a grid size!");

  selectedGrid = selectedGrid.id; // gridDifficult, gridNormal, gridEasy

    // Always include default scenarios
    let scenarios = [
      "Professor says 'as you can see'",
      "Someone walks in late",
      "Technical issues",
      "Student asks a weird question",
      "Student asks a question that's already been answered",
      "Professor forgets what they were talking about",
      "Someone's phone rings loudly",
      "A student falls asleep",
      "A student asks for a homework extension",
      "Professor writes something wrong on the board",
      "Someone spills coffee or water",
      "A student makes an awkward comment",
      "Professor uses a funny analogy to explain a concept",
      "Technical difficulties with the projector",
      "A student eats loudly in the back row",
      "Professor goes off on a tangent",
      "Someone asks \"Is this going to be on the test?\"",
      "The Wi-Fi goes down during an important moment",
      "Professor loses track of time and ends late",
      "A student nervously answers a question incorrectly",
      "Someone drops something in the middle of a quiet moment",
      "A student is caught texting or on their phone",
      "A group chat starts buzzing loudly in the middle of class",
      "A student gives a presentation and forgets their notes",
      "Professor forgets to assign homework",
      "Someone gets called on when they aren't paying attention",
      "Professor mispronounces a word in the lecture",
      "A student gives a really long answer to a short question",
      "Professor accidentally skips a whole section of the lecture",
      "A student asks a question that stumps the professor",
      "Classmates exchange memes during class",
      "A random loud sound interrupts the class (e.g., sirens, construction noise)",
      "Someone yawns loudly during a lecture",
      "The lecture is about to end, and someone asks for clarification",
      "Professor misplaces their lecture notes or slides",
      "A student complains about the heat/cold in the room",
      "Someone asks a question that could have easily been Googled",
      "Professor introduces a new term that no one understands",
      "Someone uses a phrase like “in conclusion” but keeps talking for another 10 minutes",
      "Professor starts a sentence and forgets the point halfway through",
      "The projector shows the wrong slide",
      "A student explains something in a way that no one understands",
      "Someone accidentally calls the professor by the wrong name",
      "Someone makes a sarcastic remark that everyone laughs at",
      "Class gets sidetracked by a pop culture reference",
      "A student arrives right before class ends",
      "Professor says \"Let's take a 5-minute break\" and it turns into 15 minutes",
      "Someone uses the phrase \"I'm not an expert, but...\"",
      "A student wears something ridiculously out of season (e.g., summer attire in winter)",
      "The professor gets interrupted by a random knock on the door",
      "Someone asks, \"Is this going to be on the final exam?\" during the lecture",
      "Someone gets caught doodling during class",
      "The class collectively groans after a pop quiz is announced",
    ];

    // If custom checkbox is checked, add more
    if (checkbox.checked) {
    const custom = textarea.value
        .split(",")
        .map(x => x.trim())
        .filter(Boolean);

    scenarios = scenarios.concat(custom);
    }

  // Make room code
  const roomId = Math.floor(1000 + Math.random() * 9000).toString();

  // Firestore: create room document
  await setDoc(doc(db, "rooms", roomId), {
    hostName: name,
    createdAt: serverTimestamp(),
    gridSize: selectedGrid,
    phrases: scenarios,
    isActive: true
  });

  // Redirect
  window.location.href = `game.html?room=${roomId}&host=${name}`;
});
