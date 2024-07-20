"use client"; // Ensures this component is a client-side component

import { ClientSideSuspense } from "@liveblocks/react"; // Importing ClientSideSuspense from liveblocks for handling suspense on the client side
import { CommentsOverlay } from "@/components/comments/CommentsOverlay"; // Importing the CommentsOverlay component

// Comments component using ClientSideSuspense for handling loading states
export const Comments = () => (
  <ClientSideSuspense fallback={null}>
    {() => <CommentsOverlay />}
  </ClientSideSuspense>
);
