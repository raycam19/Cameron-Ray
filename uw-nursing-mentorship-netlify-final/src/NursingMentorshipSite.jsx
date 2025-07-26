import { useState, useEffect } from "react";

export default function NursingMentorshipSite() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    year: "",
    interests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [leadershipData, setLeadershipData] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setSubmitted(true);
  };

  useEffect(() => {
    async function fetchLeadershipData() {
      const sheetId = "YOUR_GOOGLE_SHEET_ID";
      const apiKey = "YOUR_API_KEY";
      const range = "Leadership!A2:C";
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.values) {
          setLeadershipData(data.values);
        }
      } catch (error) {
        console.error("Error fetching leadership data:", error);
      }
    }
    fetchLeadershipData();
  }, []);

  return (
    <div>
      <h1>UW Nursing Mentorship Program</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} />
        <input type="text" name="year" placeholder="Year in Program" onChange={handleChange} value={formData.year} />
        <textarea name="interests" placeholder="Nursing interests or goals" onChange={handleChange} value={formData.interests} />
        <button type="submit">Submit</button>
      </form>

      {submitted && <p>Thank you! We'll review your submission shortly.</p>}

      <h2>Leadership Contacts</h2>
      <ul>
        {leadershipData.length > 0 ? (
          leadershipData.map(([name, title, email], i) => (
            <li key={i}>{name} – {title} – {email}</li>
          ))
        ) : (
          <li>Loading contacts…</li>
        )}
      </ul>
    </div>
  );
}