"use client";
//error
import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Caught by admin/error.tsx:", error);
  }, [error]);

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl text-red-500 mb-4">Something went wrong in the Admin panel!</h1>
      <pre className="bg-transparent p-4 rounded overflow-auto text-sm border border-red-500/30 whitespace-pre-wrap">
        {error.message || "Unknown error"}
        <br />
        Digest: {error.digest || "None"}
      </pre>
      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-red-500/20 text-red-400 rounded border border-red-500/50 hover:bg-red-500/30"
      >
        Try again
      </button>
    </div>
  );
}
