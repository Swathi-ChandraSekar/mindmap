export default function Sidebar({ node }) {
  if (!node)
    return (
      <>
        <h2>World of Coffee</h2>
        <p>Select a node</p>
      </>
    );

  return (
    <>
      <h2>{node.label}</h2>
      <h4>Summary</h4>
      <p>{node.summary}</p>
      <h4>Description</h4>
      <p>{node.description}</p>
    </>
  );
}
