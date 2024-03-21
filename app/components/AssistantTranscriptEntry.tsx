import type { OpenAIMessage } from "../../party/openai";

export default function AssistantTranscriptEntry({
  entry,
}: {
  entry: OpenAIMessage;
}) {
  let payload = null;
  if (entry.role === "assistant" && entry.tool_calls) {
    payload = JSON.parse(entry.tool_calls[0].function.arguments);
  } else if (entry.role === "tool") {
    payload = JSON.parse(entry.content);
  }

  return (
    <div
      style={{
        width: "100%",
        borderRadius: "0.25rem",
        border: "1px solid #cfc",
        padding: "0.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        justifyItems: "start",
        alignItems: "start",
      }}
    >
      <div
        style={{
          border: "1px solid #999",
          borderRadius: "9999px",
          padding: "0.25rem 0.5rem",
        }}
      >
        {entry.role}
      </div>
      {entry.role === "assistant" && entry.tool_calls && (
        <div>
          {entry.tool_calls[0].function.name}(
          <code>{JSON.stringify(payload)}</code>)
        </div>
      )}
      {entry.role === "tool" && (
        <div>
          {entry.name} {payload.success ? "success" : "error"}:{" "}
          <code>{payload.success || payload.error}</code>
        </div>
      )}
    </div>
  );
}
