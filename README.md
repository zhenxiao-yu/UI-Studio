# UI Studio 

Author: ZhenXiao (Mark) Yu © 2024

## Table of Contents

1. [Introduction](#introduction)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [How To Run](#how-to-run)

## Introduction

UI Studio is a streamlined, minimalist web-based application tailored for PC users and offered completely free of charge. Designed to emulate a professional collaborative user interface design environment, UI Studio integrates essential features such as live collaboration, real-time cursor tracking, integrated chat, commenting, and dynamic drawing capabilities. Leveraging cutting-edge technologies like Next.js, TypeScript, and Fabric.js, the application provides a robust platform for exploring and mastering real-time web applications and collaborative design processes. With its intuitive, user-friendly interface, UI Studio ensures a seamless and interactive experience, enabling teams to collaborate effectively and creatively in a virtual workspace. Discover how UI Studio can enhance your design workflow and facilitate efficient team collaboration.

## Tech Stack

The application utilizes a modern technology stack to ensure high performance, scalability, and ease of development:

- **Next.js**: A React framework that facilitates server-side rendering and static site generation, enhancing performance and SEO.
- **TypeScript**: A superset of JavaScript that introduces static typing, which helps catch type-related errors during development and leads to more robust and maintainable code.
- **Tailwind CSS**: A utility-first CSS framework that accelerates UI development with consistent and adaptable styling.
- **Fabric.js**: A powerful JavaScript library for working with HTML5 canvas, making it easier to develop interactive design tools.
- **Liveblocks**: A library that supports real-time collaboration features, including multi-user presence, cursor tracking, and shared state management.
- **Shadcn**: A library designed for creating accessible and highly customizable UI components.

## Features

UI Studio offers a comprehensive set of features designed to enhance the collaborative and interactive design experience:

#### Multi-Cursors, Cursor Chat, and Reactions

This feature enables real-time collaboration by displaying individual user cursors within the design environment. Users can interact through cursor chat, which allows for real-time messaging, and reactions, which facilitate quick feedback and communication. This enhances the collaborative aspect of the design process, making teamwork more fluid and dynamic.

#### Active Users

A list of currently active users is displayed, providing visibility into who is participating in the collaborative session. This feature helps manage interactions among team members, ensuring everyone is aware of who is working on the project and facilitating better coordination.

#### Comment Bubbles

Users can attach comments directly to specific elements on the canvas. This feature supports detailed feedback and discussion, which is crucial for collaborative reviews and iterative design improvements. Comment bubbles make it easy to provide context-specific notes and suggestions.

#### Creating Different Shapes

The toolset includes functionality for generating various shapes on the canvas, such as rectangles, circles, and polygons. This allows designers to construct and manipulate diverse design elements efficiently, providing the flexibility needed for detailed and complex designs.

#### Uploading Images

Users can import images onto the canvas, broadening the range of visual content available for design. This feature is essential for integrating external assets, such as logos or illustrations, and enhancing the overall visual appeal of the project.

#### Customization

Design elements can be extensively customized, with users able to adjust properties such as color, size, and style. This flexibility ensures that each design element can be tailored to meet specific project requirements and personal preferences.

#### Freeform Drawing

The application supports freeform drawing, enabling users to sketch and create unique design elements directly on the canvas. This feature is ideal for artistic expression and brainstorming, allowing for spontaneous and creative design development.

#### Undo/Redo

The undo and redo functionalities allow users to easily reverse or restore actions, providing flexibility and control during the design process. This feature is vital for correcting mistakes and experimenting with different design approaches.

#### Keyboard Actions

Keyboard shortcuts streamline various actions, including copying, pasting, deleting, and accessing features like cursor chat and reactions. This enhancement improves efficiency and makes the design process more accessible and responsive.

#### History

A chronological history of actions and changes made on the canvas is maintained, helping with project management and version control. This feature tracks the evolution of the design, allowing users to review and revert to previous states if needed.

#### Managing Canvas Elements

The application provides comprehensive tools for managing design elements, including options for deleting, scaling, moving, clearing the canvas, and exporting the final design. These capabilities ensure complete control over the design process and facilitate the transition from concept to implementation.

## How to Run

Follow these steps to set up the project on your local machine.

### Prerequisites

Before starting, make sure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)

### Clone the Repository

Begin by cloning the repository to your local machine:

```bash
git clone https://github.com/JavaScript-Mastery-Pro/figma-ts.git
cd figma-ts
```

### Install Dependencies

Next, install the necessary project dependencies:

```bash
npm install
```

### Configure Environment Variables

Create a new file named `.env.local` in the root directory of your project and add the following line:

```env
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=
```

Make sure to replace the placeholder with your actual Liveblocks credentials. You can obtain these credentials by registering on the [Liveblocks website](https://liveblocks.io).

### Start the Project

To run the development server, use the following command:

```bash
npm run dev
```

You can then view the project by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.

------