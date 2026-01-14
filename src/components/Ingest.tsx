import React, { useState } from "react";
import keycloak from "../keycloak";
import axios from "axios";

const Ingest: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only PDF and DOCX files are allowed");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleIngest = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      await axios.post("http://localhost:8000/ingest", formData, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("File ingested successfully!");
      setFile(null);
    } catch (err) {
      console.error(err);
      setError("File ingestion failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Document Ingestion</h2>

      <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={handleIngest}
        disabled={!file || loading}
        style={{ marginTop: "10px" }}
      >
        {loading ? "Ingesting..." : "Ingest"}
      </button>
    </div>
  );
};

export default Ingest;
