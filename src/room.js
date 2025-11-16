import { db } from "./firebaseConfig.js";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

console.log("room.js loaded");

// DOM ELEMENTS
const joinBtn = document.getElementById("joinRoomBtn");
const createBtn = document.getElementById("createRoomBtn");
const checkbox = document.getElementById("customCheck");
const textarea = document.getElementById("customScenariosInput");

// Custom checkbox logic
if (checkbox && textarea) {
  checkbox.addEventListener("change", () => {
    textarea.classList.toggle("hidden", !checkbox.checked);
  });
}

// Join room
if (joinBtn) {
  console.log("Join button detected.");

  joinBtn.addEventListener("click", async () => {
    console.log("JOIN CLICKED");

    const name = document.getElementById("clasherName").value.trim();
    const roomCode = document.getElementById("roomCode").value.trim();

    if (!name) {
      alert("Enter your name");
      return;
    }

    if (!roomCode) {
      alert("Enter a room code");
      return;
    }

    const roomRef = doc(db, "rooms", roomCode);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
      alert("Room does not exist!");
      window.location.href = "index.html";
      return;
    }

    // Add player to players subcollection
    const playerRef = doc(db, "rooms", roomCode, "players", name);
    await setDoc(playerRef, {
      name,
      joinedAt: serverTimestamp(),
    });

    window.location.href = `game.html?room=${roomCode}&player=${name}`;
  });
}

// Create room
if (createBtn) {
  console.log("Create button detected.");

  createBtn.addEventListener("click", async () => {
    console.log("CREATE CLICKED");

    const name = document.getElementById("clasherName").value.trim();

    // Require name
    if (!name) {
      alert("Enter your name");
      return;
    }

    // Require grid size
    let selectedGrid = document.querySelector("input[name='gridSize']:checked");
    if (!selectedGrid) {
      alert("Select a grid size!");
      return;
    }
    selectedGrid = selectedGrid.id;

    // Default scenarios
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
      'Someone asks "Is this going to be on the test?"',
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
      "A random loud sound interrupts the class (sirens, construction noise)",
      "Someone yawns loudly during a lecture",
      "The lecture is about to end, and someone asks for clarification",
      "Professor misplaces their lecture notes or slides",
      "A student complains about the heat/cold in the room",
      "Someone asks a question that could have been Googled",
      "Professor introduces a new term nobody understands",
      "Someone says 'in conclusion' but talks 10 more minutes",
      "The projector shows the wrong slide",
      "A student explains something nobody understands",
      "Someone calls the professor the wrong name",
      "Random sarcastic remark gets everyone laughing",
      "Class gets sidetracked by pop culture",
      "Someone arrives right before class ends",
      "A 5-minute break becomes 15 minutes",
      "Someone says 'I'm not an expert, but...'",
      "Someone wears completely wrong-season clothes",
      "Random knock interrupts class",
      "Someone doodles during class",
      "Class groans at a pop quiz",
    ];

    // Custom scenarios
    if (checkbox && checkbox.checked) {
      const custom = textarea.value
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);
      scenarios = scenarios.concat(custom);
    }

    // Create room ID
    const roomId = Math.floor(1000 + Math.random() * 9000).toString();

    // Create room
    await setDoc(doc(db, "rooms", roomId), {
      hostName: name,
      createdAt: serverTimestamp(),
      gridSize: selectedGrid,
      phrases: scenarios,
      isActive: true,
    });

    // Add host to players list
    await setDoc(doc(db, "rooms", roomId, "players", name), {
      name: name,
      joinedAt: serverTimestamp(),
    });

    // Redirect host
    window.location.href = `game.html?room=${roomId}&host=${name}`;
  });
}
