"use client"; // Ensures this component is a client-side component

import { useCallback, useRef } from "react";
import { ThreadData } from "@liveblocks/client";

import {
  ThreadMetadata,
  useEditThreadMetadata,
  useThreads,
  useUser,
} from "@/liveblocks.config";
import { useMaxZIndex } from "@/lib/useMaxZIndex";
import { PinnedThread } from "./PinnedThread";

// Type definition for the props of OverlayThread component
type OverlayThreadProps = {
  thread: ThreadData<ThreadMetadata>;
  maxZIndex: number;
};

// CommentsOverlay component to display the list of unresolved threads
export const CommentsOverlay = () => {
  /**
   * Using the useThreads hook to get the list of threads in the room.
   * useThreads: https://liveblocks.io/docs/api-reference/liveblocks-react#useThreads
   */
  const { threads } = useThreads();

  // Get the maximum z-index of the threads
  const maxZIndex = useMaxZIndex();

  return (
    <div>
      {threads
        .filter((thread) => !thread.metadata.resolved) // Filter out resolved threads
        .map((thread) => (
          <OverlayThread
            key={thread.id}
            thread={thread}
            maxZIndex={maxZIndex}
          />
        ))}
    </div>
  );
};

// OverlayThread component to display an individual thread
const OverlayThread = ({ thread, maxZIndex }: OverlayThreadProps) => {
  /**
   * Using the useEditThreadMetadata hook to edit the metadata of a thread.
   * useEditThreadMetadata: https://liveblocks.io/docs/api-reference/liveblocks-react#useEditThreadMetadata
   */
  const editThreadMetadata = useEditThreadMetadata();

  /**
   * Using the useUser hook to get the user of the thread.
   * useUser: https://liveblocks.io/docs/api-reference/liveblocks-react#useUser
   */
  const { isLoading } = useUser(thread.comments[0].userId);

  // Using a ref to get the thread element to position it
  const threadRef = useRef<HTMLDivElement>(null);

  // Handler to increase the z-index of the thread when it gains focus
  const handleIncreaseZIndex = useCallback(() => {
    if (maxZIndex === thread.metadata.zIndex) {
      return;
    }

    // Update the z-index of the thread in the room
    editThreadMetadata({
      threadId: thread.id,
      metadata: {
        zIndex: maxZIndex + 1,
      },
    });
  }, [thread, editThreadMetadata, maxZIndex]);

  // If the user data is still loading, return null
  if (isLoading) {
    return null;
  }

  return (
    <div
      ref={threadRef}
      id={`thread-${thread.id}`}
      className='absolute left-0 top-0 flex gap-5'
      style={{
        transform: `translate(${thread.metadata.x}px, ${thread.metadata.y}px)`,
      }}
    >
      {/* Render the thread */}
      <PinnedThread thread={thread} onFocus={handleIncreaseZIndex} />
    </div>
  );
};
