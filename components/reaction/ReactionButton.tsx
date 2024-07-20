import React from "react";

// Props type for ReactionSelector component
type Props = {
  setReaction: (reaction: string) => void;
};

// ReactionSelector component for displaying reaction buttons
const ReactionSelector = ({ setReaction }: Props) => (
  <div
    className='absolute bottom-20 left-0 right-0 mx-auto w-fit transform rounded-full bg-white px-2 shadow-lg'
    onPointerMove={(e) => e.stopPropagation()} // Prevent pointer events from propagating
  >
    {["👍", "🔥", "😍", "👀", "😱", "🙁"].map((reaction) => (
      <ReactionButton
        key={reaction}
        reaction={reaction}
        onSelect={setReaction}
      />
    ))}
  </div>
);

// Props type for ReactionButton component
type ReactionButtonProps = {
  reaction: string;
  onSelect: (reaction: string) => void;
};

// ReactionButton component for individual reaction buttons
const ReactionButton = ({ reaction, onSelect }: ReactionButtonProps) => (
  <button
    className='transform select-none p-2 text-xl transition-transform hover:scale-150 focus:scale-150 focus:outline-none'
    onPointerDown={() => onSelect(reaction)} // Set the selected reaction on pointer down
    aria-label={`Select reaction ${reaction}`} // Accessible label for screen readers
  >
    {reaction}
  </button>
);

export default ReactionSelector;
