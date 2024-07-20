import jsPDF from "jspdf";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

// List of adjectives to be used for generating random names
const adjectives = [
  "Happy",
  "Creative",
  "Energetic",
  "Lively",
  "Dynamic",
  "Radiant",
  "Joyful",
  "Vibrant",
  "Cheerful",
  "Sunny",
  "Sparkling",
  "Bright",
  "Shining",
];

// List of animals to be used for generating random names
const animals = [
  "Dolphin",
  "Tiger",
  "Elephant",
  "Penguin",
  "Kangaroo",
  "Panther",
  "Lion",
  "Cheetah",
  "Giraffe",
  "Hippopotamus",
  "Monkey",
  "Panda",
  "Crocodile",
];

// Function to merge class names using tailwind-merge and clsx
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to generate a random name using a random adjective and animal
export function generateRandomName(): string {
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

  return `${randomAdjective} ${randomAnimal}`;
}

// Function to get shape information based on shape type
export const getShapeInfo = (shapeType: string) => {
  switch (shapeType) {
    case "rect":
      return {
        icon: "/assets/rectangle.svg",
        name: "Rectangle",
      };
    case "circle":
      return {
        icon: "/assets/circle.svg",
        name: "Circle",
      };
    case "triangle":
      return {
        icon: "/assets/triangle.svg",
        name: "Triangle",
      };
    case "line":
      return {
        icon: "/assets/line.svg",
        name: "Line",
      };
    case "i-text":
      return {
        icon: "/assets/text.svg",
        name: "Text",
      };
    case "image":
      return {
        icon: "/assets/image.svg",
        name: "Image",
      };
    case "freeform":
      return {
        icon: "/assets/freeform.svg",
        name: "Free Drawing",
      };
    default:
      return {
        icon: "/assets/rectangle.svg",
        name: shapeType,
      };
  }
};

// Function to export the canvas content to a PDF file
export const exportToPdf = () => {
  const canvas = document.querySelector("canvas");

  if (!canvas) return;

  // Create a new jsPDF instance with landscape orientation
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  // Get the canvas data URL
  const data = canvas.toDataURL();

  // Add the image to the PDF
  doc.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);

  // Download the PDF
  doc.save("canvas.pdf");
};
