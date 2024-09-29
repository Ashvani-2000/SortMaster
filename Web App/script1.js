document.getElementById('send-btn').addEventListener('click', handleChat);

// Sample array for sorting visualizer
let array = [];

// Chatbot responses
const responses = {
  "bubble sort": "Bubble Sort is a simple sorting algorithm with a time complexity of O(n^2). It compares adjacent elements and swaps them if they are in the wrong order.",
  "quick sort": "Quick Sort is an efficient algorithm with an average time complexity of O(n log n). It uses the divide-and-conquer approach by selecting a pivot and partitioning the array around it.",
  "merge sort": "Merge Sort is a stable sorting algorithm with a time complexity of O(n log n). It divides the array into smaller sub-arrays and merges them in sorted order.",
  "insertion sort": "Insertion Sort builds the sorted array one item at a time, with a time complexity of O(n^2) in the worst case but O(n) in the best case when the array is almost sorted."
};

// Handle chatbot input
function handleChat() {
  const input = document.getElementById('chat-input').value.toLowerCase();
  addChatMessage("User", input);

  // Check if user input matches any sorting algorithm
  if (input in responses) {
    addChatMessage("Bot", responses[input]);
  } else {
    addChatMessage("Bot", "Sorry, I can only explain sorting algorithms like Bubble Sort, Quick Sort, Merge Sort, and Insertion Sort.");
  }

  document.getElementById('chat-input').value = '';
}

// Display chat messages
function addChatMessage(sender, message) {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('div');
  messageElement.textContent = `${sender}: ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Sorting visualizer functions
document.getElementById('generate-array').addEventListener('click', generateArray);

function generateArray() {
  array = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
  displayArray();
}

function displayArray() {
  const arrayBars = document.getElementById('array-bars');
  arrayBars.innerHTML = '';
  array.forEach(value => {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value * 3}px`;
    bar.style.width = '20px';
    arrayBars.appendChild(bar);
  });
}

// Bubble sort visualization
document.getElementById('bubble-sort').addEventListener('click', async () => {
  await bubbleSort();
});

async function bubbleSort() {
  const bars = document.getElementsByClassName('bar');
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = 'red';
      bars[j + 1].style.backgroundColor = 'red';
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = `${array[j] * 3}px`;
        bars[j + 1].style.height = `${array[j + 1] * 3}px`;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
      bars[j].style.backgroundColor = 'teal';
      bars[j + 1].style.backgroundColor = 'teal';
    }
  }
}

// Quick sort visualization
document.getElementById('quick-sort').addEventListener('click', async () => {
  await quickSort(0, array.length - 1);
});

async function quickSort(start, end) {
  if (start >= end) return;
  let pivotIndex = await partition(start, end);
  await quickSort(start, pivotIndex - 1);
  await quickSort(pivotIndex + 1, end);
}

async function partition(start, end) {
  const bars = document.getElementsByClassName('bar');
  let pivotValue = array[end];
  let pivotIndex = start;
  bars[end].style.backgroundColor = 'blue';
  for (let i = start; i < end; i++) {
    bars[i].style.backgroundColor = 'yellow';
    if (array[i] < pivotValue) {
      [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
      bars[i].style.height = `${array[i] * 3}px`;
      bars[pivotIndex].style.height = `${array[pivotIndex] * 3}px`;
      pivotIndex++;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    bars[i].style.backgroundColor = 'teal';
  }
  [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
  bars[pivotIndex].style.height = `${array[pivotIndex] * 3}px`;
  bars[end].style.height = `${array[end] * 3}px`;
  bars[end].style.backgroundColor = 'teal';
  return pivotIndex;
}
