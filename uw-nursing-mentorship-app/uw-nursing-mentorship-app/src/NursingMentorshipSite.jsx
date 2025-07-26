import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="min-h-screen bg-white text-gray-800">
      <header className="bg-blue-800 text-white p-6 text-center text-3xl font-bold shadow">
        UW Nursing Mentorship Program
      </header>

      <main className="p-4 grid gap-8">
        <section className="text-center">
          <h2 className="text-2xl font-semibold">Welcome Future Nurses!</h2>
          <p className="mt-2 max-w-xl mx-auto">
            We are excited to support and connect nursing students through mentorship. Whether you're
            just starting or preparing to graduate, we believe in empowering each other to succeed.
          </p>
        </section>

        <section>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Mentorship Questionnaire</h3>
              {submitted ? (
                <p className="text-green-700">Thank you! We'll review your submission shortly.</p>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="text"
                    name="year"
                    placeholder="Year in Program (e.g., 1st Year BSN)"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  />
                  <Textarea
                    name="interests"
                    placeholder="What are your nursing interests or goals?"
                    value={formData.interests}
                    onChange={handleChange}
                    required
                  />
                  <Button type="submit">Submit</Button>
                </form>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-2">Leadership Contacts</h3>
          <p className="text-sm text-gray-600">
            This data is pulled live from a Google Sheet for easy editing.
          </p>
          <ul className="mt-4 space-y-2">
            {leadershipData.length > 0 ? (
              leadershipData.map(([name, title, email], i) => (
                <li key={i} className="p-2 bg-gray-100 rounded">
                  {name} – {title} – {email}
                </li>
              ))
            ) : (
              <li className="text-gray-500">Loading contacts…</li>
            )}
          </ul>
        </section>
      </main>

      <footer className="text-center text-sm text-gray-500 p-4 mt-8">
        © {new Date().getFullYear()} UW Nursing Mentorship Program
      </footer>
    </div>
  );
}