import React from "react";
import { useParams } from "react-router-dom";

function ProjectPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Project Details for Project ID: {id}</h1>
      {/* Add project-specific details and features here */}
    </div>
  );
}

export default ProjectPage;
