import React from "react";
import remark from "remark";

type Node = { type: string; value?: string; url?: string; title?: string | null; children?: Node[] };

// Home-page copy uses inline Markdown. ==text== retains the site's distinctive
// marker highlight, while ordinary **bold**, *italics*, code and links work too.
function renderNode(node: Node, key: React.Key): React.ReactNode {
  if (node.type === "text") {
    return (node.value ?? "").split(/(==[^=\n]+==)/g).map((part, index) =>
      part.startsWith("==") && part.endsWith("==")
        ? <mark key={index}>{part.slice(2, -2)}</mark>
        : part,
    );
  }
  const children = node.children?.map((child, index) => renderNode(child, index));
  switch (node.type) {
    case "root": case "paragraph": return <React.Fragment key={key}>{children}</React.Fragment>;
    case "strong": return <strong key={key}>{children}</strong>;
    case "emphasis": return <em key={key}>{children}</em>;
    case "inlineCode": return <code key={key}>{node.value}</code>;
    case "link": {
      const options = Object.fromEntries((node.title ?? "").split(";").map((option) => option.split("=")));
      return <a key={key} href={node.url} target={options.target === "_blank" ? "_blank" : undefined} rel={options.rel || undefined}>{children}</a>;
    }
    case "break": return <br key={key} />;
    default: return node.value ?? children ?? null;
  }
}

export default function RichText({ children }: { children: string }) {
  const tree = remark().parse(children) as Node;
  return <>{renderNode(tree, "root")}</>;
}
